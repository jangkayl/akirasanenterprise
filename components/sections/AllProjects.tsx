"use client";

import { Project } from "@/lib/utils";
import { motion } from "framer-motion";
import { CldImage } from "next-cloudinary";
import React, { useState } from "react";

const PROJECTS_PER_PAGE = 54;

const demoProjects = Array.from({ length: 52 }, (_, i) => ({
  title: `Crypto Project ${i + 1}`,
  image: `/assets/project${i + 1}.jpeg`,
  description: [
    "Marketing & Community Management",
    "Social Media Strategy",
    "Community Building",
    "Marketing Strategy",
    "Growth Hacking",
    "Content Creation",
  ][i % 6],
}));

export function AllProjects({ projects }: { projects: Project[] }) {
  const allProjects = [...projects, ...demoProjects];

  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(allProjects.length / PROJECTS_PER_PAGE);
  const paginatedProjects = allProjects.slice(
    (page - 1) * PROJECTS_PER_PAGE,
    page * PROJECTS_PER_PAGE
  );

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Enhanced background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-purple-900/10 to-background/50" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-500/5 via-transparent to-transparent" />

      {/* Animated gradient orbs */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" />
      <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" />
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000" />

      {/* Additional gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-blue-900/20 to-purple-900/20" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-500/30 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-blue-500/30 via-transparent to-transparent" />

      {/* Grid pattern overlay */}
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
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: index * 0.03 }}
              className="group relative transition-all duration-300 hover:scale-105 active:scale-105 hover:bg-white/5 active:bg-white/5"
              whileHover={undefined}
            >
              <div className="relative h-28 w-28 mx-auto">
                {/* Gradient border */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 p-[2px]">
                  <div className="absolute inset-0 rounded-full bg-black" />
                </div>

                {/* Image */}
                <div className="relative h-full w-full overflow-hidden rounded-full">
                  {project.image?.includes("/assets/") ? (
                    <img
                      src={project.image || ""}
                      alt={project.title}
                      className="object-cover w-full h-full transition-transform duration-200 group-hover:scale-110 group-active:scale-110"
                      loading="lazy"
                    />
                  ) : (
                    <CldImage
                      src={project.image || ""}
                      alt={project.title}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 16vw"
                      format="webp"
                      quality={40}
                      loading="lazy"
                      className="object-cover transition-transform duration-200 group-hover:scale-110 group-active:scale-110"
                    />
                  )}
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-active:opacity-100" />
              </div>

              {/* Name tooltip */}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 translate-y-full opacity-0 transition-all duration-200 group-hover:-translate-y-0 group-hover:opacity-100 group-active:-translate-y-0 group-active:opacity-100">
                <div className="rounded-lg bg-black/90 px-3 py-1 text-sm text-white backdrop-blur-sm">
                  {project.title}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="flex flex-col items-center gap-4 mt-15">
          <div className="flex items-center gap-2">
            {/* Previous Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className={`p-3 rounded-lg ${
                page === 1
                  ? "bg-gray-800 text-gray-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700"
              } transition-all shadow-lg flex items-center gap-2`}
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
              <span className="hidden sm:inline">Previous</span>
            </motion.button>

            {/* Page Numbers with Dots */}
            <div className="flex items-center mx-2">
              {Array.from({ length: totalPages }).map((_, idx) => (
                <React.Fragment key={idx}>
                  {idx > 0 && (
                    <div
                      className={`w-2 h-2 rounded-full mx-1 ${
                        Math.abs(page - (idx + 1)) <= 2
                          ? "bg-purple-500/30"
                          : "bg-gray-700/30"
                      }`}
                    />
                  )}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setPage(idx + 1)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-medium transition-all ${
                      page === idx + 1
                        ? "bg-gradient-to-br from-purple-500 to-blue-500 text-white shadow-lg shadow-purple-500/30"
                        : "bg-gray-800/50 text-gray-300 hover:bg-gray-700/50"
                    }`}
                  >
                    {idx + 1}
                  </motion.button>
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
                  ? "bg-gray-800 text-gray-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700"
              } transition-all shadow-lg flex items-center gap-2`}
            >
              <span className="hidden sm:inline">Next</span>
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

          {/* Page Indicator */}
          <div className="text-sm text-purple-300 font-medium flex items-center gap-2">
            <span className="text-white">{page}</span>
            <span className="text-gray-500">/</span>
            <span>{totalPages}</span>
            <span className="text-gray-500 ml-2">
              ({(page - 1) * PROJECTS_PER_PAGE + 1}-
              {Math.min(page * PROJECTS_PER_PAGE, projects.length)} of {projects.length})
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
