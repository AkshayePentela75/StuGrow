import type { Metadata } from "next";
import { site } from "@/content/site";
import { isPlaceholder } from "./placeholder";

/** Per-page metadata with full Open Graph (child openGraph replaces the parent's, so we rebuild it). */
export function pageMetadata(title: string, description: string, path: string): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: site.name,
      title: `${title} | ${site.name}`,
      description,
      url: path,
      locale: "en_US",
    },
    twitter: { card: "summary_large_image", title: `${title} | ${site.name}`, description },
  };
}

/**
 * Where "Sign up" buttons go: the signup form if set, else an email to the
 * team, else the schedule on the teaching page.
 */
export function signupHref(): string {
  if (!isPlaceholder(site.signupUrl)) return site.signupUrl;
  if (!isPlaceholder(site.email)) return `mailto:${site.email}?subject=${encodeURIComponent("Class signup")}`;
  return "/teaching#schedule";
}
