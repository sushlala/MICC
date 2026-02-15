import { Hero } from "@/components/home/hero";
import { PillarsGrid } from "@/components/home/pillars-grid";
import { FeaturedPackages } from "@/components/home/featured-packages";
import { CtaSection } from "@/components/home/cta-section";

export default function HomePage() {
  return (
    <>
      <Hero />
      <PillarsGrid />
      <FeaturedPackages />
      <CtaSection />
    </>
  );
}
