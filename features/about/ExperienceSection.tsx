"use client";

import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { AnimatedContainer } from "@/components/ui/AnimatedContainer";
import { Briefcase, Trophy } from "lucide-react";

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
    description: "Competed against multiple teams with a novel robotics solution. Recognized for both innovation in design and excellence in technical implementation.",
  },
];

export function ExperienceSection() {
  return (
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

              {achievements.map((award, index) => (
                <div key={index} className="p-6 rounded-2xl glass border border-accent/20 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2 group-hover:bg-accent/10 transition-colors" />
                  <h3 className="text-xl font-bold text-foreground mb-2">{award.title}</h3>
                  <p className="text-sm font-mono text-accent mb-4">{award.event}</p>
                  <p className="text-muted-foreground leading-relaxed">
                    {award.description}
                  </p>
                </div>
              ))}
            </AnimatedContainer>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
