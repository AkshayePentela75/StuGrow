"use client";

import Link from "next/link";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowUpRight, BookOpen, LineChart, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { pillars } from "@/content/site";
import { ease } from "@/lib/motion";
import { SectionHeading } from "@/components/ui/SectionHeading";

const icons = [Play, BookOpen, LineChart];
/** Bar heights as a share of the chart, echoing the logo's rising bars. */
const heights = [0.72, 0.86, 1];
const LINE_GAP = 26; // px between a bar's top and the growth line

export function Pillars() {
  const chartRef = useRef<HTMLDivElement>(null);
  const inView = useInView(chartRef, { once: true, margin: "0px 0px -20% 0px" });
  const reduce = useReducedMotion();
  const [size, setSize] = useState<{ w: number; h: number } | null>(null);

  useEffect(() => {
    const el = chartRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setSize({ w: e.contentRect.width, h: e.contentRect.height }));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Growth line: rises over each bar top and dips between them, like the logo.
  let line: { d: string; tip: { x: number; y: number; angle: number } } | null = null;
  if (size && size.w > 0) {
    const { w, h } = size;
    const gap = 20;
    const colW = (w - gap * 2) / 3;
    const edge = (i: number) => h - h * heights[i]; // bar i's top edge
    const left = (i: number) => (colW + gap) * i;
    // Stepped growth line: skims just above each bar (rising slightly), then
    // climbs through the gap to the next one. Never crosses a bar.
    const pts: [number, number][] = [[0, edge(0) - LINE_GAP + 34]];
    for (let i = 0; i < 3; i++) {
      pts.push([left(i) + 36, edge(i) - LINE_GAP]);
      if (i < 2) pts.push([left(i) + colW - 36, edge(i) - LINE_GAP - 14]);
    }
    pts.push([w - 12, edge(2) - LINE_GAP - 70]);
    const [ax, ay] = pts[pts.length - 2];
    const [bx, by] = pts[pts.length - 1];
    line = {
      d: pts.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)},${y.toFixed(1)}`).join(" "),
      tip: { x: bx, y: by, angle: (Math.atan2(by - ay, bx - ax) * 180) / Math.PI },
    };
  }

  const show = inView || reduce;

  return (
    <section aria-labelledby="pillars-title" className="surface-ink relative overflow-hidden section-y">
      <div aria-hidden className="grid-lines pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)]" />
      <div className="container-x relative">
        <SectionHeading
          id="pillars-title"
          title="Three ways in."
          intro="Follow along, learn with us, or watch us invest. Each one builds on the last."
        />

        <div className="relative mt-16 md:mt-24 md:pt-24">
          <div ref={chartRef} className="relative grid gap-4 md:h-[38rem] md:grid-cols-3 md:items-end md:gap-5">
            {pillars.map((p, i) => {
              const Icon = icons[i];
              return (
                <motion.div
                  key={p.href}
                  className="md:h-[var(--bar-h)]"
                  style={{ ["--bar-h" as string]: `${heights[i] * 100}%` }}
                  initial={{ opacity: 0, y: 64 }}
                  animate={show ? { opacity: 1, y: 0 } : undefined}
                  transition={{ duration: 0.9, delay: 0.1 + i * 0.12, ease: ease.out }}
                >
                  <Link
                    href={p.href}
                    className="group relative flex h-full flex-col overflow-hidden rounded-t-lg rounded-b-md bg-ink-soft p-6 shadow-float-dark ring-1 ring-white/5 transition-transform duration-500 ease-out active:scale-[0.985] md:rounded-b-none md:p-8 [@media(hover:hover)]:hover:-translate-y-2.5"
                  >
                    {/* Fill that rises like a bar on hover/focus. */}
                    <span
                      aria-hidden
                      className="absolute inset-0 origin-bottom scale-y-0 bg-mint transition-transform duration-500 ease-out group-hover:scale-y-100 group-focus-visible:scale-y-100"
                    />
                    <span className="relative flex items-center justify-between text-mint transition-colors duration-300 group-hover:text-ink-deep group-focus-visible:text-ink-deep">
                      <Icon aria-hidden className="size-7" strokeWidth={1.75} />
                      <ArrowUpRight
                        aria-hidden
                        className="size-6 transition-transform duration-300 ease-out group-hover:translate-x-1 group-hover:-translate-y-1"
                      />
                    </span>
                    <h3 className="wdth-condensed relative mt-6 text-display-md font-black text-paper transition-colors duration-300 group-hover:text-ink-deep group-focus-visible:text-ink-deep md:mt-8">
                      {p.title}
                    </h3>
                    <p className="relative mt-4 max-w-[32ch] text-body text-muted-dark transition-colors duration-300 group-hover:text-ink group-focus-visible:text-ink">
                      {p.summary}
                    </p>
                    <ul className="relative mt-6 space-y-2 border-t border-line-dark pt-5 text-small text-paper/85 transition-colors duration-300 group-hover:border-ink/20 group-hover:text-ink-deep group-focus-visible:text-ink-deep md:mt-auto">
                      {p.points.map((pt) => (
                        <li key={pt} className="flex items-start gap-2.5">
                          <svg viewBox="0 0 10 8" aria-hidden className="mt-2 size-2 shrink-0 text-mint transition-colors duration-300 group-hover:text-grow">
                            <path d="M5 0 10 8H0Z" fill="currentColor" />
                          </svg>
                          {pt}
                        </li>
                      ))}
                    </ul>
                    <span className="sr-only">, open the {p.title} page</span>
                  </Link>
                </motion.div>
              );
            })}

            {line && (
              <svg
                aria-hidden
                className="pointer-events-none absolute inset-0 hidden overflow-visible md:block"
                width={size!.w}
                height={size!.h}
                viewBox={`0 0 ${size!.w} ${size!.h}`}
              >
                <defs>
                  <clipPath id="pillar-draw">
                    <motion.rect
                      x={-20}
                      y={-200}
                      width={size!.w + 60}
                      height={size!.h + 400}
                      initial={{ scaleX: 0 }}
                      animate={show ? { scaleX: 1 } : undefined}
                      transition={{ duration: 1.6, delay: 0.5, ease: ease.inOut }}
                      style={{ transformOrigin: "0px 0px" }}
                    />
                  </clipPath>
                </defs>
                <g clipPath="url(#pillar-draw)">
                  <path d={line.d} fill="none" stroke="var(--ink)" strokeWidth={10} strokeLinejoin="round" strokeLinecap="round" />
                  <path d={line.d} fill="none" stroke="var(--mint)" strokeWidth={4} strokeLinejoin="round" strokeLinecap="round" />
                  <g transform={`translate(${line.tip.x} ${line.tip.y}) rotate(${line.tip.angle})`}>
                    <path d="M-4,-11 L14,0 L-4,11 Z" fill="var(--mint)" stroke="var(--ink)" strokeWidth={3} strokeLinejoin="round" />
                  </g>
                </g>
              </svg>
            )}
          </div>

          {/* x-axis */}
          <div aria-hidden className="hidden border-t border-mint/40 md:grid md:grid-cols-3 md:gap-5">
            {pillars.map((p) => (
              <span key={p.verb} className="flex items-center gap-2 pt-3 text-caption text-muted-dark">
                <span className="h-2 w-px bg-mint/60" />
                {p.verb}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
