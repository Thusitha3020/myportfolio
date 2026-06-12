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
  videoUrl?: string;
  award?: string;
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
    image: "/images/final_project1.jpeg",
    images: [
      "/images/final_project1.jpeg",
      "/images/final_project2.jpeg",
    ],
    techStack: ["Arduino Mega", "ESP8266 WiFi", "Inductive Proximity Sensor", "DHT22", "Embedded C++"],
    category: "Robotics",
    featured: true,
    githubUrl: "https://github.com/Thusitha3020/Autonomous-Factory-Inspection-Robot-DashBoard",
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
    image: "/images/carproject3.jpeg",
    images: [
      "/images/carproject1.jpeg",
      "/images/carproject2.jpeg",
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
    image: "/images/aroma_project1.jpg",
    images: [
      "/images/aroma_project1.jpg",
      "/images/aroma_project2.jpg",
    ],
    techStack: ["IoT", "Gas Sensors", "Automation", "ESP32", "Fans & Actuators"],
    category: "IoT",
    featured: true,
    year: "2024",
    status: "completed",
  },
  {
    id: "4",
    slug: "smart-door-lock",
    title: "Smart Access Control System",
    tagline: "RFID security automation",
    description:
      "A secure embedded security system integrating RFID authentication, keypad access, and real-time Bluetooth monitoring.",
    longDescription:
      "Developed a secure Smart Access Control System using Arduino Mega 2560, integrating RFID authentication, PIN-based access, Bluetooth communication, and automatic door control. The system enhances traditional door security by replacing physical keys with RFID cards and keypad authentication while maintaining real-time access logs. It features automatic door operation using an ultrasonic sensor, multi-level security with lockout protection after repeated failed attempts, EEPROM-based user data storage, OLED status display, and an Android Bluetooth dashboard for remote monitoring and management. The project demonstrates embedded systems development, sensor integration, wireless communication, actuator control, and real-time security automation.\n\nKey features include:\n- RFID and PIN-based authentication\n- Automatic door locking/unlocking\n- Real-time access logging\n- Bluetooth dashboard control\n- Failed-attempt lockout security\n- EEPROM-based credential storage\n- OLED status monitoring\n- Manual and automatic operation modes",
    image: "/images/smartAccess1.jpg",
    images: [
      "/images/smartAccess1.jpg",
      "/images/smartAccess2.jpg",
    ],
    techStack: [
      "Arduino Mega 2560",
      "RFID RC522 Module",
      "HC-05 Bluetooth Module",
      "HC-SR04 Ultrasonic Sensor",
      "SG90 Servo Motor",
      "4x4 Matrix Keypad",
      "OLED Display (SSD1306)",
      "EEPROM Data Storage",
      "Embedded C++"
    ],
    category: "Embedded",
    featured: true,
    githubUrl: "https://github.com/Thusitha3020/Smart_Security_Dashboard",
    videoUrl: "https://drive.google.com/drive/folders/11x1oXGsw_bjGOjhCCJxg24icrUiZi9qi?usp=sharing",
    year: "2026",
    status: "completed",
  },
  {
    id: "5",
    slug: "thinkfest-robotics-solution",
    title: "ThinkFest Robotics Solution",
    tagline: "Award-winning robotics prototype",
    description:
      "Competed against multiple teams with a novel robotics solution at ESOFT THINKFEST Hackathon 2025.",
    longDescription:
      "Developed as a team of four for the ESOFT THINKFEST Hackathon 2025. We competed against multiple teams with a novel robotics solution and were recognized as the Second Runner-Up in the Robotics Category for both innovation in design and excellence in technical implementation.",
    image: "/images/thinkfest1.jpg",
    images: [
      "/images/thinkfest1.jpg",
      "/images/thinkfest2.jpg",
    ],
    techStack: ["Robotics", "Embedded Systems", "Hardware Design", "C++", "Sensors & Actuators"],
    category: "Robotics",
    featured: true,
    award: "Second Runner-Up – Robotics Category (ESOFT THINKFEST 2025)",
    year: "2025",
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
