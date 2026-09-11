import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { EXPERIENCES } from "@/lib/constants";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/fade-in";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return EXPERIENCES.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const experience = EXPERIENCES.find((e) => e.slug === slug);
  if (!experience) return {};
  return {
    title: experience.name,
    description: experience.longDescription,
  };
}

export default async function ExperiencePage({ params }: Props) {
  const { slug } = await params;
  const experience = EXPERIENCES.find((e) => e.slug === slug);
  if (!experience) notFound();

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-24 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
        <Container className="relative z-10">
          <FadeIn className="max-w-3xl">
            <p className="text-gold text-xs font-medium tracking-[0.2em] uppercase mb-6">
              {experience.tagline}
            </p>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-light leading-[1.1] mb-6">
              {experience.name}
            </h1>
            <p className="text-dark-muted text-lg max-w-xl leading-relaxed">
              {experience.longDescription}
            </p>
          </FadeIn>
        </Container>
      </section>

      {/* What we coordinate */}
      <Section className="border-t border-dark-border">
        <Container>
          <FadeIn className="block">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div>
                <h2 className="font-display text-2xl font-light mb-6">
                  What we may coordinate
                </h2>
                <ul className="space-y-3">
                  {experience.coordinates.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-dark-muted leading-relaxed"
                    >
                      <span className="text-gold mt-1">—</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="font-display text-2xl font-light mb-6">
                  Why a concierge
                </h2>
                <p className="text-dark-muted leading-relaxed">
                  {experience.whyConcierge}
                </p>
              </div>
            </div>
          </FadeIn>
        </Container>
      </Section>

      {/* CTA */}
      <Section>
        <Container>
          <FadeIn className="text-center block">
            <h2 className="font-display text-3xl font-light mb-4">
              Ready to plan this?
            </h2>
            <p className="text-dark-muted max-w-lg mx-auto mb-8">
              Share your dates and group size and we&apos;ll take it from
              there.
            </p>
            <Link href="/start">
              <Button size="lg">Request a Customized Plan</Button>
            </Link>
          </FadeIn>
        </Container>
      </Section>
    </>
  );
}
