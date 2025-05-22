"use client";

import { ExperienceCard } from "@/components/ui/experience-card";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { motion } from "framer-motion";
import { Briefcase, Rocket, TrendingUp, Users } from "lucide-react";

export function ExperienceSection() {
  return (
    <SectionWrapper variant="purple" className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Professional Experience
          </h2>
          <p className="mt-4 text-lg text-gray-400">
            Years of expertise in digital marketing and community management
          </p>
        </motion.div>

        {/* Experience Cards */}
        <div className="grid gap-8 md:grid-cols-2">
          {[
            {
              title: "Digital Marketing Specialist",
              company: "Pinksale Official",
              period: "2014 - Present",
              description:
                "Leading digital marketing strategies for crypto projects, managing community growth, and implementing successful marketing campaigns.",
              icon: <Rocket className="h-6 w-6" />,
            },
            {
              title: "Community Manager",
              company: "Crypto Projects",
              period: "2019 - Present",
              description:
                "Built and managed thriving communities for various crypto projects, ensuring engagement and growth.",
              icon: <Users className="h-6 w-6" />,
            },
            {
              title: "Marketing Consultant",
              company: "Tech Startups",
              period: "2014 - 2021",
              description:
                "Provided strategic marketing consulting to tech startups, helping them establish their digital presence.",
              icon: <TrendingUp className="h-6 w-6" />,
            },
            {
              title: "Freelance Marketer",
              company: "Various Clients",
              period: "2014 - 2020",
              description:
                "Worked with diverse clients to create and implement effective digital marketing strategies.",
              icon: <Briefcase className="h-6 w-6" />,
            },
          ].map((exp, index) => (
            <motion.div
              key={exp.title}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ExperienceCard
                {...exp}
                className="group transition-transform duration-300 hover:scale-[1.02]"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
