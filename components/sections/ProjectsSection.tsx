"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const projects = [
  {
    name: "Crypto Project 1",
    image: "/assets/project1.06d6129f.jpeg",
    description: "Marketing & Community Management"
  },
  {
    name: "Crypto Project 2",
    image: "/assets/project2.4d4eab30.jpeg",
    description: "Social Media Strategy"
  },
  {
    name: "Crypto Project 3",
    image: "/assets/project3.7e288870.jpeg",
    description: "Community Building"
  },
  {
    name: "Crypto Project 4",
    image: "/assets/project4.53437bc1.jpeg",
    description: "Marketing Strategy"
  },
  {
    name: "Crypto Project 5",
    image: "/assets/project5.37221f2e.jpeg",
    description: "Growth Hacking"
  },
  {
    name: "Crypto Project 6",
    image: "/assets/project6.9fde9f70.jpeg",
    description: "Content Creation"
  }
];

export function ProjectsSection() {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-purple-900/10 to-background/50" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-500/5 via-transparent to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500"
        >
          Featured Projects
        </motion.h2>

        {/* Round Images Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative"
            >
              <div className="relative h-32 w-32 mx-auto">
                {/* Gradient border */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 p-[2px]">
                  <div className="absolute inset-0 rounded-full bg-black" />
                </div>
                
                {/* Image */}
                <div className="relative h-full w-full overflow-hidden rounded-full">
                  <Image
                    src={project.image}
                    alt={project.name}
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
                  {project.name}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 