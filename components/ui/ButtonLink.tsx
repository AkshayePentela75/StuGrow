import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/cn";
import { hasLink, isPlaceholder } from "@/lib/placeholder";
import { Magnetic } from "./Magnetic";

interface ButtonLinkProps {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  /** Show the trailing arrow icon. */
  icon?: boolean;
  magnetic?: boolean;
  className?: string;
  /** Shown instead of the label when href is still a TODO_ placeholder. */
  pendingLabel?: string;
}

/**
 * The one button/link primitive. Internal hrefs use next/link; external
 * ones open in a new tab. A TODO_ href renders a disabled button so a
 * missing URL never ships as a broken link.
 */
export function ButtonLink({
  href,
  children,
  variant = "primary",
  icon = true,
  magnetic = true,
  className,
  pendingLabel,
}: ButtonLinkProps) {
  const classes = cn("btn", variant === "primary" ? "btn-primary" : "btn-secondary", className);
  const inner = (
    <>
      <span>{children}</span>
      {icon && <ArrowUpRight aria-hidden className="btn-icon size-4" strokeWidth={2.25} />}
    </>
  );

  let el: ReactNode;
  if (isPlaceholder(href)) {
    el = (
      <span role="link" aria-disabled="true" className={classes} title="Link coming soon">
        <span>{pendingLabel ?? children}</span>
      </span>
    );
  } else if (href.startsWith("/") || href.startsWith("#")) {
    el = (
      <Link href={href} className={classes}>
        {inner}
      </Link>
    );
  } else if (hasLink(href)) {
    el = (
      <a href={href} className={classes} target={href.startsWith("mailto:") ? undefined : "_blank"} rel="noopener noreferrer">
        {inner}
      </a>
    );
  } else {
    el = <span className={classes}>{inner}</span>;
  }

  return magnetic && !isPlaceholder(href) ? <Magnetic>{el}</Magnetic> : el;
}
