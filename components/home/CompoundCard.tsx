"use client";

import { animate, motion, useReducedMotion } from "framer-motion";
import { useId, useLayoutEffect, useMemo, useRef, useState } from "react";
import { formatUsd } from "@/lib/format";
import { ease, spring } from "@/lib/motion";
import { cn } from "@/lib/cn";

/* The hero's working example: the same $100/month, started at 16 vs 26.
   Pure math, no claims about us. Tweak the assumptions here. */
const MONTHLY = 100;
const RATE = 0.07;
const END_AGE = 65;
const FIRST_AGE = 16;
const STARTS = [16, 26] as const;
type Start = (typeof STARTS)[number];

function valueAt(age: number, start: number) {
  if (age <= start) return 0;
  const n = (age - start) * 12;
  const r = RATE / 12;
  return MONTHLY * ((Math.pow(1 + r, n) - 1) / r);
}

const W = 560;
const H = 250;
const PAD_T = 16;
const ages = Array.from({ length: END_AGE - FIRST_AGE + 1 }, (_, i) => FIRST_AGE + i);
const MAX = valueAt(END_AGE, STARTS[0]);
const x = (age: number) => ((age - FIRST_AGE) / (END_AGE - FIRST_AGE)) * W;
const y = (v: number) => H - (v / MAX) * (H - PAD_T);

function linePath(start: number) {
  return ages.map((a, i) => `${i ? "L" : "M"}${x(a).toFixed(1)},${y(valueAt(a, start)).toFixed(1)}`).join(" ");
}

