/**
 * ============================================================================
 * CLASS SCHEDULE  (/teaching)
 * ----------------------------------------------------------------------------
 * One entry per recurring class. `open: false` shows the class as full/closed
 * and hides its signup button.
 *
 * The first entry is taken from your flyer (online, Saturdays 2:30–3:30 PM,
 * ages 10–14, new batch monthly, "this month is free"). The flyer does not
 * state a timezone; ET is assumed because you're in New Jersey — confirm.
 * The second entry is an invented SAMPLE to show how multiple classes look.
 * Replace or delete it.
 * ============================================================================
 */
import type { ClassSession } from "./types";

export const classHighlights = {
  /** Headline facts from the flyer, shown on the /teaching hero. */
  title: "Finance Class for Kids",
  audience: "Ages 10–14",
  format: ["Online", "Fun", "Practical"],
  cadence: "A new batch starts every month",
  offer: "This month is free",
};

export const schedule: { isSample: boolean; sessions: ClassSession[] } = {
  isSample: true,
  sessions: [
    {
      id: "kids-saturday",
      name: "Finance Class for Kids",
      day: "Saturdays",
      time: "2:30–3:30 PM ET",
      location: "Online",
      link: "TODO_CLASS_MEETING_LINK",
      level: "Beginner",
      audience: "Ages 10–14",
      open: true,
      note: "A new batch starts every month.",
      badge: "This month is free",
    },
    {
      id: "teen-sample",
      name: "Investing Basics for Teens (sample)",
      day: "Wednesdays",
      time: "7:00–8:00 PM ET",
      location: "Online",
      level: "Intermediate",
      audience: "High school",
      open: false,
      note: "Waitlist only right now.",
    },
  ],
};
