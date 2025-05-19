"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface CustomCardProps {
  children: ReactNode;
  className?: string;
  hoverEffect?: boolean;
  gradient?: boolean;
}

export function CustomCard({
  children,
  className = "",
  hoverEffect = true,
  gradient = false,
}: CustomCardProps) {
  const baseStyles = "relative rounded-xl overflow-hidden backdrop-blur-sm transition-all duration-300";
  const borderStyles = "border border-white/10";
  const gradientStyles = gradient ? "bg-gradient-to-br from-white/5 to-white/10" : "bg-white/5";
  const hoverStyles = hoverEffect ? "hover:border-white/20 hover:bg-white/10" : "";

  return (
    <motion.div
      whileHover={hoverEffect ? { y: -5 } : undefined}
      className={`${baseStyles} ${borderStyles} ${gradientStyles} ${hoverStyles} ${className}`}
    >
      {/* Glow effect */}
      {gradient && (
        <div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 via-indigo-500/10 to-violet-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      )}
      
      {/* Content */}
      <div className="relative z-10 p-6">
        {children}
      </div>
    </motion.div>
  );
} 