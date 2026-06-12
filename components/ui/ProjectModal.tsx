"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Calendar, Tag, Play, Trophy } from "lucide-react";
import { IconGithub } from "@/components/ui/SocialIcons";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import type { Project } from "@/features/projects/projectsData";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null);

  // Focus trap & keyboard close
  useEffect(() => {
    if (!project) return;
    closeRef.current?.focus();

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Panel */}
          <motion.div
            key="modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-4 top-[5%] bottom-[5%] z-50 max-w-3xl mx-auto flex flex-col rounded-3xl overflow-hidden glass-strong shadow-2xl"
          >
            {/* Clean Header */}
            <div className="p-6 pb-4 relative pr-16 shrink-0 border-b border-[hsl(var(--border)/0.5)]">
              <div className="flex flex-wrap gap-2 mb-2">
                <Badge variant="primary" size="md">
                  {project.category}
                </Badge>
                {project.award && (
                  <Badge variant="accent" size="md" className="flex items-center gap-1">
                    <Trophy className="w-3.5 h-3.5" />
                    Award Winner
                  </Badge>
                )}
              </div>
              <h2
                id="modal-title"
                className="font-display font-bold text-2xl sm:text-3xl text-[hsl(var(--foreground))] leading-tight"
              >
                {project.title}
              </h2>
              <p className="text-[hsl(var(--muted-foreground))] text-sm sm:text-base mt-1">{project.tagline}</p>

              {/* Close button */}
              <button
                ref={closeRef}
                onClick={onClose}
                className="absolute top-6 right-6 w-9 h-9 rounded-full bg-[hsl(var(--muted))] hover:bg-[hsl(var(--muted-foreground)/0.15)] flex items-center justify-center text-[hsl(var(--foreground))] transition-colors focus-visible:ring-2 focus-visible:ring-[hsl(var(--primary))]"
                aria-label="Close project modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable content */}
            <div className="flex flex-col flex-1 overflow-y-auto p-6 gap-6 scrollbar-thin">
              {/* Screenshots Gallery */}
              {project.images.length > 0 && (
                <div className={`grid gap-4 ${project.images.length > 1 ? "md:grid-cols-2" : "grid-cols-1"}`}>
                  {project.images.map((img, index) => (
                    <div
                      key={index}
                      className="relative aspect-video rounded-2xl overflow-hidden bg-black/30 border border-[hsl(var(--border)/0.4)] group"
                    >
                      <Image
                        src={img}
                        alt={`${project.title} screenshot ${index + 1}`}
                        fill
                        className="object-contain transition-transform duration-300 group-hover:scale-[1.02]"
                        priority={index === 0}
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* Award Highlight */}
              {project.award && (
                <div className="p-4 rounded-2xl border border-accent/20 bg-accent/5 flex items-start gap-3">
                  <Trophy className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-display font-semibold text-accent text-xs uppercase tracking-wider">Achievement / Award</h4>
                    <p className="text-sm text-[hsl(var(--foreground))] mt-1 leading-relaxed font-medium">{project.award}</p>
                  </div>
                </div>
              )}

              {/* Meta row */}
              <div className="flex flex-wrap gap-4 text-sm text-[hsl(var(--muted-foreground))]">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  {project.year}
                </span>
                <span className="flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5" />
                  {project.status === "completed"
                    ? "Completed"
                    : project.status === "in-progress"
                      ? "In Progress"
                      : "Archived"}
                </span>
              </div>

              {/* Description */}
              <div>
                <h3 className="font-display font-semibold text-[hsl(var(--foreground))] mb-2">
                  About this project
                </h3>
                <p className="text-[hsl(var(--muted-foreground))] leading-relaxed text-sm">
                  {project.longDescription}
                </p>
              </div>

              {/* Tech stack */}
              <div>
                <h3 className="font-display font-semibold text-[hsl(var(--foreground))] mb-3">
                  Tech Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <Badge key={tech} variant="primary" size="md">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-wrap gap-3 mt-auto pt-4 border-t border-[hsl(var(--border)/0.5)]">
                {project.liveUrl && (
                  <Button
                    variant="primary"
                    size="md"
                    leftIcon={<ExternalLink className="w-4 h-4" />}
                    href={project.liveUrl}
                    external
                  >
                    View Live
                  </Button>
                )}
                {project.videoUrl && (
                  <Button
                    variant="accent"
                    size="md"
                    leftIcon={<Play className="w-4 h-4" />}
                    href={project.videoUrl}
                    external
                  >
                    Watch Video
                  </Button>
                )}
                {project.githubUrl && (
                  <Button
                    variant="outline"
                    size="md"
                    leftIcon={<IconGithub className="w-4 h-4" />}
                    href={project.githubUrl}
                    external
                  >
                    Source Code
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
