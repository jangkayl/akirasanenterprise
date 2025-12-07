"use client";

import { Project } from "@/lib/utils";
import { motion } from "framer-motion";
import { CldImage } from "next-cloudinary";
import React, { useState } from "react";

const PROJECTS_PER_PAGE = 54;

const demoProjects = Array.from({ length: 52 }, (_, i) => ({
  title: `Crypto Project ${i + 1}`,
  image: `/assets/project${i + 1}.jpeg`,
  description: "Marketing & Community Management",
}));

export function AllProjects({ projects }: { projects: Project[] }) {
  // Combine real projects with demo data
  const allProjects = [...projects, ...demoProjects];

  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(allProjects.length / PROJECTS_PER_PAGE);
  const paginatedProjects = allProjects.slice(
    (page - 1) * PROJECTS_PER_PAGE,
    page * PROJECTS_PER_PAGE
  );

  // --- NEW: Helper to calculate which page numbers to show ---
  const getVisiblePages = (current: number, total: number) => {
    if (total <= 7) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    if (current <= 4) {
      return [1, 2, 3, 4, 5, "...", total];
    }

    if (current >= total - 3) {
      return [1, "...", total - 4, total - 3, total - 2, total - 1, total];
    }

    return [1, "...", current - 1, current, current + 1, "...", total];
  };

  const visiblePages = getVisiblePages(page, totalPages);
  // ---------------------------------------------------------

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-purple-900/10 to-background/50" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-500/5 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]" />

      <div className="max-w-5xl mx-auto px-4 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.4 }}
          className="text-3xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400"
        >
          All Projects
        </motion.h2>

        {/* Round Images Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {paginatedProjects.map((project, index) => (
            <motion.div
              key={`${project.title}-${index}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: index * 0.03 }}
              className="group relative transition-all duration-300 hover:scale-105 active:scale-105 hover:bg-white/5 active:bg-white/5"
            >
              <div className="relative h-28 w-28 mx-auto">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 p-[2px]">
                  <div className="absolute inset-0 rounded-full bg-black" />
                </div>
                <div className="relative h-full w-full overflow-hidden rounded-full">
                  {project.image?.includes("/assets/") ? (
                    <img
                      src={project.image || ""}
                      alt={project.title}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <CldImage
                      src={project.image || ""}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                  )}
                </div>
              </div>
              <div className="mt-2 text-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-xs text-purple-200">{project.title}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* --- UPDATED: Pagination Controls --- */}
        <div className="flex flex-col items-center gap-4 mt-16">
          <div className="flex flex-wrap justify-center items-center gap-2">
            {/* Previous Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className={`p-3 rounded-lg ${
                page === 1
                  ? "bg-gray-800 text-gray-600 cursor-not-allowed"
                  : "bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:shadow-lg hover:shadow-purple-500/25"
              } transition-all flex items-center gap-2`}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </motion.button>

            {/* Smart Page Numbers */}
            <div className="flex items-center gap-2 mx-2">
              {visiblePages.map((pageNum, idx) => (
                <React.Fragment key={idx}>
                  {pageNum === "..." ? (
                    <span className="text-gray-500 px-2 select-none">...</span>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setPage(pageNum as number)}
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-medium transition-all ${
                        page === pageNum
                          ? "bg-gradient-to-br from-purple-500 to-blue-500 text-white shadow-lg shadow-purple-500/30"
                          : "bg-gray-800/50 text-gray-400 hover:bg-gray-700/50 hover:text-white"
                      }`}
                    >
                      {pageNum}
                    </motion.button>
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* Next Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className={`p-3 rounded-lg ${
                page === totalPages
                  ? "bg-gray-800 text-gray-600 cursor-not-allowed"
                  : "bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:shadow-lg hover:shadow-purple-500/25"
              } transition-all flex items-center gap-2`}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          </div>

          {/* --- THIS IS THE PART WITH "AND MANY MORE" --- */}
          <div className="text-sm text-gray-400 font-medium text-center">
            <span>
              Showing{" "}
              <span className="text-white">{(page - 1) * PROJECTS_PER_PAGE + 1}</span> to{" "}
              <span className="text-white">
                {Math.min(page * PROJECTS_PER_PAGE, allProjects.length)}
              </span>{" "}
              of <span className="text-white">{allProjects.length}</span> projects
            </span>

            {/* Added "And Many More" Text */}
            <span className="ml-1 text-purple-400/80 italic">...and many more</span>
          </div>
        </div>
      </div>
    </section>
  );
}
