"use client";

import { useEffect, useState } from "react";

/**
 * Tracks scroll progress (0–1) of the page.
 * Also returns whether the user has scrolled past a threshold.
 */
export function useScrollProgress(threshold = 80) {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      setScrolled(scrollY > threshold);
      setProgress(docHeight > 0 ? scrollY / docHeight : 0);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return { scrolled, progress };
}
