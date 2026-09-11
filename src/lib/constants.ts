import {
  Hotel,
  UtensilsCrossed,
  Sparkles,
  Car,
  Ticket,
  Gem,
  ClipboardList,
  Headset,
  type LucideIcon,
} from "lucide-react";

export type Service = {
  name: string;
  slug: string;
  tagline: string;
  description: string;
  longDescription: string;
  icon: LucideIcon;
  services: { title: string; description: string }[];
};

export const SERVICES: Service[] = [
  {
    name: "Hotels & Accommodations",
    slug: "hotels-accommodations",
    tagline: "The Right Room, Confirmed",
    description:
      "Preferred hotels and suites, group room blocks, arrival timing and neighborhood guidance matched to your plans.",
    longDescription:
      "Where you stay sets the tone for the whole trip. We work with preferred hotels across Chicago's neighborhoods to secure the right rooms and suites, block group rates for larger parties, and time check-in around your flights — so the first thing that happens in Chicago is arriving, not waiting.",
    icon: Hotel,
    services: [
      {
        title: "Preferred Hotels & Suites",
        description:
          "Access to rooms and suites at hotels we work with regularly across downtown Chicago.",
      },
      {
        title: "Group Room Blocks",
        description:
          "Coordinated blocks for larger parties so everyone stays together, at a group rate.",
      },
      {
        title: "Arrival Timing",
        description:
          "Check-in coordinated ahead of your landing time so rooms are ready when you are.",
      },
      {
        title: "Neighborhood Guidance",
        description:
          "Honest advice on which area suits your group — River North, Gold Coast, West Loop and beyond.",
      },
    ],
  },
  {
    name: "Dining Reservations",
    slug: "dining-reservations",
    tagline: "The Table, Held",
    description:
      "Restaurant planning across the city, private dining rooms, group tables and a dining schedule that fits the rest of the trip.",
    longDescription:
      "A great dinner is a reservation that actually holds, at a table sized for your group, at a time that fits the rest of your day. We plan dining across the city — from chef-driven tasting rooms to private dining spaces — and sequence it with everything else on the itinerary.",
    icon: UtensilsCrossed,
    services: [
      {
        title: "Restaurant Planning",
        description:
          "Reservations across Chicago's dining scene, matched to your group's taste and occasion.",
      },
      {
        title: "Private Dining Rooms",
        description:
          "Private rooms and buyouts for groups that want the evening to themselves.",
      },
      {
        title: "Group Tables",
        description: "Tables sized correctly the first time — no split parties, no last-minute scrambling.",
      },
      {
        title: "Dining Schedule",
        description:
          "Meals sequenced with the rest of your day so nothing runs late or overlaps.",
      },
    ],
  },
  {
    name: "Nightlife & VIP Tables",
    slug: "nightlife-vip-tables",
    tagline: "The Door, Handled",
    description:
      "Lounge reservations, nightlife planning, VIP table coordination and transportation between locations.",
    longDescription:
      "Nightlife fails at the door, not the idea. We coordinate lounge and table reservations, are direct about venue requirements before you arrive, and time transportation between locations so your group moves together and never spends the evening negotiating entry.",
    icon: Sparkles,
    services: [
      {
        title: "Lounge & Table Reservations",
        description: "VIP table coordination at Chicago's nightlife venues.",
      },
      {
        title: "Evening Sequencing",
        description: "Timing between venues so the night flows without dead time.",
      },
      {
        title: "Transportation Between Venues",
        description: "Vehicles coordinated so the group arrives and leaves together.",
      },
      {
        title: "Dress Code & Entry Guidance",
        description: "Clear guidance on dress code, ID and age requirements before you arrive.",
      },
    ],
  },
  {
    name: "Transportation & Chauffeurs",
    slug: "transportation-chauffeurs",
    tagline: "The Ride, On Time",
    description:
      "Airport transfers, private drivers, luxury SUVs and coordinated pickups so your group moves together and on schedule.",
    longDescription:
      "Downtown Chicago moves quickly, and the schedule that holds a trip together lives or dies on transportation. We arrange airport transfers, private drivers and luxury SUVs, and coordinate pickups so your group moves as one, on time, between every stop.",
    icon: Car,
    services: [
      {
        title: "Airport Transfers",
        description: "Private pickup and drop-off timed to your actual flight, not a guess.",
      },
      {
        title: "Private Drivers & SUVs",
        description: "Dedicated vehicles for the length of your stay or by the evening.",
      },
      {
        title: "Coordinated Pickups",
        description: "Group departures timed together so no one is left waiting outside a venue.",
      },
      {
        title: "Multi-Stop Routing",
        description: "Routes planned around Friday and Saturday night traffic realities.",
      },
    ],
  },
  {
    name: "Events, Concerts & Sports",
    slug: "events-concerts-sports",
    tagline: "Access, Arranged",
    description:
      "Seating and access arrangements for games, concerts and city events, coordinated alongside the rest of your itinerary.",
    longDescription:
      "Chicago's calendar is part of the draw — Bulls, Bears, Cubs, Sox, and a constant run of concerts and city events. We arrange seating and access and slot it into the rest of your itinerary so a game or show fits around dinner and transportation, not the other way around.",
    icon: Ticket,
    services: [
      {
        title: "Sporting Events",
        description: "Seating arrangements for Chicago's major sports calendar.",
      },
      {
        title: "Concerts & Shows",
        description: "Access to concerts and city events, timed with the rest of your day.",
      },
      {
        title: "Group Seating",
        description: "Groups kept together rather than scattered across a venue.",
      },
      {
        title: "Itinerary Integration",
        description: "Events slotted into your schedule alongside dining and transportation.",
      },
    ],
  },
  {
    name: "Private Experiences",
    slug: "private-experiences",
    tagline: "Built Around Your Group",
    description:
      "Boat charters, private chefs, entertainment, photographers and other arrangements built around your group.",
    longDescription:
      "Some requests don't fit a standard category — a boat charter on the lake, a private chef, a photographer for the weekend, a specific entertainer. We treat these as seriously as anything else on the itinerary and arrange them around your group and your dates.",
    icon: Gem,
    services: [
      {
        title: "Boat Charters",
        description: "Private charters on Lake Michigan and the Chicago River.",
      },
      {
        title: "Private Chefs",
        description: "In-suite or in-venue dining built around your group.",
      },
      {
        title: "Entertainment",
        description: "Performers and entertainment arranged for private events.",
      },
      {
        title: "Photography",
        description: "Photographers booked to document the weekend.",
      },
    ],
  },
  {
    name: "Complete Itinerary Planning",
    slug: "complete-itinerary-planning",
    tagline: "One Schedule, Everything On It",
    description:
      "A single documented schedule covering every reservation, transfer and confirmation from arrival to departure.",
    longDescription:
      "The difference between a good weekend and a great one is usually a schedule someone actually held. We document every reservation, transfer and confirmation into one itinerary — shareable with your whole group — from the moment you land to the moment you leave.",
    icon: ClipboardList,
    services: [
      {
        title: "Day-by-Day Schedule",
        description: "Every element of your trip in one document, in order.",
      },
      {
        title: "Confirmations Included",
        description: "Timings, addresses and confirmation details for every reservation.",
      },
      {
        title: "Shareable With Your Group",
        description: "One itinerary everyone traveling can reference.",
      },
      {
        title: "Built From Your Priorities",
        description: "Sequenced around what matters most to your group, not a template.",
      },
    ],
  },
  {
    name: "On-Call Concierge Support",
    slug: "on-call-concierge-support",
    tagline: "One Number, The Whole Trip",
    description:
      "One point of contact before and during your visit for changes, additions and anything that comes up.",
    longDescription:
      "Plans change. Someone's flight moves, the group wants to add a stop, a reservation needs adjusting. Instead of re-contacting five venues, you contact one team — before and during your visit — for changes, additions and anything that comes up.",
    icon: Headset,
    services: [
      {
        title: "One Point of Contact",
        description: "A single concierge team for the entire trip, before and during.",
      },
      {
        title: "Real-Time Changes",
        description: "Adjustments handled as they come up, not after the fact.",
      },
      {
        title: "Additions Mid-Trip",
        description: "New requests coordinated on the fly once you're in the city.",
      },
      {
        title: "Post-Trip Follow-Up",
        description: "Outstanding items closed out and preferences recorded for next time.",
      },
    ],
  },
];

