"use client";

import { CustomButton } from "@/components/ui/custom-button";
import { CustomCard } from "@/components/ui/custom-card";
import { motion } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  Coins,
  Rocket,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react";

export function HeroSection() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center flex-col justify-center overflow-hidden bg-black">
      {/* Animated background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-violet-500/20 via-black to-black" />

      {/* Animated grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]" />

      {/* Glowing orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="container mx-auto px-4 py-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 mb-6 backdrop-blur-sm hover:bg-violet-500/20 transition-all duration-300"
          >
            <Sparkles className="w-4 h-4 text-violet-400" />
            <span className="text-sm text-violet-400 font-medium">
              Top Rated Upwork Freelancer
            </span>
          </motion.div>

          {/* Main Title */}
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-fuchsia-500 to-indigo-500">
            Digital Marketing & Community Management Expert
          </h1>
          <p className="text-xl md:text-2xl text-white/80 mb-8">
            Pinksale Official Marketer | Crypto Community Specialist
          </p>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            <CustomCard
              gradient
              className="group transition-all duration-300 hover:scale-105 active:scale-105 hover:bg-violet-500/20 active:bg-violet-500/20"
            >
              <div className="flex items-center gap-2 md:gap-3">
                <div className="p-1 md:p-2 rounded-lg bg-violet-500/10">
                  <Users className="w-3 h-3 md:w-5 md:h-5 text-violet-400" />
                </div>
                <div>
                  <p className="text-base md:text-2xl font-bold text-white">30+</p>
                  <p className="text-xs md:text-sm text-white/60">Developers</p>
                </div>
              </div>
            </CustomCard>
            <CustomCard
              gradient
              className="group transition-all duration-300 hover:scale-105 active:scale-105 hover:bg-indigo-500/20 active:bg-indigo-500/20"
            >
              <div className="flex items-center gap-2 md:gap-3">
                <div className="p-1 md:p-2 rounded-lg bg-indigo-500/10">
                  <TrendingUp className="w-3 h-3 md:w-5 md:h-5 text-indigo-400" />
                </div>
                <div>
                  <p className="text-base md:text-2xl font-bold text-white">50+</p>
                  <p className="text-xs md:text-sm text-white/60">Designers</p>
                </div>
              </div>
            </CustomCard>
            <CustomCard
              gradient
              className="group transition-all duration-300 hover:scale-105 active:scale-105 hover:bg-fuchsia-500/20 active:bg-fuchsia-500/20"
            >
              <div className="flex items-center gap-2 md:gap-3">
                <div className="p-1 md:p-2 rounded-lg bg-fuchsia-500/10">
                  <Rocket className="w-3 h-3 md:w-5 md:h-5 text-fuchsia-400" />
                </div>
                <div>
                  <p className="text-base md:text-2xl font-bold text-white">500+</p>
                  <p className="text-xs md:text-sm text-white/60">Influencers</p>
                </div>
              </div>
            </CustomCard>
            <CustomCard
              gradient
              className="group transition-all duration-300 hover:scale-105 active:scale-105 hover:bg-blue-500/20 active:bg-blue-500/20"
            >
              <div className="flex items-center gap-2 md:gap-3">
                <div className="p-1 md:p-2 rounded-lg bg-blue-500/10">
                  <Coins className="w-3 h-3 md:w-5 md:h-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-base md:text-2xl font-bold text-white">500+</p>
                  <p className="text-xs md:text-sm text-white/60">Crypto Projects</p>
                </div>
              </div>
            </CustomCard>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center w-full max-w-xs mx-auto mb-8">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 1.05 }}
              className="w-[200px] md:w-auto"
            >
              <CustomButton
                size="sm"
                icon={<ArrowRight className="w-5 h-5" />}
                className="w-[200px] md:w-auto max-w-xs px-3 py-2 text-sm md:text-base md:px-4 md:py-2 transition-all duration-300 hover:bg-violet-500/20 active:bg-violet-500/20"
                onClick={() => scrollToSection("collaborations")}
              >
                View Projects
              </CustomButton>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 1.05 }}
              className="w-[200px] md:w-auto"
            >
              <CustomButton
                variant="outline"
                size="sm"
                className="w-[200px] md:w-auto px-3 py-2 text-sm md:text-base md:px-4 md:py-2 transition-all duration-300 hover:bg-white/5 active:bg-white/5"
                onClick={() => scrollToSection("contact")}
              >
                Contact Me
              </CustomButton>
            </motion.div>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="mt-12 cursor-pointer"
            onClick={() => scrollToSection("collaborations")}
          >
            <ArrowDown className="w-6 h-6 text-white/60 mx-auto hover:text-white transition-colors" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
