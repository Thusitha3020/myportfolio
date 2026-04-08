import type { Metadata } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://thusitha3020.github.io/myportfolio";

interface MetadataOptions {
  title?: string;
  description?: string;
  image?: string;
  icons?: string;
  path?: string;
  noIndex?: boolean;
}

const defaults = {
  name: "Thusitha Sampath Perera",
  title: "Thusitha Sampath Perera — Robotics & IoT Engineer",
  description:
    "Robotics & IoT Enthusiast building autonomous systems, smart factory solutions, and embedded hardware. IT Undergraduate specialized in Robotics.",
  siteName: "Thusitha Sampath Perera Portfolio",
  url: "https://thusitha-dev.dev",
  twitterHandle: "@thusitha_dev",
};

export function createMetadata({
  title = "Thusitha Sampath Perera — Robotics & IoT Engineer",
  description = "Robotics and IoT solutions designed for real environments. Focus on autonomous systems, hardware/software integration, and industrial inspection.",
  image = "/og-image.png",
  icons = "/favicon.ico",
  path = "",
  noIndex = false,
}: MetadataOptions = {}): Metadata {
  const url = `${BASE_URL}${path}`;

  return {
    title: {
      default: title,
      template: `%s | Thusitha S. Perera`,
    },
    description,
    keywords: [
      "Robotics Engineer",
      "IoT Developer",
      "Autonomous Systems",
      "Embedded Systems",
      "Sri Lanka",
      "Thusitha Sampath Perera",
    ],
    authors: [
      {
        name: "Thusitha Sampath Perera",
        url: "https://github.com/thusitha3020",
      },
    ],
    metadataBase: new URL(BASE_URL),
    ...(noIndex && { robots: { index: false, follow: false } }),
    openGraph: {
      title,
      description,
      url,
      siteName: defaults.siteName,
      locale: "en_US",
      type: "website",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: defaults.twitterHandle,
    },
    alternates: {
      canonical: url,
    },
  };
}
