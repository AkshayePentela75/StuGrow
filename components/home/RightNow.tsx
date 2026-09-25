import Link from "next/link";
import { ArrowUpRight, CalendarDays } from "lucide-react";
import { latestVideo } from "@/content/social";
import { schedule } from "@/content/schedule";
import { isPlaceholder } from "@/lib/placeholder";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { VideoThumb } from "@/components/ui/VideoThumb";

/** Two live entry points: the newest video and the next open class. */
export function RightNow() {
  const hasVideo = !isPlaceholder(latestVideo.id);
  const nextClass = schedule.sessions.find((s) => s.open && !isPlaceholder(s.name));

  return (
    <section aria-labelledby="now-title" className="section-y relative bg-paper-sunk/60">
      <div className="container-x">
        <h2 id="now-title" className="wdth-semi text-display-sm">
          Happening now
        </h2>
        <Reveal className="mt-10 grid gap-5 md:grid-cols-12">
          <RevealItem className="md:col-span-7">
            <Link
              href="/social#latest"
              className="group block h-full overflow-hidden rounded-lg bg-paper-raised shadow-raised ring-1 ring-line transition-[transform,box-shadow] duration-500 ease-out hover:-translate-y-1 hover:shadow-float active:scale-[0.99]"
            >
              <VideoThumb videoId={hasVideo ? latestVideo.id : null} title="Latest video" sizes="(min-width: 768px) 58vw, 100vw" />
              <div className="flex items-end justify-between gap-6 p-6 md:p-7">
                <div>
                  <p className="text-small text-muted">Latest video</p>
                  <p className="mt-1 font-display text-title font-bold wdth-semi">
                    {hasVideo && !isPlaceholder(latestVideo.title) ? latestVideo.title : "Our newest breakdown is on its way"}
                  </p>
                </div>
                <ArrowUpRight aria-hidden className="size-6 shrink-0 text-grow transition-transform duration-300 ease-out group-hover:translate-x-1 group-hover:-translate-y-1" />
              </div>
            </Link>
          </RevealItem>

          {nextClass && (
            <RevealItem className="md:col-span-5">
              <Link
                href="/teaching#schedule"
                className="surface-ink group relative flex h-full min-h-80 flex-col overflow-hidden rounded-lg p-7 shadow-float transition-transform duration-500 ease-out hover:-translate-y-1 active:scale-[0.99] md:p-9"
              >
                <div aria-hidden className="grid-lines absolute inset-0" />
                <div aria-hidden className="absolute -right-16 -top-16 size-64 rounded-full bg-mint/20 blur-3xl transition-transform duration-700 ease-out group-hover:scale-125" />
                <p className="relative flex items-center gap-2 text-small text-muted-dark">
                  <CalendarDays aria-hidden className="size-4 text-mint" />
                  Next class
                </p>
                <p className="wdth-condensed relative mt-4 font-display text-display-sm font-black">{nextClass.name}</p>
                <p className="relative mt-3 text-body text-muted-dark">
                  {nextClass.day}, {nextClass.time}. {nextClass.location}
                  {nextClass.audience ? `, ${nextClass.audience.toLowerCase()}` : ""}.
                </p>
                <div className="relative mt-auto flex items-center justify-between pt-8">
                  {nextClass.badge && (
                    <span className="rounded-full bg-mint px-3 py-1 text-small font-semibold text-ink-deep">{nextClass.badge}</span>
                  )}
                  <ArrowUpRight aria-hidden className="ml-auto size-6 text-mint transition-transform duration-300 ease-out group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>
              </Link>
            </RevealItem>
          )}
        </Reveal>
      </div>
    </section>
  );
}
