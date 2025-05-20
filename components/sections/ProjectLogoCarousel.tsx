import React from "react";
import Image from "next/image";

interface ProjectLogoCarouselProps {
  logos: { image: string; name: string }[];
}

export const ProjectLogoCarousel: React.FC<ProjectLogoCarouselProps> = ({ logos }) => {
  const displayLogos = [...logos, ...logos, ...logos];

  return (
    <div className="w-full overflow-hidden py-4 z-10 relative">
      {/* Background effects */}
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

      <div className="flex gap-6 md:gap-10 carousel-track relative">
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
              sizes="(max-width: 768px) 64px, 96px"
              className="rounded-full object-cover"
              style={{ width: 'auto', height: 'auto' }}
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