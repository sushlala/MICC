import {
  Camera,
  Lightbulb,
  Crown,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

export type Pillar = {
  name: string;
  slug: string;
  tagline: string;
  description: string;
  longDescription: string;
  icon: LucideIcon;
  services: { title: string; description: string }[];
};

export const PILLARS: Pillar[] = [
  {
    name: "Media & Marketing",
    slug: "media-marketing",
    tagline: "Tell Your Story Beautifully",
    description:
      "Professional content creation, social media management, and brand strategy for events and personal brands.",
    longDescription:
      "From cinematic event coverage to strategic brand campaigns, our Media & Marketing division captures and amplifies your narrative. We pair world-class creatives with data-driven strategy to ensure every piece of content elevates your presence.",
    icon: Camera,
    services: [
      {
        title: "Event Photography & Videography",
        description:
          "Cinematic coverage of your events with same-day highlight reels and full professional edits.",
      },
      {
        title: "Social Media Management",
        description:
          "Full-service content strategy, creation, and community management across all platforms.",
      },
      {
        title: "Brand Strategy & Identity",
        description:
          "Comprehensive brand development including visual identity, messaging, and positioning.",
      },
      {
        title: "Influencer & PR Campaigns",
        description:
          "Strategic partnerships with influencers and media outlets to amplify your reach.",
      },
    ],
  },
  {
    name: "Illumination & Infrastructure",
    slug: "illumination-infrastructure",
    tagline: "Set the Scene",
    description:
      "Premium lighting design, sound engineering, and technical production for unforgettable atmospheres.",
    longDescription:
      "The atmosphere makes the experience. Our Illumination & Infrastructure team transforms any venue into an immersive environment with cutting-edge lighting, pristine sound, and seamless technical production that sets the mood for extraordinary moments.",
    icon: Lightbulb,
    services: [
      {
        title: "Lighting Design",
        description:
          "Custom architectural and event lighting that transforms spaces and creates mood.",
      },
      {
        title: "Sound Engineering",
        description:
          "Professional audio systems, DJ setups, and live sound for events of any scale.",
      },
      {
        title: "Stage & Set Design",
        description:
          "Custom stage builds, backdrops, and immersive environments for branded experiences.",
      },
      {
        title: "Technical Production",
        description:
          "End-to-end AV management, live streaming, and technical direction.",
      },
    ],
  },
  {
    name: "Concierge",
    slug: "concierge",
    tagline: "Your Wish, Handled",
    description:
      "VIP access, reservations, travel coordination, and personal lifestyle management.",
    longDescription:
      "True luxury is effortless. Our Concierge division handles every detail so you don't have to — from securing impossible reservations and VIP access to coordinating complex travel itineraries and managing your lifestyle needs with discretion and precision.",
    icon: Crown,
    services: [
      {
        title: "VIP Access & Reservations",
        description:
          "Priority access to exclusive venues, restaurants, and events that aren't available to the public.",
      },
      {
        title: "Travel Coordination",
        description:
          "Full-service travel planning including private jets, luxury accommodations, and ground transport.",
      },
      {
        title: "Personal Shopping & Styling",
        description:
          "Curated shopping experiences and personal styling for events and everyday luxury.",
      },
      {
        title: "Lifestyle Management",
        description:
          "Day-to-day task management, personal errands, and on-call assistance for any need.",
      },
    ],
  },
  {
    name: "Creative Events",
    slug: "creative-events",
    tagline: "Experiences Worth Remembering",
    description:
      "Full-service event planning and production, from intimate dinners to large-scale celebrations.",
    longDescription:
      "Every gathering is an opportunity to create something unforgettable. Our Creative Events team conceptualizes, plans, and executes extraordinary experiences — from intimate dinner parties to large-scale celebrations — with meticulous attention to detail and boundless creativity.",
    icon: Sparkles,
    services: [
      {
        title: "Event Concept & Design",
        description:
          "Creative direction and thematic design that brings your vision to life.",
      },
      {
        title: "Full Event Production",
        description:
          "End-to-end planning and execution including vendor management, logistics, and on-site coordination.",
      },
      {
        title: "Intimate Experiences",
        description:
          "Bespoke dinner parties, private tastings, and exclusive small-group gatherings.",
      },
      {
        title: "Large-Scale Celebrations",
        description:
          "Galas, launch parties, and milestone celebrations designed to impress at scale.",
      },
    ],
  },
];

export const VIBE_TAGS = [
  "Upscale",
  "Intimate",
  "High-Energy",
  "Chill & Lounge",
  "Outdoor",
  "Black Tie",
  "Trendy",
  "Classic Elegance",
  "Festival Vibes",
  "Rooftop",
  "Nightlife",
  "Brunch",
] as const;

export const BUDGET_RANGES = [
  { label: "$500 - $2,000", min: 500, max: 2000 },
  { label: "$2,000 - $5,000", min: 2000, max: 5000 },
  { label: "$5,000 - $10,000", min: 5000, max: 10000 },
  { label: "$10,000 - $25,000", min: 10000, max: 25000 },
  { label: "$25,000 - $50,000", min: 25000, max: 50000 },
  { label: "$50,000+", min: 50000, max: 100000 },
] as const;

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Packages", href: "/packages" },
  { label: "Request", href: "/request" },
] as const;

