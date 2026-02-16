# MICC Hospitality — Full Build Specification

> Developer-ready scaffold, animation structure, and deployment guide.
> Built on: Next.js 16 (App Router) · React 19 · Tailwind CSS v4 · Framer Motion · TypeScript 5

---

## Table of Contents

1. [Webflow Section & Component Map](#1-webflow-section--component-map)
2. [HTML / React (JSX) Scaffolds](#2-html--react-jsx-scaffolds)
3. [Component Prop Interfaces (TypeScript)](#3-component-prop-interfaces-typescript)
4. [CMS / JSON Schema Examples](#4-cms--json-schema-examples)
5. [Animation / Interaction JSON](#5-animation--interaction-json)
6. [CSS Variable Map & Utility Classes](#6-css-variable-map--utility-classes)
7. [Accessibility + SEO Hooks](#7-accessibility--seo-hooks)
8. [Performance Optimizations](#8-performance-optimizations)
9. [Implementation Checklist](#9-implementation-checklist)

---

## 1. Webflow Section & Component Map

Each section below defines the recommended structure using Webflow's Section → Container → Grid → Component → Element hierarchy. Class names use BEM-adjacent conventions consistent with both Webflow custom classes and the existing Tailwind class tokens.

### Homepage (`/`)

```
Section: .section_hero
  └─ Div: .hero_gallery              ← absolute-fill, z-0, overflow hidden
  │    ├─ Img: .hero_gallery-image     ← one per slide, absolute-fill, crossfade
  │    ├─ Img: .hero_gallery-image
  │    └─ Img: .hero_gallery-image
  ├─ Div: .hero_overlay               ← gradient overlay, z-1
  └─ Container: .hero_content          ← z-10, centered, max-w-4xl
       ├─ P: .hero_eyebrow            ← uppercase gold tracking
       ├─ H1: .hero_headline          ← font-display
       ├─ P: .hero_subheadline        ← muted body text
       └─ Div: .hero_cta-group        ← flex row, gap-4
            ├─ A: .btn.btn--primary
            └─ A: .btn.btn--secondary

Section: .section_intro
  └─ Container
       ├─ P: .section_eyebrow
       ├─ H2: .section_heading
       └─ P: .section_body

Section: .section_grid-offerings
  └─ Container
       ├─ Div: .section_header        ← eyebrow + heading
       └─ Div: .grid_offerings        ← 1×1 → 2×2 → 4-col grid
            └─ Div: .offerings_card   ← repeated per pillar
                 ├─ Div: .offerings_card-icon
                 │    └─ Svg/Icon
                 ├─ H3: .offerings_card-title
                 ├─ P: .offerings_card-tagline
                 └─ P: .offerings_card-description

Section: .section_story
  └─ Container
       ├─ Div: .story_media           ← image or video, 50% width
       │    └─ Img: .story_image
       └─ Div: .story_content         ← 50% width
            ├─ P: .section_eyebrow
            ├─ H2: .section_heading
            ├─ P: .story_body
            └─ A: .btn.btn--secondary

Section: .section_cta-banner
  └─ Container
       └─ Div: .cta-banner_card       ← dark-card, gold gradient bg
            ├─ H2: .cta-banner_heading
            ├─ P: .cta-banner_body
            └─ Div: .cta-banner_actions
                 └─ A: .btn.btn--primary
```

### Membership / Concierge Page (`/membership`)

```
Section: .section_membership-hero
  └─ Container
       ├─ P: .section_eyebrow
       ├─ H1: .membership_headline
       └─ P: .membership_subheadline

Section: .section_benefits
  └─ Container
       ├─ Div: .section_header
       └─ Div: .grid_benefits         ← 1 → 2 → 3 col grid
            └─ Div: .benefits_card     ← repeated
                 ├─ Div: .benefits_card-icon
                 ├─ H3: .benefits_card-title
                 └─ P: .benefits_card-description

Section: .section_process
  └─ Container
       ├─ Div: .section_header
       └─ Div: .process_diagram       ← horizontal stepper or vertical timeline
            └─ Div: .process_step      ← repeated, connected by line
                 ├─ Div: .process_step-number
                 ├─ H4: .process_step-title
                 └─ P: .process_step-description

Section: .section_form
  └─ Container
       └─ Div: .form_wrapper          ← max-w-2xl, mx-auto
            ├─ Div: .form_progress     ← step indicator bar
            │    └─ Div: .form_progress-fill
            ├─ Div: .form_step         ← one visible at a time
            │    ├─ H2: .form_step-title
            │    └─ Div: .form_step-fields
            │         ├─ Input / Select / Textarea
            │         └─ ...
            └─ Div: .form_nav          ← back/next buttons
                 ├─ Button: .btn.btn--ghost  (Back)
                 └─ Button: .btn.btn--primary (Next / Submit)
```

### Shared

```
Nav: .navbar
  └─ Container
       ├─ A: .navbar_logo             ← font-display "MICC"
       ├─ Div: .navbar_links          ← desktop links
       │    └─ A: .navbar_link (×N)
       ├─ A: .btn.btn--primary         ← desktop CTA
       └─ Button: .navbar_hamburger   ← mobile only

Footer: .section_footer
  └─ Container
       ├─ Div: .footer_grid           ← 4-col grid
       │    ├─ Div: .footer_brand
       │    ├─ Div: .footer_nav
       │    ├─ Div: .footer_pillars
       │    └─ Div: .footer_contact
       └─ Div: .footer_bottom         ← copyright row
```

---

## 2. HTML / React (JSX) Scaffolds

### 2.1 Hero (Rotating Image Gallery)

```tsx
// src/components/home/hero.tsx
"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

interface HeroProps {
  images: { src: string; alt: string }[];
  headline: string;
  highlightedText: string;
  subheadline: string;
  ctas: { label: string; href: string; variant?: "primary" | "secondary" }[];
  intervalMs?: number;
}

export function Hero({
  images,
  headline,
  highlightedText,
  subheadline,
  ctas,
  intervalMs = 6000,
}: HeroProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const advance = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  useEffect(() => {
    const timer = setInterval(advance, intervalMs);
    return () => clearInterval(timer);
  }, [advance, intervalMs]);

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-label="Hero"
    >
      {/* Rotating background images */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={activeIndex}
          className="absolute inset-0 z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          <Image
            src={images[activeIndex].src}
            alt={images[activeIndex].alt}
            fill
            className="object-cover"
            priority={activeIndex === 0}
            sizes="100vw"
          />
        </motion.div>
      </AnimatePresence>

      {/* Overlay */}
      <div className="absolute inset-0 z-1 bg-gradient-to-b from-dark/60 via-dark/80 to-dark" />
      <div className="absolute inset-0 z-1 bg-[radial-gradient(ellipse_at_center,_var(--color-gold)_0%,_transparent_70%)] opacity-[0.07]" />

      {/* Content */}
      <Container className="relative z-10 text-center py-32">
        <motion.p
          className="text-gold text-sm sm:text-base font-medium tracking-[0.3em] uppercase mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Luxury Concierge Platform
        </motion.p>
        <motion.h1
          className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.1] mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {headline}
          <br />
          <span className="text-gold">{highlightedText}</span>
        </motion.h1>
        <motion.p
          className="text-lg sm:text-xl text-dark-muted max-w-2xl mx-auto mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          {subheadline}
        </motion.p>
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          {ctas.map((cta) => (
            <Link key={cta.label} href={cta.href}>
              <Button size="lg" variant={cta.variant ?? "primary"}>
                {cta.label}
              </Button>
            </Link>
          ))}
        </motion.div>
      </Container>

      {/* Gallery position indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              i === activeIndex ? "bg-gold w-6" : "bg-foreground/30"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark to-transparent z-2" />
    </section>
  );
}
```

### 2.2 Offerings Card

```tsx
// src/components/home/offerings-card.tsx
import Link from "next/link";
import { Card } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";

interface OfferingsCardProps {
  title: string;
  tagline: string;
  description: string;
  slug: string;
  icon: LucideIcon;
}

export function OfferingsCard({
  title,
  tagline,
  description,
  slug,
  icon: Icon,
}: OfferingsCardProps) {
  return (
    <Link href={`/pillars/${slug}`}>
      <Card className="h-full text-center group cursor-pointer">
        <div className="w-14 h-14 mx-auto mb-5 rounded-xl bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
          <Icon className="w-7 h-7 text-gold" />
        </div>
        <h3 className="font-display text-xl font-semibold mb-1">{title}</h3>
        <p className="text-xs text-gold tracking-[0.15em] uppercase mb-3">
          {tagline}
        </p>
        <p className="text-sm text-dark-muted leading-relaxed">
          {description}
        </p>
      </Card>
    </Link>
  );
}
```

### 2.3 Offerings Grid

```tsx
// src/components/home/offerings-grid.tsx
"use client";

import { motion } from "framer-motion";
import { PILLARS } from "@/lib/constants";
import { OfferingsCard } from "./offerings-card";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

export function OfferingsGrid() {
  return (
    <Section>
      <Container>
        <div className="text-center mb-16">
          <p className="text-gold text-sm font-medium tracking-[0.2em] uppercase mb-3">
            Our Pillars
          </p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold">
            Four Pillars of <span className="text-gold">Excellence</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PILLARS.map((pillar, i) => (
            <motion.div
              key={pillar.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <OfferingsCard
                title={pillar.name}
                tagline={pillar.tagline}
                description={pillar.description}
                slug={pillar.slug}
                icon={pillar.icon}
              />
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
```

### 2.4 Story Section

```tsx
// src/components/home/story-section.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

interface StorySectionProps {
  eyebrow: string;
  heading: string;
  body: string;
  imageSrc: string;
  imageAlt: string;
  ctaLabel: string;
  ctaHref: string;
}

export function StorySection({
  eyebrow,
  heading,
  body,
  imageSrc,
  imageAlt,
  ctaLabel,
  ctaHref,
}: StorySectionProps) {
  return (
    <Section>
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            className="relative aspect-[4/3] rounded-2xl overflow-hidden"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              className="object-cover"
              loading="lazy"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-gold text-sm font-medium tracking-[0.2em] uppercase mb-3">
              {eyebrow}
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-6">
              {heading}
            </h2>
            <p className="text-dark-muted leading-relaxed mb-8">{body}</p>
            <Link href={ctaHref}>
              <Button variant="secondary">{ctaLabel}</Button>
            </Link>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
```

### 2.5 CTA Banner

```tsx
// src/components/home/cta-banner.tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

interface CtaBannerProps {
  heading: string;
  body: string;
  ctaLabel: string;
  ctaHref: string;
}

export function CtaBanner({ heading, body, ctaLabel, ctaHref }: CtaBannerProps) {
  return (
    <Section>
      <Container>
        <motion.div
          className="relative rounded-2xl border border-dark-border bg-dark-card p-10 sm:p-16 text-center overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Decorative gradient */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--color-gold)_0%,_transparent_60%)] opacity-[0.06]" />
          <div className="relative z-10">
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
              {heading}
            </h2>
            <p className="text-dark-muted max-w-xl mx-auto mb-8">{body}</p>
            <Link href={ctaHref}>
              <Button size="lg">{ctaLabel}</Button>
            </Link>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
```

### 2.6 Membership Hero

```tsx
// src/components/membership/membership-hero.tsx
"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";

interface MembershipHeroProps {
  eyebrow: string;
  headline: string;
  subheadline: string;
}

export function MembershipHero({
  eyebrow,
  headline,
  subheadline,
}: MembershipHeroProps) {
  return (
    <section className="relative pt-40 pb-20 overflow-hidden" aria-label="Membership">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--color-gold)_0%,_transparent_70%)] opacity-[0.06]" />
      <Container className="relative z-10 text-center">
        <motion.p
          className="text-gold text-sm font-medium tracking-[0.3em] uppercase mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {eyebrow}
        </motion.p>
        <motion.h1
          className="font-display text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.1] mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {headline}
        </motion.h1>
        <motion.p
          className="text-lg text-dark-muted max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          {subheadline}
        </motion.p>
      </Container>
    </section>
  );
}
```

### 2.7 Benefits Grid

```tsx
// src/components/membership/benefits-grid.tsx
"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import type { LucideIcon } from "lucide-react";

export interface Benefit {
  title: string;
  description: string;
  icon: LucideIcon;
}

interface BenefitsGridProps {
  eyebrow: string;
  heading: string;
  benefits: Benefit[];
}

export function BenefitsGrid({ eyebrow, heading, benefits }: BenefitsGridProps) {
  return (
    <Section>
      <Container>
        <div className="text-center mb-16">
          <p className="text-gold text-sm font-medium tracking-[0.2em] uppercase mb-3">
            {eyebrow}
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold">
            {heading}
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((b, i) => {
            const Icon = b.icon;
            return (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="h-full">
                  <div className="w-12 h-12 mb-4 rounded-lg bg-gold/10 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-gold" />
                  </div>
                  <h3 className="font-display text-lg font-semibold mb-2">
                    {b.title}
                  </h3>
                  <p className="text-sm text-dark-muted leading-relaxed">
                    {b.description}
                  </p>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
```

### 2.8 Process Diagram

```tsx
// src/components/membership/process-diagram.tsx
"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

export interface ProcessStep {
  number: number;
  title: string;
  description: string;
}

interface ProcessDiagramProps {
  eyebrow: string;
  heading: string;
  steps: ProcessStep[];
}

export function ProcessDiagram({ eyebrow, heading, steps }: ProcessDiagramProps) {
  return (
    <Section>
      <Container>
        <div className="text-center mb-16">
          <p className="text-gold text-sm font-medium tracking-[0.2em] uppercase mb-3">
            {eyebrow}
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold">
            {heading}
          </h2>
        </div>
        <div className="relative max-w-3xl mx-auto">
          {/* Vertical connector line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-dark-border hidden sm:block" />

          <div className="space-y-12">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                className="relative flex items-start gap-6"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
              >
                <div className="relative z-10 w-12 h-12 shrink-0 rounded-full border-2 border-gold bg-dark flex items-center justify-center">
                  <span className="text-gold font-display font-bold">
                    {step.number}
                  </span>
                </div>
                <div className="pt-2">
                  <h4 className="font-display text-lg font-semibold mb-1">
                    {step.title}
                  </h4>
                  <p className="text-sm text-dark-muted leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
```

### 2.9 Multistep Membership Form

```tsx
// src/components/membership/membership-form.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { requestFormSchema, type RequestFormData } from "@/lib/validations";
import { PILLARS, VIBE_TAGS, BUDGET_RANGES } from "@/lib/constants";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

const STEPS = [
  { id: 1, title: "Contact Information", fields: ["name", "email", "phone"] },
  { id: 2, title: "Event Details", fields: ["datetime", "location", "party_size", "budget_range"] },
  { id: 3, title: "Services & Vibe", fields: ["pillars", "vibe_tags"] },
  { id: 4, title: "Additional Details", fields: ["notes"] },
] as const;

const stepVariants = {
  enter: { opacity: 0, y: 40 },
  center: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -40 },
};

export function MembershipForm() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<RequestFormData>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(requestFormSchema) as any,
    defaultValues: {
      pillars: [],
      vibe_tags: [],
      notes: "",
    },
  });

  const selectedPillars = watch("pillars");
  const selectedVibes = watch("vibe_tags");
  const progress = ((currentStep + 1) / STEPS.length) * 100;

  async function goNext() {
    const fieldsToValidate = STEPS[currentStep].fields as unknown as (keyof RequestFormData)[];
    const valid = await trigger(fieldsToValidate);
    if (valid && currentStep < STEPS.length - 1) {
      setCurrentStep((s) => s + 1);
    }
  }

  function goBack() {
    if (currentStep > 0) setCurrentStep((s) => s - 1);
  }

  function togglePillar(slug: string) {
    const current = selectedPillars || [];
    const next = current.includes(slug)
      ? current.filter((s) => s !== slug)
      : [...current, slug];
    setValue("pillars", next, { shouldValidate: true });
  }

  function toggleVibe(tag: string) {
    const current = selectedVibes || [];
    const next = current.includes(tag)
      ? current.filter((t) => t !== tag)
      : [...current, tag];
    setValue("vibe_tags", next);
  }

  async function onSubmit(data: RequestFormData) {
    setSubmitting(true);
    setServerError(null);
    try {
      const res = await fetch("/api/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) {
        setServerError(json.error || "Something went wrong");
        return;
      }
      router.push(`/request/confirmation?id=${json.id}`);
    } catch {
      setServerError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Section>
      <Container className="max-w-2xl">
        {/* Progress bar */}
        <div className="mb-10">
          <div className="flex justify-between text-xs text-dark-muted mb-2">
            {STEPS.map((step, i) => (
              <span
                key={step.id}
                className={cn(
                  "transition-colors",
                  i <= currentStep ? "text-gold" : "text-dark-muted"
                )}
              >
                {step.title}
              </span>
            ))}
          </div>
          <div className="h-1 bg-dark-border rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gold rounded-full"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <h2 className="font-display text-2xl font-semibold mb-6">
                {STEPS[currentStep].title}
              </h2>

              {/* Step 1: Contact */}
              {currentStep === 0 && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-dark-muted mb-1.5">Full Name *</label>
                    <Input placeholder="Your name" error={errors.name?.message} {...register("name")} />
                  </div>
                  <div>
                    <label className="block text-sm text-dark-muted mb-1.5">Email *</label>
                    <Input type="email" placeholder="you@email.com" error={errors.email?.message} {...register("email")} />
                  </div>
                  <div>
                    <label className="block text-sm text-dark-muted mb-1.5">Phone *</label>
                    <Input type="tel" placeholder="(555) 123-4567" error={errors.phone?.message} {...register("phone")} />
                  </div>
                </div>
              )}

              {/* Step 2: Event Details */}
              {currentStep === 1 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-dark-muted mb-1.5">Date & Time *</label>
                    <Input type="datetime-local" error={errors.datetime?.message} {...register("datetime")} />
                  </div>
                  <div>
                    <label className="block text-sm text-dark-muted mb-1.5">Location *</label>
                    <Input placeholder="City or venue" error={errors.location?.message} {...register("location")} />
                  </div>
                  <div>
                    <label className="block text-sm text-dark-muted mb-1.5">Party Size *</label>
                    <Input type="number" placeholder="Guests" min={1} error={errors.party_size?.message} {...register("party_size")} />
                  </div>
                  <div>
                    <label className="block text-sm text-dark-muted mb-1.5">Budget Range *</label>
                    <Select error={errors.budget_range?.message} {...register("budget_range")}>
                      <option value="">Select range</option>
                      {BUDGET_RANGES.map((r) => (
                        <option key={r.label} value={r.label}>{r.label}</option>
                      ))}
                    </Select>
                  </div>
                </div>
              )}

              {/* Step 3: Pillars & Vibes */}
              {currentStep === 2 && (
                <div className="space-y-8">
                  <div>
                    <p className="text-sm text-dark-muted mb-4">Select services you need (at least one)</p>
                    {errors.pillars && (
                      <p className="text-sm text-red-500 mb-3">{errors.pillars.message}</p>
                    )}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {PILLARS.map((pillar) => {
                        const Icon = pillar.icon;
                        const isSelected = selectedPillars?.includes(pillar.slug);
                        return (
                          <button
                            key={pillar.slug}
                            type="button"
                            onClick={() => togglePillar(pillar.slug)}
                            className={cn(
                              "flex items-center gap-4 p-4 rounded-xl border transition-all text-left cursor-pointer",
                              isSelected
                                ? "border-gold bg-gold/10"
                                : "border-dark-border bg-dark-card hover:border-gold/30"
                            )}
                          >
                            <div className={cn(
                              "w-10 h-10 rounded-lg flex items-center justify-center shrink-0",
                              isSelected ? "bg-gold/20" : "bg-dark-border"
                            )}>
                              <Icon className={cn("w-5 h-5", isSelected ? "text-gold" : "text-dark-muted")} />
                            </div>
                            <div>
                              <p className="font-medium text-sm">{pillar.name}</p>
                              <p className="text-xs text-dark-muted">{pillar.tagline}</p>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-dark-muted mb-4">Mood / vibe (optional)</p>
                    <div className="flex flex-wrap gap-2">
                      {VIBE_TAGS.map((tag) => {
                        const isSelected = selectedVibes?.includes(tag);
                        return (
                          <button
                            key={tag}
                            type="button"
                            onClick={() => toggleVibe(tag)}
                            className={cn(
                              "px-4 py-2 rounded-full text-sm font-medium transition-all border cursor-pointer",
                              isSelected
                                ? "bg-gold text-dark border-gold"
                                : "border-dark-border text-dark-muted hover:border-gold/30 hover:text-foreground"
                            )}
                          >
                            {tag}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Notes */}
              {currentStep === 3 && (
                <div>
                  <p className="text-sm text-dark-muted mb-4">
                    Anything else we should know about your vision?
                  </p>
                  <Textarea
                    placeholder="Tell us more about your vision, special requests, or anything else..."
                    rows={6}
                    {...register("notes")}
                  />
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Error */}
          {serverError && (
            <div className="mt-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
              {serverError}
            </div>
          )}

          {/* Navigation */}
          <div className="mt-8 flex justify-between">
            <Button
              type="button"
              variant="ghost"
              onClick={goBack}
              className={cn(currentStep === 0 && "invisible")}
            >
              Back
            </Button>
            {currentStep < STEPS.length - 1 ? (
              <Button type="button" onClick={goNext}>
                Continue
              </Button>
            ) : (
              <Button type="submit" disabled={submitting}>
                {submitting ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Request"
                )}
              </Button>
            )}
          </div>
        </form>
      </Container>
    </Section>
  );
}
```

### 2.10 Footer (Enhanced)

```tsx
// src/components/layout/footer.tsx
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { PILLARS } from "@/lib/constants";

interface FooterLink {
  label: string;
  href: string;
}

interface FooterProps {
  navLinks?: FooterLink[];
  contactEmail?: string;
  contactLocation?: string;
}

export function Footer({
  navLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Packages", href: "/packages" },
    { label: "Membership", href: "/membership" },
    { label: "Request Concierge", href: "/request" },
  ],
  contactEmail = "hello@micc.com",
  contactLocation = "Los Angeles, CA",
}: FooterProps) {
  return (
    <footer className="border-t border-dark-border bg-dark py-16" role="contentinfo">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <Link
              href="/"
              className="font-display text-2xl font-bold tracking-wider text-gold"
              aria-label="MICC Home"
            >
              MICC
            </Link>
            <p className="mt-3 text-sm text-dark-muted leading-relaxed">
              Curated Luxury, On Demand.
              <br />
              Premium concierge experiences for those who expect the extraordinary.
            </p>
          </div>

          <nav aria-label="Footer navigation">
            <h3 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">
              Navigate
            </h3>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-dark-muted hover:text-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Services navigation">
            <h3 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">
              Pillars
            </h3>
            <ul className="space-y-2.5">
              {PILLARS.map((pillar) => (
                <li key={pillar.slug}>
                  <Link
                    href={`/pillars/${pillar.slug}`}
                    className="text-sm text-dark-muted hover:text-gold transition-colors"
                  >
                    {pillar.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">
              Contact
            </h3>
            <ul className="space-y-2.5">
              <li>
                <a
                  href={`mailto:${contactEmail}`}
                  className="text-sm text-dark-muted hover:text-gold transition-colors"
                >
                  {contactEmail}
                </a>
              </li>
              <li className="text-sm text-dark-muted">{contactLocation}</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-dark-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-dark-muted">
            &copy; {new Date().getFullYear()} MICC. All rights reserved.
          </p>
          <p className="text-xs text-dark-muted">Curated Luxury, On Demand.</p>
        </div>
      </Container>
    </footer>
  );
}
```

---

## 3. Component Prop Interfaces (TypeScript)

```ts
// src/types/components.ts
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
  /** Optional CMS featured image */
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
  type: "text" | "email" | "tel" | "number" | "datetime-local" | "select" | "textarea" | "pillar-select" | "vibe-tags";
  placeholder?: string;
  required?: boolean;
  options?: { label: string; value: string }[];
}

export interface MembershipFormStep {
  id: number;
  title: string;
  fields: FormField[];
  /** Step to navigate to after validation. Undefined = final step */
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
```

---

## 4. CMS / JSON Schema Examples

### 4.1 Offerings Collection (Webflow CMS / Supabase)

```json
{
  "collection": "offerings",
  "items": [
    {
      "_id": "media-marketing",
      "title": "Media & Marketing",
      "slug": "media-marketing",
      "tagline": "Tell Your Story Beautifully",
      "excerpt": "Professional content creation, social media management, and brand strategy for events and personal brands.",
      "long_description": "From cinematic event coverage to strategic brand campaigns...",
      "featured_image": {
        "url": "/images/pillars/media-marketing.jpg",
        "alt": "Professional event photography in a luxury setting"
      },
      "icon_name": "camera",
      "sort_order": 1,
      "services": [
        {
          "title": "Event Photography & Videography",
          "description": "Cinematic coverage of your events with same-day highlight reels."
        },
        {
          "title": "Social Media Management",
          "description": "Full-service content strategy, creation, and community management."
        }
      ]
    },
    {
      "_id": "illumination-infrastructure",
      "title": "Illumination & Infrastructure",
      "slug": "illumination-infrastructure",
      "tagline": "Set the Scene",
      "excerpt": "Premium lighting design, sound engineering, and technical production.",
      "featured_image": {
        "url": "/images/pillars/illumination.jpg",
        "alt": "Dramatic uplighting at an upscale venue"
      },
      "icon_name": "lightbulb",
      "sort_order": 2,
      "services": []
    },
    {
      "_id": "concierge",
      "title": "Concierge",
      "slug": "concierge",
      "tagline": "Your Wish, Handled",
      "excerpt": "VIP access, reservations, travel coordination, and personal lifestyle management.",
      "featured_image": {
        "url": "/images/pillars/concierge.jpg",
        "alt": "White-glove concierge service at a private event"
      },
      "icon_name": "crown",
      "sort_order": 3,
      "services": []
    },
    {
      "_id": "creative-events",
      "title": "Creative Events",
      "slug": "creative-events",
      "tagline": "Experiences Worth Remembering",
      "excerpt": "Full-service event planning and production.",
      "featured_image": {
        "url": "/images/pillars/creative-events.jpg",
        "alt": "Lavish event with custom decor and florals"
      },
      "icon_name": "sparkles",
      "sort_order": 4,
      "services": []
    }
  ]
}
```

### 4.2 Dynamic CMS Binding (OfferingsCard)

```tsx
// How an OfferingsCard binds to the CMS collection item:
// Webflow equivalent: CMS Collection List → Collection Item template

// In React / Next.js:
import { OfferingsCard } from "@/components/home/offerings-card";
import { iconMap } from "@/lib/icon-map"; // { camera: Camera, lightbulb: Lightbulb, ... }

// cmsItem comes from Supabase or static constants
function renderOfferingFromCMS(cmsItem: OfferingsCmsItem) {
  return (
    <OfferingsCard
      title={cmsItem.title}             // CMS field: "title"
      tagline={cmsItem.tagline}          // CMS field: "tagline"
      description={cmsItem.excerpt}      // CMS field: "excerpt"
      slug={cmsItem.slug}               // CMS field: "slug"
      icon={iconMap[cmsItem.icon_name]}  // CMS field: "icon_name" → runtime icon
      featuredImage={cmsItem.featured_image?.url}
    />
  );
}
```

### 4.3 Membership Submission Schema

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "MembershipRequest",
  "type": "object",
  "required": ["name", "email", "phone", "datetime", "location", "party_size", "budget_range", "pillars"],
  "properties": {
    "name":         { "type": "string", "minLength": 2 },
    "email":        { "type": "string", "format": "email" },
    "phone":        { "type": "string", "minLength": 10 },
    "datetime":     { "type": "string", "format": "date-time" },
    "location":     { "type": "string", "minLength": 2 },
    "party_size":   { "type": "integer", "minimum": 1, "maximum": 10000 },
    "budget_range": { "type": "string" },
    "pillars":      { "type": "array", "items": { "type": "string" }, "minItems": 1 },
    "vibe_tags":    { "type": "array", "items": { "type": "string" } },
    "notes":        { "type": "string" }
  }
}
```

**Example submission payload:**

```json
{
  "name": "Alexandra Torres",
  "email": "alexandra@example.com",
  "phone": "(310) 555-0188",
  "datetime": "2026-04-15T19:00",
  "location": "The Beverly Hills Hotel, Beverly Hills, CA",
  "party_size": 120,
  "budget_range": "$25,000 - $50,000",
  "pillars": ["creative-events", "illumination-infrastructure", "media-marketing"],
  "vibe_tags": ["Upscale", "Black Tie", "Classic Elegance"],
  "notes": "Annual gala for our foundation. Need full AV, photography, and day-of coordination."
}
```

---

## 5. Animation / Interaction JSON

Full animation definitions compatible with both Framer Motion (React) and Webflow Interactions 2.0 logic.

```json
{
  "animations": {
    "hero_gallery": {
      "type": "auto-rotate",
      "images": [
        "/images/hero/hero-1.jpg",
        "/images/hero/hero-2.jpg",
        "/images/hero/hero-3.jpg"
      ],
      "duration": 6000,
      "transition": {
        "type": "fade",
        "crossfadeDuration": 1000,
        "easing": "easeInOut"
      },
      "indicators": {
        "type": "dots",
        "activeClass": "bg-gold w-6",
        "inactiveClass": "bg-foreground/30 w-2"
      }
    },

    "hero_content_stagger": {
      "type": "on-load",
      "children": [
        { "selector": ".hero_eyebrow",     "delay": 200, "opacity": [0, 1], "translateY": [20, 0], "duration": 600 },
        { "selector": ".hero_headline",    "delay": 400, "opacity": [0, 1], "translateY": [20, 0], "duration": 600 },
        { "selector": ".hero_subheadline", "delay": 600, "opacity": [0, 1], "translateY": [20, 0], "duration": 600 },
        { "selector": ".hero_cta-group",   "delay": 800, "opacity": [0, 1], "translateY": [20, 0], "duration": 600 }
      ]
    },

    "scroll_reveal": {
      "type": "on-scroll",
      "trigger": "whileInView",
      "viewport": { "once": true, "margin": "-50px" },
      "initial": { "opacity": 0, "translateY": 30 },
      "animate": { "opacity": 1, "translateY": 0 },
      "transition": { "duration": 500, "easing": "easeOut" }
    },

    "stagger_grid": {
      "type": "on-scroll",
      "trigger": "whileInView",
      "viewport": { "once": true, "margin": "-50px" },
      "childDelay": 100,
      "initial": { "opacity": 0, "translateY": 30 },
      "animate": { "opacity": 1, "translateY": 0 },
      "transition": { "duration": 500, "easing": "easeOut" }
    },

    "form_step_transition": {
      "enter": {
        "opacity": [0, 1],
        "translateY": [40, 0],
        "duration": 400,
        "easing": "easeInOut"
      },
      "exit": {
        "opacity": [1, 0],
        "translateY": [0, -40],
        "duration": 300,
        "easing": "easeInOut"
      }
    },

    "form_progress_bar": {
      "type": "layout",
      "property": "width",
      "transition": { "duration": 300, "easing": "easeOut" }
    },

    "card_hover": {
      "type": "hover",
      "initial": { "translateY": 0, "boxShadow": "0 0 0 rgba(201,168,76,0)" },
      "hover": { "translateY": -4, "boxShadow": "0 20px 40px rgba(201,168,76,0.05)" },
      "transition": { "duration": 200, "easing": "easeOut" }
    },

    "story_section": {
      "type": "on-scroll",
      "children": [
        { "selector": ".story_media",   "initial": { "opacity": 0, "translateX": -40 }, "animate": { "opacity": 1, "translateX": 0 }, "duration": 600 },
        { "selector": ".story_content", "initial": { "opacity": 0, "translateX": 40 },  "animate": { "opacity": 1, "translateX": 0 }, "duration": 600 }
      ]
    },

    "process_steps_stagger": {
      "type": "on-scroll",
      "trigger": "whileInView",
      "childDelay": 150,
      "initial": { "opacity": 0, "translateX": -30 },
      "animate": { "opacity": 1, "translateX": 0 },
      "transition": { "duration": 500, "easing": "easeOut" }
    },

    "navbar_scroll": {
      "type": "scroll-trigger",
      "threshold": 50,
      "states": {
        "default": { "backgroundColor": "transparent", "backdropFilter": "none" },
        "scrolled": { "backgroundColor": "rgba(10,10,10,0.9)", "backdropFilter": "blur(12px)", "borderBottom": "1px solid #1E1E1E" }
      },
      "transition": { "duration": 300 }
    }
  }
}
```

---

## 6. CSS Variable Map & Utility Classes

### 6.1 Root Variables

The project uses Tailwind CSS v4 with `@theme inline` in `globals.css`. Below is the equivalent `:root` block for Webflow or vanilla CSS builds:

```css
:root {
  /* ── Brand Colors ────────────────────────────── */
  --color-background:   #0A0A0A;
  --color-foreground:   #FAFAFA;
  --color-gold:         #C9A84C;
  --color-gold-light:   #D4B85E;
  --color-gold-dark:    #B8953A;
  --color-dark:         #0A0A0A;
  --color-dark-card:    #141414;
  --color-dark-border:  #1E1E1E;
  --color-dark-muted:   #8A8A8A;

  /* ── Typography ──────────────────────────────── */
  --font-sans:    'Inter', system-ui, -apple-system, sans-serif;
  --font-display: 'Playfair Display', Georgia, serif;

  /* ── Spacing Scale (4px base) ────────────────── */
  --space-1:   0.25rem;  /*  4px */
  --space-2:   0.5rem;   /*  8px */
  --space-3:   0.75rem;  /* 12px */
  --space-4:   1rem;     /* 16px */
  --space-5:   1.25rem;  /* 20px */
  --space-6:   1.5rem;   /* 24px */
  --space-8:   2rem;     /* 32px */
  --space-10:  2.5rem;   /* 40px */
  --space-12:  3rem;     /* 48px */
  --space-16:  4rem;     /* 64px */
  --space-20:  5rem;     /* 80px */
  --space-24:  6rem;     /* 96px */
  --space-32:  8rem;     /* 128px */

  /* ── Border Radius ───────────────────────────── */
  --radius-sm:  0.375rem;  /*  6px */
  --radius-md:  0.5rem;    /*  8px */
  --radius-lg:  0.75rem;   /* 12px */
  --radius-xl:  1rem;      /* 16px */
  --radius-2xl: 1.5rem;    /* 24px */
  --radius-full: 9999px;

  /* ── Shadows ─────────────────────────────────── */
  --shadow-card:   0 4px 24px rgba(0, 0, 0, 0.3);
  --shadow-gold:   0 4px 24px rgba(201, 168, 76, 0.2);
  --shadow-hover:  0 20px 40px rgba(201, 168, 76, 0.05);

  /* ── Transitions ─────────────────────────────── */
  --transition-fast:   150ms ease;
  --transition-base:   200ms ease;
  --transition-slow:   300ms ease;

  /* ── Breakpoints (for reference — used via Tailwind) */
  --bp-sm:  640px;
  --bp-md:  768px;
  --bp-lg:  1024px;
  --bp-xl:  1280px;
  --bp-2xl: 1536px;

  /* ── Container ───────────────────────────────── */
  --container-max: 80rem; /* 1280px */
  --container-px:  1.5rem;
}
```

### 6.2 Utility Classes (Webflow custom classes / vanilla CSS)

```css
/* ── Layout ─────────────────────────────────────── */
.container        { max-width: var(--container-max); margin-inline: auto; padding-inline: var(--container-px); }
.section          { padding-block: var(--space-20); }
.section--lg      { padding-block: var(--space-24); }
.section--xl      { padding-block: var(--space-32); }

/* ── Grid ───────────────────────────────────────── */
.grid-2-cols      { display: grid; grid-template-columns: repeat(2, 1fr); gap: var(--space-6); }
.grid-3-cols      { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--space-6); }
.grid-4-cols      { display: grid; grid-template-columns: repeat(4, 1fr); gap: var(--space-6); }

@media (max-width: 1024px) {
  .grid-4-cols    { grid-template-columns: repeat(2, 1fr); }
  .grid-3-cols    { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 640px) {
  .grid-2-cols,
  .grid-3-cols,
  .grid-4-cols    { grid-template-columns: 1fr; }
}

/* ── Spacing Utilities ──────────────────────────── */
.p-4   { padding: var(--space-4); }
.p-6   { padding: var(--space-6); }
.p-8   { padding: var(--space-8); }
.pt-8  { padding-top: var(--space-8); }
.pb-8  { padding-bottom: var(--space-8); }
.mt-4  { margin-top: var(--space-4); }
.mt-8  { margin-top: var(--space-8); }
.mb-4  { margin-bottom: var(--space-4); }
.mb-6  { margin-bottom: var(--space-6); }
.mb-8  { margin-bottom: var(--space-8); }
.mb-16 { margin-bottom: var(--space-16); }
.gap-4 { gap: var(--space-4); }
.gap-6 { gap: var(--space-6); }

/* ── Typography Utilities ───────────────────────── */
.font-display      { font-family: var(--font-display); }
.font-sans         { font-family: var(--font-sans); }
.text-gold         { color: var(--color-gold); }
.text-muted        { color: var(--color-dark-muted); }
.tracking-eyebrow  { letter-spacing: 0.2em; text-transform: uppercase; font-size: 0.875rem; }
.tracking-brand    { letter-spacing: 0.3em; text-transform: uppercase; }

/* ── Button Variants ────────────────────────────── */
.btn              { display: inline-flex; align-items: center; justify-content: center; font-weight: 500; border-radius: var(--radius-lg); transition: all var(--transition-base); cursor: pointer; }
.btn--sm          { height: 2.25rem; padding-inline: 1rem; font-size: 0.875rem; }
.btn--md          { height: 2.75rem; padding-inline: 1.5rem; font-size: 1rem; }
.btn--lg          { height: 3.25rem; padding-inline: 2rem; font-size: 1.125rem; }
.btn--primary     { background: var(--color-gold); color: var(--color-dark); box-shadow: var(--shadow-gold); }
.btn--primary:hover { background: var(--color-gold-light); }
.btn--secondary   { border: 1px solid var(--color-gold); color: var(--color-gold); background: transparent; }
.btn--secondary:hover { background: rgba(201, 168, 76, 0.1); }
.btn--ghost       { color: var(--color-foreground); background: transparent; }
.btn--ghost:hover { background: rgba(250, 250, 250, 0.05); }

/* ── Card ───────────────────────────────────────── */
.card             { background: var(--color-dark-card); border: 1px solid var(--color-dark-border); border-radius: var(--radius-xl); padding: var(--space-6); transition: all var(--transition-base); }
.card:hover       { transform: translateY(-4px); box-shadow: var(--shadow-hover); }
```

---

## 7. Accessibility + SEO Hooks

### 7.1 Semantic Landmarks

```tsx
// src/app/layout.tsx — Page-level landmark structure

<html lang="en">
  <body>
    <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 bg-gold text-dark px-4 py-2 rounded-lg">
      Skip to main content
    </a>
    <header role="banner">
      <Navbar />
    </header>
    <main id="main-content" role="main">
      {children}
    </main>
    <Footer />  {/* already has role="contentinfo" */}
  </body>
</html>
```

### 7.2 ARIA Labels per Section

| Section | Element | ARIA Attribute |
|---------|---------|----------------|
| Hero | `<section>` | `aria-label="Hero"` |
| Offerings Grid | `<section>` | `aria-label="Our services"` |
| Story | `<section>` | `aria-label="Our story"` |
| CTA Banner | `<section>` | `aria-label="Get started"` |
| Membership Hero | `<section>` | `aria-label="Membership"` |
| Benefits | `<section>` | `aria-label="Membership benefits"` |
| Process | `<section>` | `aria-label="How it works"` |
| Form | `<section>` | `aria-label="Request form"` |
| Navbar | `<nav>` | `aria-label="Main navigation"` |
| Footer nav | `<nav>` | `aria-label="Footer navigation"` |
| Gallery dots | `<button>` | `aria-label="Go to slide N"` |
| Form steps | progress bar | `role="progressbar" aria-valuenow={step} aria-valuemin={1} aria-valuemax={4}` |

### 7.3 Alt Text Placeholders

```tsx
// Hero images — descriptive, not decorative
<Image alt="Luxury rooftop event with gold uplighting at sunset" />
<Image alt="Intimate private dinner with candlelit table settings" />
<Image alt="Grand ballroom celebration with MICC branding" />

// Offerings — icon-only cards don't need alt, but if featured images are added:
<Image alt={`${pillar.name} — ${pillar.tagline}`} />

// Story section
<Image alt="MICC team coordinating a luxury event behind the scenes" />
```

### 7.4 Meta & Structured Data Templates

```tsx
// src/app/layout.tsx — Next.js Metadata API
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "MICC — Curated Luxury, On Demand",
    template: "%s | MICC",
  },
  description:
    "MICC is a premium concierge platform offering luxury event production, media, lighting, and lifestyle management in Los Angeles.",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "MICC",
    images: [{ url: "/images/og-image.jpg", width: 1200, height: 630, alt: "MICC — Curated Luxury, On Demand" }],
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};
```

```tsx
// src/app/page.tsx — schema.org structured data (JSON-LD)
export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "MICC Hospitality",
    description:
      "Premium concierge platform offering luxury event production, media, lighting, and lifestyle management.",
    provider: {
      "@type": "Organization",
      name: "MICC",
      url: "https://micc.com",
      logo: "https://micc.com/images/logo.png",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Los Angeles",
        addressRegion: "CA",
        addressCountry: "US",
      },
    },
    areaServed: {
      "@type": "City",
      name: "Los Angeles",
    },
    serviceType: [
      "Event Production",
      "Concierge Services",
      "Media & Marketing",
      "Lighting & Sound Design",
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* ... page sections */}
    </>
  );
}
```

```tsx
// src/app/membership/page.tsx — membership page metadata
export const metadata: Metadata = {
  title: "Membership & Concierge",
  description:
    "Join MICC for exclusive access to luxury concierge services, VIP event production, and personalized lifestyle management.",
};
```

---

## 8. Performance Optimizations

### 8.1 Image Loading Strategy

```tsx
// Hero: PRELOAD first image, crossfade the rest
<Image
  src={images[0].src}
  alt={images[0].alt}
  fill
  priority                        // Preloaded — sets <link rel="preload">
  sizes="100vw"
  className="object-cover"
/>

// All non-hero images: lazy load with responsive srcset
<Image
  src={imageSrc}
  alt={imageAlt}
  fill
  loading="lazy"
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
  className="object-cover"
/>
```

### 8.2 Asset Budget

| Asset Group | Target Size | Format |
|-------------|-------------|--------|
| Hero images (3) | < 300 KB each (< 900 KB total) | WebP / AVIF via Next.js Image |
| Pillar icons | ~0 KB (Lucide inline SVG) | SVG |
| Story section image | < 200 KB | WebP |
| OG image | < 100 KB | JPG 1200×630 |
| **Total above fold** | **< 400 KB** | — |

### 8.3 Font Loading

```tsx
// src/app/layout.tsx — Already configured with next/font
import { Inter, Playfair_Display } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",             // FOUT over FOIT
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair-display",
  weight: ["400", "700"],      // Only load weights we use
});
```

### 8.4 Bundle Optimizations

```tsx
// Framer Motion — tree-shake unused features
// next.config.ts addition:
export default {
  // ... existing config
  experimental: {
    optimizePackageImports: ["framer-motion", "lucide-react"],
  },
};
```

### 8.5 Core Web Vitals Targets

| Metric | Target | Strategy |
|--------|--------|----------|
| LCP | < 2.5s | Preload hero image, `priority` flag, font `display: swap` |
| FID / INP | < 100ms | Client components only where needed, no heavy JS on load |
| CLS | < 0.1 | `fill` + `sizes` on images, fixed-height hero, font `display: swap` |

---

## 9. Implementation Checklist

### Phase 1: Asset Preparation

- [ ] Source or generate 3 hero images (landscape, 1920×1080 min, < 300 KB each as WebP)
- [ ] Source story section image (landscape 4:3)
- [ ] Create OG image (1200×630) with MICC branding
- [ ] Place all images in `/public/images/hero/`, `/public/images/story/`, `/public/images/og-image.jpg`
- [ ] Verify all images have descriptive `alt` text

### Phase 2: Component Build (React / Next.js)

- [ ] Create `src/types/components.ts` with all TypeScript interfaces
- [ ] Refactor `src/components/home/hero.tsx` → add rotating image gallery with Framer Motion
- [ ] Create `src/components/home/offerings-card.tsx` (extracted from pillars-grid)
- [ ] Refactor `src/components/home/pillars-grid.tsx` → `offerings-grid.tsx` with scroll animations
- [ ] Create `src/components/home/story-section.tsx`
- [ ] Create `src/components/home/cta-banner.tsx` (replace existing `cta-section.tsx`)
- [ ] Create `src/components/membership/membership-hero.tsx`
- [ ] Create `src/components/membership/benefits-grid.tsx`
- [ ] Create `src/components/membership/process-diagram.tsx`
- [ ] Create `src/components/membership/membership-form.tsx` (multistep form)
- [ ] Refactor `src/components/layout/footer.tsx` with prop interfaces

### Phase 3: Page Assembly

- [ ] Update `src/app/page.tsx` — wire new Hero, OfferingsGrid, StorySection, CtaBanner
- [ ] Create `src/app/membership/page.tsx` — wire MembershipHero, BenefitsGrid, ProcessDiagram, MembershipForm
- [ ] Add `<script type="application/ld+json">` schema.org to homepage
- [ ] Add skip-to-content link in `layout.tsx`
- [ ] Verify `metadata` exports on all pages (title, description, OG)
- [ ] Add `aria-label` to all `<section>` elements

### Phase 4: Animation Wiring

- [ ] Wire hero crossfade with `AnimatePresence` + `motion.div`
- [ ] Add staggered entrance to hero text content
- [ ] Add `whileInView` scroll reveals to grid cards
- [ ] Add slide-in animation to story section
- [ ] Wire form step transitions with `AnimatePresence mode="wait"`
- [ ] Add progress bar animation to multistep form

### Phase 5: Performance & QA

- [ ] Run Lighthouse audit — target 90+ on all categories
- [ ] Verify `priority` on first hero image, `loading="lazy"` on all others
- [ ] Add `optimizePackageImports` for framer-motion and lucide-react
- [ ] Test responsive behavior at 640px, 768px, 1024px, 1280px breakpoints
- [ ] Keyboard-test all interactive elements (form, gallery dots, nav)
- [ ] Screen-reader test with VoiceOver / NVDA

### Phase 6: Webflow Rebuild (if applicable)

- [ ] Create Webflow project with custom domain
- [ ] Replicate `:root` CSS variables as Webflow global styles
- [ ] Build sections using the Section → Container → Grid hierarchy from Section 1
- [ ] Apply class names from the `.section_*` → `.component_*` naming convention
- [ ] Create CMS Collection "Offerings" with fields from Section 4.1
- [ ] Bind OfferingsCard template to CMS collection list
- [ ] Recreate hero crossfade using Webflow Interactions 2.0 (slider → timed auto-advance)
- [ ] Recreate form steps using Webflow Tabs component with custom transitions
- [ ] Configure Webflow form → webhook / Zapier → Supabase for submission handling
- [ ] Export or publish

---

**Legal:** All content, imagery, and branding in this specification is original to MICC. Reference sites (Quintessentially, DSLuxury) were used only for structural and tonal inspiration. All textual content must be original or properly licensed before deployment.
