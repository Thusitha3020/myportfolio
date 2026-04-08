"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { IconGithub, IconLinkedin, IconTwitterX } from "@/components/ui/SocialIcons";
import { cn } from "@/lib/utils";

const socialLinks = [
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
];

const footerLinks = [
  { href: "/", label: "Home" },
  { href: "/#about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="border-t border-[hsl(var(--border)/0.5)] py-12 px-6"
      role="contentinfo"
      aria-label="Site footer"
    >
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <Link
              href="/"
              className="font-display font-bold text-2xl gradient-text"
              aria-label="Home"
            >
              AC.
            </Link>
            <p className="text-xs text-[hsl(var(--muted-foreground))] max-w-xs text-center md:text-left">
              Building beautiful, performant web experiences with care.
            </p>
          </div>

          {/* Nav links */}
          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2" role="list">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Social icons */}
          <div className="flex items-center gap-3">
            {socialLinks.map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className={cn(
                  "w-9 h-9 rounded-full glass flex items-center justify-center",
                  "text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))]",
                  "hover:border-[hsl(var(--primary)/0.4)] hover:scale-110",
                  "transition-all duration-200"
                )}
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-[hsl(var(--border)/0.3)] flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[hsl(var(--muted-foreground)/0.6)]">
          <p>© {year} Alex Chen. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with <Heart className="w-3 h-3 text-[hsl(var(--accent))] fill-current" /> using Next.js &amp; GSAP
          </p>
        </div>
      </div>
    </footer>
  );
}
