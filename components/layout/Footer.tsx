import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin } from "lucide-react";
import { nav, site, socials } from "@/content/site";
import { hasLink, isPlaceholder } from "@/lib/placeholder";
import { BrandIcon, platformName } from "@/components/ui/BrandIcon";

export function Footer() {
  const year = new Date().getFullYear();
  const email = isPlaceholder(site.email) ? null : site.email;

  return (
    <footer className="surface-ink-deep relative overflow-hidden">
      <div className="grid-lines pointer-events-none absolute inset-0" aria-hidden />
      <div className="container-x relative grid gap-12 pt-20 pb-10 md:grid-cols-12 md:gap-8 md:pt-28">
        <div className="md:col-span-5">
          <Image
            src="/brand/stugro-mark-inverse.png"
            alt=""
            width={600}
            height={358}
            className="h-14 w-auto"
          />
          <p className="mt-6 max-w-[34ch] text-lead text-muted-dark">
            Students in {site.location} explaining money in words our age actually uses.
          </p>
          <ul className="mt-8 space-y-2 text-small text-muted-dark">
            <li className="flex items-center gap-2.5">
              <MapPin aria-hidden className="size-4 text-mint" />
              {site.location}
              {!isPlaceholder(site.foundedYear) && <span>, since {site.foundedYear}</span>}
            </li>
            {email && (
              <li className="flex items-center gap-2.5">
                <Mail aria-hidden className="size-4 text-mint" />
                <a href={`mailto:${email}`} className="link-grow text-paper">
                  {email}
                </a>
              </li>
            )}
          </ul>
        </div>

        <nav aria-label="Footer" className="md:col-span-3 md:col-start-7">
          <h2 className="font-body text-small font-semibold text-muted-dark">Explore</h2>
          <ul className="mt-4 space-y-3">
            {[{ href: "/", label: "Home" }, ...nav].map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="link-grow font-display text-title font-bold wdth-semi">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-3">
          <h2 className="font-body text-small font-semibold text-muted-dark">Follow along</h2>
          <ul className="mt-4 space-y-3">
            {socials.map((s) => (
              <li key={s.platform}>
                {hasLink(s.url) ? (
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-3 transition-transform duration-150 active:scale-[0.97]"
                  >
                    <span className="grid size-9 place-items-center rounded-full bg-ink-soft transition-[background-color,color] duration-200 group-hover:bg-mint group-hover:text-ink-deep">
                      <BrandIcon platform={s.platform} className="size-4" />
                    </span>
                    <span className="link-grow">{platformName[s.platform]}</span>
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-3 text-muted-dark">
                    <span className="grid size-9 place-items-center rounded-full bg-ink-soft">
                      <BrandIcon platform={s.platform} className="size-4" />
                    </span>
                    {platformName[s.platform]}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Oversized wordmark, cropped by the page edge. */}
      <div aria-hidden className="relative select-none overflow-hidden">
        <p className="wdth-condensed translate-y-[18%] text-center font-display text-[clamp(6rem,30vw,26rem)] font-black leading-[0.8] tracking-[-0.05em] text-ink-soft">
          {site.name}
        </p>
      </div>

      <div className="relative border-t border-line-dark">
        <div className="container-x flex flex-col gap-3 py-6 text-caption text-muted-dark md:flex-row md:justify-between">
          <p>
            &copy; {year} {site.name}. A student-run organization.
          </p>
          <p>Educational content only. Not financial advice.</p>
        </div>
      </div>
    </footer>
  );
}
