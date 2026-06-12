"use client";

import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { AnimatedContainer } from "@/components/ui/AnimatedContainer";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Briefcase, Trophy, ArrowUpRight, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const experiences = [
  {
    type: "work",
    role: "Customer Support Intern",
    company: "TechSeed Lanka Pvt Ltd",
    duration: "Jun 2025 – Dec 2025",
    description: [
      "Solved real customer technical issues with efficiency",
      "Communicated clearly with users to understand underlying hardware/software problems",
      "Delivered fast and reliable support under tight SLAs",
      "Gained deep insights into how real users interact with complex technical systems",
    ],
  },
];

const achievements = [
  {
    type: "award",
    title: "Second Runner-Up – Robotics Category",
    event: "ESOFT THINKFEST Hackathon 2025",
    description: "Competed against multiple teams with a novel robotics solution. Recognized for both innovation in design and excellence in technical implementation as a group of four team.",
    projectSlug: "thinkfest-robotics-solution",
  },
  {
    type: "award",
    title: "Second Runner-Up – Gamers Showdown 2023",
    event: "ESOFT Metro Campus Colombo",
    description: "The first-ever gaming tournament organized by ESOFT Metro Campus Colombo. Successfully completed, fueled by the awesome support from sponsors TECHROOT and GAMING SALON.",
    images: ["/images/gaming1.jpg", "/images/gaming2.jpg"],
  },
];

