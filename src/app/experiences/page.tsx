import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/fade-in";
import { PhotoCtaBand } from "@/components/layout/photo-cta-band";
import { EXPERIENCES } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Experiences",
  description:
    "Chicago experiences MICC is asked to coordinate most often — bachelor weekends, luxury getaways, celebrations, corporate hospitality and more.",
};

export default function ExperiencesPage() {
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
              Experiences
            </p>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-light leading-[1.1] mb-6">
              Planned around the reason you&apos;re here.
            </h1>
            <p className="text-dark-muted text-lg max-w-xl leading-relaxed">
              Every itinerary begins with the occasion. These are the
              experiences we&apos;re asked to coordinate most often.
            </p>
          </FadeIn>
        </Container>
      </section>

      {/* Numbered list */}
      <Container>
        <div className="divide-y divide-dark-border border-t border-dark-border">
          {EXPERIENCES.map((exp, i) => (
            <FadeIn key={exp.slug} delay={Math.min(i * 0.05, 0.3)}>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 py-14">
                <div className="lg:col-span-5">
                  <span className="text-gold text-xs tracking-[0.15em] block mb-4">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2 className="font-display text-3xl font-light mb-4">
                    {exp.name}
                  </h2>
                  <p className="text-dark-muted leading-relaxed mb-6 max-w-md">
                    {exp.longDescription}
                  </p>
                  <Link href={`/start?package=${exp.slug}`}>
                    <Button variant="secondary" size="sm">
                      Request a Customized Plan
                    </Button>
                  </Link>
                </div>

                <div className="lg:col-span-4">
                  <p className="text-gold text-xs font-medium tracking-[0.15em] uppercase mb-4">
                    What We May Coordinate
                  </p>
                  <ul className="space-y-3">
                    {exp.coordinates.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm text-dark-muted leading-relaxed">
                        <span className="text-gold mt-2.5 block w-3 h-px bg-gold shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="lg:col-span-3">
                  <p className="text-gold text-xs font-medium tracking-[0.15em] uppercase mb-4">
                    Why a Concierge
                  </p>
                  <p className="text-sm text-dark-muted leading-relaxed">
                    {exp.whyConcierge}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </Container>

      <PhotoCtaBand
        heading="Ready when you are."
        body="Share the occasion, the dates and your group size. We'll start with a conversation, not a contract."
      />
    </>
  );
}
