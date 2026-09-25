import { holdings } from "@/content/portfolio";
import { formatDate, formatPct, formatUsd, pctChange } from "@/lib/format";
import { cn } from "@/lib/cn";
import { Reveal, RevealItem } from "@/components/ui/Reveal";

/** Holdings with entry, current price, return, and the reason we bought. */
export function Holdings() {
  const rows = [...holdings].sort((a, b) => b.weight - a.weight);

  return (
    <div className="overflow-hidden rounded-lg bg-paper-raised shadow-float ring-1 ring-line">
      {/* Desktop table */}
      <table className="hidden w-full text-left md:table">
        <caption className="sr-only">Current holdings with weight, entry, current price, return, and rationale</caption>
        <thead className="border-b border-line bg-paper-sunk/50 text-caption text-muted">
          <tr>
            <th scope="col" className="px-7 py-4 font-medium">Holding</th>
            <th scope="col" className="px-4 py-4 text-right font-medium">Weight</th>
            <th scope="col" className="px-4 py-4 text-right font-medium">Entry</th>
            <th scope="col" className="px-4 py-4 text-right font-medium">Now</th>
            <th scope="col" className="px-7 py-4 text-right font-medium">Return</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((h) => {
            const ret = pctChange(h.entryPrice, h.currentPrice);
            return (
              <tr key={h.ticker} className="border-b border-line align-top transition-colors duration-200 last:border-b-0 hover:bg-paper-sunk/40">
                <th scope="row" className="max-w-md px-7 py-6 font-normal">
                  <span className="flex items-baseline gap-3">
                    <span className="num text-lead font-bold">{h.ticker}</span>
                    <span className="text-small text-muted">{h.name}</span>
                  </span>
                  <span className="mt-2 block text-small leading-relaxed text-ink/80">{h.rationale}</span>
                </th>
                <td className="num px-4 py-6 text-right font-semibold">{h.weight}%</td>
                <td className="px-4 py-6 text-right">
                  <span className="num block">{formatUsd(h.entryPrice, true)}</span>
                  <span className="block text-caption text-muted">{formatDate(h.entryDate)}</span>
                </td>
                <td className="num px-4 py-6 text-right">{formatUsd(h.currentPrice, true)}</td>
                <td className="px-7 py-6 text-right">
                  <ReturnChip value={ret} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Mobile cards */}
      <Reveal as="ul" className="divide-y divide-line md:hidden">
        {rows.map((h) => {
          const ret = pctChange(h.entryPrice, h.currentPrice);
          return (
            <RevealItem as="li" key={h.ticker} className="p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="num text-lead font-bold">{h.ticker}</p>
                  <p className="text-small text-muted">{h.name}</p>
                </div>
                <ReturnChip value={ret} />
              </div>
              <dl className="mt-4 grid grid-cols-3 gap-3 text-small">
                <div>
                  <dt className="text-caption text-muted">Weight</dt>
                  <dd className="num font-semibold">{h.weight}%</dd>
                </div>
                <div>
                  <dt className="text-caption text-muted">Entry</dt>
                  <dd className="num">{formatUsd(h.entryPrice, true)}</dd>
                </div>
                <div>
                  <dt className="text-caption text-muted">Now</dt>
                  <dd className="num">{formatUsd(h.currentPrice, true)}</dd>
                </div>
              </dl>
              <p className="mt-4 text-small leading-relaxed text-ink/80">{h.rationale}</p>
            </RevealItem>
          );
        })}
      </Reveal>
    </div>
  );
}

function ReturnChip({ value }: { value: number }) {
  const up = value >= 0;
  return (
    <span
      className={cn(
        "num inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-small font-semibold",
        up ? "bg-grow/10 text-grow" : "bg-loss/10 text-loss",
      )}
    >
      <svg viewBox="0 0 10 8" aria-hidden className={cn("size-2", !up && "rotate-180")}>
        <path d="M5 0 10 8H0Z" fill="currentColor" />
      </svg>
      <span className="sr-only">{up ? "Up" : "Down"} </span>
      {formatPct(value)}
    </span>
  );
}
