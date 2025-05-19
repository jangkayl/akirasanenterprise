import { HeroSection } from "@/components/sections/HeroSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { CollaborationsSection } from "@/components/sections/CollaborationsSection";
import { AllProjects } from "@/components/sections/AllProjects";
import { ContactSection } from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <HeroSection />
      <ExperienceSection />
      <SkillsSection />
      <CollaborationsSection />
      <AllProjects />
      <ContactSection />
    </main>
  );
}

