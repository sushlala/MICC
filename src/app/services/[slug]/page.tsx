import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { SERVICES } from "@/lib/constants";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/fade-in";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) return {};
  return {
    title: service.name,
    description: service.longDescription,
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) notFound();

  const Icon = service.icon;

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
            <div className="w-14 h-14 bg-gold/10 flex items-center justify-center mb-6">
              <Icon className="w-7 h-7 text-gold" />
            </div>
            <p className="text-gold text-xs font-medium tracking-[0.2em] uppercase mb-6">
              {service.tagline}
            </p>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-light leading-[1.1] mb-6">
              {service.name}
            </h1>
            <p className="text-dark-muted text-lg max-w-xl leading-relaxed">
              {service.longDescription}
            </p>
          </FadeIn>
        </Container>
      </section>

      {/* What's included */}
      <Section className="border-t border-dark-border">
        <Container>
          <FadeIn>
            <h2 className="font-display text-3xl font-light mb-12">
              What we coordinate
            </h2>
          </FadeIn>
          <FadeIn delay={0.1} className="block">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {service.services.map((item) => (
                <Card key={item.title}>
                  <h3 className="font-display text-xl font-semibold mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-dark-muted leading-relaxed">
                    {item.description}
                  </p>
                </Card>
              ))}
            </div>
          </FadeIn>
        </Container>
      </Section>

      {/* CTA */}
      <Section>
        <Container>
          <FadeIn className="text-center block">
            <h2 className="font-display text-3xl font-light mb-4">
              Ready to plan {service.name}?
            </h2>
            <p className="text-dark-muted max-w-lg mx-auto mb-8">
              {service.tagline}. Tell us about your trip and we&apos;ll take
              it from there.
            </p>
            <Link href="/start">
              <Button size="lg">Start Planning</Button>
            </Link>
          </FadeIn>
        </Container>
      </Section>
    </>
  );
}
