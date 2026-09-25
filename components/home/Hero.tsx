import { site } from "@/content/site";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { CompoundCard } from "./CompoundCard";

const lines = [
  { text: "Start early.", className: "" },
  { text: "Let it compound.", className: "md:pl-[12%]" },
];

/** Masked line reveal: each line rises out of its own clip box.
 *  CSS keyframes (see globals.css .rise) so it runs before hydration. */
function RisingLine({ text, i, className }: { text: string; i: number; className: string }) {
  return (
    <span className={`block overflow-hidden pb-[0.06em] ${className}`}>
      <span className="rise block" style={{ animationDelay: `${80 + i * 110}ms` }}>
        {text}
      </span>
    </span>
  );
}

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden">
      {/* Layered radial washes + ledger grid, faded at the edges. */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_85%_20%,rgb(119_190_155/0.28),transparent_70%),radial-gradient(40%_40%_at_10%_90%,rgb(15_47_69/0.08),transparent_70%),radial-gradient(30%_30%_at_60%_60%,rgb(30_122_85/0.08),transparent_70%)]" />
        <div className="grid-lines-light absolute inset-0 [mask-image:radial-gradient(80%_70%_at_50%_30%,black,transparent)]" />
      </div>

      <div className="container-x relative pt-14 pb-20 md:pt-20 md:pb-28">
        <h1
          id="hero-title"
          className="wdth-condensed text-[clamp(3.6rem,12.5vw,10rem)] font-black leading-[0.86] tracking-[-0.035em] [word-spacing:0.1em] text-ink"
        >
          {lines.map((l, i) => (
            <RisingLine key={l.text} text={l.text} i={i} className={l.className} />
          ))}
        </h1>

        <div className="mt-12 grid gap-12 lg:mt-10 lg:grid-cols-12 lg:gap-8">
          <div className="fade-up lg:col-span-5 lg:pt-6" style={{ animationDelay: "260ms" }}>
            <p className="max-w-[44ch] text-lead text-ink/85">
              {site.name} is a student-run finance organization in {site.location}. We explain markets and money in plain
              language, teach classes for younger students, and run a real portfolio where you can watch every decision.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <ButtonLink href="/teaching#schedule">Join a class</ButtonLink>
              <ButtonLink href="/social" variant="secondary" icon={false}>
                See what we post
              </ButtonLink>
            </div>
          </div>

          <div className="fade-up relative lg:col-span-6 lg:col-start-7 lg:-mt-4" style={{ animationDelay: "200ms" }}>
            <CompoundCard />
          </div>
        </div>
      </div>
    </section>
  );
}
