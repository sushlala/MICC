import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { PILLARS, SEED_PACKAGES } from "@/lib/constants";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return PILLARS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const pillar = PILLARS.find((p) => p.slug === slug);
  if (!pillar) return {};
  return {
    title: pillar.name,
    description: pillar.longDescription,
  };
}

export default async function PillarPage({ params }: Props) {
  const { slug } = await params;
  const pillar = PILLARS.find((p) => p.slug === slug);
  if (!pillar) notFound();

  const Icon = pillar.icon;
  const relatedPackages = SEED_PACKAGES.filter((p) => p.pillar === slug);

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--color-gold)_0%,_transparent_60%)] opacity-[0.06]" />
        <Container className="relative z-10">
          <div className="max-w-3xl">
            <div className="w-16 h-16 rounded-xl bg-gold/10 flex items-center justify-center mb-6">
              <Icon className="w-8 h-8 text-gold" />
            </div>
            <Badge className="mb-4">{pillar.tagline}</Badge>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              {pillar.name}
            </h1>
            <p className="text-lg text-dark-muted leading-relaxed max-w-2xl">
              {pillar.longDescription}
            </p>
          </div>
        </Container>
      </section>

      {/* Services */}
      <Section className="border-t border-dark-border">
        <Container>
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl sm:text-4xl font-bold">
              Our <span className="text-gold">Services</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {pillar.services.map((service) => (
              <Card key={service.title}>
                <h3 className="font-display text-xl font-semibold mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-dark-muted leading-relaxed">
                  {service.description}
                </p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Related Packages */}
      {relatedPackages.length > 0 && (
        <Section className="bg-dark-card/50">
          <Container>
            <div className="text-center mb-16">
              <h2 className="font-display text-3xl sm:text-4xl font-bold">
                Related <span className="text-gold">Packages</span>
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPackages.map((pkg) => (
                <Card key={pkg.id} className="flex flex-col">
                  <h3 className="font-display text-xl font-semibold mb-2">
                    {pkg.name}
                  </h3>
                  <p className="text-sm text-dark-muted leading-relaxed mb-4 flex-1">
                    {pkg.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-gold font-semibold">
                      From ${pkg.base_price.toLocaleString()}
                    </span>
                    <Link href={`/request?package=${pkg.slug}`}>
                      <Button size="sm" variant="secondary">
                        Book
                      </Button>
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* CTA */}
      <Section>
        <Container>
          <div className="text-center">
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
              Ready for{" "}
              <span className="text-gold">{pillar.name}</span>?
            </h2>
            <p className="text-dark-muted max-w-lg mx-auto mb-8">
              {pillar.tagline}. Let us bring your vision to life with our
              dedicated team of specialists.
            </p>
            <Link href={`/request?pillar=${pillar.slug}`}>
              <Button size="lg">Request {pillar.name}</Button>
            </Link>
          </div>
        </Container>
      </Section>
    </>
  );
}
