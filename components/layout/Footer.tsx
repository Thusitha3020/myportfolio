"use client";

import Link from "next/link";
import { IconGithub, IconLinkedin, IconTwitterX } from "@/components/ui/SocialIcons";
import { cn } from "@/lib/utils";

const socialLinks = [
  {
    href: "https://github.com/thusitha3020",
    icon: IconGithub,
    label: "GitHub",
  },
  {
    href: "https://www.linkedin.com/in/thusitha-sampath-7a21351a7",
    icon: IconLinkedin,
    label: "LinkedIn",
  },
  {
    href: "#",
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
              TSP.
            </Link>
            <p className="text-xs text-[hsl(var(--muted-foreground))] max-w-xs text-center md:text-left">
              Designing the future of Robotics & IoT with innovative engineering.
            </p>
          </div>

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

        {/* Bottom Line */}
        <div className="mt-8 pt-6 border-t border-[hsl(var(--border)/0.3)] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[hsl(var(--muted-foreground)/0.6)]">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <p>© {year} Thusitha S. Perera. All rights reserved.</p>
            <a
              href="mailto:thusitha3020@gmail.com"
              className="hover:text-[hsl(var(--primary))] transition-colors"
            >
              thusitha3020@gmail.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
