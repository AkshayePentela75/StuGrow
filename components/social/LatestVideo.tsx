"use client";

import { useState } from "react";
import { latestVideo } from "@/content/social";
import { socials } from "@/content/site";
import { isPlaceholder } from "@/lib/placeholder";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { VideoThumb } from "@/components/ui/VideoThumb";
import { Reveal, RevealItem } from "@/components/ui/Reveal";

/**
 * Featured YouTube video. Loads only a thumbnail until clicked (no iframe
 * weight on page load), then swaps in a privacy-enhanced embed that autoplays.
 */
export function LatestVideo() {
  const [playing, setPlaying] = useState(false);
  const hasVideo = !isPlaceholder(latestVideo.id);
  const youtube = socials.find((s) => s.platform === "youtube");
  const title = hasVideo && !isPlaceholder(latestVideo.title) ? latestVideo.title : "Our next breakdown lands here";
  const description =
    hasVideo && !isPlaceholder(latestVideo.description)
      ? latestVideo.description
      : "We post a new deep dive on YouTube regularly. Subscribe so you catch it the day it goes up.";

  return (
    <section id="latest" aria-labelledby="latest-title" className="section-y">
      <Reveal className="container-x grid items-end gap-10 lg:grid-cols-12 lg:gap-12">
        <RevealItem className="lg:col-span-8">
          <div className="overflow-hidden rounded-lg shadow-float ring-1 ring-line">
            {hasVideo && playing ? (
              <div className="relative aspect-video bg-ink">
                <iframe
                  className="absolute inset-0 size-full"
                  src={`https://www.youtube-nocookie.com/embed/${latestVideo.id}?autoplay=1&rel=0`}
                  title={title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            ) : hasVideo ? (
              <button
                type="button"
                onClick={() => setPlaying(true)}
                className="group block w-full cursor-pointer text-left"
                aria-label={`Play video: ${title}`}
              >
                <VideoThumb videoId={latestVideo.id} title={title} sizes="(min-width:1024px) 66vw, 100vw" />
              </button>
            ) : (
              <div className="group relative">
                <VideoThumb videoId={null} title="Video coming soon" />
                <span className="absolute bottom-4 left-4 rounded-full bg-paper/95 px-3 py-1 text-caption font-semibold text-ink">
                  Coming soon
                </span>
              </div>
            )}
          </div>
        </RevealItem>

        <div className="lg:col-span-4">
          <RevealItem as="p" className="text-small text-muted">
            Latest video
          </RevealItem>
          <RevealItem as="h2" id="latest-title" className="wdth-semi mt-3 text-display-sm">
            {title}
          </RevealItem>
          <RevealItem as="p" className="mt-5 text-body text-ink/80">
            {description}
          </RevealItem>
          <RevealItem className="mt-8">
            <ButtonLink
              href={hasVideo ? `https://www.youtube.com/watch?v=${latestVideo.id}` : (youtube?.url ?? "TODO_")}
              pendingLabel="Channel link coming soon"
            >
              {hasVideo ? "Watch on YouTube" : "Go to our channel"}
            </ButtonLink>
          </RevealItem>
        </div>
      </Reveal>
    </section>
  );
}
