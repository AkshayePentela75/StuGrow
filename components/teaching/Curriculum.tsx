"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Clock } from "lucide-react";
import { useId, useState } from "react";
import { curriculum } from "@/content/curriculum";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/cn";
import { SampleBadge } from "@/components/ui/SampleBadge";
import { Reveal, RevealItem } from "@/components/ui/Reveal";

/**
 * Units -> lessons, rendered from content/curriculum.ts. Units are a real
 * sequence, so they're numbered. Panels open instantly (no height tween);
 * the lessons inside fade/slide in with a short stagger.
 */
export function Curriculum() {
  const { units, isSample } = curriculum;
  const [open, setOpen] = useState<Set<string>>(() => new Set(units[0] ? [units[0].id] : []));
  const uid = useId();
  const allOpen = open.size === units.length;
  const lessonCount = units.reduce((n, u) => n + u.lessons.length, 0);

  const toggle = (id: string) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  return (
    <section id="curriculum" aria-labelledby="curriculum-title" className="section-y">
      <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4 lg:sticky lg:top-28 lg:self-start">
          <h2 id="curriculum-title" className="wdth-semi text-display-md">
            What we cover
          </h2>
          <p className="mt-5 max-w-[40ch] text-body text-ink/80">
            The course moves from how markets work to the money decisions you&rsquo;ll make every day. Open a unit to see
            its lessons.
          </p>
          <dl className="mt-8 flex gap-10">
            <div>
              <dt className="text-small text-muted">Units</dt>
              <dd className="num text-display-sm font-semibold">{units.length}</dd>
            </div>
            <div>
              <dt className="text-small text-muted">Lessons</dt>
              <dd className="num text-display-sm font-semibold">{lessonCount}</dd>
            </div>
          </dl>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={() => setOpen(allOpen ? new Set() : new Set(units.map((u) => u.id)))}
              className="link-grow text-small font-semibold text-grow"
            >
              {allOpen ? "Collapse all units" : "Expand all units"}
            </button>
            <SampleBadge show={isSample} className="text-muted" />
          </div>
        </div>

        <Reveal as="ol" className="border-t border-ink lg:col-span-8">
          {units.map((u, i) => {
            const isOpen = open.has(u.id);
            const panelId = `${uid}-${u.id}`;
            return (
              <RevealItem as="li" key={u.id} className="border-b border-line">
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggle(u.id)}
                    className="group grid w-full grid-cols-[3.5rem_1fr_auto] items-start gap-4 py-7 text-left transition-transform duration-150 ease-out active:scale-[0.995] md:grid-cols-[5rem_1fr_auto] md:py-9"
                  >
                    <span className={cn("num pt-1 text-title font-semibold transition-colors duration-200", isOpen ? "text-grow" : "text-muted")}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>
                      <span className="wdth-semi block font-display text-[clamp(1.6rem,1.2rem+1.6vw,2.5rem)] font-extrabold leading-[1.05] tracking-[-0.025em] transition-colors duration-200 group-hover:text-grow">
                        {u.title}
                      </span>
                      <span className="mt-2 block max-w-[52ch] font-body text-body font-normal text-ink/75">{u.summary}</span>
                    </span>
                    <span
                      className={cn(
                        "mt-1 grid size-10 place-items-center rounded-full ring-1 transition-[transform,background-color,color] duration-300 ease-out",
                        isOpen ? "rotate-180 bg-ink text-paper ring-ink" : "ring-line group-hover:bg-paper-sunk",
                      )}
                    >
                      <ChevronDown aria-hidden className="size-5" />
                    </span>
                  </button>
                </h3>
                <div id={panelId} role="region" aria-label={`${u.title} lessons`} hidden={!isOpen}>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.ul
                        className="grid gap-2 pb-9 pl-[4.5rem] md:pl-[6rem]"
                        initial="hidden"
                        animate="show"
                        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.04 } } }}
                      >
                        {u.lessons.map((l, j) => (
                          <motion.li
                            key={l.title}
                            variants={{
                              hidden: { opacity: 0, y: 8 },
                              show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: ease.out } },
                            }}
                            className="flex items-center justify-between gap-4 rounded-sm bg-paper-raised px-4 py-3.5 shadow-raised ring-1 ring-line"
                          >
                            <span className="flex items-baseline gap-3">
                              <span className="num text-caption text-muted">
                                {i + 1}.{j + 1}
                              </span>
                              <span className="text-body font-medium leading-snug">{l.title}</span>
                            </span>
                            {l.duration && (
                              <span className="flex shrink-0 items-center gap-1.5 text-caption text-muted">
                                <Clock aria-hidden className="size-3.5" />
                                {l.duration}
                              </span>
                            )}
                          </motion.li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </div>
              </RevealItem>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
