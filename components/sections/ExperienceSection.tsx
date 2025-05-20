"use client";

import { motion } from "framer-motion";
import { Briefcase, Rocket, Users, TrendingUp } from "lucide-react";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { ExperienceCard } from "@/components/ui/experience-card";
import { ProjectLogoCarousel } from "./ProjectLogoCarousel";

const experiences = [
  {
    year: "2014",
    title: "Freelance Writer",
    description: "Started journey as a freelance content creator",
    icon: "✍️"
  },
  {
    year: "2018",
    title: "Community Manager",
    description: "Managing large crypto communities",
    icon: "👥"
  },
  {
    year: "2020",
    title: "Upwork Top Rated",
    description: "Achieved Top Rated status on Upwork",
    icon: "⭐"
  },
  {
    year: "2022",
    title: "Pinksale Official Marketer",
    description: "Joined Pinksale as an official marketer",
    icon: "🚀"
  }
];

const logoCarouselData = [
  { image: "/assets/project1.jpeg", name: "Project 1" },
  { image: "/assets/project2.jpeg", name: "Project 2" },
  { image: "/assets/project3.jpeg", name: "Project 3" },
  { image: "/assets/project4.jpeg", name: "Project 4" },
  { image: "/assets/project5.jpeg", name: "Project 5" },
  { image: "/assets/project6.jpeg", name: "Project 6" },
  { image: "/assets/project7.jpeg", name: "Project 7" },
  { image: "/assets/project8.jpeg", name: "Project 8" },
  { image: "/assets/project9.jpeg", name: "Project 9" },
  { image: "/assets/project10.jpeg", name: "Project 10" },
];

export function ExperienceSection() {
  return (
    <>
      <ProjectLogoCarousel logos={logoCarouselData} />
      <SectionWrapper variant="purple" className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Professional Experience
            </h2>
            <p className="mt-4 text-lg text-gray-400">
              Years of expertise in digital marketing and community management
            </p>
          </div>

          {/* Experience Cards */}
          <div className="grid gap-8 md:grid-cols-2">
            <ExperienceCard
              title="Digital Marketing Specialist"
              company="Pinksale Official"
              period="2014 - Present"
              description="Leading digital marketing strategies for crypto projects, managing community growth, and implementing successful marketing campaigns."
              icon={<Rocket className="h-6 w-6" />}
              className="group transition-all duration-300 hover:scale-105 active:scale-105 hover:bg-white/5 active:bg-white/5"
            />
            <ExperienceCard
              title="Community Manager"
              company="Crypto Projects"
              period="2019 - Present"
              description="Built and managed thriving communities for various crypto projects, ensuring engagement and growth."
              icon={<Users className="h-6 w-6" />}
              className="group transition-all duration-300 hover:scale-105 active:scale-105 hover:bg-white/5 active:bg-white/5"
            />
            <ExperienceCard
              title="Marketing Consultant"
              company="Tech Startups"
              period="2014 - 2021"
              description="Provided strategic marketing consulting to tech startups, helping them establish their digital presence."
              icon={<TrendingUp className="h-6 w-6" />}
              className="group transition-all duration-300 hover:scale-105 active:scale-105 hover:bg-white/5 active:bg-white/5"
            />
            <ExperienceCard
              title="Freelance Marketer"
              company="Various Clients"
              period="2014 - 2020"
              description="Worked with diverse clients to create and implement effective digital marketing strategies."
              icon={<Briefcase className="h-6 w-6" />}
              className="group transition-all duration-300 hover:scale-105 active:scale-105 hover:bg-white/5 active:bg-white/5"
            />
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}

