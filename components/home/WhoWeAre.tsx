import Image from "next/image";
import { site, team } from "@/content/site";
import { initials } from "@/lib/format";
import { isPlaceholder } from "@/lib/placeholder";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { SampleBadge } from "@/components/ui/SampleBadge";

export function WhoWeAre() {
  if (team.members.length === 0) return null;
  const founded = isPlaceholder(site.foundedYear) ? null : site.foundedYear;

  return (
    <section aria-labelledby="team-title" className="section-y">
      <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4 lg:sticky lg:top-28 lg:self-start">
          <h2 id="team-title" className="wdth-semi text-display-sm">
            Run by students, start to finish.
          </h2>
          <p className="mt-5 max-w-[42ch] text-body text-ink/80">
            Every video, lesson plan and trade is made by high school and college students in {site.location}
            {founded ? `, since ${founded}` : ""}.
          </p>
          <SampleBadge show={team.isSample} className="mt-6 text-muted" />
        </div>

        <Reveal as="ul" className="grid grid-cols-2 gap-4 sm:gap-5 lg:col-span-7 lg:col-start-6">
          {team.members.map((m, i) => {
            const placeholder = isPlaceholder(m.name);
            const name = placeholder ? "Name coming soon" : m.name;
            return (
              <RevealItem
                as="li"
                key={`${m.name}-${i}`}
                className={`rounded-md bg-paper-raised p-5 shadow-raised ring-1 ring-line sm:p-6 ${i % 2 ? "sm:mt-10 sm:-mb-10" : ""}`}
              >
                <div className="relative size-16 overflow-hidden rounded-sm bg-ink sm:size-20">
                  {m.photo ? (
                    <>
                      <Image src={m.photo} alt={`Portrait of ${name}`} fill sizes="80px" className="object-cover" />
                      <div aria-hidden className="absolute inset-0 bg-grow/25 mix-blend-multiply" />
                      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    </>
                  ) : (
                    <div aria-hidden className="grid-lines absolute inset-0 grid place-items-center">
                      <span className="wdth-expanded font-display text-2xl font-black text-mint/80">
                        {placeholder ? "?" : initials(m.name)}
                      </span>
                    </div>
                  )}
                </div>
                <p className="mt-8 font-display text-title font-bold leading-tight wdth-semi">{name}</p>
                <p className="mt-1 text-small text-muted">{m.role}</p>
              </RevealItem>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
