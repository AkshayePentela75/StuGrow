/**
 * ============================================================================
 * PORTFOLIO  (/investing)
 * ----------------------------------------------------------------------------
 * EVERYTHING IN THIS FILE IS SAMPLE DATA. These are NOT StuGro's real holdings
 * or returns. Replace every value before launch, then set `isSample: false`.
 *
 * How the numbers are used:
 *  - holdings[].weight        -> allocation donut + table (percent, sums ~100 with cash)
 *  - holdings[].entryPrice /
 *    holdings[].currentPrice  -> per-position return in the table
 *  - performance[]            -> line chart. Both series indexed to 100 at start
 *                                so "112" means +12% since inception.
 *  - summary                  -> the headline figures at the top of the page
 * ============================================================================
 */
import type { Holding, PerformancePoint, ThesisPrinciple } from "./types";

export const portfolio = {
  isSample: true,
  /** ISO date the portfolio started. */
  inceptionDate: "TODO_PORTFOLIO_INCEPTION_DATE",
  /** Date the numbers below were last updated (shown on the page). */
  asOf: "2026-09-19",
  /** What you compare against. */
  benchmarkName: "S&P 500",
  /** Cash as a percent of the portfolio. */
  cashWeight: 6,
  summary: {
    /** Current total value in dollars. */
    totalValue: 5240,
    /** Starting capital in dollars. */
    startingValue: 4500,
  },
};

export const holdings: Holding[] = [
  {
    ticker: "VOO",
    name: "Vanguard S&P 500 ETF",
    sector: "Broad market",
    weight: 34,
    entryDate: "2025-01-15",
    entryPrice: 440.1,
    currentPrice: 512.3,
    rationale:
      "Our core. Owning the whole index keeps us diversified while we learn to evaluate single companies.",
  },
  {
    ticker: "MSFT",
    name: "Microsoft",
    sector: "Technology",
    weight: 14,
    entryDate: "2025-03-03",
    entryPrice: 398.5,
    currentPrice: 447.9,
    rationale:
      "Recurring software revenue plus cloud growth. We wanted one business we could explain end to end.",
  },
  {
    ticker: "COST",
    name: "Costco",
    sector: "Consumer staples",
    weight: 12,
    entryDate: "2025-04-21",
    entryPrice: 880.0,
    currentPrice: 941.2,
    rationale:
      "Membership fees make earnings steady. A good case study in customer loyalty as a moat.",
  },
  {
    ticker: "JPM",
    name: "JPMorgan Chase",
    sector: "Financials",
    weight: 11,
    entryDate: "2025-06-09",
    entryPrice: 262.4,
    currentPrice: 251.8,
    rationale:
      "Exposure to interest rates and banking. We track it to learn how rate changes hit bank profits.",
  },
  {
    ticker: "VXUS",
    name: "Vanguard Total International Stock ETF",
    sector: "International",
    weight: 13,
    entryDate: "2025-02-10",
    entryPrice: 60.2,
    currentPrice: 66.9,
    rationale: "So our whole portfolio isn't a bet on one country's economy.",
  },
  {
    ticker: "BND",
    name: "Vanguard Total Bond Market ETF",
    sector: "Bonds",
    weight: 10,
    entryDate: "2025-05-12",
    entryPrice: 72.1,
    currentPrice: 73.4,
    rationale: "A small ballast position that behaves differently from stocks when markets fall.",
  },
];

/** Monthly values, indexed to 100. SAMPLE SERIES. */
export const performance: PerformancePoint[] = [
  { date: "2025-01", portfolio: 100, benchmark: 100 },
  { date: "2025-02", portfolio: 101.8, benchmark: 101.2 },
  { date: "2025-03", portfolio: 98.9, benchmark: 97.6 },
  { date: "2025-04", portfolio: 95.4, benchmark: 94.1 },
  { date: "2025-05", portfolio: 99.7, benchmark: 99.8 },
  { date: "2025-06", portfolio: 103.1, benchmark: 104.0 },
  { date: "2025-07", portfolio: 104.9, benchmark: 106.1 },
  { date: "2025-08", portfolio: 106.2, benchmark: 107.9 },
  { date: "2025-09", portfolio: 107.8, benchmark: 109.4 },
  { date: "2025-10", portfolio: 108.5, benchmark: 111.0 },
  { date: "2025-11", portfolio: 107.1, benchmark: 110.2 },
  { date: "2025-12", portfolio: 109.6, benchmark: 112.1 },
  { date: "2026-01", portfolio: 111.2, benchmark: 113.0 },
  { date: "2026-02", portfolio: 110.4, benchmark: 111.4 },
  { date: "2026-03", portfolio: 108.0, benchmark: 108.3 },
  { date: "2026-04", portfolio: 110.9, benchmark: 111.7 },
  { date: "2026-05", portfolio: 113.5, benchmark: 114.8 },
  { date: "2026-06", portfolio: 114.2, benchmark: 116.0 },
  { date: "2026-07", portfolio: 115.9, benchmark: 117.2 },
  { date: "2026-08", portfolio: 114.8, benchmark: 116.5 },
  { date: "2026-09", portfolio: 116.4, benchmark: 118.1 },
];

/**
 * How you decide. DRAFT COPY — rewrite in your own words.
 */
export const thesis: { isSample: boolean; intro: string; principles: ThesisPrinciple[] } = {
  isSample: true,
  intro:
    "Every position has to survive a pitch to the whole team. If we can't explain why we own something in two minutes, we don't own it.",
  principles: [
    {
      title: "Index first, picks second",
      body: "Most of the portfolio sits in broad funds. Single stocks are where we practice research, sized so one bad call can't sink us.",
    },
    {
      title: "Explain it or skip it",
      body: "We only buy businesses we can describe to a twelve-year-old: how they make money, who pays them, and what could go wrong.",
    },
    {
      title: "Write the thesis down",
      body: "Before buying, we record why. When we sell, we compare what happened against what we expected, and post the result.",
    },
    {
      title: "Long horizon, no leverage",
      body: "No options, no margin, no chasing what's trending this week. We measure ourselves over years against the benchmark.",
    },
  ],
};

export const disclaimer =
  "StuGro is a student organization. Everything on this page is for educational purposes only and is not financial, investment, legal, or tax advice. We are not licensed advisors. Past performance does not predict future results. Do your own research, and talk to a qualified professional before making investment decisions.";
