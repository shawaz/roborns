import type { Metadata } from "next";
import { SITE_URL } from "@/lib/company";

export function pageMeta({
  title,
  description,
  path,
  image,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
}): Metadata {
  const url = path === "/" ? SITE_URL : `${SITE_URL}${path}`;
  const images = image
    ? [{ url: image, alt: title }]
    : [{ url: "/logo.png", alt: "Roborns" }];

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url,
      siteName: "Roborns",
      type: "website",
      images,
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title,
      description,
      images: images.map((item) => item.url),
    },
  };
}