export function ExperienceSection() {
  const [activeAchievement, setActiveAchievement] = useState<typeof achievements[0] | null>(null);

  useEffect(() => {
    if (activeAchievement) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeAchievement]);

  return (
    <>
      <SectionWrapper id="experience" className="py-24 bg-secondary/30 border-y border-border/50">
      <div className="container mx-auto max-w-6xl px-6">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Work Experience */}
          <div className="space-y-12">
            <AnimatedContainer animation="fadeUp">
              <div className="flex items-center gap-3 mb-8">
                <Briefcase className="w-6 h-6 text-primary" />
                <h2 className="text-3xl font-display font-bold">Experience</h2>
              </div>

              {experiences.map((exp, index) => (
                <div key={index} className="relative pl-8 border-l border-primary/20 space-y-4">
                  <div className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full bg-primary" />
                  <div>
                    <h3 className="text-xl font-bold text-foreground">{exp.role}</h3>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-primary font-mono mt-1">
                      <span>{exp.company}</span>
                      <span className="text-muted-foreground">/</span>
                      <span className="text-muted-foreground">{exp.duration}</span>
                    </div>
                  </div>
                  <ul className="space-y-2">
                    {exp.description.map((item, i) => (
                      <li key={i} className="text-muted-foreground flex items-start gap-2">
                        <span className="text-primary mt-1.5">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </AnimatedContainer>
          </div>

          {/* Achievements */}
          <div className="space-y-12">
            <AnimatedContainer animation="fadeUp" delay={0.2}>
              <div className="flex items-center gap-3 mb-8">
                <Trophy className="w-6 h-6 text-accent" />
                <h2 className="text-3xl font-display font-bold">Achievements</h2>
              </div>

              {achievements.map((award, index) => {
                const CardContent = (
                  <>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2 group-hover:bg-accent/10 transition-colors" />
                    <div className="flex justify-between items-start gap-4">
                      <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-accent transition-colors">
                        {award.title}
                      </h3>
                      {(award.projectSlug || award.images) && (
                        <ArrowUpRight className="w-5 h-5 text-accent opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
                      )}
                    </div>
                    <p className="text-sm font-mono text-accent mb-4">{award.event}</p>
                    <p className="text-muted-foreground leading-relaxed line-clamp-2">
                      {award.description}
                    </p>
                    {award.projectSlug && (
                      <span className="inline-flex items-center gap-1 text-xs font-mono text-accent mt-4 border-b border-accent/0 group-hover:border-accent/40 transition-colors">
                        View Project Details &rarr;
                      </span>
                    )}
                    {award.images && !award.projectSlug && (
                      <span className="inline-flex items-center gap-1 text-xs font-mono text-accent mt-4 border-b border-accent/0 group-hover:border-accent/40 transition-colors">
                        View Event Details &rarr;
                      </span>
                    )}
                  </>
                );

                return award.projectSlug ? (
                  <Link
                    key={index}
                    href={`/projects/${award.projectSlug}`}
                    className="block p-6 rounded-2xl glass border border-accent/20 relative overflow-hidden group hover:border-accent/40 hover:shadow-lg hover:shadow-accent/5 transition-all duration-300"
                  >
                    {CardContent}
                  </Link>
                ) : (
                  <button
                    key={index}
                    onClick={() => setActiveAchievement(award)}
                    className="block text-left w-full p-6 rounded-2xl glass border border-accent/20 relative overflow-hidden group hover:border-accent/40 hover:shadow-lg hover:shadow-accent/5 transition-all duration-300 cursor-pointer"
                  >
                    {CardContent}
                  </button>
                );
              })}
            </AnimatedContainer>
          </div>
        </div>
      </div>
      </SectionWrapper>

      <AnimatePresence>
        {activeAchievement && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
              onClick={() => setActiveAchievement(null)}
              aria-hidden="true"
            />

            {/* Panel */}
            <motion.div
              key="modal"
              role="dialog"
              aria-modal="true"
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-x-4 top-[10%] bottom-[10%] z-50 max-w-2xl mx-auto flex flex-col rounded-3xl overflow-hidden glass-strong shadow-2xl"
            >
              {/* Header */}
              <div className="p-6 pb-4 relative pr-16 shrink-0 border-b border-[hsl(var(--border)/0.5)]">
                <span className="inline-flex items-center gap-1 text-xs font-mono text-accent uppercase tracking-widest mb-2">
                  <Trophy className="w-3.5 h-3.5" />
                  Achievement / Award
                </span>
                <h2 className="font-display font-bold text-2xl sm:text-3xl text-[hsl(var(--foreground))] leading-tight">
                  {activeAchievement.title}
                </h2>
                <p className="text-[hsl(var(--muted-foreground))] text-sm mt-1">{activeAchievement.event}</p>

                {/* Close button */}
                <button
                  onClick={() => setActiveAchievement(null)}
                  className="absolute top-6 right-6 w-9 h-9 rounded-full bg-[hsl(var(--muted))] hover:bg-[hsl(var(--muted-foreground)/0.15)] flex items-center justify-center text-[hsl(var(--foreground))] transition-colors focus-visible:ring-2 focus-visible:ring-[hsl(var(--primary))]"
                  aria-label="Close modal"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Scrollable content */}
              <div className="flex flex-col flex-1 overflow-y-auto p-6 gap-6 scrollbar-thin">
                {/* Description */}
                <div className="space-y-2">
                  <h3 className="font-display font-semibold text-[hsl(var(--foreground))]">
                    About this Achievement
                  </h3>
                  <p className="text-[hsl(var(--muted-foreground))] leading-relaxed text-sm">
                    {activeAchievement.description}
                  </p>
                </div>

                {/* Gallery */}
                {activeAchievement.images && activeAchievement.images.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="font-display font-semibold text-[hsl(var(--foreground))]">
                      Event Gallery
                    </h3>
                    <div className="grid gap-4 sm:grid-cols-2">
                      {activeAchievement.images.map((img, index) => (
                        <div
                          key={index}
                          className="relative aspect-video rounded-2xl overflow-hidden bg-black/30 border border-[hsl(var(--border)/0.4)] group"
                        >
                          <Image
                            src={img}
                            alt={`${activeAchievement.title} image ${index + 1}`}
                            fill
                            sizes="(max-width: 768px) 100vw, 300px"
                            className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
