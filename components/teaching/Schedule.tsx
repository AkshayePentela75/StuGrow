import { MapPin, Video } from "lucide-react";
import { schedule } from "@/content/schedule";
import { hasLink, isPlaceholder } from "@/lib/placeholder";
import { signupHref } from "@/lib/site-helpers";
import { cn } from "@/lib/cn";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { SampleBadge } from "@/components/ui/SampleBadge";

/**
 * Class times as a departure board: one row per recurring class, with a
 * live status. Rows collapse to stacked cards on small screens.
 */
export function Schedule() {
  const sessions = schedule.sessions.filter((s) => !isPlaceholder(s.name));
  const href = signupHref();

  return (
    <section id="schedule" aria-labelledby="schedule-title" className="surface-ink relative overflow-hidden section-y">
      <div aria-hidden className="grid-lines pointer-events-none absolute inset-0 [mask-image:radial-gradient(90%_80%_at_50%_40%,black,transparent)]" />
      <div className="container-x relative">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <h2 id="schedule-title" className="wdth-semi text-display-md">
            Class times
          </h2>
          <SampleBadge show={schedule.isSample} className="text-muted-dark" />
        </div>

        {sessions.length === 0 ? (
          <p className="mt-12 rounded-md border border-dashed border-line-dark p-10 text-center text-muted-dark">
            New class times are posted here first. Check back soon.
          </p>
        ) : (
          <div className="mt-12 overflow-hidden rounded-lg bg-ink-deep shadow-float-dark ring-1 ring-line-dark">
            {/* Board header (desktop) */}
            <div
              aria-hidden
              className="hidden grid-cols-[1.1fr_1.1fr_2fr_1fr_1fr_auto] gap-6 border-b border-line-dark px-8 py-4 text-caption text-muted-dark lg:grid"
            >
              <span>Day</span>
              <span>Time</span>
              <span>Class</span>
              <span>Level</span>
              <span>Where</span>
              <span className="w-36 text-right">Status</span>
            </div>
            <Reveal as="ul">
              {sessions.map((s) => (
                <RevealItem
                  as="li"
                  key={s.id}
                  className="grid gap-x-6 gap-y-3 border-b border-line-dark px-6 py-7 last:border-b-0 lg:grid-cols-[1.1fr_1.1fr_2fr_1fr_1fr_auto] lg:items-center lg:px-8"
                >
                  <p className="num text-title font-semibold text-mint lg:text-lead">
                    <span className="sr-only">Day: </span>
                    {s.day}
                  </p>
                  <p className="num text-lead font-semibold">
                    <span className="sr-only">Time: </span>
                    {s.time}
                  </p>
                  <div>
                    <p className="wdth-semi font-display text-title font-bold leading-tight">{s.name}</p>
                    {(s.audience || s.note) && (
                      <p className="mt-1 text-small text-muted-dark">{[s.audience, s.note].filter(Boolean).join(". ")}</p>
                    )}
                  </div>
                  <p className="text-small">
                    <span className="text-muted-dark lg:sr-only">Level: </span>
                    {s.level}
                  </p>
                  <p className="flex items-center gap-2 text-small">
                    {s.location.toLowerCase() === "online" ? (
                      <Video aria-hidden className="size-4 text-mint" />
                    ) : (
                      <MapPin aria-hidden className="size-4 text-mint" />
                    )}
                    {hasLink(s.link) ? (
                      <a href={s.link} target="_blank" rel="noopener noreferrer" className="link-underline">
                        {s.location}
                      </a>
                    ) : (
                      s.location
                    )}
                  </p>
                  <div className="flex flex-wrap items-center gap-3 lg:w-36 lg:flex-col lg:items-end">
                    <span
                      className={cn(
                        "inline-flex items-center gap-2 rounded-full px-3 py-1 text-caption font-semibold",
                        s.open ? "bg-mint/15 text-mint" : "bg-white/5 text-muted-dark",
                      )}
                    >
                      <span className="relative flex size-2">
                        {s.open && <span className="absolute inset-0 animate-ping rounded-full bg-mint opacity-60 motion-reduce:hidden" />}
                        <span className={cn("relative size-2 rounded-full", s.open ? "bg-mint" : "bg-muted-dark")} />
                      </span>
                      {s.open ? "Signup open" : "Closed"}
                    </span>
                    {s.open && s.badge && <span className="text-caption text-paper/80">{s.badge}</span>}
                  </div>
                </RevealItem>
              ))}
            </Reveal>
          </div>
        )}

        <div className="mt-10 flex flex-wrap items-center gap-4">
          {sessions.some((s) => s.open) && !href.startsWith("/teaching") && <ButtonLink href={href}>Sign up for a class</ButtonLink>}
          <p className="text-small text-muted-dark">All times are Eastern. Spots are limited.</p>
        </div>
      </div>
    </section>
  );
}
