"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface CustomButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
  icon?: ReactNode;
}

export function CustomButton({
  children,
  variant = "primary",
  size = "md",
  className = "",
  onClick,
  icon,
}: CustomButtonProps) {
  const baseStyles = "relative font-medium transition-all duration-300 rounded-lg flex items-center justify-center gap-2 overflow-hidden group";
  
  const variants = {
    primary: "bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white shadow-lg shadow-violet-500/25",
    secondary: "bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm border border-white/20",
    outline: "bg-transparent hover:bg-white/5 text-white border border-white/20 hover:border-white/30",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-violet-500/0 via-violet-500/20 to-violet-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
      
      {/* Content */}
      <span className="relative z-10 flex items-center gap-2">
        {icon}
        {children}
      </span>
    </motion.button>
  );
} 