import { glossary } from "@/content/glossary";

function Row({ hidden }: { hidden?: boolean }) {
  return (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {glossary.map((g) => (
        <li key={g.term} className="flex items-center gap-3 px-6 whitespace-nowrap">
          <svg viewBox="0 0 10 8" aria-hidden className="size-2.5 text-mint">
            <path d="M5 0 10 8H0Z" fill="currentColor" />
          </svg>
          <span className="font-display font-bold wdth-semi text-paper">{g.term}</span>
          <span className="text-muted-dark">{g.meaning}</span>
        </li>
      ))}
    </ul>
  );
}

/**
 * A glossary tape in the style of a market ticker. The list is rendered twice
 * so the loop is seamless; the copy is hidden from assistive tech, and the
 * whole thing pauses on hover/focus and stops under reduced motion.
 */
export function Ticker() {
  return (
    <section aria-label="Finance glossary" className="ticker surface-ink relative overflow-hidden border-y border-line-dark py-4 text-small">
      <div className="ticker-track flex w-max">
        <Row />
        <Row hidden />
      </div>
      <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-ink to-transparent" />
      <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-ink to-transparent" />
    </section>
  );
}
