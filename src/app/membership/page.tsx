import type { Metadata } from "next";
import { MembershipHero } from "@/components/membership/membership-hero";
import { BenefitsGrid } from "@/components/membership/benefits-grid";
import { ProcessDiagram } from "@/components/membership/process-diagram";
import { MembershipForm } from "@/components/membership/membership-form";
import { CtaBanner } from "@/components/home/cta-banner";
import {
  Crown,
  Sparkles,
  Shield,
  Clock,
  Star,
  HeartHandshake,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Membership & Concierge",
  description:
    "Join MICC for exclusive access to luxury concierge services, VIP event production, and personalized lifestyle management in Los Angeles.",
};

const BENEFITS = [
  {
    title: "Priority Access",
    description:
      "Skip the waitlist. Members receive first access to exclusive venues, events, and reservation windows before they open to the public.",
    icon: Crown,
  },
  {
    title: "Dedicated Concierge",
    description:
      "Your personal MICC liaison available around the clock. One point of contact who knows your preferences and anticipates your needs.",
    icon: HeartHandshake,
  },
  {
    title: "Curated Experiences",
    description:
      "Bespoke events and gatherings designed exclusively for members — from intimate tastings to private performances and VIP nightlife.",
    icon: Sparkles,
  },
  {
    title: "Preferred Pricing",
    description:
      "Members enjoy preferred rates on all MICC packages and priority scheduling for peak-season dates and high-demand venues.",
    icon: Star,
  },
  {
    title: "Discretion Guaranteed",
    description:
      "Every interaction is handled with the utmost confidentiality. Your privacy is non-negotiable — it is foundational to how we operate.",
    icon: Shield,
  },
  {
    title: "24/7 Availability",
    description:
      "Last-minute change of plans? Need something at 2 AM? Your concierge team is always on, ensuring nothing falls through the cracks.",
    icon: Clock,
  },
];

const PROCESS_STEPS = [
  {
    number: 1,
    title: "Submit Your Request",
    description:
      "Tell us about your event, preferences, and vision. The more detail you share, the more precisely we can tailor your experience.",
  },
  {
    number: 2,
    title: "Personal Consultation",
    description:
      "Your dedicated concierge reaches out within 24 hours to discuss details, refine the concept, and present initial options.",
  },
  {
    number: 3,
    title: "Proposal & Confirmation",
    description:
      "Receive a detailed proposal with transparent pricing, venue options, and a full production timeline. Review, adjust, and confirm.",
  },
  {
    number: 4,
    title: "Seamless Execution",
    description:
      "On the day, our team handles every detail on-site — from setup to teardown — so you can be fully present in the moment.",
  },
];

export default function MembershipPage() {
  return (
    <>
      <MembershipHero
        eyebrow="Membership & Concierge"
        headline="The MICC Experience, Elevated"
        subheadline="Unlock a private tier of service designed for those who expect more — priority access, dedicated support, and experiences crafted exclusively for you."
      />
      <BenefitsGrid
        eyebrow="Why Join"
        heading="Membership Benefits"
        benefits={BENEFITS}
      />
      <ProcessDiagram
        eyebrow="How It Works"
        heading="From Request to Reality"
        steps={PROCESS_STEPS}
      />
      <MembershipForm />
      <CtaBanner
        heading="Ready to Experience MICC?"
        body="Submit your first request and discover what it means to have every detail handled with precision and care."
        ctaLabel="Get Started"
        ctaHref="#request-form"
      />
    </>
  );
}
