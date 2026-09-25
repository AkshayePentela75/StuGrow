/** A content value still waiting on real data (see content/*.ts, SETUP.md). */
export function isPlaceholder(value: string | undefined | null): boolean {
  return !value || value.includes("TODO_");
}

/** Returns the value if real, otherwise the fallback. */
export function orFallback<T extends string>(value: string | undefined, fallback: T): string {
  return isPlaceholder(value) ? fallback : (value as string);
}

/** True for a usable external link. */
export function hasLink(url: string | undefined): url is string {
  return !isPlaceholder(url) && /^(https?:|mailto:)/.test(url ?? "");
}
