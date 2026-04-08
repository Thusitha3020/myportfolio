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
        "group relative flex flex-col rounded-none overflow-hidden cursor-pointer",
        "glass border border-[hsl(var(--border)/0.5)]",
        "transition-all duration-300 ease-out",
        "hover:border-[hsl(var(--primary)/0.6)] hover:shadow-2xl hover:shadow-[hsl(var(--primary)/0.15)]",
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
      {/* Image Container */}
      <div className="relative overflow-hidden aspect-video border-b border-white/5">
        {/* Scanning effect */}
        <div 
          className={cn(
            "absolute inset-x-0 h-px bg-primary shadow-[0_0_15px_hsl(var(--primary))] z-20 pointer-events-none transition-opacity duration-300",
            hovered ? "opacity-100 animate-[scan_2s_linear_infinite]" : "opacity-0"
          )} 
        />
        
        {/* Digital Grid overlay */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none z-10" />

        <Image
          src={project.image}
          alt={project.title}
          fill
          className={cn(
            "object-cover transition-transform duration-700 ease-out",
            hovered ? "scale-105 blur-[1px]" : "scale-100"
          )}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Gradient overlay */}
        <div
          className={cn(
            "absolute inset-0 transition-opacity duration-300 z-10",
            "bg-gradient-to-t from-[hsl(var(--card))] via-[hsl(var(--card)/0.4)] to-transparent",
            hovered ? "opacity-90" : "opacity-70"
          )}
        />

        {/* HUD readouts on hover */}
        <div className={cn(
          "absolute inset-0 flex flex-col justify-between p-4 pointer-events-none transition-opacity duration-300 z-20",
          hovered ? "opacity-100" : "opacity-0"
        )}>
          <div className="flex justify-between items-start">
            <div className="text-[10px] font-mono text-primary bg-black/60 px-1 backdrop-blur-sm border border-primary/30">
              TRK_ID: {project.id.padStart(4, '0')}
            </div>
            <div className="text-[10px] font-mono text-accent bg-black/60 px-1 backdrop-blur-sm border border-accent/30">
              LINK: ESTABLISHED
            </div>
          </div>
          <div className="flex justify-between items-end">
            <div className="text-[10px] font-mono text-primary/60">
              SCAN_RES: 1024px
            </div>
          </div>
        </div>

        {/* Status & category badges */}
        <div className="absolute top-3 left-3 flex gap-2 z-20">
          <Badge variant="primary" className="rounded-none font-mono text-[9px] uppercase tracking-wider h-5 flex items-center">
            {project.category}
          </Badge>
          {project.status === "in-progress" && (
            <Badge variant="accent" className="rounded-none font-mono text-[9px] uppercase tracking-wider h-5 flex items-center">
              Loading...
            </Badge>
          )}
        </div>

        {/* Year */}
        <span className="absolute top-3 right-3 text-[10px] text-primary/60 font-mono tracking-widest z-20">
          [{project.year}]
        </span>

        {/* Hover arrow */}
        <div
          className={cn(
            "absolute bottom-3 right-3 transition-all duration-300 z-30",
            "w-8 h-8 rounded-none flex items-center justify-center",
            "bg-primary text-secondary shadow-[0_0_15px_hsl(var(--primary))] border border-primary",
            hovered ? "opacity-100 scale-100" : "opacity-0 scale-75"
          )}
        >
          <ArrowUpRight className="w-4 h-4" />
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 gap-3 relative">
        <div className="absolute top-0 left-0 w-1 h-1 border-t border-l border-primary/40" />
        <div className="absolute top-0 right-0 w-1 h-1 border-t border-r border-primary/40" />
        
        <div>
          <h3 className="font-display font-semibold text-lg text-[hsl(var(--card-foreground))] group-hover:text-[hsl(var(--primary))] transition-colors duration-200">
            {project.title}
          </h3>
          <p className="text-sm text-[hsl(var(--muted-foreground))] mt-0.5 font-medium font-mono">
            // {project.tagline}
          </p>
        </div>

        <p className="text-sm text-[hsl(var(--muted-foreground))] leading-relaxed line-clamp-2">
          {project.description}
        </p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1.5 mt-auto">
          {project.techStack.slice(0, 4).map((tech) => (
            <Badge key={tech} variant="muted" size="sm" className="rounded-none border border-[hsl(var(--border)/0.5)] font-mono text-[10px]">
              {tech}
            </Badge>
          ))}
          {project.techStack.length > 4 && (
            <Badge variant="outline" size="sm" className="rounded-none font-mono text-[10px]">
              +{project.techStack.length - 4}
            </Badge>
          )}
        </div>

        {/* Links */}
        <div className="flex gap-4 pt-4 border-t border-[hsl(var(--border)/0.3)] font-mono text-[10px] tracking-wider uppercase">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1.5 text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors"
            >
              <IconGithub className="w-3.5 h-3.5" />
              Src_Code
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1.5 text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors ml-auto"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Live_Dmo
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
