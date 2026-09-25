/**
 * Motion tokens for Framer Motion. Mirrors the CSS curves in styles/tokens.css
 * so JS- and CSS-driven motion feel like one system.
 */
import type { Transition, Variants } from "framer-motion";

export const ease = {
  out: [0.23, 1, 0.32, 1] as const,
  inOut: [0.77, 0, 0.175, 1] as const,
  drawer: [0.32, 0.72, 0, 1] as const,
};

export const spring = {
  /** Magnetic hover, cursor-follow. Soft, a little momentum. */
  magnetic: { type: "spring", stiffness: 180, damping: 16, mass: 0.4 } as Transition,
  /** Layout shifts like the nav pill. Crisp, no overshoot. */
  snappy: { type: "spring", duration: 0.45, bounce: 0.12 } as Transition,
  /** Bars growing, panels lifting. */
  lift: { type: "spring", duration: 0.6, bounce: 0.18 } as Transition,
};

/** Reveal-on-scroll presets. Children stagger 60ms apart. */
export const reveal = {
  container: {
    hidden: {},
    show: { transition: { staggerChildren: 0.06, delayChildren: 0.04 } },
  } satisfies Variants,
  item: {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: ease.out } },
  } satisfies Variants,
};

/** Shared viewport config: trigger a bit before fully in view, only once. */
export const inViewOnce = { once: true, margin: "0px 0px -12% 0px" } as const;
