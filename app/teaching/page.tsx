import { site } from "@/content/site";
import { pageMetadata } from "@/lib/site-helpers";
import { PageTransition } from "@/components/layout/PageTransition";
import { PageHero } from "@/components/ui/PageHero";
import { ClassFacts } from "@/components/teaching/ClassFacts";
import { Curriculum } from "@/components/teaching/Curriculum";
import { Schedule } from "@/components/teaching/Schedule";
import { SignupCta } from "@/components/teaching/SignupCta";

export const metadata = pageMetadata(
  "Teaching",
  `Online finance classes for kids ages 10–14, taught by ${site.name} students. Stocks, budgeting, financial literacy, and real-world money skills.`,
  "/teaching",
);

export default function TeachingPage() {
  return (
    <PageTransition>
      <PageHero
        lines={["Build smart", "habits today."]}
        intro="An engaging online class that teaches kids the basics of finance and sets them up for a lifetime of confidence. Taught by students, for students."
        aside={<ClassFacts />}
      />
      <Curriculum />
      <Schedule />
      <SignupCta />
    </PageTransition>
  );
}
