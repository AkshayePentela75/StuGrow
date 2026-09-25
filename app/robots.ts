import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { isPlaceholder } from "@/lib/placeholder";

export default function robots(): MetadataRoute.Robots {
  const base = isPlaceholder(site.url) ? "http://localhost:3000" : site.url;
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${base}/sitemap.xml`,
  };
}
