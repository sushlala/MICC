import type { Metadata } from "next";
import { MembershipHero } from "@/components/membership/membership-hero";
import { BenefitsGrid } from "@/components/membership/benefits-grid";
import { ProcessDiagram } from "@/components/membership/process-diagram";
import { MembershipForm } from "@/components/membership/membership-form";
import { CtaBanner } from "@/components/home/cta-banner";
export const metadata: Metadata = {
  title: "Membership & Concierge",
  description:
    "Join MICC for priority access, a dedicated concierge, and preferred rates on every Chicago trip.",
};

const BENEFITS = [
  {
    title: "Priority Access",
    description:
      "Skip the wait. Members get first access to hotel blocks, tables, and reservation windows before they open to other guests.",
    icon: "Crown",
  },
  {
    title: "Dedicated Concierge",
    description:
      "The same MICC liaison for every trip — one point of contact who already knows your preferences and how you like to travel.",
    icon: "HeartHandshake",
  },
  {
    title: "Curated Experiences",
    description:
      "Private Chicago experiences arranged exclusively for members — from chef-driven dinners to private charters and VIP nightlife.",
    icon: "Sparkles",
  },
  {
    title: "Preferred Pricing",
    description:
      "Members receive preferred rates and priority scheduling for peak dates and high-demand venues across the city.",
    icon: "Star",
  },
  {
    title: "Discretion Guaranteed",
    description:
      "Every interaction is handled with the utmost confidentiality. Your privacy is non-negotiable — it is foundational to how we operate.",
    icon: "Shield",
  },
  {
    title: "24/7 Availability",
    description:
      "Last-minute change of plans? Need something at 2 AM? Your concierge team is always on, ensuring nothing falls through the cracks.",
    icon: "Clock",
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
        headline="Your Chicago Concierge, On Retainer"
        subheadline="For guests who visit Chicago often — priority access, a dedicated concierge who already knows you, and preferred rates on every trip."
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
