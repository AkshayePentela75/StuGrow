"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { holdings, portfolio } from "@/content/portfolio";
import { ease } from "@/lib/motion";

/**
 * Allocation as a ranked bar list: one hue, direct labels, sorted by weight.
 * (Seven slices are easier to compare as bars than as a pie.) Bars grow from
 * the baseline with scaleX when scrolled into view.
 */
export function Allocation() {
  const ref = useRef<HTMLUListElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });

  const rows = [
    ...holdings.map((h) => ({ key: h.ticker, label: h.ticker, sub: h.sector, weight: h.weight })),
    ...(portfolio.cashWeight > 0 ? [{ key: "cash", label: "Cash", sub: "Uninvested", weight: portfolio.cashWeight }] : []),
  ].sort((a, b) => b.weight - a.weight);
  const max = Math.max(...rows.map((r) => r.weight));

  return (
    <figure className="h-full rounded-lg bg-paper-raised p-5 shadow-float ring-1 ring-line sm:p-8">
      <figcaption>
        <p className="font-display text-title font-bold wdth-semi">Allocation</p>
        <p className="mt-1 text-small text-muted">Share of the portfolio in each position.</p>
      </figcaption>
      <ul ref={ref} className="mt-7 space-y-4">
        {rows.map((r, i) => (
          <li key={r.key} className="grid grid-cols-[7rem_1fr_3rem] lg:grid-cols-[5.5rem_1fr_3rem] items-center gap-3">
            <span className="leading-tight">
              <span className="num block text-small font-semibold">{r.label}</span>
              <span className="block truncate text-caption text-muted">{r.sub}</span>
            </span>
            <span className="relative h-3 overflow-hidden rounded-r-[4px] bg-paper-sunk">
              <motion.span
                className="absolute inset-y-0 left-0 origin-left rounded-r-[4px]"
                style={{ width: `${(r.weight / max) * 100}%`, background: r.key === "cash" ? "var(--muted)" : "var(--grow)" }}
                initial={{ scaleX: 0 }}
                animate={inView ? { scaleX: 1 } : undefined}
                transition={{ duration: 0.9, delay: i * 0.06, ease: ease.out }}
              />
            </span>
            <span className="num text-right text-small font-semibold">{r.weight}%</span>
          </li>
        ))}
      </ul>
    </figure>
  );
}
