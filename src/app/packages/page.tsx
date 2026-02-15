import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { PackageCatalog } from "@/components/packages/package-catalog";

export const metadata: Metadata = {
  title: "Packages",
  description:
    "Explore MICC's curated luxury packages — from media coverage to full event production.",
};

export default function PackagesPage() {
  return (
    <>
      <section className="relative pt-32 pb-12 sm:pt-40 sm:pb-16">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--color-gold)_0%,_transparent_60%)] opacity-[0.06]" />
        <Container className="relative z-10 text-center">
          <p className="text-gold text-sm font-medium tracking-[0.2em] uppercase mb-3">
            Our Packages
          </p>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
            Signature <span className="text-gold">Experiences</span>
          </h1>
          <p className="text-dark-muted text-lg max-w-xl mx-auto">
            Every package is a starting point. We customize every detail to match
            your vision.
          </p>
        </Container>
      </section>

      <Section className="pt-0">
        <Container>
          <PackageCatalog />
        </Container>
      </Section>
    </>
  );
}
