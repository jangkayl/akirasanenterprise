"use client";

import { Project } from "@/lib/utils";
import { motion } from "framer-motion";
import { CldImage } from "next-cloudinary";

export function CollaborationsSection({
  notableCollaborations,
}: {
  notableCollaborations: Project[];
}) {
  return (
    <section id="collaborations" className="py-20 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-purple-900/10 to-background/50" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-500/5 via-transparent to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.4 }}
          className="text-3xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500"
        >
          Notable Collaborations
        </motion.h2>

        {/* Project Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {notableCollaborations.map((collab: Project, index: number) => (
            <motion.div
              key={collab.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-lg border border-purple-500/20 bg-card/50 backdrop-blur-sm hover:border-purple-500/40 transition-all duration-300 hover:scale-105 active:scale-105 hover:bg-white/5 active:bg-white/5"
            >
              <div className="aspect-video relative min-h-[120px] sm:min-h-0">
                <CldImage
                  src={collab.image || ""}
                  alt={collab.title}
                  fill
                  quality={50}
                  loading="lazy"
                  format="webp"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-110 group-active:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6 text-white">
                  <h3 className="text-xl font-semibold mb-2">{collab.title}</h3>
                  <p className="text-sm text-white/80">{collab.description}</p>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
