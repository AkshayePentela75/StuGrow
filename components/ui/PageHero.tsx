import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Shared hero for interior pages. `lines` are the title's lines; each rises
 * in with the same CSS entrance as the homepage. `children` renders beside
 * or below the intro (page-specific moment).
 */
export function PageHero({
  lines,
  intro,
  tone = "ink",
  children,
  aside,
  className,
  bottomSpace = "normal",
}: {
  /** Rendered in a right-hand column on large screens. */
  aside?: ReactNode;
  lines: string[];
  intro: ReactNode;
  tone?: "ink" | "paper";
  children?: ReactNode;
  className?: string;
  /** "overlap" leaves extra room for content that overlaps the hero's bottom edge. */
  bottomSpace?: "normal" | "overlap";
}) {
  const dark = tone === "ink";
  return (
    <section
      aria-labelledby="page-title"
      className={cn("relative overflow-hidden", dark ? "surface-ink" : "", className)}
    >
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          className={cn(
            "absolute inset-0",
            dark
              ? "bg-[radial-gradient(55%_60%_at_90%_0%,rgb(119_190_155/0.22),transparent_70%),radial-gradient(40%_50%_at_0%_100%,rgb(10_34_50/0.9),transparent_70%)]"
              : "bg-[radial-gradient(55%_60%_at_90%_0%,rgb(119_190_155/0.25),transparent_70%)]",
          )}
        />
        <div
          className={cn(
            dark ? "grid-lines" : "grid-lines-light",
            "absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent)]",
          )}
        />
      </div>
      <div
        className={cn(
          "container-x relative pt-16 md:pt-24",
          bottomSpace === "overlap" ? "pb-40 md:pb-56" : "pb-20 md:pb-28",
        )}
      >
        <div className={cn(!!aside && "grid gap-14 lg:grid-cols-12 lg:items-center lg:gap-8")}>
          <div className={cn(!!aside && "lg:col-span-7")}>
            <h1
              id="page-title"
              className="wdth-condensed text-display-lg font-black [word-spacing:0.08em]"
            >
              {lines.map((l, i) => (
                <span key={l} className="block overflow-hidden pb-[0.05em]">
                  <span className="rise block" style={{ animationDelay: `${60 + i * 100}ms` }}>
                    {l}
                  </span>
                </span>
              ))}
            </h1>
            <div className="fade-up mt-8 max-w-[52ch] text-lead opacity-85" style={{ animationDelay: "220ms" }}>
              {intro}
            </div>
          </div>
          {aside && <div className="lg:col-span-5">{aside}</div>}
        </div>
        {children}
      </div>
    </section>
  );
}
