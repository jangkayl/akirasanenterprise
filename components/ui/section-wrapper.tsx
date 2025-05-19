import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SectionWrapperProps {
  children: ReactNode;
  className?: string;
  variant?: "purple" | "blue" | "gradient" | "dark";
}

export function SectionWrapper({
  children,
  className = "",
  variant = "dark",
}: SectionWrapperProps) {
  const variants = {
    purple: "bg-gradient-to-b from-purple-900/20 via-black to-black",
    blue: "bg-gradient-to-b from-blue-900/20 via-black to-black",
    gradient: "bg-gradient-to-b from-purple-900/20 via-blue-900/20 to-black",
    dark: "bg-black",
  };

  return (
    <section className={`relative overflow-hidden ${className}`}>
      {/* Background */}
      <div className={`absolute inset-0 ${variants[variant]}`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f46e5/5%,#000000_50%,#4f46e5/5%)] bg-[length:200%_100%] opacity-10" />
      </div>

      {/* Animated orbs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -left-20 top-20 h-72 w-72 rounded-full bg-purple-500/20 blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.5, 0.3, 0.5],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -right-20 top-40 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl"
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </section>
  );
}