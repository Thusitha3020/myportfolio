"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  /** Animation direction */
  direction?: "up" | "left" | "right" | "none";
  /** Delay before animation starts (seconds) */
  delay?: number;
  /** ScrollTrigger start offset */
  triggerStart?: string;
  /** Whether to use stagger for children */
  staggerChildren?: boolean;
  as?: "section" | "div" | "article";
}

export function SectionWrapper({
  children,
  className,
  id,
  direction = "up",
  delay = 0,
  triggerStart = "top 82%",
  staggerChildren = false,
  as: Tag = "section",
}: SectionWrapperProps) {
  const ref = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced || !ref.current || direction === "none") return;

    const fromVars: gsap.TweenVars =
      direction === "up"
        ? { y: 50, opacity: 0 }
        : direction === "left"
          ? { x: -50, opacity: 0 }
          : { x: 50, opacity: 0 };

    const ctx = gsap.context(() => {
      if (staggerChildren) {
        gsap.fromTo(ref.current!.children, fromVars, {
          y: 0,
          x: 0,
          opacity: 1,
          duration: 0.7,
          ease: "expo.out",
          stagger: 0.1,
          delay,
          scrollTrigger: {
            trigger: ref.current,
            start: triggerStart,
            toggleActions: "play none none reverse",
          },
        });
      } else {
        gsap.fromTo(ref.current, fromVars, {
          y: 0,
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: "expo.out",
          delay,
          scrollTrigger: {
            trigger: ref.current,
            start: triggerStart,
            toggleActions: "play none none reverse",
          },
        });
      }
    }, ref);

    return () => ctx.revert();
  }, [direction, delay, triggerStart, staggerChildren, prefersReduced]);

  return (
    <Tag
      ref={ref as React.RefObject<HTMLElement & HTMLDivElement>}
      id={id}
      className={cn("will-animate", className)}
    >
      {children}
    </Tag>
  );
}
