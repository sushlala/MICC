import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/fade-in";
import { PhotoCtaBand } from "@/components/layout/photo-cta-band";
import { SERVICES } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Services",
  description:
    "What MICC coordinates in Chicago — hotels, dining, nightlife, transportation, events and more — individually or as one complete itinerary.",
};

export default function ServicesPage() {
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
              Services
            </p>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-light leading-[1.1] mb-6">
              What we coordinate.
            </h1>
            <p className="text-dark-muted text-lg max-w-xl leading-relaxed">
              Individually or as one complete itinerary, arranged around
              your dates and your group.
            </p>
          </FadeIn>
        </Container>
      </section>

      {/* Numbered list */}
      <Container>
        <div className="divide-y divide-dark-border border-t border-dark-border">
          {SERVICES.map((service, i) => {
            const bullets = service.services.map((s) => s.title);
            const mid = Math.ceil(bullets.length / 2);
            const colA = bullets.slice(0, mid);
            const colB = bullets.slice(mid);
            return (
              <FadeIn key={service.slug} delay={Math.min(i * 0.05, 0.3)}>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 py-14">
                  <div className="lg:col-span-4">
                    <span className="text-gold text-xs tracking-[0.15em] block mb-4">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h2 className="font-display text-3xl font-light mb-3">
                      {service.name}
                    </h2>
                    <Link href={`/services/${service.slug}`}>
                      <Button variant="secondary" size="sm">
                        Learn More
                      </Button>
                    </Link>
                  </div>

                  <div className="lg:col-span-8">
                    <p className="text-dark-muted leading-relaxed mb-6 max-w-2xl">
                      {service.longDescription}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-3">
                      {[...colA, ...colB].map((label) => (
                        <div key={label} className="flex items-start gap-3 text-sm text-dark-muted">
                          <span className="mt-2.5 block w-3 h-px bg-gold shrink-0" />
                          {label}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </Container>

      <PhotoCtaBand
        heading="Ready to build your itinerary?"
        body="Tell us which services you need and which dates you're working with. We'll take it from there."
      />
    </>
  );
}
