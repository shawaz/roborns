import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/company";

const PATHS = [
  "/",
  "/server",
  "/water",
  "/mineral",
  "/infrastructure",
  "/career",
  "/help",
  "/news",
  "/about",
  "/contact",
  "/legal",
  "/privacy",
  "/terms",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return PATHS.map((path) => ({
    url: path === "/" ? SITE_URL : `${SITE_URL}${path}`,
    lastModified: new Date("2026-07-05"),
  }));
}
