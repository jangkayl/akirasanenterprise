import React, { useRef, useEffect } from "react";
import Image from "next/image";

interface ProjectLogoCarouselProps {
  logos: { image: string; name: string }[];
}

export const ProjectLogoCarousel: React.FC<ProjectLogoCarouselProps> = ({ logos }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll effect
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;
    let animationFrame: number;
    let isHovered = false;

    const scroll = () => {
      if (!isHovered) {
        scrollContainer.scrollLeft += 1;
        // Loop
        if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
          scrollContainer.scrollLeft = 0;
        }
      }
      animationFrame = requestAnimationFrame(scroll);
    };
    animationFrame = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  // Pause on hover
  const handleMouseEnter = () => {
    if (scrollRef.current) (scrollRef.current as any).isHovered = true;
  };
  const handleMouseLeave = () => {
    if (scrollRef.current) (scrollRef.current as any).isHovered = false;
  };

  // Touch drag/swipe
  let startX = 0;
  let scrollLeft = 0;
  const handleTouchStart = (e: React.TouchEvent) => {
    startX = e.touches[0].pageX;
    if (scrollRef.current) scrollLeft = scrollRef.current.scrollLeft;
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    if (scrollRef.current) {
      const x = e.touches[0].pageX;
      scrollRef.current.scrollLeft = scrollLeft - (x - startX);
    }
  };

  // Duplicate logos for seamless looping
  const displayLogos = [...logos, ...logos];

  return (
    <div
      className="w-full flex justify-center items-center py-4 z-10 bg-gradient-to-r from-[#1e3a8a] via-[#6366f1] to-[#a21caf]"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={scrollRef}
        className="flex gap-6 md:gap-10 overflow-x-auto px-0 md:px-4 scrollbar-hide"
        style={{ scrollBehavior: "smooth", WebkitOverflowScrolling: "touch", maxWidth: '100vw' }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
      >
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
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}; 