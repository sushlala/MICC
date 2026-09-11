import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { FadeIn } from "@/components/ui/fade-in";
import { PhotoCtaBand } from "@/components/layout/photo-cta-band";

export const metadata: Metadata = {
  title: "About",
  description:
    "MICC Hospitality was built on relationships, not listings — a private Chicago concierge coordinating every detail of your trip.",
};

const APPROACH_PARAGRAPHS = [
  "We lean on relationships built over years in this city, and one person on our end handles everything on yours. Planning, booking, scheduling, chasing confirmations — that's on us, so you're actually in Chicago instead of managing it from your phone.",
  "This isn't a list of recommendations — anyone can hand you a list of good restaurants. What we actually get hired for is judgment: figuring out what fits a specific group, then doing the legwork to make it happen in the right sequence, at the right time, fully confirmed.",
  "None of that is glamorous. It's also the whole job.",
];

const VALUES = [
  {
    title: "Chicago Knowledge",
    desc: "This is our city, every week of the year. We know which neighborhood fits which kind of group, what a Friday-night transfer really takes, and which table in a restaurant is actually worth asking for.",
  },
  {
    title: "Relationship-Based Hospitality",
    desc: "None of this works without real relationships — hotels, restaurants, venues and operators we've dealt with for years, kept by being reliable on both ends of every booking.",
  },
  {
    title: "Personal Service",
    desc: "The person you message first is the same person coordinating your last ride home. Nothing gets handed off to a call center or a ticket queue.",
  },
  {
    title: "Attention to Detail",
    desc: "Allergies, course timing, seating, accessibility, exact arrival windows — the small stuff that actually decides whether a plan holds up or falls apart.",
  },
  {
    title: "Customized Experiences",
    desc: "There's no template we're pulling from. Every itinerary is built from scratch around your dates, your people, and why you're actually here.",
  },
  {
    title: "Reliable Communication",
    desc: "Straight answers, confirmations in writing, and honesty when something just isn't available — no runaround.",
  },
];

export default function AboutPage() {
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
              About
            </p>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-light leading-[1.1] mb-6">
              Built on relationships, not listings.
            </h1>
            <p className="text-dark-muted text-lg max-w-xl leading-relaxed">
              MICC exists because visiting Chicago well usually means
              juggling a dozen different bookings, contacts and
              confirmations — and that shouldn&apos;t be the visitor&apos;s
              job.
            </p>
          </FadeIn>
        </Container>
      </section>

      {/* Approach */}
      <section className="py-20 sm:py-28 border-t border-dark-border">
        <Container>
          <FadeIn className="grid grid-cols-1 lg:grid-cols-12 gap-8 block">
            <div className="lg:col-span-4">
              <h2 className="font-display text-3xl font-light">
                Our approach
              </h2>
            </div>
            <div className="lg:col-span-8 space-y-5">
              {APPROACH_PARAGRAPHS.map((p) => (
                <p key={p} className="text-dark-muted leading-relaxed max-w-2xl">
                  {p}
                </p>
              ))}
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* Values */}
      <section className="py-20 sm:py-28 border-t border-dark-border">
        <Container>
          <FadeIn>
            <h2 className="font-display text-3xl font-light mb-12">
              What we care about
            </h2>
          </FadeIn>
          <FadeIn delay={0.1} className="block">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border border-dark-border bg-dark-card/40">
              {VALUES.map((v) => (
                <div
                  key={v.title}
                  className="p-8 border-b border-r border-dark-border [&:nth-child(3n)]:border-r-0 last:border-b-0 [&:nth-last-child(-n+3)]:border-b-0"
                >
                  <h3 className="font-display text-lg font-light mb-3 pb-3 border-b border-dark-border">
                    {v.title}
                  </h3>
                  <p className="text-sm text-dark-muted leading-relaxed">
                    {v.desc}
                  </p>
                </div>
              ))}
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* Leadership */}
      <section className="py-20 sm:py-28 border-t border-dark-border">
        <Container>
          <FadeIn>
            <p className="text-gold text-xs font-medium tracking-[0.2em] uppercase mb-4">
              Leadership
            </p>
            <h2 className="font-display text-3xl font-light mb-3">
              The team behind MICC
            </h2>
            <p className="text-dark-muted mb-12">
              Founder photography and biographies will be published here.
            </p>
          </FadeIn>
          <FadeIn delay={0.1} className="block">
            <div className="grid grid-cols-1 sm:grid-cols-2 border border-dark-border bg-dark-card/40">
              {[0, 1].map((i) => (
                <div
                  key={i}
                  className="p-8 border-b sm:border-b-0 sm:border-r border-dark-border last:border-0"
                >
                  <div className="aspect-square bg-dark-card border border-dark-border flex items-center justify-center mb-4">
                    <span className="text-xs text-dark-muted tracking-[0.2em] uppercase">
                      Founder Photo — Placeholder
                    </span>
                  </div>
                  <p className="font-medium">Name to be added</p>
                  <p className="text-xs text-dark-muted tracking-[0.15em] uppercase mt-1">
                    Role to be added
                  </p>
                </div>
              ))}
            </div>
          </FadeIn>
        </Container>
      </section>

      <PhotoCtaBand
        heading="Let's talk about your visit."
        body="Share the details and we'll tell you honestly what we'd plan."
      />
    </>
  );
}
