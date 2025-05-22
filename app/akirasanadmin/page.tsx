import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getData } from "../actions/server";
import AdminDashboard from "./AdminDashboard";

export default async function Page() {
  const cookieStore = await cookies();
  const isAdmin = cookieStore.get("isAdmin")?.value;

  if (!isAdmin) {
    redirect("/akirasanadmin/login");
  }

  const posts = await getData();
  const normalizedPosts = posts.map((post) => ({
    ...post,
    isPinned: post.isPinned ?? false,
  }));

  return <AdminDashboard initialPosts={normalizedPosts} />;
}
