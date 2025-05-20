import React from "react";
import Image from "next/image";

interface ProjectLogoCarouselProps {
  logos: { image: string; name: string }[];
}

export const ProjectLogoCarousel: React.FC<ProjectLogoCarouselProps> = ({ logos }) => {
  // Only duplicate once instead of three times to reduce DOM elements
  const displayLogos = [...logos, ...logos];

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
        {displayLogos.map((logo, idx) => (
          <div
            key={idx}
            className="flex-shrink-0 w-16 h-16 md:w-24 md:h-24 rounded-full bg-black flex items-center justify-center transition-transform duration-200 hover:scale-[1.02] shadow-md"
          >
            <Image
              src={logo.image}
              alt={logo.name}
              width={80}
              height={80}
              sizes="(max-width: 768px) 64px, 96px"
              className="rounded-full object-cover"
              loading="lazy"
              quality={75}
              fetchPriority={idx < 2 ? "high" : "low"}
            />
          </div>
        ))}
      </div>
      <style jsx global>{`
        .carousel-track {
          display: flex;
          animation: scroll 30s linear infinite;
          width: fit-content;
          will-change: transform;
        }

        .carousel-track:hover {
          animation-play-state: paused;
        }

        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-50%));
          }
        }
      `}</style>
    </div>
  );
}; 