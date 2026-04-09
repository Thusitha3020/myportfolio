"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { navbarEntrance } from "@/lib/animations";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/#about", label: "About" },
  { href: "/#projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrolled, progress } = useScrollProgress(60);
  const pathname = usePathname();

  // Entrance animation
  useEffect(() => {
    if (navRef.current) {
      navbarEntrance(navRef.current);
    }
  }, []);

  // Scroll progress bar
  useEffect(() => {
    if (progressRef.current) {
      gsap.to(progressRef.current, {
        scaleX: progress,
        duration: 0.1,
        ease: "none",
        transformOrigin: "left center",
      });
    }
  }, [progress]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        ref={navRef}
        className={cn(
          "fixed top-0 inset-x-0 z-40 transition-all duration-500",
          scrolled
            ? "glass-strong border-b border-[hsl(var(--border)/0.5)] py-3"
            : "py-5 bg-transparent"
        )}
        role="banner"
      >
        {/* Scroll progress bar */}
        <div
          ref={progressRef}
          className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[hsl(var(--primary))] via-[hsl(var(--secondary))] to-[hsl(var(--accent))] scale-x-0 origin-left"
          aria-hidden="true"
        />

        <nav
          className="container mx-auto px-6 flex items-center justify-between max-w-6xl"
          aria-label="Main navigation"
        >
          {/* Logo */}
          <Link
            href="/"
            className="font-display font-bold text-xl gradient-text hover:opacity-80 transition-opacity"
            aria-label="Thusitha S. Perera — Home"
          >
            TSP.
          </Link>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-1" role="list">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                    "hover:text-[hsl(var(--primary))] hover:bg-[hsl(var(--primary)/0.08)]",
                    pathname === link.href
                      ? "text-[hsl(var(--primary))] bg-[hsl(var(--primary)/0.1)]"
                      : "text-[hsl(var(--muted-foreground))]"
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* CTA — desktop */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/contact"
              className={cn(
                "inline-flex h-9 items-center px-5 rounded-lg text-sm font-medium",
                "bg-[hsl(var(--primary))] text-white",
                "hover:bg-[hsl(var(--primary)/0.85)] shadow-md shadow-[hsl(var(--primary)/0.3)]",
                "transition-all duration-200 active:scale-[0.98]"
              )}
            >
              Hire Me
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted))] transition-all"
            onClick={() => setMobileOpen((v) => !v)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </nav>
      </header>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          id="mobile-menu"
          className="fixed inset-0 z-30 pt-20 glass-strong md:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          <nav className="container mx-auto px-6 py-8 flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-4 py-3 rounded-xl text-lg font-medium transition-all duration-200",
                  "hover:text-[hsl(var(--primary))] hover:bg-[hsl(var(--primary)/0.08)]",
                  pathname === link.href
                    ? "text-[hsl(var(--primary))] bg-[hsl(var(--primary)/0.1)]"
                    : "text-[hsl(var(--muted-foreground))]"
                )}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="mt-4 inline-flex h-12 items-center justify-center px-6 rounded-xl text-base font-semibold bg-[hsl(var(--primary))] text-white hover:bg-[hsl(var(--primary)/0.85)] transition-all"
            >
              Hire Me
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}
