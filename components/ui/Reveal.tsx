"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { inViewOnce, reveal } from "@/lib/motion";

type Tag = "div" | "section" | "ul" | "ol" | "li" | "header" | "article" | "p" | "h2" | "dl";

type RevealProps = HTMLMotionProps<"div"> & { as?: Tag };

/**
 * Scroll-triggered reveal. Wrap a group in <Reveal> and mark children with
 * <RevealItem> to stagger them. Content is in the DOM (and readable) from the
 * start; only opacity/transform animate. MotionConfig handles reduced motion.
 */
export function Reveal({ as = "div", children, ...rest }: RevealProps) {
  const Comp = motion[as] as typeof motion.div;
  return (
    <Comp variants={reveal.container} initial="hidden" whileInView="show" viewport={inViewOnce} {...rest}>
      {children}
    </Comp>
  );
}

export function RevealItem({ as = "div", children, ...rest }: RevealProps) {
  const Comp = motion[as] as typeof motion.div;
  return (
    <Comp variants={reveal.item} {...rest}>
      {children}
    </Comp>
  );
}
