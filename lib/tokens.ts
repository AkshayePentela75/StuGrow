"use client";

import { useSyncExternalStore } from "react";

/**
 * Reads design tokens from CSS at runtime so charts (which need literal colors
 * for SVG attributes) stay in sync with styles/tokens.css — the single source.
 */
export function readToken(name: string, fallback = "#000"): string {
  if (typeof window === "undefined") return fallback;
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return v || fallback;
}

const noopSubscribe = () => () => {};

export function useTokens<const K extends readonly string[]>(names: K): Record<K[number], string> {
  const key = names.join("|");
  // Tokens are static per page load; read them once on the client, "#888" on the server.
  const snapshot = useSyncExternalStore(
    noopSubscribe,
    () => key.split("|").map((n) => readToken(n)).join("|"),
    () => key.split("|").map(() => "#888").join("|"),
  );
  const values = snapshot.split("|");
  return Object.fromEntries(names.map((n, i) => [n, values[i]])) as Record<K[number], string>;
}
