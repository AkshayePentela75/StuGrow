import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Reveal, RevealItem } from "./Reveal";

/** Section title + optional intro + optional aside (e.g. a badge or link). */
export function SectionHeading({
  id,
  title,
  intro,
  aside,
  className,
  size = "md",
}: {
  id?: string;
  title: ReactNode;
  intro?: ReactNode;
  aside?: ReactNode;
  className?: string;
  size?: "sm" | "md";
}) {
  return (
    <Reveal as="header" className={cn("flex flex-col gap-5 md:flex-row md:items-end md:justify-between", className)}>
      <div className="max-w-3xl">
        <RevealItem
          as="h2"
          id={id}
          className={cn(
            "wdth-semi",
            size === "md" ? "text-display-md" : "text-display-sm",
          )}
        >
          {title}
        </RevealItem>
        {intro && (
          <RevealItem as="p" className="mt-5 max-w-[60ch] text-lead opacity-80">
            {intro}
          </RevealItem>
        )}
      </div>
      {aside && <RevealItem className="shrink-0">{aside}</RevealItem>}
    </Reveal>
  );
}
