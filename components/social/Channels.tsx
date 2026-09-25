import { ArrowUpRight } from "lucide-react";
import { socials } from "@/content/site";
import type { SocialAccount } from "@/content/types";
import { hasLink, isPlaceholder } from "@/lib/placeholder";
import { cn } from "@/lib/cn";
import { BrandIcon, platformName } from "@/components/ui/BrandIcon";
import { Reveal, RevealItem } from "@/components/ui/Reveal";

/**
 * Three channel cards that overlap the hero's bottom edge. Each borrows one
 * signature move from its platform:
 *  TikTok    -> the cyan/red split of its logo pulls apart on hover
 *  Instagram -> its gradient blooms up from behind the icon
 *  YouTube   -> a red progress bar plays along the bottom
 */
export function Channels() {
  return (
    <Reveal as="ul" className="container-x relative z-10 -mt-28 grid gap-5 md:-mt-40 md:grid-cols-3">
      {socials.map((s, i) => (
        <RevealItem as="li" key={s.platform} className={cn(i === 1 && "md:mt-10", i === 2 && "md:mt-20")}>
          <ChannelCard account={s} />
        </RevealItem>
      ))}
    </Reveal>
  );
}

function ChannelCard({ account: s }: { account: SocialAccount }) {
  const live = hasLink(s.url);
  const name = platformName[s.platform];
  const handle = isPlaceholder(s.handle) ? null : s.handle;

  const skin = {
    tiktok: "bg-[var(--tiktok-ink)] text-white ring-white/10 shadow-float-dark",
    instagram: "bg-paper-raised text-ink ring-line shadow-float",
    youtube: "bg-paper-raised text-ink ring-line shadow-float",
  }[s.platform];

  const body = (
    <>
      {/* Platform-specific hover layer */}
      {s.platform === "instagram" && (
        <span
          aria-hidden
          className="absolute -left-10 -top-10 size-48 scale-50 rounded-full opacity-0 blur-2xl transition-[transform,opacity] duration-700 ease-out group-hover:scale-150 group-hover:opacity-25 group-focus-visible:scale-150 group-focus-visible:opacity-25"
          style={{ background: "var(--instagram-gradient)" }}
        />
      )}
      {s.platform === "youtube" && (
        <span aria-hidden className="absolute inset-x-0 bottom-0 h-1.5 bg-line">
          <span className="block h-full origin-left scale-x-[0.12] bg-[var(--youtube-red)] transition-transform duration-[1400ms] ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100" />
        </span>
      )}

      <span className="relative flex items-start justify-between">
        <span className="relative grid size-16 place-items-center">
          {s.platform === "tiktok" && (
            <>
              <BrandIcon platform="tiktok" className="absolute size-10 text-[var(--tiktok-cyan)] transition-transform duration-300 ease-out group-hover:-translate-x-1 group-hover:-translate-y-0.5" />
              <BrandIcon platform="tiktok" className="absolute size-10 text-[var(--tiktok-red)] transition-transform duration-300 ease-out group-hover:translate-x-1 group-hover:translate-y-0.5" />
              <BrandIcon platform="tiktok" className="absolute size-10 text-white" />
            </>
          )}
          {s.platform === "instagram" && (
            <span className="grid size-16 place-items-center rounded-[22px] p-[3px]" style={{ background: "var(--instagram-gradient)" }}>
              <span className="grid size-full place-items-center rounded-[19px] bg-paper-raised">
                <BrandIcon platform="instagram" className="size-7 text-ink" />
              </span>
            </span>
          )}
          {s.platform === "youtube" && (
            <span className="grid h-12 w-16 place-items-center rounded-[14px] bg-[var(--youtube-red)] text-white transition-transform duration-300 ease-out group-hover:scale-105">
              <svg viewBox="0 0 10 12" aria-hidden className="ml-0.5 size-4 fill-current">
                <path d="M0 0 10 6 0 12Z" />
              </svg>
            </span>
          )}
        </span>
        {live && (
          <ArrowUpRight aria-hidden className="size-6 opacity-70 transition-transform duration-300 ease-out group-hover:translate-x-1 group-hover:-translate-y-1" />
        )}
      </span>

      <span className="relative mt-auto block pt-14">
        <span className="wdth-condensed block font-display text-display-sm font-black">{name}</span>
        <span className={cn("mt-1 block text-small", s.platform === "tiktok" ? "text-white/60" : "text-muted")}>
          {handle ?? "Handle coming soon"}
        </span>
        <span className={cn("mt-4 block max-w-[34ch] text-body", s.platform === "tiktok" ? "text-white/80" : "text-ink/80")}>
          {s.blurb}
        </span>
        <span
          className={cn(
            "mt-6 inline-flex items-center gap-2 text-small font-semibold",
            !live && "opacity-60",
          )}
        >
          {live ? `Follow on ${name}` : "Link coming soon"}
        </span>
      </span>
    </>
  );

  const cls = cn(
    "group relative flex min-h-[25rem] flex-col overflow-hidden rounded-lg p-7 ring-1 md:p-8",
    skin,
    live && "transition-transform duration-500 ease-out hover:-translate-y-1.5 active:scale-[0.985]",
  );

  return live ? (
    <a href={s.url} target="_blank" rel="noopener noreferrer" className={cls} aria-label={`${name}${handle ? ` ${handle}` : ""} (opens in a new tab)`}>
      {body}
    </a>
  ) : (
    <div className={cls}>{body}</div>
  );
}
