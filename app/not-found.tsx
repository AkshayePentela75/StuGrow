import { PageTransition } from "@/components/layout/PageTransition";
import { ButtonLink } from "@/components/ui/ButtonLink";

export default function NotFound() {
  return (
    <PageTransition>
      <section className="container-x flex min-h-[70vh] flex-col justify-center py-24">
        <p className="num text-display-lg font-semibold text-grow">404</p>
        <h1 className="wdth-semi mt-4 text-display-sm">This page doesn&rsquo;t exist.</h1>
        <p className="mt-4 max-w-[46ch] text-body text-ink/80">
          The link may be old or mistyped. Head back to the homepage and pick up from there.
        </p>
        <div className="mt-8">
          <ButtonLink href="/">Back to home</ButtonLink>
        </div>
      </section>
    </PageTransition>
  );
}
