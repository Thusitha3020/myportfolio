import Link from "next/link";
import { createMetadata } from "@/lib/metadata";
import { Button } from "@/components/ui/Button";

export const metadata = createMetadata({
  title: "404 — Page Not Found",
  description: "The page you are looking for does not exist.",
  noIndex: true,
});

export default function NotFound() {
  return (
    <div className="min-h-screen mesh-bg flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <p className="font-mono text-sm text-[hsl(var(--primary))] tracking-widest mb-4">
          404
        </p>
        <h1 className="font-display font-bold text-5xl text-[hsl(var(--foreground))] mb-4 leading-tight">
          Page not{" "}
          <span className="gradient-text">found</span>
        </h1>
        <p className="text-[hsl(var(--muted-foreground))] mb-8 leading-relaxed">
          The page you&apos;re looking for has drifted into the void. Let&apos;s
          get you back on track.
        </p>
        <Link href="/">
          <Button variant="primary" size="lg">
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
