import { siInstagram, siTiktok, siYoutube } from "simple-icons";
import type { SocialPlatform } from "@/content/types";

const icons = { tiktok: siTiktok, instagram: siInstagram, youtube: siYoutube } as const;

export const platformName: Record<SocialPlatform, string> = {
  tiktok: "TikTok",
  instagram: "Instagram",
  youtube: "YouTube",
};

export function BrandIcon({ platform, className }: { platform: SocialPlatform; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} fill="currentColor">
      <path d={icons[platform].path} />
    </svg>
  );
}
