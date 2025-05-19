import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ExperienceCardProps {
  title: string;
  company: string;
  period: string;
  description: string;
  icon?: ReactNode;
  className?: string;
}

export function ExperienceCard({
  title,
  company,
  period,
  description,
  icon,
  className = "",
}: ExperienceCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -5 }}
      className={`group relative overflow-hidden rounded-xl border border-white/10 bg-black/50 p-6 backdrop-blur-sm ${className}`}
    >
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-blue-500/10 to-purple-500/10 opacity-0 transition-opacity duration-300 group-active:opacity-100 group-hover:opacity-100" />

      {/* Content */}
      <div className="relative z-10">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold text-white">{title}</h3>
            <p className="text-sm text-purple-400">{company}</p>
          </div>
          {icon && (
            <div className="rounded-lg bg-purple-500/20 p-3 text-purple-400">
              {icon}
            </div>
          )}
        </div>
        <p className="mb-4 text-sm text-gray-400">{period}</p>
        <p className="text-gray-300">{description}</p>
      </div>

      {/* Border gradient */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </motion.div>
  );
} 