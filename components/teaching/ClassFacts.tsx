import { classHighlights, schedule } from "@/content/schedule";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { signupHref } from "@/lib/site-helpers";

/**
 * The hero's flagship-class panel: a "term sheet" of the facts from the
 * flyer, floated to the right of the title on desktop.
 */
export function ClassFacts() {
  const flagship = schedule.sessions[0];
  const href = signupHref();
  const rows = [
    { k: "Who", v: classHighlights.audience },
    { k: "When", v: flagship ? `${flagship.day}, ${flagship.time}` : null },
    { k: "Where", v: flagship?.location },
    { k: "Style", v: classHighlights.format.join(", ") },
    { k: "Batches", v: classHighlights.cadence },
  ].filter((r) => r.v);

  return (
    <div className="fade-up mx-auto w-full max-w-md lg:mr-0" style={{ animationDelay: "320ms" }}>
      <div className="relative rotate-0 rounded-lg bg-paper-raised p-7 text-ink shadow-float-dark lg:rotate-[1.5deg]">
        <div className="flex items-start justify-between gap-4">
          <p className="wdth-condensed font-display text-display-sm font-black leading-none">{classHighlights.title}</p>
        </div>
        <dl className="mt-6 divide-y divide-dashed divide-line border-y border-dashed border-line">
          {rows.map((r) => (
            <div key={r.k} className="flex justify-between gap-6 py-3 text-small">
              <dt className="text-muted">{r.k}</dt>
              <dd className="text-right font-semibold">{r.v}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-6 flex items-center justify-between gap-4">
          <span className="-rotate-3 rounded-sm border-2 border-grow px-3 py-1.5 font-display text-small font-black text-grow wdth-semi">
            {classHighlights.offer}
          </span>
          <ButtonLink href={href.startsWith("/") ? "#schedule" : href} icon={!href.startsWith("/")}>
            {href.startsWith("/") ? "See times" : "Sign up"}
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}
