import type { MetadataRoute } from "next";
import { getWork } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = (process.env.NEXT_PUBLIC_SITE_URL || "https://example.com");
  const staticRoutes = ["", "/about", "/skills", "/projects", "/services", "/contact"].map((path) => ({
    url: `${base}${path || "/"}`,
  }));
  const work = getWork().map((item) => ({ url: `${base}/projects/${item.slug}` }));
  return [...staticRoutes, ...work];
}
