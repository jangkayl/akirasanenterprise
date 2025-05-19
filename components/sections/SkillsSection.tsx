"use client";

import { MessageSquare, Users, BarChart, Target, TrendingUp, Rocket } from "lucide-react";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { SkillCard } from "@/components/ui/skill-card";

export function SkillsSection() {
  return (
    <SectionWrapper variant="blue" className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Professional Skills
          </h2>
          <p className="mt-4 text-lg text-gray-400">
            Expertise in digital marketing and community management
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <SkillCard
            title="Community Management"
            level={95}
            icon={<Users className="h-6 w-6" />}
            className="group transition-all duration-300 hover:scale-105 active:scale-105 hover:bg-white/5 active:bg-white/5"
          />
          <SkillCard
            title="Digital Marketing"
            level={90}
            icon={<TrendingUp className="h-6 w-6" />}
            className="group transition-all duration-300 hover:scale-105 active:scale-105 hover:bg-white/5 active:bg-white/5"
          />
          <SkillCard
            title="Social Media Strategy"
            level={85}
            icon={<MessageSquare className="h-6 w-6" />}
            className="group transition-all duration-300 hover:scale-105 active:scale-105 hover:bg-white/5 active:bg-white/5"
          />
          <SkillCard
            title="Analytics & Reporting"
            level={80}
            icon={<BarChart className="h-6 w-6" />}
            className="group transition-all duration-300 hover:scale-105 active:scale-105 hover:bg-white/5 active:bg-white/5"
          />
          <SkillCard
            title="Project Management"
            level={85}
            icon={<Target className="h-6 w-6" />}
            className="group transition-all duration-300 hover:scale-105 active:scale-105 hover:bg-white/5 active:bg-white/5"
          />
          <SkillCard
            title="Growth Strategy"
            level={90}
            icon={<Rocket className="h-6 w-6" />}
            className="group transition-all duration-300 hover:scale-105 active:scale-105 hover:bg-white/5 active:bg-white/5"
          />
        </div>
      </div>
    </SectionWrapper>
  );
}

