import Image from "next/image";
import { recentPosts } from "@/content/social";
import type { SocialPost } from "@/content/types";
import { formatDate } from "@/lib/format";
import { hasLink } from "@/lib/placeholder";
import { cn } from "@/lib/cn";
import { BrandIcon, platformName } from "@/components/ui/BrandIcon";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { SampleBadge } from "@/components/ui/SampleBadge";
import { SectionHeading } from "@/components/ui/SectionHeading";

const aspect: Record<SocialPost["kind"], string> = {
  short: "aspect-[4/5]",
  post: "aspect-square",
  video: "aspect-video",
};

/** Typographic covers until real thumbnails are provided. */
const cover = [
  "surface-ink",
  "bg-grow text-paper",
  "bg-paper-raised text-ink ring-1 ring-line",
  "surface-ink-deep",
  "bg-mint text-ink-deep",
  "bg-ink-soft text-paper",
];

export function PostGrid() {
  const { posts, isSample } = recentPosts;

  return (
    <section aria-labelledby="posts-title" className="section-y border-t border-line">
      <div className="container-x">
        <SectionHeading
          id="posts-title"
          size="sm"
          title="Recent posts"
          intro="A mix of shorts, carousels, and longer videos from every channel."
          aside={<SampleBadge show={isSample} className="text-muted" />}
        />

        {posts.length === 0 ? (
          <p className="mt-12 rounded-md border border-dashed border-line p-10 text-center text-muted">
            New posts show up here as soon as they&rsquo;re added.
          </p>
        ) : (
          <Reveal as="ul" className="mt-12 columns-1 gap-5 sm:columns-2 lg:columns-3 [&>li]:mb-5 [&>li]:break-inside-avoid">
            {posts.map((p, i) => {
              const live = hasLink(p.url);
              const Tag = live ? "a" : "div";
              return (
                <RevealItem as="li" key={`${p.title}-${i}`}>
                  <Tag
                    {...(live ? { href: p.url, target: "_blank", rel: "noopener noreferrer" } : {})}
                    className={cn(
                      "group relative flex flex-col justify-between overflow-hidden rounded-md p-6",
                      aspect[p.kind],
                      p.thumbnail ? "surface-ink" : cover[i % cover.length],
                      live && "shadow-raised transition-transform duration-500 ease-out hover:-translate-y-1 active:scale-[0.985]",
                    )}
                  >
                    {p.thumbnail && (
                      <>
                        <Image src={p.thumbnail} alt="" fill sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw" className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]" />
                        <div aria-hidden className="absolute inset-0 bg-ink/35 mix-blend-multiply" />
                        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      </>
                    )}
                    <span className="relative flex items-center justify-between text-small opacity-80">
                      <span className="inline-flex items-center gap-2">
                        <BrandIcon platform={p.platform} className="size-4" />
                        {platformName[p.platform]}
                      </span>
                      <time dateTime={p.date} className="num">{formatDate(p.date)}</time>
                    </span>
                    <span className="wdth-semi relative mt-10 block font-display text-title font-extrabold leading-[1.08] tracking-[-0.02em] md:text-[1.9rem]">
                      {p.title}
                    </span>
                  </Tag>
                </RevealItem>
              );
            })}
          </Reveal>
        )}
      </div>
    </section>
  );
}
