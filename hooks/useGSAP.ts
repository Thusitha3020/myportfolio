"use client";

import { useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type GSAPContextCallback = (context: gsap.Context) => void;

interface UseGSAPOptions {
  /** Dependencies that trigger re-initialization */
  dependencies?: unknown[];
  /** Scope element ref — animations are scoped to this element */
  scope?: React.RefObject<Element | null>;
}

/**
 * React-safe GSAP hook that creates a scoped context and cleans up on unmount.
 * Prevents memory leaks and stale animation refs.
 */
export function useGSAP(
  callback: GSAPContextCallback,
  options: UseGSAPOptions = {}
) {
  const { dependencies = [], scope } = options;
  const contextRef = useRef<gsap.Context | null>(null);

  useEffect(() => {
    const ctx = gsap.context((self) => {
      callback(self);
    }, scope?.current ?? document.body);

    contextRef.current = ctx;

    return () => {
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  const revert = useCallback(() => {
    contextRef.current?.revert();
  }, []);

  return { revert, context: contextRef };
}

/**
 * Convenience hook for ScrollTrigger-based animations.
 */
export function useScrollAnimation(
  ref: React.RefObject<Element | null>,
  animationVars: gsap.TweenVars,
  scrollTriggerVars?: Partial<ScrollTrigger.Vars>
) {
  useEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { opacity: 0, y: 30, ...animationVars },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 85%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
            ...scrollTriggerVars,
          },
        }
      );
    });

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
