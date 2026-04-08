"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { AnimatedContainer } from "@/components/ui/AnimatedContainer";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { ProjectModal } from "@/components/ui/ProjectModal";
import { Button } from "@/components/ui/Button";
import { featuredProjects, type Project } from "@/features/projects/projectsData";

export function ProjectsSection() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  return (
    <>
      <SectionWrapper
        id="projects"
        className="py-24 lg:py-32 px-6 container mx-auto max-w-6xl"
      >
        {/* Header */}
        <AnimatedContainer animation="fadeUp" className="text-center mb-14">
          <span className="text-sm font-mono text-[hsl(var(--primary))] tracking-widest uppercase">
            02. Work
          </span>
          <h2 className="font-display font-bold text-4xl sm:text-5xl text-[hsl(var(--foreground))] mt-3 leading-tight">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-[hsl(var(--muted-foreground))] mt-4 max-w-xl mx-auto leading-relaxed">
            A selection of products I&apos;ve built — spanning full-stack apps,
            design systems, and creative experiments.
          </p>
        </AnimatedContainer>

        {/* Cards grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProjects.map((project, i) => (
            <AnimatedContainer
              key={project.id}
              animation="fadeUp"
              delay={i * 0.1}
            >
              <ProjectCard
                project={project}
                onOpenModal={setActiveProject}
                className="h-full"
              />
            </AnimatedContainer>
          ))}
        </div>

        {/* View all link */}
        <AnimatedContainer animation="fadeUp" delay={0.3} className="text-center mt-12">
          <Link href="/projects">
            <Button
              variant="outline"
              size="lg"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              View All Projects
            </Button>
          </Link>
        </AnimatedContainer>
      </SectionWrapper>

      {/* Modal */}
      <ProjectModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />
    </>
  );
}
