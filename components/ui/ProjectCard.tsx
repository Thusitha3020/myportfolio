"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ExternalLink, ArrowUpRight } from "lucide-react";
import { IconGithub } from "@/components/ui/SocialIcons";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { applyCardTilt, resetCardTilt } from "@/lib/animations";
import type { Project } from "@/features/projects/projectsData";

interface ProjectCardProps {
  project: Project;
  onOpenModal?: (project: Project) => void;
  className?: string;
  featured?: boolean;
}

export function ProjectCard({
  project,
  onOpenModal,
  className,
  featured = false,
}: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (cardRef.current) applyCardTilt(cardRef.current, e);
  };

  const handleMouseLeave = () => {
    if (cardRef.current) resetCardTilt(cardRef.current);
    setHovered(false);
  };

  return (
    <article
      ref={cardRef}
      className={cn(
        "group relative flex flex-col rounded-2xl overflow-hidden cursor-pointer",
        "glass border border-[hsl(var(--border)/0.5)]",
        "transition-all duration-300 ease-out",
        "hover:border-[hsl(var(--primary)/0.4)] hover:shadow-2xl hover:shadow-[hsl(var(--primary)/0.1)]",
        featured && "lg:col-span-2",
        className
      )}
      style={{ transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={() => onOpenModal?.(project)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onOpenModal?.(project)}
      aria-label={`View ${project.title} project details`}
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-video">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className={cn(
            "object-cover transition-transform duration-700 ease-out",
            hovered ? "scale-105" : "scale-100"
          )}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Gradient overlay */}
        <div
          className={cn(
            "absolute inset-0 transition-opacity duration-300",
            "bg-gradient-to-t from-[hsl(var(--card))] via-[hsl(var(--card)/0.2)] to-transparent",
            hovered ? "opacity-80" : "opacity-60"
          )}
        />

        {/* Status & category badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          <Badge variant="primary">{project.category}</Badge>
          {project.status === "in-progress" && (
            <Badge variant="accent">In Progress</Badge>
          )}
        </div>

        {/* Year */}
        <span className="absolute top-3 right-3 text-xs text-[hsl(var(--muted-foreground))] font-mono">
          {project.year}
        </span>

        {/* Hover arrow */}
        <div
          className={cn(
            "absolute bottom-3 right-3 transition-all duration-300",
            "w-8 h-8 rounded-full flex items-center justify-center",
            "bg-[hsl(var(--primary))] text-white shadow-lg",
            hovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
          )}
        >
          <ArrowUpRight className="w-4 h-4" />
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        <div>
          <h3 className="font-display font-semibold text-lg text-[hsl(var(--card-foreground))] group-hover:text-[hsl(var(--primary))] transition-colors duration-200">
            {project.title}
          </h3>
          <p className="text-sm text-[hsl(var(--muted-foreground))] mt-0.5 font-medium">
            {project.tagline}
          </p>
        </div>

        <p className="text-sm text-[hsl(var(--muted-foreground))] leading-relaxed line-clamp-2">
          {project.description}
        </p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1.5 mt-auto">
          {project.techStack.slice(0, 4).map((tech) => (
            <Badge key={tech} variant="muted" size="sm">
              {tech}
            </Badge>
          ))}
          {project.techStack.length > 4 && (
            <Badge variant="outline" size="sm">
              +{project.techStack.length - 4}
            </Badge>
          )}
        </div>

        {/* Links */}
        <div className="flex gap-3 pt-2 border-t border-[hsl(var(--border)/0.5)]">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1.5 text-xs text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors"
              aria-label={`${project.title} GitHub repository`}
            >
              <IconGithub className="w-3.5 h-3.5" />
              Source
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1.5 text-xs text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors ml-auto"
              aria-label={`${project.title} live demo`}
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Live Demo
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
