"use client";

import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "accent" | "muted" | "outline";
  size?: "sm" | "md";
  className?: string;
}

const variantClasses = {
  primary:
    "bg-[hsl(var(--primary)/0.15)] text-[hsl(var(--primary))] border-[hsl(var(--primary)/0.3)]",
  secondary:
    "bg-[hsl(var(--secondary)/0.15)] text-[hsl(var(--secondary))] border-[hsl(var(--secondary)/0.3)]",
  accent:
    "bg-[hsl(var(--accent)/0.15)] text-[hsl(var(--accent))] border-[hsl(var(--accent)/0.3)]",
  muted:
    "bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))] border-[hsl(var(--border))]",
  outline:
    "bg-transparent text-[hsl(var(--foreground))] border-[hsl(var(--border))]",
};

const sizeClasses = {
  sm: "text-xs px-2 py-0.5",
  md: "text-sm px-3 py-1",
};

export function Badge({
  children,
  variant = "muted",
  size = "sm",
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border font-medium transition-all duration-200",
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
    >
      {children}
    </span>
  );
}
