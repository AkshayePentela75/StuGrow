"use client";

import { motion } from "framer-motion";
import { useId, useMemo, useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  type TooltipContentProps,
} from "recharts";
import type { NameType, ValueType } from "recharts/types/component/DefaultTooltipContent";
import { performance, portfolio } from "@/content/portfolio";
import { formatDate, formatPct } from "@/lib/format";
import { spring } from "@/lib/motion";
import { useTokens } from "@/lib/tokens";
import { cn } from "@/lib/cn";

const RANGES = [
  { key: "6M", months: 6 },
  { key: "1Y", months: 12 },
  { key: "All", months: Infinity },
] as const;
type RangeKey = (typeof RANGES)[number]["key"];

/**
 * Growth of the portfolio vs. its benchmark, both rebased to 0% at the start
 * of the selected range. One axis, two validated colors, dashed benchmark,
 * direct end labels + legend, crosshair tooltip.
 */
export default function PerformanceChart() {
  const [range, setRange] = useState<RangeKey>("All");
  const uid = useId();
  const t = useTokens(["--chart-portfolio", "--chart-benchmark", "--chart-grid", "--chart-axis", "--ink"] as const);

  const data = useMemo(() => {
    const months = RANGES.find((r) => r.key === range)!.months;
    const slice = months === Infinity ? performance : performance.slice(-(months + 1));
    const p0 = slice[0]!.portfolio;
    const b0 = slice[0]!.benchmark;
    return slice.map((d) => ({
      date: d.date,
      portfolio: (d.portfolio / p0 - 1) * 100,
      benchmark: (d.benchmark / b0 - 1) * 100,
    }));
  }, [range]);

  const last = data[data.length - 1]!;
  // Keep end labels from colliding: whichever line ends higher gets the upper label.
  const usAbove = last.portfolio >= last.benchmark;

  return (
    <figure className="rounded-lg bg-paper-raised p-5 shadow-float ring-1 ring-line sm:p-8">
      <div className="flex flex-wrap items-start justify-between gap-5">
        <figcaption>
          <p className="font-display text-title font-bold wdth-semi">Performance</p>
          <p className="mt-1 text-small text-muted">Change since the start of the period, monthly.</p>
        </figcaption>
        <div role="radiogroup" aria-label="Time range" className="flex rounded-full bg-paper-sunk p-1">
          {RANGES.map((r) => {
            const active = r.key === range;
            return (
              <button
                key={r.key}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => setRange(r.key)}
                className={cn(
                  "relative min-w-12 rounded-full px-3.5 py-1.5 text-small font-semibold transition-[color,transform] duration-200 active:scale-95",
                  active ? "text-paper" : "text-ink/70 hover:text-ink",
                )}
              >
                {active && <motion.span layoutId={`${uid}-range`} transition={spring.snappy} className="absolute inset-0 rounded-full bg-ink" />}
                <span className="relative">{r.key}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Legend with values: identity never relies on color alone. */}
      <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-2 text-small">
        <li className="flex items-center gap-2.5">
          <svg width="22" height="4" aria-hidden><line x1="1" x2="21" y1="2" y2="2" stroke={t["--chart-portfolio"]} strokeWidth="3" strokeLinecap="round" /></svg>
          <span className="text-muted">Our portfolio</span>
          <span className="num font-semibold text-ink">{formatPct(last.portfolio)}</span>
        </li>
        <li className="flex items-center gap-2.5">
          <svg width="22" height="4" aria-hidden><line x1="1" x2="21" y1="2" y2="2" stroke={t["--chart-benchmark"]} strokeWidth="2" strokeDasharray="4 4" /></svg>
          <span className="text-muted">{portfolio.benchmarkName}</span>
          <span className="num font-semibold text-ink">{formatPct(last.benchmark)}</span>
        </li>
      </ul>

      <div className="mt-4 h-72 sm:h-96" role="img" aria-label={`Line chart. Over the selected period our portfolio changed ${formatPct(last.portfolio)} and the ${portfolio.benchmarkName} changed ${formatPct(last.benchmark)}.`}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 12, right: 72, bottom: 0, left: 0 }}>
            <CartesianGrid vertical={false} stroke={t["--chart-grid"]} />
            <XAxis
              dataKey="date"
              tickFormatter={(d: string) => formatDate(d, false).replace(" 20", " ’")}
              tick={{ fill: t["--chart-axis"], fontSize: 12 }}
              tickLine={false}
              axisLine={false}
              minTickGap={28}
              tickMargin={10}
            />
            <YAxis
              tickFormatter={(v: number) => `${v > 0 ? "+" : ""}${Math.round(v)}%`}
              tick={{ fill: t["--chart-axis"], fontSize: 12 }}
              tickLine={false}
              axisLine={false}
              width={48}
              domain={["auto", "auto"]}
            />
            <ReferenceLine y={0} stroke={t["--chart-axis"]} strokeOpacity={0.5} />
            <Tooltip
              cursor={{ stroke: t["--ink"], strokeOpacity: 0.3 }}
              content={(p) => <ChartTooltip {...p} benchmarkName={portfolio.benchmarkName} />}
              isAnimationActive={false}
            />
            <Line
              key={`b-${range}`}
              type="monotone"
              dataKey="benchmark"
              stroke={t["--chart-benchmark"]}
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
              activeDot={{ r: 5, strokeWidth: 2, stroke: "#fff" }}
              animationDuration={1200}
              animationEasing="ease-out"
              label={<EndLabel total={data.length} text={portfolio.benchmarkName} color={t["--chart-axis"]} dy={usAbove ? 14 : -6} />}
            />
            <Line
              key={`p-${range}`}
              type="monotone"
              dataKey="portfolio"
              stroke={t["--chart-portfolio"]}
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 6, strokeWidth: 2, stroke: "#fff" }}
              animationDuration={1400}
              animationEasing="ease-out"
              label={<EndLabel total={data.length} text="Us" color={t["--ink"]} bold dy={usAbove ? -6 : 14} />}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Table view of the same data for screen readers. */}
      <table className="sr-only">
        <caption>Monthly change since the start of the period</caption>
        <thead>
          <tr>
            <th scope="col">Month</th>
            <th scope="col">Our portfolio</th>
            <th scope="col">{portfolio.benchmarkName}</th>
          </tr>
        </thead>
        <tbody>
          {data.map((d) => (
            <tr key={d.date}>
              <th scope="row">{formatDate(d.date, false)}</th>
              <td>{formatPct(d.portfolio)}</td>
              <td>{formatPct(d.benchmark)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </figure>
  );
}

function EndLabel(props: { x?: number; y?: number; index?: number; total: number; text: string; color: string; bold?: boolean; dy: number }) {
  const { x, y, index, total, text, color, bold, dy } = props;
  if (index !== total - 1 || x == null || y == null) return null;
  return (
    <text x={x + 10} y={y} dy={dy} fill={color} fontSize={12} fontWeight={bold ? 700 : 500}>
      {text}
    </text>
  );
}

function ChartTooltip({ active, payload, label, benchmarkName }: TooltipContentProps<ValueType, NameType> & { benchmarkName: string }) {
  if (!active || !payload?.length) return null;
  const get = (k: string) => payload.find((p) => p.dataKey === k)?.value as number | undefined;
  const p = get("portfolio");
  const b = get("benchmark");
  return (
    <div className="rounded-sm bg-ink px-3.5 py-2.5 text-small text-paper shadow-float">
      <p className="text-caption text-muted-dark">{formatDate(String(label), false)}</p>
      {p != null && (
        <p className="mt-1 flex justify-between gap-6">
          <span>Our portfolio</span>
          <span className="num font-semibold">{formatPct(p)}</span>
        </p>
      )}
      {b != null && (
        <p className="flex justify-between gap-6">
          <span className="text-muted-dark">{benchmarkName}</span>
          <span className="num">{formatPct(b)}</span>
        </p>
      )}
    </div>
  );
}
