import { PageTransition } from "@/components/layout/PageTransition";
import { Hero } from "@/components/home/Hero";
import { Ticker } from "@/components/home/Ticker";
import { Mission } from "@/components/home/Mission";
import { Pillars } from "@/components/home/Pillars";
import { RightNow } from "@/components/home/RightNow";
import { WhoWeAre } from "@/components/home/WhoWeAre";

export default function HomePage() {
  return (
    <PageTransition>
      <Hero />
      <Ticker />
      <Mission />
      <Pillars />
      <RightNow />
      <WhoWeAre />
    </PageTransition>
  );
}
