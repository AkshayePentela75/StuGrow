/**
 * Shapes for everything in /content. Components import these types, so if a
 * content file is filled in wrong, `npm run build` tells you where.
 *
 * Any string starting with "TODO_" is treated as "not provided yet":
 * the UI renders a graceful fallback instead of the raw value
 * (see lib/placeholder.ts).
 */

export type SocialPlatform = "tiktok" | "instagram" | "youtube";

export interface SocialAccount {
  platform: SocialPlatform;
  /** Full profile URL, e.g. https://www.tiktok.com/@yourhandle */
  url: string;
  /** Handle shown on the page, e.g. "@stugro" */
  handle: string;
  /** One line on what you post there. */
  blurb: string;
}

export interface TeamMember {
  name: string;
  role: string;
  /** Optional: path under /public (e.g. "/team/alex.jpg"). Initials are shown if omitted. */
  photo?: string;
  /** Optional school or grade, e.g. "Junior, Example High School" */
  school?: string;
}

export interface Stat {
  /** Numeric value that animates in. */
  value: number;
  /** Text after the number, e.g. "+" or "k". */
  suffix?: string;
  prefix?: string;
  label: string;
}

export interface Lesson {
  title: string;
  /** Optional one-line summary. */
  summary?: string;
  /** Optional length, e.g. "45 min". */
  duration?: string;
}

export interface CurriculumUnit {
  /** Stable id used for anchors, e.g. "stocks-investing" */
  id: string;
  title: string;
  summary: string;
  lessons: Lesson[];
}

export type ClassLevel = "Beginner" | "Intermediate" | "Advanced" | "All levels";

export interface ClassSession {
  id: string;
  name: string;
  /** e.g. "Saturdays", "Every other Tuesday" */
  day: string;
  /** Human-readable time incl. timezone, e.g. "2:30–3:30 PM ET" */
  time: string;
  /** "Online" or a physical place */
  location: string;
  /** Optional meeting / info link */
  link?: string;
  level: ClassLevel;
  /** Who it is for, e.g. "Ages 10–14" */
  audience?: string;
  /** Is signup currently open? */
  open: boolean;
  /** Optional sentence shown with the class, e.g. "New batch every month." */
  note?: string;
  /** Optional short highlight chip, e.g. "This month is free" */
  badge?: string;
}

export interface Holding {
  ticker: string;
  name: string;
  sector: string;
  /** Portfolio weight in percent (all holdings + cash should sum to ~100). */
  weight: number;
  /** ISO date you first bought it, e.g. "2025-02-14" */
  entryDate: string;
  entryPrice: number;
  /** Latest price you want to show. Update manually or wire to an API later. */
  currentPrice: number;
  /** Why you bought it. 1–3 sentences. */
  rationale: string;
}

export interface PerformancePoint {
  /** ISO date or "YYYY-MM" */
  date: string;
  /** Portfolio value indexed to 100 at inception (or dollar value, see portfolio.ts). */
  portfolio: number;
  /** Benchmark indexed the same way. */
  benchmark: number;
}

export interface ThesisPrinciple {
  title: string;
  body: string;
}

export type PostKind = "short" | "video" | "post";

export interface SocialPost {
  platform: SocialPlatform;
  kind: PostKind;
  title: string;
  url: string;
  /** Optional thumbnail path/URL. Without one, a typographic cover is generated. */
  thumbnail?: string;
  /** ISO date */
  date: string;
}
