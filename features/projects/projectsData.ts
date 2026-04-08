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
  | "Robotics"
  | "IoT"
  | "Embedded"
  | "AI/ML"
  | "Full-Stack";

export const projects: Project[] = [
  {
    id: "1",
    slug: "factory-inspection-robot",
    title: "Autonomous Factory Inspection Robot",
    tagline: "Intelligent industrial monitoring",
    description:
      "A mobile robot designed to operate inside industrial environments and monitor safety conditions without human involvement.",
    longDescription:
      "This project involves building an autonomous mobile robot capable of independent navigation within a factory environment. It features real-time machine condition checks, metal hazard detection using inductive proximity sensors, and industrial temperature monitoring via DHT22. The system integrates an ESP8266 WiFi module to send instant IoT alerts to a remote dashboard. \n\nKey features include:\n- Independent movement across factory floors\n- Metal hazard detection\n- Real-time temperature monitoring\n- Automated IoT problem alerts",
    image:
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=500&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=500&fit=crop",
    ],
    techStack: ["Arduino Mega", "ESP8266 WiFi", "Inductive Proximity Sensor", "DHT22", "Embedded C++"],
    category: "Robotics",
    featured: true,
    year: "2024 – 2025",
    status: "completed",
  },
  {
    id: "2",
    slug: "smart-traffic-lights",
    title: "Smart Traffic Light System + R/C Cars",
    tagline: "Automated urban mobility",
    description:
      "An automated traffic control setup where signals change based on programmed logic and interact with moving vehicles.",
    longDescription:
      "A group project focused on the implementation of a Smart Traffic Light System integrated with miniature R/C cars. The project involved creating advanced signal timing logic to optimize traffic flow based on real-time hardware status. \n\nWhat I worked on:\n- Signal timing logic development\n- Microcontroller programming\n- Hardware setup and assembly",
    image:
      "https://images.unsplash.com/photo-1590432805510-09374ee3238a?w=800&h=500&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1590432805510-09374ee3238a?w=800&h=500&fit=crop",
    ],
    techStack: ["Microcontrollers", "Timing Logic", "Hardware Integration", "Embedded C"],
    category: "Embedded",
    featured: true,
    year: "2025",
    status: "completed",
  },
  {
    id: "3",
    slug: "iot-aroma-remover",
    title: "IoT-Based Aroma Removal System",
    tagline: "Smart environment automation",
    description:
      "An automated air quality system that detects unpleasant gases and automatically activates a removal mechanism.",
    longDescription:
      "This IoT project focuses on environmental air management. The system uses Gas sensors to detect pollutants and automatically triggers a multi-stage removal process. \n\nFeatures include:\n- Detection of unpleasant gases\n- Automated fan system activation\n- Automatic air freshener release\n- Remote IoT status updates",
    image:
      "https://images.unsplash.com/photo-1585776245991-cf89dd7fc73a?w=800&h=500&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1585776245991-cf89dd7fc73a?w=800&h=500&fit=crop",
    ],
    techStack: ["IoT", "Gas Sensors", "Automation", "ESP32", "Fans & Actuators"],
    category: "IoT",
    featured: true,
    year: "2024",
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
  "Robotics",
  "IoT",
  "Embedded",
  "AI/ML",
  "Full-Stack",
];
