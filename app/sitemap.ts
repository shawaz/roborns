import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/company";

const PATHS = [
  "/",
  "/server",
  "/water",
  "/mineral",
  "/how-it-works",
  "/infrastructure",
  "/status",
  "/partners",
  "/sustainability",
  "/about",
  "/career",
  "/help",
  "/news",
  "/press",
  "/investors",
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
