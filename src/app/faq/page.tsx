import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { FaqAccordion } from "@/components/faq/faq-accordion";
import { FadeIn } from "@/components/ui/fade-in";
import { PhotoCtaBand } from "@/components/layout/photo-cta-band";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Frequently asked questions about MICC's Chicago concierge service.",
};

const FAQ_ITEMS = [
  {
    question: "What does MICC Hospitality do?",
    answer:
      "MICC plans and coordinates every detail of your time in Chicago — hotels, dining, nightlife, transportation, events and private experiences — through one point of contact.",
  },
  {
    question: "Who is the service designed for?",
    answer:
      "Groups and individuals visiting Chicago for a bachelor or bachelorette weekend, a milestone celebration, a corporate visit, or a considered leisure trip.",
  },
  {
    question: "How far in advance should I contact MICC?",
    answer:
      "As early as possible. For group weekends, 3–4 or more weeks ahead gives us the best shot at the rooms and tables you want. Smaller requests can move faster depending on availability.",
  },
  {
    question: "Can you plan an entire weekend?",
    answer:
      "Yes — that's most of what we do. A full day-by-day itinerary from arrival to departure, covering hotels, dining, transportation and evening plans.",
  },
  {
    question: "Can you work with large groups?",
    answer:
      "Yes, from a couple of guests to 20 or more. Larger parties need more lead time to secure room blocks and tables sized for the full group.",
  },
  {
    question: "Do you only plan nightlife?",
    answer:
      "No. Nightlife is one of eight services we coordinate, alongside hotels, dining, transportation, events and complete itinerary planning.",
  },
  {
    question: "Can you help with hotels and transportation?",
    answer: "Yes — both are core services, whether booked individually or as part of a full itinerary.",
  },
  {
    question: "Is every itinerary customized?",
    answer:
      "Yes. We don't run packaged itineraries — every plan starts from your dates, your group and the reason for the visit.",
  },
  {
    question: "How does pricing work?",
    answer:
      "Pricing depends on group size, dates, complexity, availability and the experiences requested. You'll see a written proposal with pricing before anything is confirmed.",
  },
  {
    question: "Are reservations guaranteed?",
    answer:
      "All experiences are subject to availability, venue policies, capacity, identification and age requirements, and management approval. We don't guarantee admission, availability or pricing until a reservation is confirmed.",
  },
  {
    question: "What happens after I submit a request?",
    answer:
      "We review it and follow up to schedule a consultation. Nothing is committed by submitting a request — it gives us enough to assess what's realistic.",
  },
  {
    question: "Can plans change after booking?",
    answer:
      "Yes. During your visit you have one point of contact for changes, additions and anything that needs to be re-arranged.",
  },
  {
    question: "Are nightlife services limited to guests who are 21 or older?",
    answer:
      "Yes. Nightlife services are available only to guests who meet all legal age requirements.",
  },
  {
    question: "What areas of Chicago do you serve?",
    answer:
      "We coordinate across downtown Chicago and the surrounding neighborhoods — Gold Coast, River North, The Loop, West Loop, Fulton Market, Lakefront and South Loop.",
  },
  {
    question: "Can MICC help corporate groups?",
    answer:
      "Yes — client entertainment, executive visits and team outings, planned with the discretion and reliability business travel requires.",
  },
];

export default function FaqPage() {
  return (
    <>
      <section className="relative pt-32 pb-16 sm:pt-40 overflow-hidden">
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
              FAQ
            </p>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-light leading-[1.1] mb-6">
              Questions, answered directly.
            </h1>
            <p className="text-dark-muted text-lg max-w-xl leading-relaxed">
              If something isn&apos;t covered here, ask us. We&apos;d rather
              give you a straight answer than have you guess.
            </p>
          </FadeIn>
        </Container>
      </section>

      <Section className="pt-0">
        <Container className="max-w-3xl">
          <FadeIn className="block">
            <FaqAccordion items={FAQ_ITEMS} />
          </FadeIn>
        </Container>
      </Section>

      <PhotoCtaBand
        heading="Still deciding?"
        body="Send us the outline of your trip and we'll tell you what's realistic."
      />
    </>
  );
}
