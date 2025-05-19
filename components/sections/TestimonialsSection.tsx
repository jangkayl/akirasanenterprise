"use client";

import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Project Lead",
    role: "Crypto Project",
    content: "Outstanding work in community management and marketing strategy.",
    avatar: "👨‍💼"
  },
  {
    name: "CEO",
    role: "Tech Startup",
    content: "Delivered exceptional results in growing our social media presence.",
    avatar: "👩‍💼"
  }
];

export function TestimonialsSection() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-center mb-12"
        >
          Client Testimonials
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="p-6 rounded-lg border bg-card"
            >
              <div className="text-4xl mb-4">{testimonial.avatar}</div>
              <p className="text-lg mb-4">"{testimonial.content}"</p>
              <div>
                <p className="font-semibold">{testimonial.name}</p>
                <p className="text-muted-foreground">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

