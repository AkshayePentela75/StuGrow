import Image from "next/image";
import { Play } from "lucide-react";
import { cn } from "@/lib/cn";

/**
 * A 16:9 video cover. With a real YouTube id it shows the thumbnail with the
 * site's image treatment (gradient + navy multiply layer). Without one it
 * renders a designed typographic placeholder.
 */
export function VideoThumb({
  videoId,
  title,
  className,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  priority,
}: {
  videoId?: string | null;
  title: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  return (
    <div className={cn("relative aspect-video overflow-hidden bg-ink", className)}>
      {videoId ? (
        <>
          <Image
            src={`https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`}
            alt=""
            fill
            sizes={sizes}
            priority={priority}
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
          <div aria-hidden className="absolute inset-0 bg-ink/30 mix-blend-multiply" />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
        </>
      ) : (
        <div aria-hidden className="absolute inset-0">
          <div className="grid-lines absolute inset-0" />
          <div className="absolute inset-0 bg-[radial-gradient(70%_80%_at_80%_10%,rgb(119_190_155/0.35),transparent_60%),radial-gradient(50%_60%_at_0%_100%,rgb(10_34_50/0.9),transparent_70%)]" />
          <svg viewBox="0 0 400 225" preserveAspectRatio="none" className="absolute inset-0 size-full">
            <path
              d="M0 190 L60 170 L110 178 L170 130 L220 142 L280 90 L330 104 L400 40"
              fill="none"
              stroke="var(--mint)"
              strokeOpacity="0.6"
              strokeWidth="2.5"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </div>
      )}
      <span className="absolute inset-0 grid place-items-center">
        <span className="grid size-16 place-items-center rounded-full bg-paper/95 text-ink shadow-float transition-transform duration-300 ease-out group-hover:scale-110 group-active:scale-95 md:size-20">
          <Play aria-hidden className="ml-1 size-6 fill-current md:size-7" />
        </span>
      </span>
      <span className="sr-only">{title}</span>
    </div>
  );
}
