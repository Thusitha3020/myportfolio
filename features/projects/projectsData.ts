export interface Project {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  longDescription: string;
  image: string;
  images: string[];
  techStack: string[];
  category: ProjectCategory;
  featured: boolean;
  liveUrl?: string;
  githubUrl?: string;
  year: string;
  status: "completed" | "in-progress" | "archived";
}

export type ProjectCategory =
  | "Full-Stack"
  | "Frontend"
  | "Backend"
  | "Mobile"
  | "AI/ML"
  | "Open Source";

export const projects: Project[] = [
  {
    id: "1",
    slug: "nova-ai-dashboard",
    title: "Nova AI Dashboard",
    tagline: "Intelligent analytics at a glance",
    description:
      "A real-time AI analytics dashboard with natural language querying, predictive charts, and multi-tenant workspace support.",
    longDescription:
      "Nova is a next-generation analytics platform powered by LLM-driven natural language queries. Users can ask questions in plain English and receive instant visualizations. Built with a React frontend, FastAPI backend, and Redis for real-time streaming. Features multi-tenant SSO, role-based access, and exportable reports.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop",
    ],
    techStack: [
      "Next.js",
      "TypeScript",
      "FastAPI",
      "PostgreSQL",
      "Redis",
      "OpenAI",
      "Recharts",
    ],
    category: "Full-Stack",
    featured: true,
    liveUrl: "https://nova-demo.dev",
    githubUrl: "https://github.com/alexchen/nova",
    year: "2024",
    status: "completed",
  },
  {
    id: "2",
    slug: "forge-design-system",
    title: "Forge Design System",
    tagline: "Components that scale with your team",
    description:
      "A comprehensive React component library with 60+ accessible components, dark mode, and a Figma token pipeline.",
    longDescription:
      "Forge is a production-grade design system built for enterprise React apps. It ships 60+ fully accessible components following WCAG 2.1 AA, a themeable token system synced to Figma via Style Dictionary, automated Storybook docs, and visual regression testing with Chromatic. Published to npm with a Turborepo monorepo.",
    image:
      "https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&h=500&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=500&fit=crop",
    ],
    techStack: [
      "React",
      "TypeScript",
      "Storybook",
      "Turborepo",
      "Style Dictionary",
      "Chromatic",
    ],
    category: "Open Source",
    featured: true,
    liveUrl: "https://forge-ds.dev",
    githubUrl: "https://github.com/alexchen/forge",
    year: "2024",
    status: "completed",
  },
  {
    id: "3",
    slug: "pulse-realtime-collab",
    title: "Pulse — Realtime Collaboration",
    tagline: "Google Docs meets Figma",
    description:
      "Multiplayer canvas editor with CRDT-based conflict resolution, cursor presence, and version history.",
    longDescription:
      "Pulse is a browser-based collaborative canvas editor inspired by Figma. It uses Yjs (CRDT) for conflict-free real-time sync, WebSockets for low-latency presence, and IndexedDB for offline persistence. Supports shapes, sticky notes, rich text, and a fully featured undo/redo tree across all connected users.",
    image:
      "https://images.unsplash.com/photo-1600267185393-1b14dbc14e37?w=800&h=500&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1600267185393-1b14dbc14e37?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=500&fit=crop",
    ],
    techStack: [
      "React",
      "Yjs",
      "WebSocket",
      "Canvas API",
      "Node.js",
      "IndexedDB",
    ],
    category: "Full-Stack",
    featured: true,
    liveUrl: "https://pulse-collab.dev",
    githubUrl: "https://github.com/alexchen/pulse",
    year: "2023",
    status: "completed",
  },
  {
    id: "4",
    slug: "spectra-3d-configurator",
    title: "Spectra 3D Configurator",
    tagline: "Configure products in real-time 3D",
    description:
      "A WebGL product configurator supporting real-time material swaps, lighting adjustments, and AR preview export.",
    longDescription:
      "Spectra is a 3D product configurator built with Three.js and React Three Fiber. It allows e-commerce brands to let customers customize colors, materials, and accessories in real time. Features PBR materials, HDRI lighting, geometry morphing, and a one-click AR export using WebXR. Integrated with a headless Shopify backend.",
    image:
      "https://images.unsplash.com/photo-1617802690992-15d93263d3a9?w=800&h=500&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1617802690992-15d93263d3a9?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=500&fit=crop",
    ],
    techStack: [
      "React Three Fiber",
      "Three.js",
      "Drei",
      "WebXR",
      "Shopify",
      "GLSL",
    ],
    category: "Frontend",
    featured: false,
    liveUrl: "https://spectra-3d.dev",
    githubUrl: "https://github.com/alexchen/spectra",
    year: "2023",
    status: "completed",
  },
  {
    id: "5",
    slug: "arc-mobile-finance",
    title: "Arc — Personal Finance",
    tagline: "Money management that sparks joy",
    description:
      "A cross-platform mobile finance app with transaction categorization, goal tracking, and spending insights.",
    longDescription:
      "Arc is a React Native finance app that connects to bank accounts via Plaid. It automatically categorizes transactions using a local ML model, visualizes spending patterns with custom animated charts, and helps users set and track savings goals. Features biometric auth, encrypted local storage, and offline-first architecture.",
    image:
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=500&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=500&fit=crop",
    ],
    techStack: [
      "React Native",
      "Expo",
      "TensorFlow Lite",
      "Plaid API",
      "SQLite",
      "Reanimated",
    ],
    category: "Mobile",
    featured: false,
    liveUrl: "https://arc-finance.dev",
    githubUrl: "https://github.com/alexchen/arc",
    year: "2023",
    status: "completed",
  },
  {
    id: "6",
    slug: "orbit-devops-platform",
    title: "Orbit DevOps Platform",
    tagline: "Deploy, monitor, and scale — one command",
    description:
      "A self-hosted PaaS alternative to Heroku with Git-push deploys, metrics, and automatic SSL.",
    longDescription:
      "Orbit is a lightweight PaaS built for small teams who want Heroku-like simplicity without the cost. It wraps Docker + Traefik to give one-command Git deployments, real-time log streaming, automatic Let's Encrypt SSL, horizontal scaling, and a clean web dashboard. Written in Go with a React frontend.",
    image:
      "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&h=500&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=800&h=500&fit=crop",
    ],
    techStack: ["Go", "Docker", "Traefik", "React", "SQLite", "WebSocket"],
    category: "Backend",
    featured: false,
    liveUrl: "https://orbit-paas.dev",
    githubUrl: "https://github.com/alexchen/orbit",
    year: "2022",
    status: "completed",
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getProjectsByCategory(category: ProjectCategory): Project[] {
  return projects.filter((p) => p.category === category);
}

export const allCategories: ProjectCategory[] = [
  "Full-Stack",
  "Frontend",
  "Backend",
  "Mobile",
  "AI/ML",
  "Open Source",
];
