"use client";

import { useState } from "react";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { AnimatedContainer } from "@/components/ui/AnimatedContainer";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { ProjectModal } from "@/components/ui/ProjectModal";
import { Badge } from "@/components/ui/Badge";
import {
  projects,
  allCategories,
  type Project,
  type ProjectCategory,
} from "@/features/projects/projectsData";
import { cn } from "@/lib/utils";

export default function ProjectsPage() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [activeCategory, setActiveCategory] = useState<
    ProjectCategory | "All"
  >("All");

  const filtered =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  const categories: Array<ProjectCategory | "All"> = ["All", ...allCategories];

  return (
    <>
      <div className="min-h-screen pt-28 pb-24 px-6 mesh-bg">
        <div className="container mx-auto max-w-6xl">
          {/* Page header */}
          <SectionWrapper className="text-center mb-14">
            <AnimatedContainer animation="fadeUp">
              <span className="text-sm font-mono text-[hsl(var(--primary))] tracking-widest uppercase">
                All Work
              </span>
              <h1 className="font-display font-bold text-5xl sm:text-6xl text-[hsl(var(--foreground))] mt-3 leading-tight">
                My <span className="gradient-text">Projects</span>
              </h1>
              <p className="text-[hsl(var(--muted-foreground))] mt-4 max-w-xl mx-auto leading-relaxed">
                A complete collection of projects I&apos;ve built — from side
                experiments to production systems.
              </p>
            </AnimatedContainer>

            {/* Category filters */}
            <AnimatedContainer
              animation="fadeUp"
              delay={0.1}
              className="flex flex-wrap justify-center gap-2 mt-8"
            >
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                    "border focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))] focus-visible:outline-none",
                    activeCategory === cat
                      ? "bg-[hsl(var(--primary))] text-white border-[hsl(var(--primary))] shadow-lg shadow-[hsl(var(--primary)/0.3)]"
                      : "glass border-[hsl(var(--border)/0.5)] text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] hover:border-[hsl(var(--primary)/0.4)]"
                  )}
                  aria-pressed={activeCategory === cat}
                >
                  {cat}
                </button>
              ))}
            </AnimatedContainer>
          </SectionWrapper>

          {/* Stats row */}
          <AnimatedContainer
            animation="fadeUp"
            delay={0.15}
            className="flex items-center gap-4 mb-8"
          >
            <span className="text-sm text-[hsl(var(--muted-foreground))]">
              Showing{" "}
              <span className="text-[hsl(var(--primary))] font-semibold">
                {filtered.length}
              </span>{" "}
              {filtered.length === 1 ? "project" : "projects"}
            </span>
            <div className="flex-1 h-px bg-[hsl(var(--border)/0.4)]" />
            <Badge variant="primary" size="sm">
              {activeCategory}
            </Badge>
          </AnimatedContainer>

          {/* Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((project, i) => (
              <AnimatedContainer
                key={project.id}
                animation="fadeUp"
                delay={i * 0.07}
              >
                <ProjectCard
                  project={project}
                  onOpenModal={setActiveProject}
                  className="h-full"
                />
              </AnimatedContainer>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-24 text-[hsl(var(--muted-foreground))]">
              <p className="text-lg">No projects in this category yet.</p>
            </div>
          )}
        </div>
      </div>

      <ProjectModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />
    </>
  );
}
