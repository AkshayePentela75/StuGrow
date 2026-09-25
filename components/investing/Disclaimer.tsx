import { ShieldAlert } from "lucide-react";
import { disclaimer } from "@/content/portfolio";
import { cn } from "@/lib/cn";

/** "banner" = one-line notice near the top. "full" = the complete text. */
export function Disclaimer({ variant = "full", className }: { variant?: "banner" | "full"; className?: string }) {
  if (variant === "banner") {
    return (
      <p
        role="note"
        className={cn(
          "inline-flex items-center gap-2.5 rounded-full bg-white/8 px-4 py-2 text-small text-paper ring-1 ring-white/15",
          className,
        )}
      >
        <ShieldAlert aria-hidden className="size-4 shrink-0 text-mint" />
        Educational purposes only. Not financial advice.
        <a href="#disclaimer" className="link-underline font-semibold text-mint">
          Read more
        </a>
      </p>
    );
  }
  return (
    <aside
      id="disclaimer"
      aria-labelledby="disclaimer-title"
      className={cn("rounded-lg border-2 border-dashed border-ink/25 p-7 md:p-10", className)}
    >
      <h2 id="disclaimer-title" className="flex items-center gap-3 font-display text-title font-bold wdth-semi">
        <ShieldAlert aria-hidden className="size-6 text-grow" />
        Disclaimer
      </h2>
      <p className="mt-4 max-w-[75ch] text-body text-ink/85">{disclaimer}</p>
    </aside>
  );
}
