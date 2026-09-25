import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { isPlaceholder } from "@/lib/placeholder";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = isPlaceholder(site.url) ? "http://localhost:3000" : site.url;
  return ["", "/social", "/teaching", "/investing"].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "/investing" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.8,
  }));
}
