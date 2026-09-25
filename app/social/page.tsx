import { site } from "@/content/site";
import { pageMetadata } from "@/lib/site-helpers";
import { PageTransition } from "@/components/layout/PageTransition";
import { PageHero } from "@/components/ui/PageHero";
import { Channels } from "@/components/social/Channels";
import { LatestVideo } from "@/components/social/LatestVideo";
import { PostGrid } from "@/components/social/PostGrid";

export const metadata = pageMetadata(
  "Social",
  `Finance breakdowns from ${site.name} on TikTok, Instagram, and YouTube: markets, money, and what it means for students.`,
  "/social",
);

export default function SocialPage() {
  return (
    <PageTransition>
      <PageHero
        lines={["Finance,", "in your feed."]}
        intro="We turn the week's market news and everyday money questions into short videos and posts you can get through before class."
        bottomSpace="overlap"
      />
      <Channels />
      <LatestVideo />
      <PostGrid />
    </PageTransition>
  );
}
