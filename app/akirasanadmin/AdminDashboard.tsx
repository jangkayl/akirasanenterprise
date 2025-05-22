"use client";

import { CldImage } from "next-cloudinary";
import { useState, useTransition } from "react";
import { addPost, deletePost, getData, updatePost } from "../actions/server";

const CLOUDINARY_UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!;
const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!;

type Post = {
  id: number;
  title: string;
  description: string | null;
  image?: string | null;
  isPinned: boolean;
};

export default function AdminDashboard({ initialPosts }: { initialPosts: Post[] }) {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [isPinned, setIsPinned] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [postToDelete, setPostToDelete] = useState<number | null>(null);

  const [editingPostId, setEditingPostId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editIsPinned, setEditIsPinned] = useState<boolean | undefined>(undefined);

  const [currentPage, setCurrentPage] = useState(1);
  const POSTS_PER_PAGE = 20;

  const sortedPosts = [...posts].sort((a, b) => {
    if (a.isPinned === b.isPinned) {
      return b.id - a.id;
    }
    return b.isPinned ? 1 : -1;
  });
  const totalPages = Math.ceil(sortedPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = sortedPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  const confirmDelete = (id: number) => {
    setPostToDelete(id);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (postToDelete !== null) {
      await handleDelete(postToDelete);
      setShowDeleteModal(false);
      setPostToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setPostToDelete(null);
  };

  const handleUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
    formData.append("folder", "AkirasanPosts");

    setUploading(true);
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );
    setUploading(false);
    const data = await res.json();
    return data.public_id as string;
  };

  const handleAdd = async () => {
    let imageId: string | undefined;
    if (image) {
      imageId = await handleUpload(image);
    }
    await addPost(title, description, imageId, isPinned);
    setTitle("");
    setDescription("");
    setImage(null);
    setIsPinned(false);
    startTransition(() => {
      getData().then((data) =>
        setPosts(
          data.map((post: any) => ({
            ...post,
            isPinned: post.isPinned ?? false,
          }))
        )
      );
    });
  };

  const handleDelete = async (id: number) => {
    await deletePost(id);
    startTransition(() => {
      getData().then((data) =>
        setPosts(
          data.map((post: any) => ({
            ...post,
            isPinned: post.isPinned ?? false,
          }))
        )
      );
    });
  };

  const cancelEdit = () => {
    setEditingPostId(null);
    setEditTitle("");
    setEditDescription("");
  };

  const saveEdit = async (post: Post) => {
    await updatePost({
      ...post,
      title: editTitle,
      description: editDescription,
      isPinned: editIsPinned ?? post.isPinned,
    });
    setEditingPostId(null);
    setEditTitle("");
    setEditDescription("");
    setEditIsPinned(undefined);
    startTransition(() => {
      getData().then((data) =>
        setPosts(
          data.map((post: any) => ({
            ...post,
            isPinned: post.isPinned ?? false,
          }))
        )
      );
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black flex">
      {/* Sidebar */}
      <aside
        className={`
          fixed z-40 top-0 left-0 h-full w-64 bg-black/90 border-r border-purple-900 p-6
          transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        <div className="flex items-center justify-between mb-8">
          <div className="text-2xl font-bold text-purple-400 tracking-wide">
            AkiraSan Admin
          </div>
          <button
            className="lg:hidden text-purple-300 text-2xl"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            ×
          </button>
        </div>
        <nav className="flex flex-col gap-4 text-gray-300 h-full">
          <a className="hover:text-purple-400 cursor-pointer transition flex items-center gap-2 p-2 rounded-lg bg-gray-800">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
            Posts
          </a>
          <button
            onClick={async () => {
              await fetch("/api/auth/logout", { method: "POST" });
              window.location.href = "/akirasanadmin/login";
            }}
            className="flex items-center gap-2 p-2 cursor-pointer hover:bg-transparent hover:text-red-600
             rounded-lg w-full text-left bg-red-600 text-white font-semibold transition shadow hover:shadow-lg"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1"
              />
            </svg>
            Logout
          </button>
        </nav>
        <div className="mt-auto text-xs text-gray-500 pt-8 hidden lg:block">
          © {new Date().getFullYear()} AkiraSan Enterprise
        </div>
      </aside>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/60 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen lg:ml-64">
        {/* Mobile Navbar */}
        <header className="sticky top-0 z-20 w-full px-6 py-4 border-b border-purple-900 flex items-center justify-between bg-black/80 backdrop-blur-sm lg:hidden">
          <button
            className="text-purple-300 text-2xl"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open sidebar"
          >
            ☰
          </button>
          <h1 className="text-lg font-semibold text-white">AkiraSan Admin</h1>
          <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white text-xs font-bold">
            A
          </div>
        </header>

        {/* Desktop Header */}
        <header className="hidden lg:flex w-full px-8 py-4 border-b border-purple-900 items-center justify-between bg-black/60 backdrop-blur-sm">
          <h1 className="text-2xl font-semibold text-white">Posts Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-purple-300">Welcome, Admin</span>
            <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white text-sm font-bold">
              A
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
          {/* Post Creation Card */}
          <section className="w-full max-w-4xl mx-auto">
            <div className="bg-black/80 rounded-2xl shadow-xl p-6 flex flex-col gap-4 border border-purple-800 backdrop-blur-sm">
              <h2 className="text-xl font-semibold text-purple-300 mb-2">
                Create New Post
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Title
                    </label>
                    <input
                      className="w-full bg-gray-900 text-white px-4 py-3 rounded-lg border border-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Enter post title"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Description
                    </label>
                    <textarea
                      className="w-full bg-gray-900 text-white px-4 py-3 rounded-lg border border-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition min-h-[120px]"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Enter post description"
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={isPinned}
                        onChange={(e) => setIsPinned(e.target.checked)}
                      />
                      <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-500"></div>
                      <span className="ml-3 text-sm font-medium text-gray-300">
                        Pin this post
                      </span>
                    </label>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Image
                    </label>
                    <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-purple-700 rounded-lg cursor-pointer bg-gray-900 hover:bg-gray-800 transition">
                      {image ? (
                        <div className="relative w-full h-full flex items-center justify-center">
                          <span className="text-purple-300 font-medium">
                            {image.name}
                          </span>
                          <button
                            className="absolute top-2 right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center"
                            onClick={(e) => {
                              e.stopPropagation();
                              setImage(null);
                            }}
                          >
                            ×
                          </button>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center p-4 text-center">
                          <svg
                            className="w-8 h-8 text-purple-500 mb-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          <p className="text-sm text-gray-400">
                            <span className="font-semibold text-purple-400">
                              Click to upload
                            </span>{" "}
                            or drag and drop
                          </p>
                          <p className="text-xs text-gray-500">
                            PNG, JPG, GIF (MAX. 5MB)
                          </p>
                        </div>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files?.[0] || null)}
                        className="hidden"
                      />
                    </label>
                  </div>
                  <button
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-6 py-3 rounded-lg text-white font-semibold shadow transition disabled:opacity-50 flex items-center justify-center gap-2 mt-4"
                    onClick={handleAdd}
                    disabled={uploading || isPending || !title}
                  >
                    {uploading ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Uploading...
                      </>
                    ) : (
                      <>
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 4v16m8-8H4"
                          />
                        </svg>
                        Create Post
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Delete Warning Modal */}
          {showDeleteModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
              <div className="bg-gray-900 border border-purple-700 rounded-xl p-8 shadow-xl sm:max-w-sm max-w-[250px] w-full">
                <h2 className="text-sm sm:text-lg font-bold text-red-400 mb-4">
                  Delete Post?
                </h2>
                <p className="text-gray-300 mb-6 sm:text:lg text-sm">
                  Are you sure you want to delete this post? This action cannot be undone.
                </p>
                <div className="flex justify-end gap-4">
                  <button
                    className="sm:text:lg text-sm px-4 py-2 rounded bg-gray-700 text-gray-200 hover:bg-gray-600"
                    onClick={handleCancelDelete}
                  >
                    Cancel
                  </button>
                  <button
                    className="sm:text:lg text-sm px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
                    onClick={handleConfirmDelete}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Posts Grid */}
          <section className="w-full max-w-7xl mx-auto mt-10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-purple-300">Your Posts</h2>
              <div className="text-sm text-gray-400">
                {posts.length} {posts.length === 1 ? "post" : "posts"} total
              </div>
            </div>

            {posts.length === 0 ? (
              <div className="bg-black/50 border border-purple-900 rounded-2xl p-12 text-center">
                <svg
                  className="mx-auto h-12 w-12 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h3 className="mt-2 text-lg font-medium text-gray-300">No posts yet</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Get started by creating a new post.
                </p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {paginatedPosts.map((post) => (
                    <div
                      key={post.id}
                      className={`bg-black/80 border border-purple-800 rounded-2xl p-5 flex flex-col shadow-lg hover:shadow-purple-900/50 transition-all duration-300 hover:-translate-y-1 ${
                        post.isPinned ? "ring-2 ring-yellow-400 relative" : ""
                      }`}
                    >
                      {post.isPinned && (
                        <div className="absolute -top-2 -left-2 bg-yellow-500 text-black text-xs font-bold px-2 py-1 rounded-lg flex items-center">
                          <svg
                            className="w-4 h-4 mr-1"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                          </svg>
                          Pinned
                        </div>
                      )}
                      {post.image && (
                        <div className="relative rounded-xl overflow-hidden mb-4 h-48 w-full">
                          <CldImage
                            src={post.image}
                            width={400}
                            height={250}
                            crop="fill"
                            format="webp"
                            quality={20}
                            loading="lazy"
                            alt="Post image"
                            className="object-cover w-full h-full"
                          />
                        </div>
                      )}
                      <div className="flex-1 flex flex-col">
                        {editingPostId === post.id ? (
                          <>
                            <input
                              className="w-full bg-gray-900 text-white px-3 py-2 rounded-lg border border-purple-700 mb-2"
                              value={editTitle}
                              onChange={(e) => setEditTitle(e.target.value)}
                            />
                            <textarea
                              className="w-full bg-gray-900 text-white px-3 py-2 rounded-lg border border-purple-700 mb-2"
                              value={editDescription}
                              onChange={(e) => setEditDescription(e.target.value)}
                              rows={3}
                            />
                            <label className="flex items-center gap-2 text-purple-300 font-medium mb-2">
                              <input
                                type="checkbox"
                                checked={editIsPinned ?? post.isPinned}
                                onChange={(e) => setEditIsPinned(e.target.checked)}
                                className="accent-yellow-500"
                              />
                              Pinned
                            </label>
                          </>
                        ) : (
                          <>
                            <h3 className="text-lg font-bold text-white mb-2 line-clamp-2">
                              {post.title}
                            </h3>
                            <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                              {post.description}
                            </p>
                          </>
                        )}
                        <div className="mt-auto">
                          <div className="flex justify-between items-center gap-2">
                            <span className="text-xs text-gray-500">
                              {new Date().toLocaleDateString()}
                            </span>
                            <div className="flex gap-2">
                              {editingPostId === post.id ? (
                                <>
                                  <button
                                    className="px-3 py-1 bg-gradient-to-r from-green-600 to-blue-600 rounded text-white text-xs font-semibold hover:from-green-700 hover:to-blue-700 transition"
                                    onClick={() =>
                                      saveEdit({
                                        ...post,
                                        isPinned: editIsPinned ?? post.isPinned,
                                      })
                                    }
                                  >
                                    Save
                                  </button>
                                  <button
                                    className="px-3 py-1 bg-gray-700 rounded text-white text-xs font-semibold hover:bg-gray-600 transition"
                                    onClick={cancelEdit}
                                  >
                                    Cancel
                                  </button>
                                </>
                              ) : (
                                <>
                                  <button
                                    className="px-3 py-1 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded text-black text-xs font-semibold hover:from-yellow-600 hover:to-yellow-700 transition"
                                    onClick={() => {
                                      setEditingPostId(post.id);
                                      setEditTitle(post.title);
                                      setEditDescription(post.description || "");
                                      setEditIsPinned(post.isPinned);
                                    }}
                                  >
                                    Edit
                                  </button>
                                  <button
                                    className="px-3 py-1 bg-gradient-to-r cursor-pointer from-pink-600 to-purple-600 rounded text-white text-xs font-semibold hover:from-pink-700 hover:to-purple-700 transition flex items-center gap-1"
                                    onClick={() => confirmDelete(post.id)}
                                  >
                                    <svg
                                      className="w-3 h-3"
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                      />
                                    </svg>
                                    Delete
                                  </button>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {/* Pagination Controls */}
                <div className="flex justify-center items-center gap-4 mt-8">
                  <button
                    className="px-4 py-2 rounded bg-purple-700 text-white font-semibold disabled:opacity-50"
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>
                  <span className="text-purple-300 font-medium">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    className="px-4 py-2 rounded bg-purple-700 text-white font-semibold disabled:opacity-50"
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </button>
                </div>
              </>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}
