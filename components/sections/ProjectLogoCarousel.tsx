import React from "react";
import Image from "next/image";

interface ProjectLogoCarouselProps {
  logos: { image: string; name: string }[];
}

export const ProjectLogoCarousel: React.FC<ProjectLogoCarouselProps> = ({ logos }) => {
  const displayLogos = [...logos, ...logos, ...logos];

  return (
    <div className="w-full overflow-hidden py-4 z-10 bg-gradient-to-r from-[#1e3a8a] via-[#6366f1] to-[#a21caf]">
      <div className="flex gap-6 md:gap-10 carousel-track">
        {displayLogos.map((logo, idx) => (
          <div
            key={idx}
            className="flex-shrink-0 w-16 h-16 md:w-24 md:h-24 rounded-full bg-black flex items-center justify-center transition-transform duration-200 hover:scale-110 shadow-md"
          >
            <Image
              src={logo.image}
              alt={logo.name}
              width={80}
              height={80}
              className="rounded-full object-cover"
            />
          </div>
        ))}
      </div>
      <style jsx global>{`
        .carousel-track {
          display: flex;
          animation: scroll 40s linear infinite;
          width: fit-content;
        }

        .carousel-track:hover {
          animation-play-state: paused;
        }

        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-33.333%));
          }
        }
      `}</style>
    </div>
  );
}; 