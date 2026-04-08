import { createMetadata } from "@/lib/metadata";
import { HeroSection } from "@/features/hero/HeroSection";
import { AboutSection } from "@/features/about/AboutSection";
import { ProjectsSection } from "@/features/projects/ProjectsSection";
import { ContactForm } from "@/features/contact/ContactForm";

export const metadata = createMetadata();

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <ContactForm />
    </>
  );
}
