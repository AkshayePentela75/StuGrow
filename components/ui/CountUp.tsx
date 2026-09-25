"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useLayoutEffect, useRef } from "react";
import { formatPct, formatUsd } from "@/lib/format";

const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

/** Named formats (serializable, so server components can pass them). */
const formats = {
  int: (n: number) => Math.round(n).toLocaleString("en-US"),
  usd: (n: number) => formatUsd(n),
  pct: (n: number) => formatPct(n),
  pts: (n: number) => `${formatPct(n)} pts`,
};

interface CountUpProps {
  value: number;
  format?: keyof typeof formats;
  duration?: number;
  delay?: number;
  className?: string;
}

/**
 * Animated number. Server-renders the final value (SEO, no-JS, reduced
 * motion), then on the client rewinds to 0 before paint and counts up once
 * scrolled into view. Writes straight to textContent: no React re-renders.
 */
export function CountUp({
  value,
  format: formatName = "int",
  duration = 1.6,
  delay = 0,
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduce = useReducedMotion();
  const format = formats[formatName];

  useIsoLayoutEffect(() => {
    if (!reduce && ref.current) ref.current.textContent = format(0);
  }, [reduce, format]);

  useEffect(() => {
    if (!inView || reduce || !ref.current) return;
    const node = ref.current;
    const controls = animate(0, value, {
      duration,
      delay,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        node.textContent = format(v);
      },
    });
    return () => controls.stop();
  }, [inView, reduce, value, duration, delay, format]);

  return (
    <span ref={ref} className={className}>
      {format(value)}
    </span>
  );
}
