import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Calendar } from "lucide-react";
import { IconGithub } from "@/components/ui/SocialIcons";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { createMetadata } from "@/lib/metadata";
import {
  projects,
  getProjectBySlug,
} from "@/features/projects/projectsData";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  return createMetadata({
    title: project.title,
    description: project.description,
    image: project.image,
    path: `/projects/${slug}`,
  });
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  return (
    <article className="min-h-screen pt-24 pb-24 px-6 mesh-bg">
      <div className="container mx-auto max-w-4xl">
        {/* Back link */}
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-sm text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Projects
        </Link>

        {/* Hero image */}
        <div className="relative aspect-video rounded-2xl overflow-hidden mb-10 shadow-2xl">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 1024px) 100vw, 896px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--background)/0.8)] to-transparent" />
        </div>

        {/* Header */}
        <header className="mb-10">
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant="primary" size="md">
              {project.category}
            </Badge>
            <Badge variant="muted" size="md">
              {project.year}
            </Badge>
            <Badge
              variant={
                project.status === "completed"
                  ? "secondary"
                  : project.status === "in-progress"
                    ? "accent"
                    : "muted"
              }
              size="md"
            >
              {project.status === "completed"
                ? "✓ Completed"
                : project.status === "in-progress"
                  ? "⚡ In Progress"
                  : "Archived"}
            </Badge>
          </div>

          <h1 className="font-display font-bold text-4xl sm:text-5xl text-[hsl(var(--foreground))] leading-tight mb-2">
            {project.title}
          </h1>
          <p className="text-xl text-[hsl(var(--muted-foreground))]">
            {project.tagline}
          </p>
        </header>

        {/* Content */}
        <div className="grid lg:grid-cols-3 gap-10">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            <section aria-labelledby="about-project">
              <h2
                id="about-project"
                className="font-display font-semibold text-xl text-[hsl(var(--foreground))] mb-4"
              >
                About this project
              </h2>
              <p className="text-[hsl(var(--muted-foreground))] leading-relaxed text-base">
                {project.longDescription}
              </p>
            </section>

            {/* Second image */}
            {project.images[1] && (
              <div className="relative aspect-video rounded-xl overflow-hidden">
                <Image
                  src={project.images[1]}
                  alt={`${project.title} — additional screenshot`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 570px"
                />
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Tech stack */}
            <div className="p-5 rounded-2xl glass border border-[hsl(var(--border)/0.5)]">
              <h2 className="font-display font-semibold text-sm text-[hsl(var(--foreground))] mb-3">
                Tech Stack
              </h2>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <Badge key={tech} variant="primary" size="sm">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Meta */}
            <div className="p-5 rounded-2xl glass border border-[hsl(var(--border)/0.5)] space-y-3 text-sm">
              <div className="flex items-center gap-2 text-[hsl(var(--muted-foreground))]">
                <Calendar className="w-4 h-4" />
                <span>{project.year}</span>
              </div>
            </div>

            {/* Links */}
            <div className="space-y-3">
              {project.liveUrl && (
                <Button
                  variant="primary"
                  size="md"
                  leftIcon={<ExternalLink className="w-4 h-4" />}
                  className="w-full"
                  href={project.liveUrl}
                  external
                >
                  View Live Demo
                </Button>
              )}
              {project.githubUrl && (
                <Button
                  variant="outline"
                  size="md"
                  leftIcon={<IconGithub className="w-4 h-4" />}
                  className="w-full"
                  href={project.githubUrl}
                  external
                >
                  Source Code
                </Button>
              )}
            </div>
          </aside>
        </div>
      </div>
    </article>
  );
}
