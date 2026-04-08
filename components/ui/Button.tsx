import { cn } from "@/lib/utils";
import { forwardRef } from "react";
import Link from "next/link";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline" | "accent";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  asChild?: boolean;
  href?: string;
  external?: boolean;
}

const variantClasses = {
  primary:
    "bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] hover:bg-[hsl(var(--primary)/0.85)] shadow-lg shadow-[hsl(var(--primary)/0.3)]",
  secondary:
    "bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))] hover:bg-[hsl(var(--secondary)/0.85)]",
  accent:
    "bg-[hsl(var(--accent))] text-[hsl(var(--accent-foreground))] hover:bg-[hsl(var(--accent)/0.85)] shadow-lg shadow-[hsl(var(--accent)/0.3)]",
  ghost:
    "bg-transparent text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted))]",
  outline:
    "bg-transparent border border-[hsl(var(--border))] text-[hsl(var(--foreground))] hover:border-[hsl(var(--primary)/0.7)] hover:bg-[hsl(var(--primary)/0.05)]",
};

const sizeClasses = {
  sm: "h-8 px-4 text-sm gap-1.5",
  md: "h-10 px-6 text-sm gap-2",
  lg: "h-12 px-8 text-base gap-2",
};

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      className,
      disabled,
      href,
      external = false,
      ...props
    },
    ref
  ) => {
    const commonClasses = cn(
      "inline-flex items-center justify-center rounded-lg font-medium",
      "transition-all duration-200 ease-out",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))] focus-visible:ring-offset-2",
      "disabled:opacity-50 disabled:cursor-not-allowed",
      "active:scale-[0.98]",
      variantClasses[variant],
      sizeClasses[size],
      className
    );

    const content = (
      <>
        {isLoading ? (
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : (
          leftIcon
        )}
        {children}
        {!isLoading && rightIcon}
      </>
    );

    if (href) {
      if (external) {
        return (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={commonClasses}
            ref={ref as React.Ref<HTMLAnchorElement>}
            {...(props as any)}
          >
            {content}
          </a>
        );
      }
      return (
        <Link
          href={href}
          className={commonClasses}
          ref={ref as React.Ref<HTMLAnchorElement>}
          {...(props as any)}
        >
          {content}
        </Link>
      );
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        disabled={disabled || isLoading}
        className={commonClasses}
        {...props}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = "Button";
