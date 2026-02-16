import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { PILLARS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about MICC — the luxury concierge platform redefining curated experiences.",
};

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--color-gold)_0%,_transparent_60%)] opacity-[0.06]" />
        <Container className="relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-gold text-sm font-medium tracking-[0.2em] uppercase mb-3">
              About MICC
            </p>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Redefining{" "}
              <span className="text-gold">Luxury Experiences</span>
            </h1>
            <p className="text-lg text-dark-muted leading-relaxed">
              MICC was founded on a simple belief: extraordinary moments
              shouldn&apos;t require extraordinary effort. We handle every
              detail so you can focus on what matters — enjoying the experience.
            </p>
          </div>
        </Container>
      </section>

      {/* Story */}
      <Section className="border-t border-dark-border">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold mb-6">
                Our <span className="text-gold">Story</span>
              </h2>
              <div className="space-y-4 text-dark-muted leading-relaxed">
                <p>
                  Born from the nightlife and events scene in Los Angeles, MICC
                  emerged from a recognition that truly premium experiences
                  require more than just money — they require access, taste, and
                  flawless execution.
                </p>
                <p>
                  We assembled a team of industry insiders — event producers,
                  media creators, lighting designers, and hospitality
                  professionals — united by a shared commitment to excellence
                  and an obsessive attention to detail.
                </p>
                <p>
                  Today, MICC operates across four pillars of service, each
                  designed to address a fundamental element of what makes an
                  experience truly unforgettable.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/5] rounded-2xl bg-dark-card border border-dark-border overflow-hidden flex items-center justify-center">
                <div className="text-center p-8">
                  <p className="font-display text-6xl font-bold text-gold mb-4">
                    MICC
                  </p>
                  <p className="text-dark-muted text-sm tracking-[0.2em] uppercase">
                    Curated Luxury, On Demand
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Mission */}
      <Section className="bg-dark-card/50">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-6">
              Our <span className="text-gold">Mission</span>
            </h2>
            <p className="text-lg text-dark-muted leading-relaxed mb-8">
              To democratize access to luxury experiences through a seamless,
              technology-driven concierge platform. We believe everyone deserves
              a night they&apos;ll never forget — and that getting there should
              be effortless.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {PILLARS.map((pillar) => {
                const Icon = pillar.icon;
                return (
                  <div key={pillar.slug} className="text-center">
                    <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gold/10 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-gold" />
                    </div>
                    <p className="text-sm font-medium">{pillar.name}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </Container>
      </Section>

      {/* Contact */}
      <Section>
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
              Get in <span className="text-gold">Touch</span>
            </h2>
            <p className="text-dark-muted mb-4">
              Have questions? Reach out to our team.
            </p>
            <p className="text-gold font-medium text-lg mb-2">
              hello@micc.com
            </p>
            <p className="text-dark-muted mb-8">Los Angeles, California</p>
            <Link href="/request">
              <Button size="lg">Request Curation</Button>
            </Link>
          </div>
        </Container>
      </Section>
    </>
  );
}
