"use client";

import { Project } from "@/lib/utils";
import { CldImage } from "next-cloudinary";

export const ProjectLogoCarousel = ({ projects }: { projects: Project[] }) => {
  const displayProjects = [...projects, ...projects];

  return (
    <div className="w-full overflow-hidden py-4 z-10 relative">
      {/* Simplified background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-purple-900/5 to-background/50" />

      {/* Single static gradient orb instead of multiple animated ones */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-72 bg-purple-500/10 rounded-full mix-blend-multiply filter blur-xl" />

      {/* Simplified gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/10 via-blue-900/10 to-purple-900/10" />

      {/* Static grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f1e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f1e_1px,transparent_1px)] bg-[size:14px_24px]" />

      <div className="flex gap-6 md:gap-10 carousel-track relative">
        {displayProjects.map((logo, idx) => (
          <div
            key={idx}
            className="flex-shrink-0 w-16 h-16 md:w-24 md:h-24 rounded-full bg-black flex items-center justify-center transition-transform duration-200 hover:scale-[1.02] shadow-md"
          >
            <CldImage
              src={logo.image || ""}
              alt={logo.title}
              width={80}
              height={80}
              style={{ width: "100px", height: "auto" }}
              sizes="(max-width: 768px) 64px, 96px"
              className="rounded-full  object-contain"
              format="webp"
              quality={40}
              loading="lazy"
              fetchPriority={idx < 2 ? "high" : "low"}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
