"use client";

import { useEffect, useRef, type ReactNode } from "react";
import Link from "next/link";

const SMS_HREF = "sms:+1XXXXXXXXXX";

/* ── Scroll-reveal wrapper ── */
function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("revealed");
          obs.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal-on-scroll ${className}`}
      style={{
        opacity: 0,
        transform: "translateY(24px)",
        transition: "opacity 0.4s ease, transform 0.4s ease",
      }}
    >
      {children}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   SECTION 1 — HERO
   ══════════════════════════════════════════════════════════ */
function Hero() {
  return (
    <section
      className="relative flex items-center justify-center text-center"
      style={{ minHeight: "100svh" }}
    >
      {/* BG image + overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url(/images/hero/MICC_rooftop_landscape.png)" }}
      />
      <div
        className="absolute inset-0"
        style={{ background: "rgba(13, 27, 42, 0.65)" }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center px-[var(--container-pad)]">
        <p
          className="hero-fade font-sans uppercase"
          style={{
            fontSize: "0.7rem",
            color: "var(--beige)",
            letterSpacing: "0.25em",
            fontVariant: "small-caps",
            animationDelay: "0s",
          }}
        >
          MICC — Make It Click &amp; Celebrate
        </p>

        <h1
          className="hero-fade font-display mt-6"
          style={{
            fontWeight: 400,
            color: "var(--cream)",
            maxWidth: 800,
            animationDelay: "0.15s",
          }}
        >
          One Text Away From the Night You Deserve.
        </h1>

        <p
          className="hero-fade font-sans mt-6"
          style={{
            fontSize: "1.1rem",
            color: "rgba(245, 240, 232, 0.7)",
            maxWidth: 540,
            lineHeight: 1.6,
            animationDelay: "0.3s",
          }}
        >
          Your all-in-one concierge for reservations, events,
          transportation, and everything in between.
        </p>

        <div
          className="hero-fade flex flex-wrap items-center justify-center gap-4 mt-10"
          style={{ animationDelay: "0.45s" }}
        >
          <a href={SMS_HREF} className="btn-primary">
            Text Your Concierge &rarr;
          </a>
          <a
            href="#how-it-works"
            className="btn-ghost"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#how-it-works")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            See How It Works &darr;
          </a>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════
   SECTION 2 — TRUST BAR
   ══════════════════════════════════════════════════════════ */
const TRUST_ITEMS = [
  "500+ Nights Handled",
  "Chicago & SF Based",
  "DJ & Event Roots",
  "Response Under 15 Min",
  "5-Star Rated",
];

function TrustBar() {
  const items = [...TRUST_ITEMS, ...TRUST_ITEMS];

  return (
    <section
      className="overflow-hidden flex items-center"
      style={{ background: "var(--charcoal)", height: 80 }}
    >
      <div className="marquee-track flex items-center whitespace-nowrap">
        {items.map((item, i) => (
          <span key={i} className="flex items-center shrink-0">
            {i > 0 && (
              <span
                className="mx-8 inline-block"
                style={{
                  width: 1,
                  height: 18,
                  background: "var(--beige)",
                  opacity: 0.4,
                }}
              />
            )}
            <span
              className="font-sans uppercase"
              style={{
                fontSize: "0.75rem",
                color: "var(--cream)",
                letterSpacing: "0.15em",
                fontVariant: "small-caps",
              }}
            >
              {item}
            </span>
          </span>
        ))}
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════
   SECTION 3 — HOW IT WORKS
   ══════════════════════════════════════════════════════════ */
const STEPS = [
  {
    num: "01",
    title: "Tell Us What You Want",
    body: "Text, call, or fill out a quick form. Tell us the vibe, the date, the group. We\u2019ll take it from there.",
  },
  {
    num: "02",
    title: "We Handle Everything",
    body: "Reservations, vendors, transportation, production \u2014 one team orchestrates every detail.",
  },
  {
    num: "03",
    title: "Show Up & Enjoy",
    body: "Your only job is to arrive. We\u2019ll make sure everything else is already handled.",
  },
];

function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="section-dark"
      style={{ padding: "var(--section-pad-desktop) var(--container-pad)" }}
    >
      <div className="max-w-[var(--container-max)] mx-auto">
        <Reveal>
          <div className="text-center mb-16">
            <h2 style={{ color: "var(--cream)" }}>Good Times in 3 Steps</h2>
            <p
              className="font-sans mt-4"
              style={{ color: "rgba(245, 240, 232, 0.6)", fontSize: "1rem" }}
            >
              We keep it simple so you can focus on enjoying.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {STEPS.map((step) => (
            <Reveal key={step.num}>
              <div
                className="card-hover"
                style={{
                  background: "var(--charcoal)",
                  padding: "2.5rem",
                  borderRadius: 4,
                  borderLeft: "3px solid var(--beige)",
                }}
              >
                <span
                  className="font-display block"
                  style={{ fontSize: "4rem", color: "var(--beige)", opacity: 0.3, lineHeight: 1 }}
                >
                  {step.num}
                </span>
                <h3 className="mt-4" style={{ color: "var(--cream)" }}>
                  {step.title}
                </h3>
                <p
                  className="font-sans mt-3"
                  style={{ fontSize: "0.9rem", color: "rgba(245, 240, 232, 0.7)", lineHeight: 1.6 }}
                >
                  {step.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="text-center mt-14">
          <Link href="/request" className="btn-primary">
            Start Planning &rarr;
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════
   SECTION 4 — SERVICE CATEGORIES
   ══════════════════════════════════════════════════════════ */
const SERVICES = [
  {
    image: "/images/services/MICC_chauffeur_landscape.png",
    title: "MICC Nights",
    body: "VIP tables, nightlife access, private drivers, bottle service.",
    href: "/concierge",
  },
  {
    image: "/images/packages/MICC_afterparty_landscape.png",
    title: "MICC Events",
    body: "Birthdays, corporate events, private parties \u2014 full production.",
    href: "/experiences",
  },
  {
    image: "/images/services/MICC_jet_landscape.png",
    title: "MICC Weekends",
    body: "Multi-day itineraries, hotel, transport, dining, every detail.",
    href: "/packages",
  },
  {
    image: "/images/services/MICC_lounge_landscape.png",
    title: "MICC On-Call",
    body: "Ongoing concierge support. Your team every week, not just once.",
    href: "/packages#membership",
  },
];

function ServiceCategories() {
  return (
    <section
      className="section-light"
      style={{ padding: "var(--section-pad-desktop) var(--container-pad)" }}
    >
      <div className="max-w-[var(--container-max)] mx-auto">
        <Reveal>
          <div className="text-center mb-16">
            <h2 style={{ color: "var(--navy)" }}>Everything You Need. One Team.</h2>
            <p
              className="font-sans mt-4"
              style={{ color: "rgba(13, 27, 42, 0.65)", fontSize: "1rem" }}
            >
              From a dinner reservation to a full weekend production — MICC covers it.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SERVICES.map((svc) => (
            <Reveal key={svc.title}>
              <Link
                href={svc.href}
                className="block card-hover overflow-hidden relative"
                style={{
                  borderRadius: 4,
                  border: "1px solid transparent",
                  textDecoration: "none",
                }}
              >
                <div
                  className="w-full h-48 bg-cover bg-center"
                  style={{ backgroundImage: `url(${svc.image})` }}
                />
                <div style={{ background: "var(--navy)", padding: "2rem 2.5rem 2.5rem" }}>
                <h3 style={{ color: "var(--cream)" }}>
                  {svc.title}
                </h3>
                <p
                  className="font-sans mt-2"
                  style={{ fontSize: "0.9rem", color: "rgba(245, 240, 232, 0.65)", lineHeight: 1.6 }}
                >
                  {svc.body}
                </p>
                <span
                  className="font-sans inline-block mt-4"
                  style={{ fontSize: "0.85rem", color: "var(--beige)" }}
                >
                  Explore &rarr;
                </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════
   SECTION 5 — BRAND STORY PULL QUOTE
   ══════════════════════════════════════════════════════════ */
function PullQuote() {
  return (
    <section className="relative flex items-center justify-center" style={{ padding: "var(--section-pad-desktop) var(--container-pad)" }}>
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url(/images/lifestyle/MICC_lounge_landscape.png)" }}
      />
      <div className="absolute inset-0" style={{ background: "rgba(13, 27, 42, 0.7)" }} />

      <Reveal className="relative z-10 text-center max-w-[700px]">
        <p style={{ color: "var(--beige)", fontSize: "1.2rem", letterSpacing: "0.1em" }}>
          ——
        </p>
        <blockquote
          className="font-display italic mt-4"
          style={{
            fontSize: "clamp(2rem, 5vw, 4rem)",
            color: "var(--cream)",
            lineHeight: 1.2,
            fontWeight: 400,
          }}
        >
          We&rsquo;re not a booking platform. We&rsquo;re your team.
        </blockquote>
        <p style={{ color: "var(--beige)", fontSize: "1.2rem", letterSpacing: "0.1em", marginTop: "1rem" }}>
          ——
        </p>
        <p
          className="font-sans mt-6 mx-auto"
          style={{
            fontSize: "1rem",
            color: "rgba(245, 240, 232, 0.65)",
            maxWidth: 500,
            lineHeight: 1.7,
          }}
        >
          Born from DJ culture and live events. Built on the belief that
          extraordinary nights shouldn&rsquo;t require extraordinary effort.
        </p>
        <div className="mt-8">
          <Link href="/about" className="btn-ghost">
            Meet MICC &rarr;
          </Link>
        </div>
      </Reveal>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════
   SECTION 6 — PACKAGES PREVIEW
   ══════════════════════════════════════════════════════════ */
const PACKAGES = [
  {
    price: "From $500",
    title: "The Night Out",
    image: "/images/hero/MICC_rooftop_sq.png",
    items: [
      "VIP table reservation",
      "Round-trip private driver",
      "Dedicated concierge for the evening",
    ],
    href: "/request?package=night-out",
  },
  {
    price: "From $2,000",
    title: "The Weekend",
    image: "/images/services/MICC_yacht_sq.png",
    items: [
      "Full Fri\u2013Sun itinerary",
      "Hotel + dining + nightlife",
      "Private transportation throughout",
    ],
    href: "/request?package=weekend",
  },
  {
    price: "From $5,000",
    title: "The Production",
    image: "/images/packages/MICC_afterparty_sq.png",
    items: [
      "Full event production",
      "DJ, lighting, sound, vendors",
      "Photo/video + day-of coordination",
    ],
    href: "/request?package=production",
  },
];

function PackagesPreview() {
  return (
    <section
      className="section-dark"
      style={{ padding: "var(--section-pad-desktop) var(--container-pad)" }}
    >
      <div className="max-w-[var(--container-max)] mx-auto">
        <Reveal>
          <div className="text-center mb-16">
            <h2 style={{ color: "var(--cream)" }}>Ready-to-Book Experiences</h2>
            <p
              className="font-sans mt-4"
              style={{ color: "rgba(245, 240, 232, 0.6)", fontSize: "1rem" }}
            >
              Not sure where to start? Pick a package and we handle the rest.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:overflow-visible overflow-x-auto">
          {PACKAGES.map((pkg) => (
            <Reveal key={pkg.title}>
              <div
                className="card-hover overflow-hidden"
                style={{
                  border: "1px solid rgba(201, 169, 110, 0.25)",
                  borderRadius: 4,
                  background: "transparent",
                  minWidth: 280,
                }}
              >
                <div
                  className="w-full h-44 bg-cover bg-center"
                  style={{ backgroundImage: `url(${pkg.image})` }}
                />
                <div style={{ padding: "2rem 2.5rem 2.5rem" }}>
                <span
                  className="font-sans uppercase"
                  style={{
                    fontSize: "0.8rem",
                    color: "var(--beige)",
                    letterSpacing: "0.1em",
                    fontVariant: "small-caps",
                  }}
                >
                  {pkg.price}
                </span>
                <h3 className="mt-2" style={{ color: "var(--cream)" }}>
                  {pkg.title}
                </h3>
                <ul className="mt-5 space-y-3">
                  {pkg.items.map((item) => (
                    <li
                      key={item}
                      className="font-sans flex items-start gap-2"
                      style={{ fontSize: "0.85rem", color: "rgba(245, 240, 232, 0.65)" }}
                    >
                      <span style={{ color: "var(--beige)", flexShrink: 0 }}>&bull;</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  href={pkg.href}
                  className="btn-primary inline-block mt-8 text-[0.8rem]"
                >
                  Book This &rarr;
                </Link>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="text-center mt-14">
          <Link
            href="/packages"
            className="font-sans inline-block transition-colors duration-200 hover:underline"
            style={{ color: "var(--beige)", fontSize: "0.9rem" }}
          >
            View All Packages &rarr;
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════
   SECTION 7 — TESTIMONIALS
   ══════════════════════════════════════════════════════════ */
const TESTIMONIALS = [
  {
    quote:
      "MICC handled everything for my birthday weekend. One text Friday morning and by Saturday night we had tables, a driver, and the whole crew sorted. Unreal.",
    name: "Marcus T., Chicago",
  },
  {
    quote:
      "I\u2019ve used booking apps. I\u2019ve called venues myself. Nothing compares to having an actual person who just handles it. MICC is the move.",
    name: "Jess R., San Francisco",
  },
  {
    quote:
      "They produced our company event from scratch \u2014 venue, DJ, catering, decor. Completely seamless. Will use them for everything going forward.",
    name: "David K., Los Angeles",
  },
];

function Testimonials() {
  return (
    <section
      style={{
        background: "var(--charcoal)",
        padding: "var(--section-pad-desktop) var(--container-pad)",
      }}
    >
      <div className="max-w-[var(--container-max)] mx-auto">
        <Reveal>
          <div className="text-center mb-16">
            <h2 style={{ color: "var(--cream)" }}>What Our Clients Say</h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <Reveal key={t.name}>
              <div
                className="card-hover"
                style={{
                  background: "var(--navy)",
                  padding: "2rem",
                  borderRadius: 4,
                }}
              >
                {/* Stars */}
                <div style={{ color: "var(--beige)", fontSize: "1rem", letterSpacing: "0.15em" }}>
                  ★★★★★
                </div>
                <p
                  className="font-sans italic mt-4"
                  style={{ fontSize: "0.95rem", color: "rgba(245, 240, 232, 0.8)", lineHeight: 1.7 }}
                >
                  &ldquo;{t.quote}&rdquo;
                </p>
                <p
                  className="font-sans mt-5 uppercase"
                  style={{
                    fontSize: "0.8rem",
                    color: "var(--beige)",
                    letterSpacing: "0.1em",
                    fontVariant: "small-caps",
                  }}
                >
                  — {t.name}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════
   SECTION 8 — FINAL CTA BANNER
   ══════════════════════════════════════════════════════════ */
function FinalCta() {
  return (
    <section
      className="text-center"
      style={{ background: "var(--beige)", padding: "80px var(--container-pad)" }}
    >
      <div className="max-w-[var(--container-max)] mx-auto">
        <Reveal>
          <h2
            className="font-display"
            style={{
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              color: "var(--navy)",
              lineHeight: 1.15,
            }}
          >
            Your Night Starts With One Text.
          </h2>
          <p
            className="font-sans mt-3"
            style={{ fontSize: "1rem", color: "rgba(13, 27, 42, 0.7)" }}
          >
            Response time under 15 minutes. Real people. Real results.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
            <a
              href={SMS_HREF}
              className="inline-block cursor-pointer font-sans font-medium uppercase tracking-[0.08em] text-[0.85rem]"
              style={{
                background: "var(--navy)",
                color: "var(--cream)",
                padding: "14px 32px",
                borderRadius: 2,
                transition: "all 0.2s ease",
                textDecoration: "none",
              }}
            >
              Text Us Now
            </a>
            <Link
              href="/request"
              className="inline-block cursor-pointer font-sans font-medium uppercase tracking-[0.08em] text-[0.85rem]"
              style={{
                border: "1px solid var(--navy)",
                color: "var(--navy)",
                padding: "14px 32px",
                borderRadius: 2,
                background: "transparent",
                transition: "all 0.2s ease",
                textDecoration: "none",
              }}
            >
              Fill Out a Quick Form
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════
   PAGE STYLES (injected via <style>)
   ══════════════════════════════════════════════════════════ */
const pageStyles = `
  /* Hero fade-in animation */
  .hero-fade {
    opacity: 0;
    transform: translateY(20px);
    animation: heroIn 0.6s ease forwards;
  }
  @keyframes heroIn {
    to { opacity: 1; transform: translateY(0); }
  }

  /* Scroll reveal */
  .revealed {
    opacity: 1 !important;
    transform: translateY(0) !important;
  }

  /* Card hover */
  .card-hover {
    transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
  }
  .card-hover:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
    border-color: var(--beige) !important;
  }

  /* Marquee */
  .marquee-track {
    animation: marquee 30s linear infinite;
  }
  @keyframes marquee {
    0%   { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }

  /* Mobile section padding override */
  @media (max-width: 768px) {
    #how-it-works,
    .section-dark,
    .section-light,
    .section-mid {
      padding-top: var(--section-pad-mobile) !important;
      padding-bottom: var(--section-pad-mobile) !important;
    }
  }
`;

/* ══════════════════════════════════════════════════════════
   PAGE EXPORT
   ══════════════════════════════════════════════════════════ */
export default function HomePage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: pageStyles }} />
      <Hero />
      <TrustBar />
      <HowItWorks />
      <ServiceCategories />
      <PullQuote />
      <PackagesPreview />
      <Testimonials />
      <FinalCta />
    </>
  );
}
