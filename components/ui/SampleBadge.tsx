import { site } from "@/content/site";
import { cn } from "@/lib/cn";

/**
 * A small dashed tag marking blocks that still show sample data.
 * Disappears when the block's `isSample` is false or when
 * site.showSampleBadges is turned off.
 */
export function SampleBadge({ show, className }: { show: boolean; className?: string }) {
  if (!show || !site.showSampleBadges) return null;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-dashed border-current px-2.5 py-0.5 text-caption font-medium opacity-70",
        className,
      )}
    >
      <span aria-hidden className="size-1.5 rounded-full bg-current" />
      Sample data
    </span>
  );
}
