"use client";

import { useRef } from "react";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
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
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[hsl(var(--background)/0.1)] to-[hsl(var(--background))]" />
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 grid-bg opacity-20 z-0" aria-hidden="true" />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-6 border-b border-white/5 bg-background/50 backdrop-blur-xl">
        <div className="container mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="text-2xl font-display font-bold text-[hsl(var(--foreground))] tracking-tighter"
          >
            TSP.
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {["About", "Projects", "Contact"].map((item) => (
              <Link
                key={item}
                href={`/#${item.toLowerCase()}`}
                className="text-sm font-medium text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors"
              >
                {item}
              </Link>
            ))}
            <Button size="sm" variant="primary" href="/contact">
              Hire Me
            </Button>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <div className="container mx-auto px-6 relative z-10 text-center md:text-left">
          <div className="flex flex-col items-center md:items-start">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-[10px] font-mono font-bold text-primary mb-8 ml-auto mr-auto md:ml-0 md:mr-0 animate-pulse tracking-widest uppercase">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              System Status: Available // 2025_PROTO
            </div>

            <h1 ref={headingRef} className="text-4xl xs:text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-tight text-[hsl(var(--foreground))] mb-6">
              <span className="text-sm font-mono text-primary/40 block mb-2 tracking-[0.3em] font-normal uppercase">Authorized_User:</span>
              Hi, I'm <span className="gradient-text glow-text digital-flicker">Thusitha S. Perera</span><span className="animate-blink">_</span>
            </h1>

            <div className="flex flex-col items-center md:items-start space-y-4 mb-8 text-center md:text-left">
              <h2 className="text-xl md:text-2xl text-muted-foreground font-medium flex flex-wrap items-center gap-2 justify-center md:justify-start">
                <span className="text-primary font-mono tracking-tighter">[ Robotics & IoT Developer ]</span>
                <span className="hidden md:inline text-border">|</span>
                <span className="text-accent/80 font-mono text-sm tracking-widest uppercase">IT Undergraduate</span>
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed font-mono text-sm">
                &gt;&gt; Initializing robotics mission control...
                <br />
                &gt;&gt; Target focus: autonomous machines, sensor integration, real-world deployment.
                <br />
                &gt;&gt; Current status: Designing next-gen IoT solutions.
              </p>
            </div>

            {/* CTA buttons */}
            <div ref={ctaRef} className="flex flex-wrap gap-4 justify-center md:justify-start mb-10 relative">
              <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-primary/50 to-transparent" />
              <Button href="/#projects" variant="primary" size="lg" className="rounded-none border-l-4 border-primary">
                Access Projects <span className="ml-2">_&gt;&gt;</span>
              </Button>
              <Button href="/cv_thusitha.pdf" external variant="secondary" size="lg" className="rounded-none">
                File: CV_2025.txt
              </Button>
            </div>

            {/* Socials */}
            <div
              ref={socialRef}
              className="flex items-center gap-4 justify-center md:justify-start"
            >
              {[
                { icon: IconGithub, href: "https://github.com/thusitha3020", label: "GitHub" },
                { icon: IconLinkedin, href: "https://www.linkedin.com/in/thusitha-sampath-7a21351a7", label: "LinkedIn" },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 border border-primary/20 flex items-center justify-center text-primary/40 hover:text-primary hover:border-primary/60 transition-all duration-300 bg-primary/5 hover:bg-primary/10"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
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