export type Package = {
  id: string;
  name: string;
  slug: string;
  description: string;
  pillar: string;
  base_price: number;
  inclusions: string[];
  image_url: string;
  active: boolean;
  sort_order: number;
};

export const SEED_PACKAGES: Package[] = [
  {
    id: "1",
    name: "The Spotlight",
    slug: "the-spotlight",
    description:
      "Full-service media coverage for your event — photography, videography, and a same-day highlight reel delivered before the night ends.",
    pillar: "media-marketing",
    base_price: 3500,
    inclusions: [
      "2 photographers",
      "1 videographer",
      "Same-day highlight reel",
      "Full edited gallery within 72 hours",
      "Social-ready content pack",
    ],
    image_url: "/images/packages/spotlight.jpg",
    active: true,
    sort_order: 1,
  },
  {
    id: "2",
    name: "The Atmosphere",
    slug: "the-atmosphere",
    description:
      "Transform any venue with premium lighting and sound that sets the perfect mood for your event.",
    pillar: "illumination-infrastructure",
    base_price: 5000,
    inclusions: [
      "Custom lighting design",
      "Professional sound system",
      "On-site sound engineer",
      "Setup & teardown",
      "LED uplighting package",
    ],
    image_url: "/images/packages/atmosphere.jpg",
    active: true,
    sort_order: 2,
  },
  {
    id: "3",
    name: "The Insider",
    slug: "the-insider",
    description:
      "Your personal key to the city — VIP reservations, priority access, and white-glove coordination for a flawless night.",
    pillar: "concierge",
    base_price: 2000,
    inclusions: [
      "VIP table reservations",
      "Priority venue access",
      "Dedicated concierge for the evening",
      "Transportation coordination",
      "After-party arrangements",
    ],
    image_url: "/images/packages/insider.jpg",
    active: true,
    sort_order: 3,
  },
  {
    id: "4",
    name: "The Grand Affair",
    slug: "the-grand-affair",
    description:
      "A fully produced celebration from concept to confetti — we handle every detail so you can simply enjoy the moment.",
    pillar: "creative-events",
    base_price: 15000,
    inclusions: [
      "Full event concept & design",
      "Vendor sourcing & management",
      "Day-of coordination team",
      "Custom decor & florals",
      "Entertainment booking",
    ],
    image_url: "/images/packages/grand-affair.jpg",
    active: true,
    sort_order: 4,
  },
  {
    id: "5",
    name: "The Full MICC",
    slug: "the-full-micc",
    description:
      "The ultimate luxury experience — every MICC pillar working in concert to deliver an evening that transcends expectations.",
    pillar: "creative-events",
    base_price: 35000,
    inclusions: [
      "Full media coverage",
      "Premium lighting & sound",
      "Dedicated concierge team",
      "Complete event production",
      "Custom branding & signage",
      "VIP guest management",
    ],
    image_url: "/images/packages/full-micc.jpg",
    active: true,
    sort_order: 5,
  },
];
