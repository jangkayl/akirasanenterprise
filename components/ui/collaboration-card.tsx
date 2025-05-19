import { motion } from "framer-motion";
import Image from "next/image";

interface CollaborationCardProps {
  image: string;
  name: string;
  className?: string;
}

export function CollaborationCard({ image, name, className = "" }: CollaborationCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className={`group relative ${className}`}
    >
      {/* Image container with gradient border */}
      <div className="relative h-32 w-32 overflow-hidden rounded-full">
        {/* Gradient border */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 p-[2px]">
          <div className="absolute inset-0 rounded-full bg-black" />
        </div>
        
        {/* Image */}
        <div className="relative h-full w-full overflow-hidden rounded-full">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
          />
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>

      {/* Name tooltip */}
      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 translate-y-full opacity-0 transition-all duration-300 group-hover:-translate-y-0 group-hover:opacity-100">
        <div className="rounded-lg bg-black/90 px-3 py-1 text-sm text-white backdrop-blur-sm">
          {name}
        </div>
      </div>
    </motion.div>
  );
} 