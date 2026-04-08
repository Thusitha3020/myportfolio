"use client";

import { useRef } from "react";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import dynamic from "next/dynamic";
import { ArrowDown, Download } from "lucide-react";
import { IconGithub, IconLinkedin, IconTwitterX } from "@/components/ui/SocialIcons";
import { Button } from "@/components/ui/Button";
import { WebGLGuard } from "@/components/three/WebGLGuard";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { createHeroTimeline } from "@/lib/animations";

gsap.registerPlugin(ScrollTrigger);

const HeroScene = dynamic(
  () => import("@/components/three/HeroScene").then((m) => m.HeroScene),
  { ssr: false }
);

const ROLES = [
  "Full-Stack Engineer",
  "Creative Developer",
  "UI/UX Enthusiast",
  "Open Source Contributor",
];

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const roleRef = useRef<HTMLSpanElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();
  const roleIndexRef = useRef(0);

  // Hero entrance animation
  useEffect(() => {
    if (prefersReduced) return;
    const ctx = gsap.context(() => {
      const tl = createHeroTimeline();
      tl.fromTo(
        headingRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "expo.out" }
      )
        .fromTo(
          subRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "expo.out" },
          "-=0.5"
        )
        .fromTo(
          ctaRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: "expo.out" },
          "-=0.4"
        )
        .fromTo(
          socialRef.current,
          { y: 15, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: "expo.out" },
          "-=0.3"
        )
        .fromTo(
          scrollRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.6 },
          "-=0.2"
        );

      // Floating animation for scroll indicator
      gsap.to(scrollRef.current, {
        y: 8,
        duration: 1.2,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReduced]);

  // Typewriter-style role rotation
  useEffect(() => {
    if (!roleRef.current || prefersReduced) return;
    let timeout: ReturnType<typeof setTimeout>;

    const cycleRole = () => {
      roleIndexRef.current = (roleIndexRef.current + 1) % ROLES.length;
      gsap.fromTo(
        roleRef.current,
        { y: 10, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: "expo.out",
          onStart: () => {
            if (roleRef.current)
              roleRef.current.textContent = ROLES[roleIndexRef.current];
          },
        }
      );
      timeout = setTimeout(cycleRole, 2800);
    };

    timeout = setTimeout(cycleRole, 2800);
    return () => clearTimeout(timeout);
  }, [prefersReduced]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden mesh-bg"
      aria-label="Hero section"
    >
      {/* 3D background scene */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <WebGLGuard>
          <HeroScene />
        </WebGLGuard>
        {/* Extra overlay for legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[hsl(var(--background)/0.3)] to-[hsl(var(--background))]" />
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 grid-bg opacity-20 z-0" aria-hidden="true" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center max-w-5xl">
        {/* Availability badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-[hsl(var(--border)/0.6)] text-sm text-[hsl(var(--muted-foreground))] mb-8">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          Available for opportunities
        </div>

        {/* Main heading */}
        <h1
          ref={headingRef}
          className="font-display font-bold text-5xl sm:text-7xl lg:text-8xl leading-[1.05] tracking-tight mb-6"
        >
          <span className="text-[hsl(var(--foreground))]">Hi, I&apos;m </span>
          <span className="gradient-text glow-text">Alex Chen</span>
        </h1>

        {/* Role rotator */}
        <p
          ref={subRef}
          className="text-xl sm:text-2xl text-[hsl(var(--muted-foreground))] mb-2 font-medium"
        >
          A{" "}
          <span
            ref={roleRef}
            className="text-[hsl(var(--primary))] font-semibold inline-block min-w-[260px]"
          >
            {ROLES[0]}
          </span>
        </p>
        <p className="text-base sm:text-lg text-[hsl(var(--muted-foreground)/0.7)] max-w-2xl mx-auto mb-10">
          I craft performant, beautiful digital experiences — from pixel-perfect
          interfaces to scalable backend systems.
        </p>

        {/* CTA buttons */}
        <div ref={ctaRef} className="flex flex-wrap gap-4 justify-center mb-10">
          <Button
            variant="primary"
            size="lg"
            rightIcon={<ArrowDown className="w-4 h-4" />}
            onClick={() =>
              document
                .getElementById("projects")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            View My Work
          </Button>
          <Button
            variant="outline"
            size="lg"
            leftIcon={<Download className="w-4 h-4" />}
            onClick={() => window.open("/resume.pdf", "_blank")}
          >
            Download CV
          </Button>
        </div>

        {/* Social links */}
        <div
          ref={socialRef}
          className="flex items-center justify-center gap-5"
        >
          {[
            {
              href: "https://github.com/alexchen",
              icon: IconGithub,
              label: "GitHub",
            },
            {
              href: "https://linkedin.com/in/alexchen",
              icon: IconLinkedin,
              label: "LinkedIn",
            },
            {
              href: "https://twitter.com/alexchen",
              icon: IconTwitterX,
              label: "Twitter",
            },
          ].map(({ href, icon: Icon, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="w-10 h-10 rounded-full glass flex items-center justify-center text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] hover:border-[hsl(var(--primary)/0.4)] transition-all duration-200 hover:scale-110"
            >
              <Icon className="w-4 h-4" />
            </a>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <span className="text-xs text-[hsl(var(--muted-foreground)/0.6)] tracking-widest uppercase font-mono">
          Scroll
        </span>
        <div className="w-px h-10 bg-gradient-to-b from-[hsl(var(--primary)/0.6)] to-transparent" />
      </div>
    </section>
  );
}
