import { classHighlights } from "@/content/schedule";
import { site } from "@/content/site";
import { isPlaceholder } from "@/lib/placeholder";
import { signupHref } from "@/lib/site-helpers";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Reveal, RevealItem } from "@/components/ui/Reveal";

export function SignupCta() {
  const href = signupHref();
  const email = isPlaceholder(site.email) ? null : site.email;
  const formReady = !href.startsWith("/");

  return (
    <section aria-labelledby="signup-title" className="section-y">
      <div className="container-x">
        <Reveal className="relative overflow-hidden rounded-lg bg-mint px-6 py-16 text-ink-deep shadow-float md:px-16 md:py-24">
          {/* Rising bars motif from the logo */}
          <div aria-hidden className="pointer-events-none absolute bottom-0 right-6 flex items-end gap-3 opacity-25 md:right-16 md:gap-4">
            {[40, 62, 50, 84, 100].map((h, i) => (
              <span key={i} className="w-8 rounded-t-md bg-ink md:w-14" style={{ height: `${h * 2.4}px` }} />
            ))}
          </div>
          <div className="relative max-w-2xl">
            <RevealItem as="h2" id="signup-title" className="wdth-condensed text-display-lg font-black">
              Save a seat.
            </RevealItem>
            <RevealItem as="p" className="mt-6 max-w-[46ch] text-lead">
              {classHighlights.cadence}, so there&rsquo;s always a next one. {classHighlights.offer}. Spots are limited.
            </RevealItem>
            <RevealItem className="mt-10 flex flex-wrap items-center gap-4">
              {formReady ? (
                <ButtonLink href={href} className="!bg-ink !text-paper hover:!bg-ink-deep">
                  Sign up
                </ButtonLink>
              ) : (
                <p className="rounded-md bg-paper/70 px-4 py-3 text-small">Signup opens soon. Check back here.</p>
              )}
              {email && (
                <a href={`mailto:${email}`} className="link-grow text-small font-semibold">
                  Questions? {email}
                </a>
              )}
            </RevealItem>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
