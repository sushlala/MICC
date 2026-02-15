import type { LucideIcon } from "lucide-react";

/* ── Hero ─────────────────────────────────────────── */
export interface HeroImage {
  src: string;
  alt: string;
}

export interface HeroCta {
  label: string;
  href: string;
  variant?: "primary" | "secondary";
}

export interface HeroProps {
  images: HeroImage[];
  headline: string;
  highlightedText: string;
  subheadline: string;
  ctas: HeroCta[];
  /** Milliseconds between slides. Default 6000 */
  intervalMs?: number;
}

/* ── Offerings Card ───────────────────────────────── */
export interface OfferingsCardProps {
  title: string;
  tagline: string;
  description: string;
  slug: string;
  icon: LucideIcon;
  featuredImage?: string;
}

/* ── Benefits Card ────────────────────────────────── */
export interface BenefitsCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
}

/* ── Process Diagram ──────────────────────────────── */
export interface ProcessStep {
  number: number;
  title: string;
  description: string;
}

export interface ProcessDiagramProps {
  eyebrow: string;
  heading: string;
  steps: ProcessStep[];
}

/* ── Membership Form Step ─────────────────────────── */
export interface FormField {
  name: string;
  label: string;
  type:
    | "text"
    | "email"
    | "tel"
    | "number"
    | "datetime-local"
    | "select"
    | "textarea"
    | "pillar-select"
    | "vibe-tags";
  placeholder?: string;
  required?: boolean;
  options?: { label: string; value: string }[];
}

export interface MembershipFormStep {
  id: number;
  title: string;
  fields: FormField[];
  nextStep?: number;
}

/* ── Story Section ────────────────────────────────── */
export interface StorySectionProps {
  eyebrow: string;
  heading: string;
  body: string;
  imageSrc: string;
  imageAlt: string;
  ctaLabel: string;
  ctaHref: string;
}

/* ── CTA Banner ───────────────────────────────────── */
export interface CtaBannerProps {
  heading: string;
  body: string;
  ctaLabel: string;
  ctaHref: string;
}

/* ── Footer ───────────────────────────────────────── */
export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterProps {
  navLinks?: FooterLink[];
  contactEmail?: string;
  contactLocation?: string;
}
