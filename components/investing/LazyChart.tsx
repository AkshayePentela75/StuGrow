"use client";

import dynamic from "next/dynamic";
import { useInView } from "framer-motion";
import { useRef } from "react";

/**
 * Loads the chart code only when the chart area nears the viewport, then
 * renders it (Recharts animates the lines in on mount). The fixed-height
 * placeholder prevents layout shift.
 */
const PerformanceChart = dynamic(() => import("./PerformanceChart"), {
  ssr: false,
  loading: () => <ChartSkeleton />,
});

function ChartSkeleton() {
  return <div aria-hidden className="h-[29rem] rounded-lg bg-paper-raised shadow-float ring-1 ring-line sm:h-[37rem]" />;
}

export function LazyPerformanceChart() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px 200px 0px" });
  return <div ref={ref}>{inView ? <PerformanceChart /> : <ChartSkeleton />}</div>;
}
