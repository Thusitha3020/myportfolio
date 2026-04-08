"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Calendar, Tag } from "lucide-react";
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
            {/* Hero image */}
            <div className="relative h-56 sm:h-72 shrink-0 overflow-hidden">
              {project.images[0] && (
                <Image
                  src={project.images[0]}
                  alt={project.title}
                  fill
                  className="object-cover"
                  priority
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--card))] via-[hsl(var(--card)/0.4)] to-transparent" />

              {/* Close button */}
              <button
                ref={closeRef}
                onClick={onClose}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/60 transition-colors focus-visible:ring-2 focus-visible:ring-white"
                aria-label="Close project modal"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Title over image */}
              <div className="absolute bottom-4 left-6 right-16">
                <Badge variant="primary" size="md" className="mb-2">
                  {project.category}
                </Badge>
                <h2
                  id="modal-title"
                  className="font-display font-bold text-2xl text-white leading-tight"
                >
                  {project.title}
                </h2>
                <p className="text-white/70 text-sm mt-0.5">{project.tagline}</p>
              </div>
            </div>

            {/* Scrollable content */}
            <div className="flex flex-col flex-1 overflow-y-auto p-6 gap-6 scrollbar-thin">
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

              {/* Second image */}
              {project.images[1] && (
                <div className="relative aspect-video rounded-xl overflow-hidden">
                  <Image
                    src={project.images[1]}
                    alt={`${project.title} screenshot`}
                    fill
                    className="object-cover"
                  />
                </div>
              )}

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
