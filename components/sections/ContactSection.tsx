"use client";

import { motion } from "framer-motion";
import { ArrowRight, Mail, Send } from "lucide-react";
import Image from "next/image";

export function ContactSection() {
  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-purple-900/10 to-background/50" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-500/5 via-transparent to-transparent" />

      {/* Animated gradient orbs */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" />
      <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" />
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-6 md:p-12 border border-purple-500/20 mb-8 md:mb-12">
            <h2 className="text-2xl md:text-4xl font-bold mb-4 md:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">
              Let's Connect
            </h2>
            <p className="text-sm md:text-lg text-gray-300 mb-6 md:mb-8 max-w-2xl mx-auto">
              Join our Telegram channel for the latest updates, announcements, and
              exclusive content from Akirasan Enterprise
            </p>

            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6">
              {/* Contact Me Button */}
              <motion.a
                href="https://t.me/akirasanenterprise"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-between gap-2 md:gap-3 px-6 md:px-8 py-3 md:py-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm md:text-base font-medium hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-blue-500/25 group w-full md:w-auto"
              >
                <Mail className="w-4 h-4 md:w-5 md:h-5" />
                Contact Me
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </motion.a>

              {/* Telegram Channel Button */}
              <motion.a
                href="https://t.me/akirasancalls"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-between gap-2 md:gap-3 px-6 md:px-8 py-3 md:py-4 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white text-sm md:text-base font-medium hover:from-purple-600 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-purple-500/25 group w-full md:w-auto"
              >
                <Send className="w-4 h-4 md:w-5 md:h-5" />
                Join Telegram Channel
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </motion.a>
            </div>
          </div>

          {/* Footer Section */}
          <div className="mt-12 md:mt-16 pt-6 md:pt-8 border-t border-purple-500/20">
            <div className="flex flex-col items-center gap-6 md:gap-8">
              {/* Brand Section */}
              <div className="flex items-center gap-4 md:gap-6">
                <div className="relative w-12 h-12 md:w-16 md:h-16">
                  <Image
                    src="/assets/logo.png"
                    alt="Akirasan Enterprise"
                    fill
                    quality={75}
                    loading="lazy"
                    sizes="(max-width: 768px) 48px, 64px"
                    className="object-contain"
                  />
                </div>
                <h1 className="text-xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400">
                  Akirasan Enterprise
                </h1>
              </div>

              {/* Partnership Logos */}
              <div className="flex items-center gap-6 md:gap-8">
                <div className="relative w-16 h-16 md:w-20 md:h-20">
                  <Image
                    src="/assets/partnership1.png"
                    alt="Partnership 1"
                    fill
                    quality={75}
                    loading="lazy"
                    sizes="(max-width: 768px) 64px, 80px"
                    className="object-contain"
                  />
                </div>
                <div className="relative w-16 h-16 md:w-20 md:h-20">
                  <Image
                    src="/assets/partnership2.png"
                    alt="Partnership 2"
                    fill
                    quality={75}
                    loading="lazy"
                    sizes="(max-width: 768px) 64px, 80px"
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Copyright */}
              <p className="text-xs md:text-sm text-gray-400">
                © {new Date().getFullYear()} Akirasan Enterprise. All rights reserved.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
