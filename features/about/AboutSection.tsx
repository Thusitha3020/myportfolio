"use client";

import { useRef } from "react";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { AnimatedContainer } from "@/components/ui/AnimatedContainer";
import { Badge } from "@/components/ui/Badge";

const skills = [
  {
    category: "Technical Hardware",
    items: [
      "Arduino & Embedded Programming",
      "IoT Systems (ESP8266, WiFi)",
      "Sensor Integration",
      "Robotics Development",
      "Embedded C++",
    ],
  },
  {
    category: "Thinking & Style",
    items: [
      "Problem Solving",
      "Fast Learning",
      "Creative Thinking",
      "Teamwork",
      "Leadership",
      "Clear Communication",
    ],
  },
];

const stats = [
  { value: "BIT", label: "Undergraduate (Hons)" },
  { value: "2nd Runner-Up", label: "Robotics Hackathon" },
  { value: "2025", label: "Thinkfest Achievement" },
  { value: "100%", label: "Committed" },
];

export function AboutSection() {
  const imageRef = useRef<HTMLDivElement>(null);

  return (
    <SectionWrapper
      id="about"
      className="py-24 lg:py-32 px-6 container mx-auto max-w-6xl"
    >
      <div className="grid lg:grid-cols-2 gap-16 items-start">
        {/* Left — Text */}
        <div className="space-y-8">
          <AnimatedContainer animation="fadeUp">
            <span className="text-sm font-mono text-[hsl(var(--primary))] tracking-widest uppercase">
              01. The Developer
            </span>
            <h2 className="font-display font-bold text-4xl sm:text-5xl text-[hsl(var(--foreground))] mt-3 leading-tight">
              Building <span className="gradient-text">Intelligent Machines</span>
            </h2>
          </AnimatedContainer>

          <AnimatedContainer animation="fadeUp" delay={0.1}>
            <p className="text-[hsl(var(--muted-foreground))] leading-relaxed text-lg">
              I build intelligent machines that can sense, decide, and act without human control. My focus is on robotics and IoT solutions designed for real environments like factories and smart spaces.
            </p>
            <p className="text-[hsl(var(--muted-foreground))] leading-relaxed mt-4">
              Right now, I’m working on autonomous systems that inspect machines, detect hazards, and send real-time alerts. I enjoy combining hardware and software into one working product — not just simulations, but real devices that move and react.
            </p>
            <div className="mt-8 space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                <div>
                  <h4 className="font-bold text-foreground">Bachelor of Information Technology (Hons)</h4>
                  <p className="text-sm text-muted-foreground">ESOFT Uni Colombo (2022 – Present) | Specialization: Robotics</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2" />
                <div>
                  <h4 className="font-bold text-foreground">Diploma in Graphic Designing (High Distinction)</h4>
                  <p className="text-sm text-muted-foreground">IDM Campus (2022)</p>
                </div>
              </div>
            </div>
          </AnimatedContainer>

          {/* Stats */}
          <AnimatedContainer animation="fadeUp" delay={0.2}>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="p-4 rounded-xl glass border border-[hsl(var(--border)/0.5)] text-center"
                >
                  <div className="font-display font-bold text-xl gradient-text">
                    {stat.value}
                  </div>
                  <div className="text-xs text-[hsl(var(--muted-foreground))] mt-1 leading-tight">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </AnimatedContainer>
        </div>

        {/* Right — Skills */}
        <div className="space-y-6">
          <AnimatedContainer animation="slideRight" delay={0.1}>
            <div
              ref={imageRef}
              className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-8"
            >
              <div className="absolute inset-0 mesh-bg flex items-center justify-center">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--accent))] flex items-center justify-center text-5xl font-display font-bold text-white shadow-2xl">
                  TSP
                </div>
              </div>
              <div className="absolute inset-0 rounded-2xl border border-[hsl(var(--primary)/0.3)]" />
              <div className="absolute -bottom-1 -right-1 w-24 h-24 rounded-2xl border-2 border-[hsl(var(--accent)/0.3)] -z-10" />
            </div>
          </AnimatedContainer>

          {/* Skills grid */}
          {skills.map((group, i) => (
            <AnimatedContainer
              key={group.category}
              animation="slideRight"
              delay={0.15 + i * 0.08}
            >
              <div className="p-4 rounded-xl glass border border-[hsl(var(--border)/0.5)]">
                <h3 className="font-display font-semibold text-sm text-[hsl(var(--foreground))] mb-3">
                  {group.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((skill, j) => (
                    <Badge
                      key={skill}
                      variant={
                        j % 3 === 0
                          ? "primary"
                          : j % 3 === 1
                            ? "secondary"
                            : "accent"
                      }
                      size="sm"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </AnimatedContainer>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
