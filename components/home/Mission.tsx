import { site, stats } from "@/content/site";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { CountUp } from "@/components/ui/CountUp";
import { SampleBadge } from "@/components/ui/SampleBadge";

const topics = ["Markets", "Personal finance", "Investing", "The world economy", "Careers in finance"];

export function Mission() {
  return (
    <section aria-labelledby="mission-title" className="section-y relative">
      <div className="container-x">
        <Reveal className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <RevealItem as="h2" id="mission-title" className="wdth-semi text-display-md lg:col-span-8">
            We&rsquo;re students in {site.location} who think money should make sense before you have much of it.
          </RevealItem>
          <div className="lg:col-span-4 lg:col-start-9 lg:pt-3">
            <RevealItem as="p" className="text-body text-ink/80">
              Finance touches everything, from a first paycheck to what central banks decide on the other side of the
              world. We&rsquo;re into all of it, and we want people our age to understand it too.
            </RevealItem>
            <RevealItem as="p" className="mt-4 text-body text-ink/80">
              So we share what we learn, in plain language: what&rsquo;s happening in markets, what it means for you, and how
              to make good decisions with the money you have.
            </RevealItem>
            <RevealItem as="ul" className="mt-7 flex flex-wrap gap-2" aria-label="Topics we cover">
              {topics.map((t) => (
                <li key={t} className="rounded-full bg-paper-raised px-3.5 py-1.5 text-small font-medium text-ink shadow-raised ring-1 ring-line">
                  {t}
                </li>
              ))}
            </RevealItem>
          </div>
        </Reveal>

        {stats.items.length > 0 && (
          <div className="mt-[var(--space-block)] md:mt-28">
            <div className="mb-4 flex justify-end">
              <SampleBadge show={stats.isSample} className="text-muted" />
            </div>
            <Reveal as="dl" className="grid grid-cols-2 border-t border-ink md:grid-cols-4">
              {stats.items.map((s, i) => (
                <RevealItem
                  key={s.label}
                  className={`flex flex-col-reverse gap-2 border-line py-7 pr-4 md:py-9 md:pl-6 ${i % 2 ? "border-l pl-4 md:pl-6" : ""} ${i > 0 ? "md:border-l" : "md:pl-0"} ${i > 1 ? "border-t md:border-t-0" : ""}`}
                >
                  <dt className="max-w-[20ch] text-small text-muted">{s.label}</dt>
                  <dd className="num text-[clamp(2.75rem,6vw,4.75rem)] font-semibold leading-none tracking-[-0.04em] text-ink">
                    {s.prefix}
                    <CountUp value={s.value} delay={i * 0.08} />
                    <span className="text-grow">{s.suffix}</span>
                  </dd>
                </RevealItem>
              ))}
            </Reveal>
          </div>
        )}
      </div>
    </section>
  );
}
