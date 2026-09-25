import { site } from "@/content/site";
import { performance, portfolio } from "@/content/portfolio";
import { formatDate, pctChange } from "@/lib/format";
import { isPlaceholder } from "@/lib/placeholder";
import { pageMetadata } from "@/lib/site-helpers";
import { PageTransition } from "@/components/layout/PageTransition";
import { PageHero } from "@/components/ui/PageHero";
import { CountUp } from "@/components/ui/CountUp";
import { SampleBadge } from "@/components/ui/SampleBadge";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Allocation } from "@/components/investing/Allocation";
import { Disclaimer } from "@/components/investing/Disclaimer";
import { Holdings } from "@/components/investing/Holdings";
import { LazyPerformanceChart } from "@/components/investing/LazyChart";
import { Thesis } from "@/components/investing/Thesis";

export const metadata = pageMetadata(
  "Investing",
  `The ${site.name} student portfolio: real money, every holding, our reasoning, and performance against the ${portfolio.benchmarkName}. Educational only, not financial advice.`,
  "/investing",
);

export default function InvestingPage() {
  const { totalValue, startingValue } = portfolio.summary;
  const first = performance[0]!;
  const last = performance[performance.length - 1]!;
  const totalReturn = pctChange(startingValue, totalValue);
  const vsBench = pctChange(first.portfolio, last.portfolio) - pctChange(first.benchmark, last.benchmark);
  const since = isPlaceholder(portfolio.inceptionDate) ? formatDate(first.date, false) : formatDate(portfolio.inceptionDate, false);

  const figures = [
    { label: "Portfolio value", value: totalValue, format: "usd" as const },
    { label: `Return since ${since}`, value: totalReturn, format: "pct" as const },
    { label: `vs. ${portfolio.benchmarkName}`, value: vsBench, format: "pts" as const },
  ];

  return (
    <PageTransition>
      <PageHero
        lines={["Real money.", "Shown in the open."]}
        intro="We manage a real portfolio with real money, as a team. Every position, the reason we bought it, and how it's doing are posted here."
      >
        <div className="fade-up mt-8" style={{ animationDelay: "300ms" }}>
          <Disclaimer variant="banner" />
        </div>
        <div className="mt-16 md:mt-20">
          <div className="mb-4 flex items-center justify-between gap-4 text-small text-muted-dark">
            <p>As of {formatDate(portfolio.asOf)}</p>
            <SampleBadge show={portfolio.isSample} />
          </div>
          <dl className="grid gap-px overflow-hidden rounded-lg bg-line-dark ring-1 ring-line-dark sm:grid-cols-3">
            {figures.map((f, i) => (
              <div key={f.label} className="flex flex-col-reverse gap-3 bg-ink p-6 md:p-8">
                <dt className="text-small text-muted-dark">{f.label}</dt>
                <dd
                  className={`num text-[clamp(2.25rem,4.5vw,3.75rem)] font-semibold leading-none tracking-[-0.03em] ${
                    i > 0 ? (f.value >= 0 ? "text-mint" : "text-loss-dark") : ""
                  }`}
                >
                  <CountUp value={f.value} format={f.format} delay={0.3 + i * 0.1} />
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </PageHero>

      <section aria-labelledby="overview-title" className="section-y">
        <div className="container-x">
          <SectionHeading
            id="overview-title"
            title="The portfolio"
            intro={`How we've done against the ${portfolio.benchmarkName}, and where the money sits today.`}
            aside={<SampleBadge show={portfolio.isSample} className="text-muted" />}
          />
          <div className="mt-12 grid gap-5 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <LazyPerformanceChart />
            </div>
            <div className="lg:col-span-4">
              <Allocation />
            </div>
          </div>

          <h3 className="wdth-semi mt-[var(--space-block)] text-display-sm">Holdings, and why we own them</h3>
          <div className="mt-8">
            <Holdings />
          </div>
        </div>
      </section>

      <Thesis />

      <div className="container-x section-y">
        <Disclaimer />
      </div>
    </PageTransition>
  );
}
