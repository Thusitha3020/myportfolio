import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge Tailwind classes without conflicts */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Slugify a string for URL-safe identifiers */
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Clamp a number between min and max */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/** Map a value from one range to another */
export function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number {
  return ((value - inMin) / (inMax - inMin)) * (outMax - outMin) + outMin;
}

/** Format a date to a readable string */
export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
  });
}

/** Check if we are in a browser environment */
export function isBrowser(): boolean {
  return typeof window !== "undefined";
}

/** Get screen size category */
export function getScreenSize(): "mobile" | "tablet" | "desktop" {
  if (!isBrowser()) return "desktop";
  const width = window.innerWidth;
  if (width < 768) return "mobile";
  if (width < 1024) return "tablet";
  return "desktop";
}

/** Get the basePath-prefixed path for static assets on GitHub Pages */
export function getAssetPath(src: string): string {
  if (!src) return "";
  if (src.startsWith("http://") || src.startsWith("https://")) return src;
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const cleanSrc = src.startsWith("/") ? src.slice(1) : src;
  const cleanBasePath = basePath.endsWith("/") ? basePath : `${basePath}/`;
  if (cleanBasePath === "/") return `/${cleanSrc}`;
  return `${cleanBasePath}${cleanSrc}`;
}