export function CompoundCard({ className }: { className?: string }) {
  const [start, setStart] = useState<Start>(16);
  const [hoverAge, setHoverAge] = useState<number | null>(null);
  const numberRef = useRef<HTMLSpanElement>(null);
  const shown = useRef(0);
  const firstRun = useRef(true);
  const reduce = useReducedMotion();
  const uid = useId().replace(/:/g, "");
  const paths = useMemo(() => Object.fromEntries(STARTS.map((s) => [s, linePath(s)])) as Record<Start, string>, []);

  const final = valueAt(END_AGE, start);
  const contributed = (END_AGE - start) * 12 * MONTHLY;

  // Count the headline figure between states (and up from 0 on first load).
  useLayoutEffect(() => {
    const node = numberRef.current;
    if (!node) return;
    const first = firstRun.current;
    firstRun.current = false;
    const from = shown.current;
    if (reduce) {
      node.textContent = formatUsd(final);
      shown.current = final;
      return;
    }
    const c = animate(from, final, {
      duration: first ? 1.8 : 0.9,
      delay: first ? 0.5 : 0,
      ease: ease.out,
      onUpdate: (v) => {
        node.textContent = formatUsd(v);
        shown.current = v;
      },
    });
    return () => c.stop();
  }, [final, reduce]);

  function onPointerMove(e: React.PointerEvent<SVGSVGElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    const t = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width));
    setHoverAge(Math.round(FIRST_AGE + t * (END_AGE - FIRST_AGE)));
  }

  const hoverVal = hoverAge != null ? valueAt(hoverAge, start) : 0;

  return (
    <div
      className={cn(
        "relative rounded-lg bg-paper-raised p-5 shadow-float ring-1 ring-ink/5 sm:p-7",
        className,
      )}
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p id={`${uid}-label`} className="text-small font-medium text-muted">
          $100 a month, starting at age
        </p>
        <div role="radiogroup" aria-labelledby={`${uid}-label`} className="flex rounded-full bg-paper-sunk p-1">
          {STARTS.map((s) => {
            const active = s === start;
            return (
              <button
                key={s}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => setStart(s)}
                className={cn(
                  "relative min-w-14 rounded-full px-4 py-1.5 text-small font-semibold transition-[color,transform] duration-200 ease-out active:scale-95",
                  active ? "text-paper" : "text-ink/70 hover:text-ink",
                )}
              >
                {active && (
                  <motion.span layoutId={`${uid}-pill`} transition={spring.snappy} className="absolute inset-0 rounded-full bg-ink" />
                )}
                <span className="num relative">{s}</span>
              </button>
            );
          })}
        </div>
      </div>

      <p className="mt-5 flex items-baseline gap-3" aria-live="polite">
        <span ref={numberRef} className="num text-display-sm font-bold tracking-[-0.03em] text-ink">
          {formatUsd(final)}
        </span>
        <span className="text-small text-muted">by {END_AGE}</span>
      </p>

      <div className="relative mt-4">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="block h-auto w-full touch-pan-y overflow-visible"
          role="img"
          aria-label={`Line chart: investing $100 a month from age ${start} grows to about ${formatUsd(final)} by ${END_AGE}, from ${formatUsd(contributed)} contributed.`}
          onPointerMove={onPointerMove}
          onPointerLeave={() => setHoverAge(null)}
        >
          <defs>
            <linearGradient id={`${uid}-fill`} x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="var(--grow)" stopOpacity="0.22" />
              <stop offset="100%" stopColor="var(--grow)" stopOpacity="0" />
            </linearGradient>
            <clipPath id={`${uid}-draw`}>
              <motion.rect
                x="0"
                y="-20"
                width={W + 20}
                height={H + 40}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.8, delay: 0.35, ease: ease.inOut }}
                style={{ transformOrigin: "0px 0px" }}
              />
            </clipPath>
          </defs>

          {/* Baseline + age gridlines */}
          {[16, 26, 40, 65].map((a) => (
            <line key={a} x1={x(a)} x2={x(a)} y1={PAD_T} y2={H} stroke="var(--line)" strokeDasharray="2 5" />
          ))}
          <line x1="0" x2={W} y1={H} y2={H} stroke="var(--line)" />

          <g clipPath={`url(#${uid}-draw)`}>
            {STARTS.map((s) => (
              <motion.path
                key={`area-${s}`}
                d={`${paths[s]} L${W},${H} L0,${H} Z`}
                fill={`url(#${uid}-fill)`}
                initial={false}
                animate={{ opacity: s === start ? 1 : 0 }}
                transition={{ duration: 0.4 }}
              />
            ))}
            {STARTS.map((s) => (
              <motion.path
                key={`line-${s}`}
                d={paths[s]}
                fill="none"
                strokeWidth={s === start ? 3 : 2}
                strokeLinecap="round"
                strokeLinejoin="round"
                stroke={s === start ? "var(--grow)" : "var(--muted)"}
                strokeDasharray={s === start ? undefined : "4 6"}
                initial={false}
                animate={{ opacity: s === start ? 1 : 0.45 }}
                transition={{ duration: 0.3 }}
              />
            ))}
            <motion.circle
              key={start}
              cx={x(END_AGE)}
              cy={y(final)}
              r="6"
              fill="var(--grow)"
              stroke="var(--paper-raised)"
              strokeWidth="3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            />
          </g>

          {hoverAge != null && (
            <g pointerEvents="none">
              <line x1={x(hoverAge)} x2={x(hoverAge)} y1={PAD_T} y2={H} stroke="var(--ink)" strokeOpacity="0.35" />
              <circle cx={x(hoverAge)} cy={y(hoverVal)} r="4.5" fill="var(--ink)" />
            </g>
          )}
        </svg>

        {hoverAge != null && (
          <div
            className="pointer-events-none absolute top-0 -translate-x-1/2 -translate-y-full rounded-sm bg-ink px-2.5 py-1.5 text-caption text-paper shadow-float"
            style={{ left: `${((hoverAge - FIRST_AGE) / (END_AGE - FIRST_AGE)) * 100}%` }}
          >
            <span className="num">Age {hoverAge}</span>
            <span className="num ml-2 font-semibold text-mint">{formatUsd(hoverVal)}</span>
          </div>
        )}

        <div className="mt-2 flex justify-between text-caption text-muted" aria-hidden>
          <span className="num">16</span>
          <span className="num">Age</span>
          <span className="num">65</span>
        </div>
      </div>

      <p className="mt-5 border-t border-line pt-4 text-small text-muted">
        You&rsquo;d put in <span className="num font-semibold text-ink">{formatUsd(contributed)}</span>. Compounding covers the
        rest.
        <span className="mt-1 block text-caption opacity-80">
          Assumes a 7% average yearly return, compounded monthly. An illustration, not a prediction.
        </span>
      </p>
    </div>
  );
}
