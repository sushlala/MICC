import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { FadeIn } from "@/components/ui/fade-in";
import { PhotoCtaBand } from "@/components/layout/photo-cta-band";

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "How MICC plans your Chicago trip, step by step — from your first message to the day you head home.",
};

const STEPS = [
  {
    num: "01",
    title: "Initial Request",
    desc: "Send over your dates, group size, budget and what you have in mind. Nothing's locked in yet — it's just enough for us to tell you honestly what's realistic.",
  },
  {
    num: "02",
    title: "Consultation",
    desc: "We get on a call to go deeper: who's coming, how the group likes to move, and what actually matters most to you. The itinerary starts taking real shape here.",
  },
  {
    num: "03",
    title: "Personalized Proposal",
    desc: "You get a written plan back — recommended hotels, restaurants, transportation and experiences, with pricing and inclusions spelled out clearly.",
  },
  {
    num: "04",
    title: "Deposit or Planning Fee",
    desc: "Once the direction looks right, a deposit or planning fee locks in the work and lets us start holding reservations on your behalf. Everything's in writing before you pay anything.",
  },
  {
    num: "05",
    title: "Reservations & Coordination",
    desc: "We lock in and confirm every piece — hotels, restaurants, drivers, venues, events — and handle the sequencing so nothing overlaps or falls through.",
  },
  {
    num: "06",
    title: "Final Itinerary",
    desc: "You get one finished itinerary, day by day, with times, addresses and confirmations — easy to forward to everyone in your group.",
  },
  {
    num: "07",
    title: "On-Trip Communication",
    desc: "While you're here, there's one number to call for anything that needs to change, get added, or get fixed on the fly.",
  },
  {
    num: "08",
    title: "Post-Trip Follow-Up",
    desc: "After you head home, we close the loop on anything outstanding and save your preferences so the next trip starts even faster.",
  },
];

export default function HowItWorksPage() {
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
              How It Works
            </p>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-light leading-[1.1] mb-6">
              Eight steps, no surprises.
            </h1>
            <p className="text-dark-muted text-lg max-w-xl leading-relaxed">
              You&apos;ll always know what&apos;s next — this is the same
              sequence we run for every trip, start to finish.
            </p>
          </FadeIn>
        </Container>
      </section>

      {/* Numbered list */}
      <Container>
        <div className="divide-y divide-dark-border border-t border-dark-border">
          {STEPS.map((step, i) => (
            <FadeIn key={step.num} delay={Math.min(i * 0.04, 0.3)}>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 py-10 items-baseline">
                <div className="lg:col-span-4 flex items-baseline gap-4">
                  <span className="text-gold text-xs tracking-[0.15em] shrink-0">
                    {step.num}
                  </span>
                  <h2 className="font-display text-2xl font-light">
                    {step.title}
                  </h2>
                </div>
                <div className="lg:col-span-8">
                  <p className="text-dark-muted leading-relaxed max-w-2xl">
                    {step.desc}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </Container>

      {/* Pricing note */}
      <section className="py-20 sm:py-28">
        <Container>
          <FadeIn className="max-w-2xl mx-auto text-center block">
            <p className="text-gold text-xs font-medium tracking-[0.2em] uppercase mb-4">
              A Note on Pricing
            </p>
            <p className="text-dark-muted leading-relaxed">
              Cost depends on your group size, dates, how complex the ask
              is, availability, and which experiences you&apos;re after.
              Some things get billed to you directly by the vendor; others
              we coordinate and roll into your proposal. Either way,
              you&apos;ll see it broken down in writing before you commit
              to anything — and figures can shift right up until
              reservations are actually locked in.
            </p>
          </FadeIn>
        </Container>
      </section>

      <PhotoCtaBand
        heading="Ready when you are."
        body="Submit a request and we'll start with a conversation, not a contract."
      />
    </>
  );
}
