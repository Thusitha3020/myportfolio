import type { Metadata } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://portfolio.dev";

interface MetadataOptions {
  title?: string;
  description?: string;
  image?: string;
  path?: string;
  noIndex?: boolean;
}

const defaults = {
  name: "Alex Chen",
  title: "Full-Stack Engineer & Creative Developer",
  description:
    "Full-Stack Engineer specializing in scalable web applications, creative interfaces, and modern developer experiences. Explore my portfolio of projects.",
  image: "/og-image.png",
};

export function createMetadata(options: MetadataOptions = {}): Metadata {
  const {
    title,
    description = defaults.description,
    image = defaults.image,
    path = "",
    noIndex = false,
  } = options;

  const fullTitle = title
    ? `${title} | ${defaults.name}`
    : `${defaults.name} — ${defaults.title}`;

  const url = `${BASE_URL}${path}`;

  return {
    title: fullTitle,
    description,
    metadataBase: new URL(BASE_URL),
    ...(noIndex && { robots: { index: false, follow: false } }),
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: defaults.name,
      locale: "en_US",
      type: "website",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
      creator: "@alexchen",
    },
    alternates: {
      canonical: url,
    },
  };
}
