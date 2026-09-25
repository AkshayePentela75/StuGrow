/**
 * ============================================================================
 * CURRICULUM  (/teaching)
 * ----------------------------------------------------------------------------
 * Units render in order as an expandable list; lessons render in order inside
 * each unit. Add, remove, or reorder freely.
 *
 * The four unit titles and summaries come from your "Finance Class for Kids"
 * flyer (brand_assets/flyer-finance-class-for-kids.png). The LESSONS inside
 * each unit are SAMPLE topics — replace them with your real lesson plan.
 * ============================================================================
 */
import type { CurriculumUnit } from "./types";

export const curriculum: { isSample: boolean; units: CurriculumUnit[] } = {
  isSample: true,
  units: [
    {
      id: "stocks-investing",
      title: "Stocks & Investing",
      summary: "Understand how the stock market works and how investing builds wealth.",
      lessons: [
        { title: "What a share of a company really is", duration: "60 min" },
        { title: "How prices move: buyers, sellers, and news", duration: "60 min" },
        { title: "Compounding and why starting early matters", duration: "60 min" },
        { title: "Index funds and diversification", duration: "60 min" },
      ],
    },
    {
      id: "cash-management",
      title: "Cash Management",
      summary: "Learn how to budget, save, and spend wisely.",
      lessons: [
        { title: "Needs, wants, and a first budget", duration: "60 min" },
        { title: "Saving goals you can actually hit", duration: "60 min" },
        { title: "Bank accounts, debit cards, and fees", duration: "60 min" },
      ],
    },
    {
      id: "financial-literacy",
      title: "Financial Literacy",
      summary: "Grasp key concepts like income, expenses, profit, interest, and more.",
      lessons: [
        { title: "Income, expenses, and profit", duration: "60 min" },
        { title: "Interest: when it works for you and against you", duration: "60 min" },
        { title: "Credit scores in plain English", duration: "60 min" },
        { title: "Inflation and what your money is worth", duration: "60 min" },
      ],
    },
    {
      id: "real-world",
      title: "Real World Applications",
      summary: "Practical lessons to make smart financial decisions for life.",
      lessons: [
        { title: "Reading a receipt, a pay stub, and a bill", duration: "60 min" },
        { title: "Planning a purchase: save, borrow, or wait?", duration: "60 min" },
        { title: "Final project: build your own money plan", duration: "60 min" },
      ],
    },
  ],
};
