const usd0 = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
const usd2 = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 });

export const formatUsd = (n: number, cents = false) => (cents ? usd2 : usd0).format(n);

/** "+12.4%" / "−3.1%" with a true minus sign. */
export function formatPct(n: number, digits = 1): string {
  const s = Math.abs(n).toFixed(digits);
  if (n > 0) return `+${s}%`;
  if (n < 0) return `−${s}%`;
  return `${s}%`;
}

export const pctChange = (from: number, to: number) => ((to - from) / from) * 100;

/** "2026-09" or "2026-09-19" -> "Sep 2026" / "Sep 19, 2026" */
export function formatDate(iso: string, withDay = iso.length > 7): string {
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m) return iso;
  const date = new Date(Date.UTC(y, m - 1, d || 1));
  return date.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
    ...(withDay ? { day: "numeric" } : {}),
    timeZone: "UTC",
  });
}

export function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]!.toUpperCase())
    .join("");
}
