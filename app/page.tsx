export const dynamic = "force-dynamic";

import { AllProjects } from "@/components/sections/AllProjects";
import { CollaborationsSection } from "@/components/sections/CollaborationsSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProjectLogoCarousel } from "@/components/sections/ProjectLogoCarousel";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { getData } from "./actions/server";

export default async function Home() {
  const projectsRaw = await getData();
  const projects = projectsRaw.map((p) => ({
    ...p,
    isPinned: p.isPinned ?? false,
  }));

  const carousel = projects.slice(0, 10);
  const notableCollaborations = projects.filter((p) => p.isPinned).slice(0, 10);

  return (
    <main className="min-h-screen bg-black">
      <HeroSection />
      <ProjectLogoCarousel projects={carousel} />
      <ExperienceSection />
      <SkillsSection />
      <CollaborationsSection notableCollaborations={notableCollaborations} />
      <AllProjects projects={projects} />
      <ContactSection />
    </main>
  );
}
