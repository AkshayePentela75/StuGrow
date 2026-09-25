"use client";

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { spring } from "@/lib/motion";

/**
 * Pulls its child a few pixels toward the cursor, on a spring. Fine pointers
 * only; touch and reduced-motion users get a static element.
 */
export function Magnetic({
  children,
  strength = 0.25,
  className,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, spring.magnetic);
  const y = useSpring(my, spring.magnetic);
  const transform = useTransform([x, y], ([tx, ty]) => `translate3d(${tx}px, ${ty}px, 0)`);

  function onMove(e: React.PointerEvent) {
    if (reduce || e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - (r.left + r.width / 2)) * strength);
    my.set((e.clientY - (r.top + r.height / 2)) * strength);
  }
  function reset() {
    mx.set(0);
    my.set(0);
  }

  return (
    <motion.span
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={{ transform, display: "inline-flex" }}
      className={className}
    >
      {children}
    </motion.span>
  );
}
