"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface AnimatedContainerProps {
  children: React.ReactNode;
  className?: string;
  animation?: "fadeUp" | "fadeIn" | "slideLeft" | "slideRight" | "scaleIn";
  delay?: number;
  duration?: number;
  /** If true, animates when mounted (not scroll-triggered) */
  immediate?: boolean;
}

const getAnimationVars = (
  animation: AnimatedContainerProps["animation"]
): { from: gsap.TweenVars; to: gsap.TweenVars } => {
  switch (animation) {
    case "fadeUp":
      return { from: { y: 30, opacity: 0 }, to: { y: 0, opacity: 1 } };
    case "fadeIn":
      return { from: { opacity: 0 }, to: { opacity: 1 } };
    case "slideLeft":
      return { from: { x: -40, opacity: 0 }, to: { x: 0, opacity: 1 } };
    case "slideRight":
      return { from: { x: 40, opacity: 0 }, to: { x: 0, opacity: 1 } };
    case "scaleIn":
      return {
        from: { scale: 0.85, opacity: 0 },
        to: { scale: 1, opacity: 1 },
      };
    default:
      return { from: { y: 30, opacity: 0 }, to: { y: 0, opacity: 1 } };
  }
};

export function AnimatedContainer({
  children,
  className,
  animation = "fadeUp",
  delay = 0,
  duration = 0.7,
  immediate = false,
}: AnimatedContainerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced || !ref.current) return;

    const { from, to } = getAnimationVars(animation);
    const ctx = gsap.context(() => {
      gsap.fromTo(ref.current!, from, {
        ...to,
        duration,
        ease: "expo.out",
        delay,
        ...(immediate
          ? {}
          : {
              scrollTrigger: {
                trigger: ref.current,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            }),
      });
    });

    return () => ctx.revert();
  }, [animation, delay, duration, immediate, prefersReduced]);

  return (
    <div ref={ref} className={cn("will-animate", className)}>
      {children}
    </div>
  );
}