export type Experience = {
  name: string;
  slug: string;
  tagline: string;
  description: string;
  longDescription: string;
  whyConcierge: string;
  coordinates: string[];
};

export const EXPERIENCES: Experience[] = [
  {
    name: "Bachelor & Bachelorette Weekends",
    slug: "bachelor-bachelorette-weekends",
    tagline: "The Group Weekend, Coordinated",
    description:
      "Multi-day weekends built around your group — accommodations, dining, transportation and evening plans coordinated end to end.",
    longDescription:
      "Groups traveling to Chicago for a multi-day weekend, often arriving from several cities on different flights, need someone holding the whole schedule together.",
    whyConcierge:
      "Group weekends fail on logistics, not on ideas. A concierge holds the schedule, confirms every reservation and adjusts in real time when the group runs behind.",
    coordinates: [
      "Hotel rooms or suites grouped together",
      "Airport transfers and a vehicle for the group",
      "Dinner reservations sized for the full party",
      "Evening plans and timing between venues",
      "Daytime activities such as boat charters or sporting events",
    ],
  },
  {
    name: "Luxury Chicago Getaways",
    slug: "luxury-chicago-getaways",
    tagline: "Considered, Unhurried Stays",
    description:
      "Considered, unhurried stays. Preferred hotels, chef-driven dining and private experiences arranged around how you want to spend your time.",
    longDescription:
      "Not every trip is built for speed. For guests who want a slower, more considered visit, we arrange preferred hotels, chef-driven dining and private experiences around how you actually want to spend your time in the city.",
    whyConcierge:
      "A leisure trip should not require you to plan it. A concierge translates preferences into a schedule you don't have to manage.",
    coordinates: [
      "Preferred hotel or suite matched to your taste",
      "Chef-driven dining reservations",
      "Private experiences suited to the pace you want",
      "Ground transportation for the length of your stay",
      "A day-by-day plan you can adjust as you go",
    ],
  },
  {
    name: "Birthdays & Celebrations",
    slug: "birthdays-celebrations",
    tagline: "The Right Details, At the Right Moment",
    description:
      "Milestone dinners, private rooms and quiet touches that land at the right moment, without you managing the details.",
    longDescription:
      "Milestone celebrations deserve details that land without the guest of honor having to manage any of them — a private room, a timed surprise, a dinner that actually feels planned.",
    whyConcierge:
      "The person celebrating shouldn't be the one coordinating it. A concierge handles the details so the night is actually a surprise.",
    coordinates: [
      "Milestone dinner reservations and private rooms",
      "Timed touches — cake, toasts, small surprises",
      "Evening plans built around the celebration",
      "Transportation for the full party",
      "Coordination with anyone helping plan the surprise",
    ],
  },
  {
    name: "Corporate Hospitality",
    slug: "corporate-hospitality",
    tagline: "Business Travel, Handled Discreetly",
    description:
      "Client entertainment, executive visits and team outings planned with the discretion and reliability business travel requires.",
    longDescription:
      "Client entertainment and executive visits carry a different bar for discretion and reliability than a personal trip. We plan around that — confirmed reservations, no surprises, and a single point of contact your team can rely on.",
    whyConcierge:
      "Business hospitality has no room for a reservation that falls through. A concierge removes that risk and the time it takes to manage it internally.",
    coordinates: [
      "Client dinners and private dining",
      "Executive visit itineraries",
      "Team outing logistics for larger groups",
      "Discreet, reliable transportation",
      "A single point of contact for your team",
    ],
  },
  {
    name: "Nightlife & VIP Access",
    slug: "nightlife-vip-access",
    tagline: "Tables, Timing, and the Door",
    description:
      "Lounge and table coordination for guests who meet all age and venue requirements, with transportation timed between locations.",
    longDescription:
      "A night out in Chicago's lounges and clubs, done right, is mostly about timing and coordination — the table, the transportation, and knowing the requirements before you're standing at the door.",
    whyConcierge:
      "The door is where nightlife plans usually break. A concierge confirms requirements ahead of time so the night starts on schedule.",
    coordinates: [
      "VIP table reservations",
      "Transportation timed between venues",
      "Clear guidance on age and venue requirements",
      "Group coordination so no one gets separated",
      "Evening sequencing across multiple stops",
    ],
  },
  {
    name: "Custom Group Experiences",
    slug: "custom-group-experiences",
    tagline: "If It Can Be Coordinated, We'll Plan It",
    description:
      "Larger parties, mixed itineraries and unusual requests. If it can be coordinated in Chicago, we will plan it properly.",
    longDescription:
      "Some groups don't fit a standard category — larger parties, mixed-purpose visits, or a specific request that doesn't map neatly to a package. We treat these the same way as everything else: properly planned, fully coordinated.",
    whyConcierge:
      "An unusual request still needs the same discipline as a standard one. A concierge applies that discipline regardless of the shape of the ask.",
    coordinates: [
      "Larger party logistics (20+ guests)",
      "Mixed itineraries spanning multiple occasions",
      "Custom requests scoped individually",
      "Multi-vehicle transportation coordination",
      "A single itinerary covering everything",
    ],
  },
];

export const VIBE_TAGS = [
  "Upscale",
  "High-Energy",
  "Chill & Lounge",
  "Intimate",
  "Rooftop",
  "Black Tie",
  "Trendy",
  "Outdoor",
  "Late Night",
  "Brunch",
  "Day Party",
  "Festival Vibes",
] as const;

export const BUDGET_RANGES = [
  { label: "Prefer not to say", min: 0, max: 100000 },
  { label: "Under $500", min: 0, max: 500 },
  { label: "$500 – $2,000", min: 500, max: 2000 },
  { label: "$2,000 – $5,000", min: 2000, max: 5000 },
  { label: "$5,000 – $10,000", min: 5000, max: 10000 },
  { label: "$10,000+", min: 10000, max: 100000 },
] as const;

export const NAV_LINKS = [
  { label: "Experiences", href: "/experiences" },
  { label: "Services", href: "/services" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "About", href: "/about" },
] as const;

export const NEIGHBORHOODS = [
  "Gold Coast",
  "River North",
  "The Loop",
  "West Loop",
  "Fulton Market",
  "Lakefront",
  "South Loop",
] as const;
