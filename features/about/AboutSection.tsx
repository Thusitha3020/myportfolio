"use client";

import { useRef } from "react";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { AnimatedContainer } from "@/components/ui/AnimatedContainer";
import { Badge } from "@/components/ui/Badge";

const skills = [
  {
    category: "Frontend",
    items: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "GSAP",
      "Three.js",
    ],
  },
  {
    category: "Backend",
    items: ["Node.js", "Go", "FastAPI", "PostgreSQL", "Redis", "GraphQL"],
  },
  {
    category: "DevOps & Tools",
    items: ["Docker", "AWS", "Vercel", "GitHub Actions", "Terraform", "K8s"],
  },
  {
    category: "Design",
    items: ["Figma", "Framer", "Storybook", "Design Systems", "Accessibility"],
  },
];

const stats = [
  { value: "5+", label: "Years of Experience" },
  { value: "30+", label: "Projects Shipped" },
  { value: "12+", label: "Open Source Repos" },
  { value: "∞", label: "Coffees Consumed" },
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
              01. About Me
            </span>
            <h2 className="font-display font-bold text-4xl sm:text-5xl text-[hsl(var(--foreground))] mt-3 leading-tight">
              Passionate about{" "}
              <span className="gradient-text">great software</span>
            </h2>
          </AnimatedContainer>

          <AnimatedContainer animation="fadeUp" delay={0.1}>
            <p className="text-[hsl(var(--muted-foreground))] leading-relaxed text-lg">
              I&apos;m a full-stack engineer with over 5 years of experience
              building products that sit at the intersection of performance and
              aesthetic elegance. I care deeply about developer experience,
              clean architecture, and making the web feel alive.
            </p>
            <p className="text-[hsl(var(--muted-foreground))] leading-relaxed mt-4">
              When I&apos;m not writing code, I&apos;m tinkering with 3D
              graphics, contributing to open-source projects, or diving into the
              latest research on compilers and distributed systems.
            </p>
          </AnimatedContainer>

          {/* Stats */}
          <AnimatedContainer animation="fadeUp" delay={0.2}>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="p-4 rounded-xl glass border border-[hsl(var(--border)/0.5)] text-center"
                >
                  <div className="font-display font-bold text-3xl gradient-text">
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
              {/* Placeholder avatar with gradient */}
              <div className="absolute inset-0 mesh-bg flex items-center justify-center">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--accent))] flex items-center justify-center text-5xl font-display font-bold text-white shadow-2xl">
                  AC
                </div>
              </div>
              {/* Decorative frame */}
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
