import { Hero } from "@/components/home/hero";
import { OfferingsGrid } from "@/components/home/offerings-grid";
import { StorySection } from "@/components/home/story-section";
import { FeaturedPackages } from "@/components/home/featured-packages";
import { CtaBanner } from "@/components/home/cta-banner";

const HERO_IMAGES = [
  {
    src: "/images/hero/hero-1.jpg",
    alt: "Luxury rooftop event with gold uplighting at sunset",
  },
  {
    src: "/images/hero/hero-2.jpg",
    alt: "Intimate private dinner with candlelit table settings",
  },
  {
    src: "/images/hero/hero-3.jpg",
    alt: "Grand ballroom celebration with dramatic lighting",
  },
];

const HERO_CTAS = [
  { label: "Request Curation", href: "/request" },
  { label: "Explore Packages", href: "/packages", variant: "secondary" as const },
];

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
      "Moments",
      "Immersion",
      "Curation",
      "Celebration",
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero
        images={HERO_IMAGES}
        headline="Curated Luxury,"
        highlightedText="On Demand"
        subheadline="From intimate dinners to grand celebrations, MICC orchestrates extraordinary experiences tailored to your vision."
        ctas={HERO_CTAS}
      />
      <OfferingsGrid />
      <StorySection
        eyebrow="Our Story"
        heading="Where Vision Meets Execution"
        body="MICC was born from a simple belief: that extraordinary moments shouldn't require extraordinary effort. We bring together world-class creatives, producers, and concierge specialists under one roof — so every detail is handled with precision, discretion, and an unwavering commitment to excellence."
        imageSrc="/images/story/story.jpg"
        imageAlt="MICC team coordinating a luxury event behind the scenes"
        ctaLabel="Learn More"
        ctaHref="/about"
      />
      <FeaturedPackages />
      <CtaBanner
        heading="Ready to Elevate Your Night?"
        body="Tell us your vision and let MICC handle the rest. From concept to execution, we make the extraordinary effortless."
        ctaLabel="Request Curation"
        ctaHref="/request"
      />
    </>
  );
}
