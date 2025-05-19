import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SkillCardProps {
  title: string;
  level: number;
  icon?: ReactNode;
  className?: string;
}

export function SkillCard({ title, level, icon, className = "" }: SkillCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -5 }}
      className={`group relative overflow-hidden rounded-xl border border-white/10 bg-black/50 p-6 backdrop-blur-sm ${className}`}
    >
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-blue-500/10 to-purple-500/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {/* Content */}
      <div className="relative z-10">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xl font-semibold text-white">{title}</h3>
          {icon && (
            <div className="rounded-lg bg-purple-500/20 p-3 text-purple-400">
              {icon}
            </div>
          )}
        </div>

        {/* Progress bar */}
        <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${level}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-purple-500 to-blue-500"
          />
        </div>
        <p className="mt-2 text-right text-sm text-gray-400">{level}%</p>
      </div>

      {/* Border gradient */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </motion.div>
  );
} 