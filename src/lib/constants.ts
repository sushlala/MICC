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
    name: "Moments",
    slug: "moments",
    tagline: "Capture Every Unforgettable Instant",
    description:
      "We immortalize your most meaningful experiences through cinematic storytelling, professional content creation, and strategic brand amplification.",
    longDescription:
      "Every extraordinary experience deserves to be remembered beautifully. Our Moments team captures the magic as it unfolds — pairing world-class creatives with data-driven strategy so every photograph, highlight reel, and campaign extends the life of your experience far beyond the night itself.",
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
    name: "Immersion",
    slug: "immersion",
    tagline: "Step Into the Experience",
    description:
      "We transform any venue into a sensory world through premium lighting design, sound engineering, and technical production that envelops your guests.",
    longDescription:
      "The atmosphere makes the experience. Our Immersion team crafts multi-sensory environments that transport your guests the moment they walk in — with cutting-edge lighting, pristine sound, and seamless technical production designed to make every space feel like another world.",
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
    name: "Curation",
    slug: "curation",
    tagline: "Your Wish, Handled",
    description:
      "We handpick every detail of your lifestyle — VIP access, reservations, travel, and personal management — so your only job is to enjoy.",
    longDescription:
      "True luxury is effortless. Our Curation team personally selects and orchestrates every detail so you don't have to — from securing impossible reservations and VIP access to coordinating complex travel itineraries and managing your lifestyle needs with discretion and precision.",
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
    name: "Celebration",
    slug: "celebration",
    tagline: "Experiences Worth Remembering",
    description:
      "We bring your vision to life — from intimate dinners to grand-scale productions — with meticulous planning and boundless creativity.",
    longDescription:
      "Every gathering is an opportunity to create something unforgettable. Our Celebration team conceptualizes, plans, and executes extraordinary experiences — from intimate dinner parties to large-scale productions — with meticulous attention to detail and boundless creativity that turns any occasion into a landmark event.",
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
    pillar: "moments",
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
    pillar: "immersion",
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
    pillar: "curation",
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
    pillar: "celebration",
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
    pillar: "celebration",
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
