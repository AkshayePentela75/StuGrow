/**
 * ============================================================================
 * SITE-WIDE CONTENT
 * ----------------------------------------------------------------------------
 * Organization identity, contact, social links, team, and homepage stats.
 *
 * Anything that still starts with "TODO_" is a placeholder. Search the project
 * for "TODO_" to find every one. See SETUP.md for the full checklist.
 * ============================================================================
 */
import type { SocialAccount, Stat, TeamMember } from "./types";

export const site = {
  /** Brand name as it appears in the logo. The brief says "STU Grow"; the logo
   *  says "StuGro". Change here if you prefer the other spelling. */
  name: "StuGro",
  /** Used for <title> suffixes and Open Graph. */
  tagline: "Student-run finance, from New Jersey.",
  description:
    "StuGro is a student-run finance organization in New Jersey. We break down markets on social media, teach money classes for younger students, and manage a real portfolio in the open.",
  /** Production URL, used for canonical links and Open Graph images. */
  url: "https://TODO_SITE_DOMAIN.com",
  location: "New Jersey",
  /** Year you started, e.g. 2024. Shown in the footer and "who we are". */
  foundedYear: "TODO_FOUNDED_YEAR",
  /** Public contact inbox. */
  email: "TODO_CONTACT_EMAIL@example.com",
  /** Class signup form (Google Form, Tally, etc.). Used by every "Sign up" button. */
  signupUrl: "TODO_SIGNUP_FORM_URL",

  /**
   * Set to false once your real content is in. While true, blocks that still
   * show sample data get a small "Sample data" tag so nobody mistakes it for
   * real numbers.
   */
  showSampleBadges: true,
} as const;

/** Profile links. `blurb` lines are DRAFT COPY: edit to match what you post. */
export const socials: SocialAccount[] = [
  {
    platform: "tiktok",
    url: "TODO_SOCIAL_TIKTOK_URL",
    handle: "TODO_SOCIAL_TIKTOK_HANDLE",
    blurb: "Sixty-second breakdowns of whatever the market did this week.",
  },
  {
    platform: "instagram",
    url: "TODO_SOCIAL_INSTAGRAM_URL",
    handle: "TODO_SOCIAL_INSTAGRAM_HANDLE",
    blurb: "Carousels that explain one money idea at a time, plus class updates.",
  },
  {
    platform: "youtube",
    url: "TODO_SOCIAL_YOUTUBE_URL",
    handle: "TODO_SOCIAL_YOUTUBE_HANDLE",
    blurb: "Longer deep dives and full walkthroughs of our portfolio decisions.",
  },
];

/**
 * Homepage stats strip. SAMPLE NUMBERS — replace with real ones.
 * Keep it to 3–4 stats you can stand behind.
 */
export const stats: { isSample: boolean; items: Stat[] } = {
  isSample: true,
  items: [
    { value: 120, suffix: "+", label: "students taught in our classes" },
    { value: 45, suffix: "k", label: "views across our channels" },
    { value: 12, label: "student members on the team" },
    { value: 3, label: "platforms we post on every week" },
  ],
};

/**
 * Team. SAMPLE ENTRIES — replace names/roles, or delete the array contents
 * to hide the section entirely.
 */
export const team: { isSample: boolean; members: TeamMember[] } = {
  isSample: true,
  members: [
    { name: "TODO_TEAM_MEMBER_1_NAME", role: "Founder & President" },
    { name: "TODO_TEAM_MEMBER_2_NAME", role: "Head of Teaching" },
    { name: "TODO_TEAM_MEMBER_3_NAME", role: "Portfolio Lead" },
    { name: "TODO_TEAM_MEMBER_4_NAME", role: "Content & Social" },
  ],
};

/**
 * The three pillars on the homepage. Rendered as the three rising bars from
 * the logo (shortest to tallest, left to right). DRAFT COPY: check that every
 * claim here is true for you before launch.
 */
export const pillars = [
  {
    href: "/social",
    title: "Social",
    verb: "Watch",
    summary: "Short breakdowns of what markets did and why it matters to you.",
    points: ["TikTok, Instagram, YouTube", "Market news, explained", "No jargon without a translation"],
  },
  {
    href: "/teaching",
    title: "Teaching",
    verb: "Learn",
    summary: "Live classes where students teach younger students how money works.",
    points: ["Online, Saturdays", "Ages 10–14 to start", "A new batch every month"],
  },
  {
    href: "/investing",
    title: "Investing",
    verb: "Invest",
    summary: "A real portfolio with real money, run by us and shown in the open.",
    points: ["Every holding and why", "Performance vs. the market", "Our rules for deciding"],
  },
] as const;

/** Primary navigation. Order here is the order in the header. */
export const nav = [
  { href: "/social", label: "Social" },
  { href: "/teaching", label: "Teaching" },
  { href: "/investing", label: "Investing" },
] as const;
