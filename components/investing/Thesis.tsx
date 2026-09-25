import { thesis } from "@/content/portfolio";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { SampleBadge } from "@/components/ui/SampleBadge";

/**
 * How we decide. The intro is set as a large pull statement on the left;
 * principles step down the right column like a descending ledger.
 */
export function Thesis() {
  return (
    <section aria-labelledby="thesis-title" className="surface-ink relative overflow-hidden section-y">
      <div aria-hidden className="grid-lines pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_right,black,transparent)]" />
      <div className="container-x relative grid gap-14 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5 lg:sticky lg:top-28 lg:self-start">
          <h2 id="thesis-title" className="text-lead font-body font-semibold text-mint">
            How we decide
          </h2>
          <p className="wdth-semi mt-5 font-display text-display-sm font-extrabold leading-[1.05]">{thesis.intro}</p>
          <SampleBadge show={thesis.isSample} className="mt-8 text-muted-dark" />
        </div>
        <Reveal as="ul" className="grid gap-5 lg:col-span-6 lg:col-start-7">
          {thesis.principles.map((p, i) => (
            <RevealItem
              as="li"
              key={p.title}
              className="rounded-md bg-ink-soft p-7 shadow-float-dark ring-1 ring-white/5 md:p-8"
              style={{ marginLeft: `min(${i * 2.5}rem, ${i * 6}%)` }}
            >
              <h3 className="wdth-semi font-display text-title font-bold">{p.title}</h3>
              <p className="mt-3 text-body text-muted-dark">{p.body}</p>
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
