"use client";

import { useState, useEffect, useRef, type ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { EXPERIENCES, NEIGHBORHOODS, SERVICES } from "@/lib/constants";
import { PhotoCtaBand } from "@/components/layout/photo-cta-band";

// ─── Color tokens ───
const GOLD = "#E0C38E";
const WARM = "#B89778";
const OFF_WHITE = "#EFEEEB";
const BLACK = "#040405";

const serif = "var(--font-display), 'Playfair Display', Georgia, serif";
const sans = "var(--font-sans), 'Outfit', 'Helvetica Neue', sans-serif";

// ─── Fade-in on scroll ───
function useFadeIn() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

function FadeSection({
  children,
  style,
  delay = 0,
}: {
  children: ReactNode;
  style?: React.CSSProperties;
  delay?: number;
}) {
  const ref = useFadeIn();
  return (
    <div
      ref={ref}
      style={{
        opacity: 0,
        transform: "translateY(36px)",
        transition: `opacity 0.9s cubic-bezier(.23,1,.32,1) ${delay}s, transform 0.9s cubic-bezier(.23,1,.32,1) ${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// ─── Gold divider ───
function GoldLine({ width = 60 }: { width?: number }) {
  return (
    <div
      style={{
        width,
        height: 1,
        background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`,
        margin: "0 auto",
      }}
    />
  );
}

// ─── Gold button ───
function GoldButton({
  children,
  onClick,
  filled,
  style,
  href,
}: {
  children: ReactNode;
  onClick?: () => void;
  filled?: boolean;
  style?: React.CSSProperties;
  href?: string;
}) {
  const [hov, setHov] = useState(false);
  const isFilled = filled || hov;
  const baseStyle: React.CSSProperties = {
    background: isFilled ? GOLD : "transparent",
    color: isFilled ? BLACK : GOLD,
    border: `1px solid ${GOLD}`,
    padding: "14px 40px",
    fontFamily: sans,
    fontSize: 13,
    fontWeight: 500,
    letterSpacing: 2.5,
    textTransform: "uppercase",
    cursor: "pointer",
    transition: "all 0.4s cubic-bezier(.23,1,.32,1)",
    display: "inline-block",
    textDecoration: "none",
    textAlign: "center",
    ...style,
  };
  if (href) {
    return (
      <Link
        href={href}
        style={baseStyle}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
      >
        {children}
      </Link>
    );
  }
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{ ...baseStyle, border: `1px solid ${isFilled ? GOLD : (style?.borderColor ?? GOLD)}` }}
    >
      {children}
    </button>
  );
}

// ─── Hero ───
function Hero() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 200);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      style={{
        position: "relative",
        minHeight: "calc(100vh - 72px)",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* Background photo */}
      <Image
        src="https://images.unsplash.com/photo-1600739275840-17466822434d?q=80&w=2400&auto=format&fit=crop"
        alt="Chicago skyline above the Chicago River after dark"
        fill
        priority
        sizes="100vw"
        style={{ objectFit: "cover", zIndex: 0 }}
      />
      {/* Dark overlay for legibility */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          background: `linear-gradient(to top, ${BLACK} 2%, rgba(4,4,5,0.85) 28%, rgba(4,4,5,0.35) 62%, rgba(4,4,5,0.55) 100%)`,
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 2,
          width: "100%",
          maxWidth: "var(--container-max)",
          margin: "0 auto",
          padding: "80px var(--container-pad)",
        }}
      >
        <div style={{ maxWidth: 620 }}>
          {/* Eyebrow */}
          <div
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? "translateY(0)" : "translateY(24px)",
              transition: "all 1.2s cubic-bezier(.23,1,.32,1) 0.3s",
              display: "flex",
              alignItems: "center",
              gap: 14,
              marginBottom: 28,
            }}
          >
            <div style={{ width: 32, height: 1, background: GOLD }} />
            <span
              style={{
                fontFamily: sans,
                fontSize: 11,
                fontWeight: 400,
                letterSpacing: 4,
                color: GOLD,
                textTransform: "uppercase",
              }}
            >
              Private Concierge · Chicago
            </span>
          </div>

          {/* Headline */}
          <div
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? "translateY(0)" : "translateY(30px)",
              transition: "all 1.2s cubic-bezier(.23,1,.32,1) 0.6s",
            }}
          >
            <h1
              style={{
                fontFamily: serif,
                fontSize: "clamp(42px, 7vw, 96px)",
                fontWeight: 300,
                color: OFF_WHITE,
                lineHeight: 1.05,
                margin: 0,
                letterSpacing: -1,
              }}
            >
              Chicago,
              <br />
              Handled.
            </h1>
          </div>

          {/* Subtext */}
          <div
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? "translateY(0)" : "translateY(20px)",
              transition: "all 1.2s cubic-bezier(.23,1,.32,1) 0.9s",
            }}
          >
            <p
              style={{
                fontFamily: sans,
                fontSize: 16,
                fontWeight: 300,
                color: "rgba(239,238,235,0.7)",
                maxWidth: 480,
                margin: "28px 0 40px",
                lineHeight: 1.7,
                letterSpacing: 0.3,
              }}
            >
              From reservations and accommodations to nightlife, transportation
              and private experiences, MICC Hospitality plans every detail of
              your time in Chicago.
            </p>
          </div>

          {/* CTAs */}
          <div
            style={{
              opacity: loaded ? 1 : 0,
              transition: "opacity 1.2s cubic-bezier(.23,1,.32,1) 1.2s",
              display: "flex",
              gap: 16,
              flexWrap: "wrap",
            }}
          >
            <GoldButton filled href="/start">Plan Your Experience</GoldButton>
            <GoldButton
              href="/experiences"
              style={{ borderColor: "rgba(255,255,255,0.12)", color: OFF_WHITE }}
            >
              Explore Our Services
            </GoldButton>
          </div>
        </div>
      </div>

      {/* Coordinates + photo credit */}
      <div
        style={{
          position: "absolute",
          bottom: 24,
          right: "var(--container-pad)",
          zIndex: 2,
          textAlign: "right",
          opacity: loaded ? 0.6 : 0,
          transition: "opacity 1.5s ease 1.5s",
        }}
      >
        <div style={{ fontFamily: sans, fontSize: 11, letterSpacing: 1, color: OFF_WHITE }}>
          41.8781° N · 87.6298° W
        </div>
        <div
          style={{
            fontFamily: sans,
            fontSize: 9,
            letterSpacing: 1,
            color: "rgba(239,238,235,0.5)",
            marginTop: 2,
          }}
        >
          PHOTO MANA5280 / UNSPLASH
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: "absolute",
          bottom: 24,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
          zIndex: 2,
          opacity: loaded ? 0.4 : 0,
          transition: "opacity 1.5s ease 1.8s",
        }}
      >
        <div style={{ width: 1, height: 32, background: `linear-gradient(transparent, ${GOLD})` }} />
        <span
          style={{
            fontFamily: sans,
            fontSize: 9,
            letterSpacing: 3,
            color: GOLD,
            textTransform: "uppercase",
          }}
        >
          Scroll
        </span>
      </div>
    </section>
  );
}

// ─── Experiences ───
const EXPERIENCE_PHOTOS: Record<string, string> = {
  "bachelor-bachelorette-weekends":
    "https://images.unsplash.com/photo-1758165532022-a68f291317ba",
  "luxury-chicago-getaways":
    "https://images.unsplash.com/photo-1633822059802-079a9eb92498",
  "birthdays-celebrations":
    "https://images.unsplash.com/photo-1774509625509-8c452b51649e",
  "corporate-hospitality":
    "https://images.unsplash.com/photo-1779745227145-67d965135660",
  "nightlife-vip-access":
    "https://images.unsplash.com/photo-1756981168649-0e3c3c8a32f3",
  "custom-group-experiences":
    "https://images.unsplash.com/photo-1774550010075-af560fe7f732",
};

const experiences = EXPERIENCES.map((e) => ({
  slug: e.slug,
  title: e.name,
  sub: e.tagline,
  desc: e.description,
  photo: EXPERIENCE_PHOTOS[e.slug],
}));

function ExperienceCard({
  item,
  index,
}: {
  item: (typeof experiences)[0];
  index: number;
}) {
  const [hov, setHov] = useState(false);
  return (
    <FadeSection delay={index * 0.12}>
      <Link
        href={`/experiences/${item.slug}`}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          display: "block",
          textDecoration: "none",
          position: "relative",
          overflow: "hidden",
          height: 420,
          border: `1px solid ${hov ? "rgba(224,195,142,0.35)" : "rgba(255,255,255,0.08)"}`,
        }}
      >
        <Image
          src={`${item.photo}?q=75&w=900&auto=format&fit=crop`}
          alt={item.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          style={{
            objectFit: "cover",
            transition: "transform 0.6s cubic-bezier(.23,1,.32,1)",
            transform: hov ? "scale(1.06)" : "scale(1)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(to top, ${BLACK} 8%, rgba(4,4,5,0.55) 45%, rgba(4,4,5,0.15) 75%)`,
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            padding: "28px 28px 32px",
          }}
        >
          <div
            style={{
              fontFamily: sans,
              fontSize: 10,
              fontWeight: 400,
              letterSpacing: 3,
              color: GOLD,
              textTransform: "uppercase",
              marginBottom: 10,
            }}
          >
            {item.sub}
          </div>
          <h3
            style={{
              fontFamily: serif,
              fontSize: 24,
              fontWeight: 400,
              color: OFF_WHITE,
              margin: "0 0 14px",
              letterSpacing: 0.3,
              lineHeight: 1.15,
            }}
          >
            {item.title}
          </h3>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              color: GOLD,
              fontFamily: sans,
              fontSize: 11,
              letterSpacing: 2,
              textTransform: "uppercase",
              opacity: hov ? 1 : 0.7,
              transition: "opacity 0.4s",
            }}
          >
            <span>View Experience</span>
            <span
              style={{
                transform: hov ? "translateX(4px)" : "translateX(0)",
                transition: "transform 0.3s",
              }}
            >
              →
            </span>
          </div>
        </div>
      </Link>
    </FadeSection>
  );
}

// ─── Why MICC ───
const pillars = [
  {
    num: "01",
    title: "Chicago Access",
    desc: "Relationships throughout the city help create opportunities that ordinary booking platforms cannot.",
  },
  {
    num: "02",
    title: "One Point of Contact",
    desc: "Instead of coordinating multiple venues, reservations, drivers and schedules, you communicate with one concierge team.",
  },
  {
    num: "03",
    title: "Built Around You",
    desc: "Every itinerary is customized around your group, preferences, budget and reason for visiting.",
  },
  {
    num: "04",
    title: "Handled Start to Finish",
    desc: "We manage the planning, coordination, confirmations and the details that are easy to overlook.",
  },
];

function PillarRow({ item, index }: { item: (typeof pillars)[0]; index: number }) {
  const [hov, setHov] = useState(false);
  return (
    <FadeSection delay={index * 0.1}>
      <div
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "clamp(16px, 4vw, 40px)",
          padding: "40px 0",
          borderBottom: `1px solid rgba(245,245,245,${hov ? 0.08 : 0.04})`,
          cursor: "pointer",
          transition: "all 0.4s ease",
        }}
      >
        <span
          style={{
            fontFamily: serif,
            fontSize: 14,
            color: GOLD,
            opacity: 0.5,
            minWidth: 32,
            flexShrink: 0,
          }}
        >
          {item.num}
        </span>
        <h3
          style={{
            fontFamily: serif,
            fontSize: "clamp(24px, 4vw, 48px)",
            fontWeight: 400,
            color: OFF_WHITE,
            margin: 0,
            minWidth: "clamp(120px, 20vw, 200px)",
            letterSpacing: 1,
            transform: hov ? "translateX(12px)" : "translateX(0)",
            transition: "transform 0.5s cubic-bezier(.23,1,.32,1)",
            flexShrink: 0,
          }}
        >
          {item.title}
        </h3>
        <p
          style={{
            fontFamily: sans,
            fontSize: 14,
            fontWeight: 300,
            color: "rgba(245,245,245,0.45)",
            lineHeight: 1.7,
            margin: 0,
            flex: 1,
            maxWidth: 440,
          }}
        >
          {item.desc}
        </p>
        <span
          style={{
            fontFamily: sans,
            fontSize: 20,
            color: GOLD,
            opacity: hov ? 1 : 0.3,
            transition: "all 0.4s",
            transform: hov ? "translateX(0)" : "translateX(-8px)",
            flexShrink: 0,
          }}
        >
          →
        </span>
      </div>
    </FadeSection>
  );
}

// ─── Stats ───
function StatBar() {
  return (
    <FadeSection>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "clamp(32px, 8vw, 120px)",
          padding: "80px 24px",
          borderTop: "1px solid rgba(245,245,245,0.04)",
          borderBottom: "1px solid rgba(245,245,245,0.04)",
        }}
      >
        {[
          { val: "7", label: "Chicago Neighborhoods" },
          { val: "100%", label: "Custom Itineraries" },
          { val: "1", label: "Point of Contact" },
          { val: "24/7", label: "Concierge Access" },
        ].map((s, i) => (
          <div key={i} style={{ textAlign: "center" }}>
            <div
              style={{
                fontFamily: serif,
                fontSize: "clamp(32px, 5vw, 56px)",
                fontWeight: 400,
                color: GOLD,
                lineHeight: 1,
              }}
            >
              {s.val}
            </div>
            <div
              style={{
                fontFamily: sans,
                fontSize: 10,
                fontWeight: 300,
                letterSpacing: 3,
                color: "rgba(245,245,245,0.4)",
                textTransform: "uppercase",
                marginTop: 12,
              }}
            >
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </FadeSection>
  );
}

// ─── Testimonials ───
const testimonials = [
  {
    quote:
      "MICC handled every reservation, every ride, and every change throughout the weekend. We were able to enjoy Chicago without worrying about the planning.",
    role: "Placeholder — Group Weekend",
  },
  {
    quote:
      "One person to call for the entire trip. Dinners, transportation and timing were all confirmed before we landed.",
    role: "Placeholder — Corporate Visit",
  },
  {
    quote:
      "The itinerary was built around what our group actually wanted, and adjustments were handled quickly.",
    role: "Placeholder — Celebration Weekend",
  },
];

function Testimonials() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setActive((p) => (p + 1) % testimonials.length), 5000);
    return () => clearInterval(t);
  }, []);
  const t = testimonials[active];
  return (
    <FadeSection>
      <div
        style={{
          textAlign: "center",
          padding: "0 24px",
          maxWidth: 700,
          margin: "0 auto",
          minHeight: 220,
        }}
      >
        <div
          style={{
            fontFamily: serif,
            fontSize: 64,
            color: GOLD,
            opacity: 0.2,
            lineHeight: 1,
            marginBottom: -10,
          }}
        >
          &ldquo;
        </div>
        <p
          key={active}
          style={{
            fontFamily: serif,
            fontSize: "clamp(18px, 2.5vw, 24px)",
            fontWeight: 400,
            fontStyle: "italic",
            color: "rgba(245,245,245,0.75)",
            lineHeight: 1.7,
            margin: "0 0 32px",
            animation: "fadeQuote 0.8s ease",
          }}
        >
          {t.quote}
        </p>
        <div
          style={{
            fontFamily: sans,
            fontSize: 11,
            fontWeight: 300,
            color: "rgba(245,245,245,0.35)",
            letterSpacing: 2,
            textTransform: "uppercase",
          }}
        >
          {t.role}
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 32 }}>
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              style={{
                width: i === active ? 32 : 8,
                height: 2,
                background: i === active ? GOLD : "rgba(245,245,245,0.15)",
                border: "none",
                cursor: "pointer",
                transition: "all 0.4s",
                padding: 0,
              }}
            />
          ))}
        </div>
        <p
          style={{
            fontFamily: sans,
            fontSize: 11,
            fontWeight: 300,
            color: "rgba(245,245,245,0.25)",
            marginTop: 28,
          }}
        >
          Placeholder testimonials shown for layout purposes. Verified
          client feedback will replace these prior to launch.
        </p>
      </div>
      <style>{`@keyframes fadeQuote { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }`}</style>
    </FadeSection>
  );
}

// ─── Membership CTA ───
function MembershipCTA() {
  return (
    <FadeSection>
      <div
        style={{
          position: "relative",
          textAlign: "center",
          padding: "100px 24px",
          background: `linear-gradient(180deg, transparent, rgba(212,175,55,0.03) 50%, transparent)`,
        }}
      >
        <div
          style={{
            fontFamily: sans,
            fontSize: 10,
            fontWeight: 300,
            letterSpacing: 5,
            color: WARM,
            textTransform: "uppercase",
            marginBottom: 24,
          }}
        >
          Exclusive Membership
        </div>
        <h2
          style={{
            fontFamily: serif,
            fontSize: "clamp(32px, 5vw, 56px)",
            fontWeight: 400,
            color: OFF_WHITE,
            margin: "0 0 20px",
            lineHeight: 1.15,
          }}
        >
          Your Chicago Concierge,
          <br />
          <span style={{ color: GOLD, fontStyle: "italic" }}>On Retainer</span>
        </h2>
        <p
          style={{
            fontFamily: sans,
            fontSize: 15,
            fontWeight: 300,
            color: "rgba(245,245,245,0.45)",
            maxWidth: 480,
            margin: "0 auto 48px",
            lineHeight: 1.7,
          }}
        >
          For guests who visit Chicago often — priority access, a dedicated
          concierge who already knows you, and preferred rates on every trip.
        </p>
        <GoldButton filled href="/membership">
          Apply for Membership
        </GoldButton>
      </div>
    </FadeSection>
  );
}

// ─── Experience Builder ───
const BUILDER_GROUP_SIZES = ["2 guests", "4–6", "8–12", "12–20", "20+"];

function ExperienceBuilder() {
  const router = useRouter();
  const [occasion, setOccasion] = useState(EXPERIENCES[0].slug);
  const [size, setSize] = useState(BUILDER_GROUP_SIZES[1]);
  const [focus, setFocus] = useState<string[]>([SERVICES[0].slug]);

  function toggleFocus(slug: string) {
    setFocus((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  }

  const occasionName = EXPERIENCES.find((e) => e.slug === occasion)?.name ?? "";
  const focusNames = SERVICES.filter((s) => focus.includes(s.slug)).map((s) => s.name);

  const pillStyle = (active: boolean): React.CSSProperties => ({
    padding: "10px 16px",
    fontFamily: sans,
    fontSize: 12,
    letterSpacing: 0.5,
    color: active ? BLACK : "rgba(239,238,235,0.65)",
    background: active ? GOLD : "transparent",
    border: `1px solid ${active ? GOLD : "rgba(255,255,255,0.14)"}`,
    cursor: "pointer",
    transition: "all 0.25s ease",
    textAlign: "left",
  });

  return (
    <section style={{ padding: "120px clamp(24px,5vw,80px)", maxWidth: 1200, margin: "0 auto" }}>
      <FadeSection>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
          <span
            style={{
              fontFamily: sans,
              fontSize: 10,
              fontWeight: 400,
              letterSpacing: 4,
              color: GOLD,
              textTransform: "uppercase",
            }}
          >
            Experience Builder
          </span>
          <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.1)" }} />
        </div>
        <h2
          style={{
            fontFamily: serif,
            fontSize: "clamp(28px, 4vw, 42px)",
            fontWeight: 300,
            color: OFF_WHITE,
            margin: "0 0 16px",
          }}
        >
          Three quick picks, one clear brief.
        </h2>
        <p
          style={{
            fontFamily: sans,
            fontSize: 14,
            fontWeight: 300,
            color: "rgba(239,238,235,0.5)",
            maxWidth: 560,
            margin: "0 0 56px",
            lineHeight: 1.7,
          }}
        >
          Pick the occasion, the group size and what matters most — we
          carry it straight into your request.
        </p>
      </FadeSection>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.3fr 1fr",
          gap: "clamp(32px, 5vw, 64px)",
        }}
        className="builder-grid"
      >
        <FadeSection delay={0.1}>
          <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
            <div>
              <div style={{ fontFamily: sans, fontSize: 10, letterSpacing: 3, color: WARM, textTransform: "uppercase", marginBottom: 14 }}>
                01 — The Occasion
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 8 }}>
                {EXPERIENCES.map((e) => (
                  <button key={e.slug} type="button" style={pillStyle(occasion === e.slug)} onClick={() => setOccasion(e.slug)}>
                    {e.name}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <div style={{ fontFamily: sans, fontSize: 10, letterSpacing: 3, color: WARM, textTransform: "uppercase", marginBottom: 14 }}>
                02 — Group Size
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {BUILDER_GROUP_SIZES.map((s) => (
                  <button key={s} type="button" style={pillStyle(size === s)} onClick={() => setSize(s)}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <div style={{ fontFamily: sans, fontSize: 10, letterSpacing: 3, color: WARM, textTransform: "uppercase", marginBottom: 14 }}>
                03 — What Matters Most
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 8 }}>
                {SERVICES.map((s) => (
                  <button key={s.slug} type="button" style={pillStyle(focus.includes(s.slug))} onClick={() => toggleFocus(s.slug)}>
                    {s.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </FadeSection>

        <FadeSection delay={0.2}>
          <div
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.08)",
              padding: "clamp(24px,3vw,36px)",
              height: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div style={{ fontFamily: sans, fontSize: 10, letterSpacing: 3, color: WARM, textTransform: "uppercase", marginBottom: 20 }}>
              Your Brief
            </div>
            <p
              style={{
                fontFamily: serif,
                fontSize: 22,
                fontWeight: 300,
                color: OFF_WHITE,
                lineHeight: 1.5,
                margin: 0,
              }}
            >
              {occasionName} in Chicago for {size}
              {focusNames.length > 0 && (
                <>
                  , centered on <span style={{ color: GOLD, fontStyle: "italic" }}>{focusNames.join(", ")}</span>
                </>
              )}
              .
            </p>
            <div style={{ flex: 1 }} />
            <p style={{ fontFamily: sans, fontSize: 12, color: "rgba(239,238,235,0.4)", lineHeight: 1.6, margin: "24px 0" }}>
              We&rsquo;ll carry this straight into your request — you&rsquo;ll
              just need to add dates and how to reach you.
            </p>
            <button
              type="button"
              onClick={() =>
                router.push(
                  `/start?package=${occasion}&size=${encodeURIComponent(size)}&focus=${focus.join(",")}`
                )
              }
              style={{
                background: GOLD,
                color: BLACK,
                border: "none",
                padding: "14px 24px",
                fontFamily: sans,
                fontSize: 12,
                fontWeight: 500,
                letterSpacing: 1.5,
                textTransform: "uppercase",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              Continue With This Brief
              <span>→</span>
            </button>
          </div>
        </FadeSection>
      </div>
    </section>
  );
}

// ─── Services preview ───
function ServicesPreview() {
  return (
    <section style={{ padding: "0 clamp(24px,5vw,80px) 120px", maxWidth: 1200, margin: "0 auto" }}>
      <FadeSection>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <div style={{ fontFamily: sans, fontSize: 10, fontWeight: 300, letterSpacing: 5, color: WARM, textTransform: "uppercase", marginBottom: 16 }}>
            Services
          </div>
          <h2 style={{ fontFamily: serif, fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 300, color: OFF_WHITE, margin: 0 }}>
            What We Coordinate
          </h2>
        </div>
      </FadeSection>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        {SERVICES.map((s, i) => (
          <div
            key={s.slug}
            style={{
              padding: "32px 28px",
              borderRight: "1px solid rgba(255,255,255,0.08)",
              borderBottom: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <div style={{ fontFamily: serif, fontSize: 13, color: GOLD, opacity: 0.6, marginBottom: 12 }}>
              {String(i + 1).padStart(2, "0")}
            </div>
            <h3 style={{ fontFamily: serif, fontSize: 19, fontWeight: 400, color: OFF_WHITE, margin: "0 0 10px" }}>
              {s.name}
            </h3>
            <p style={{ fontFamily: sans, fontSize: 13, fontWeight: 300, color: "rgba(239,238,235,0.45)", lineHeight: 1.7, margin: 0 }}>
              {s.description}
            </p>
          </div>
        ))}
      </div>
      <FadeSection>
        <div style={{ textAlign: "center", marginTop: 48 }}>
          <GoldButton href="/services" style={{ borderColor: "rgba(255,255,255,0.14)", color: "rgba(239,238,235,0.7)" }}>
            View Full Service Detail
          </GoldButton>
        </div>
      </FadeSection>
    </section>
  );
}

// ─── Featured itinerary ───
const ITINERARY_DAYS = [
  {
    day: "Friday",
    photo: "https://images.unsplash.com/photo-1648239131154-3eb89b31c944",
    items: [
      "Private SUV pickup timed to your flight",
      "Early check-in already arranged",
      "A dinner reservation to start the weekend right",
      "A rooftop nightcap to close out the night",
    ],
  },
  {
    day: "Saturday",
    photo: "https://images.unsplash.com/photo-1515963665762-77ef90e624fa",
    items: [
      "Group brunch, no reservations to manage",
      "An afternoon activity picked around your group",
      "A chef-driven dinner",
      "Evening plans with transportation handled between stops",
    ],
  },
  {
    day: "Sunday",
    photo: "https://images.unsplash.com/photo-1669629711648-83248e727c4c",
    items: [
      "A relaxed brunch before heading out",
      "A personalized city experience built into the morning",
      "A private car straight to the airport",
    ],
  },
];

function FeaturedItinerary() {
  return (
    <section style={{ padding: "120px clamp(24px,5vw,80px)", maxWidth: 1200, margin: "0 auto" }}>
      <FadeSection>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <div style={{ fontFamily: sans, fontSize: 10, fontWeight: 300, letterSpacing: 5, color: WARM, textTransform: "uppercase", marginBottom: 16 }}>
            Featured Itinerary
          </div>
          <h2 style={{ fontFamily: serif, fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 300, color: OFF_WHITE, margin: "0 0 16px" }}>
            A Sample Chicago Weekend
          </h2>
          <p style={{ fontFamily: sans, fontSize: 14, fontWeight: 300, color: "rgba(239,238,235,0.5)", maxWidth: 560, margin: "0 auto" }}>
            Here&rsquo;s what a three-day Chicago weekend can look like when
            we build it end to end. Everything shown here can change.
          </p>
        </div>
      </FadeSection>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 24 }}>
        {ITINERARY_DAYS.map((d, i) => (
          <FadeSection key={d.day} delay={i * 0.12}>
            <div style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
              <div style={{ position: "relative", height: 200 }}>
                <Image
                  src={`${d.photo}?q=75&w=700&auto=format&fit=crop`}
                  alt={`${d.day} in Chicago`}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  style={{ objectFit: "cover" }}
                />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(4,4,5,0.4), transparent 60%)" }} />
                <span
                  style={{
                    position: "absolute",
                    top: 16,
                    left: 16,
                    fontFamily: sans,
                    fontSize: 10,
                    letterSpacing: 2,
                    color: GOLD,
                    background: "rgba(4,4,5,0.6)",
                    padding: "4px 10px",
                    textTransform: "uppercase",
                  }}
                >
                  {String(i + 1).padStart(2, "0")} — {d.day}
                </span>
              </div>
              <div style={{ padding: "24px 24px 28px" }}>
                <ol style={{ margin: 0, padding: 0, listStyle: "none" }}>
                  {d.items.map((item, j) => (
                    <li
                      key={item}
                      style={{
                        display: "flex",
                        gap: 10,
                        fontFamily: sans,
                        fontSize: 13,
                        fontWeight: 300,
                        color: "rgba(239,238,235,0.6)",
                        lineHeight: 1.6,
                        marginBottom: j === d.items.length - 1 ? 0 : 12,
                      }}
                    >
                      <span style={{ color: GOLD, flexShrink: 0 }}>{String(j + 1).padStart(2, "0")}</span>
                      {item}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </FadeSection>
        ))}
      </div>
      <FadeSection>
        <p
          style={{
            fontFamily: sans,
            fontSize: 12,
            color: "rgba(239,238,235,0.35)",
            textAlign: "center",
            maxWidth: 620,
            margin: "40px auto 0",
            lineHeight: 1.7,
          }}
        >
          Shown for illustration only — every detail here can be swapped,
          reordered or dropped. All bookings remain subject to availability
          and venue policies.
        </p>
      </FadeSection>
    </section>
  );
}

// ─── Page ───
export default function HomePage() {
  return (
    <div style={{ background: BLACK, color: OFF_WHITE, minHeight: "100vh", overflowX: "hidden" }}>
      <Hero />

      {/* Intro strip */}
      <FadeSection>
        <div
          style={{
            padding: "80px clamp(24px,5vw,80px) 0",
            maxWidth: 760,
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              fontFamily: serif,
              fontSize: "clamp(22px, 3vw, 30px)",
              fontWeight: 400,
              color: OFF_WHITE,
              lineHeight: 1.5,
              margin: 0,
            }}
          >
            One city. One point of contact.{" "}
            <span style={{ color: GOLD, fontStyle: "italic" }}>
              Every detail handled.
            </span>
          </h2>
          <p
            style={{
              fontFamily: sans,
              fontSize: 14,
              fontWeight: 300,
              color: "rgba(245,245,245,0.45)",
              maxWidth: 560,
              margin: "24px auto 0",
              lineHeight: 1.8,
            }}
          >
            MICC Hospitality coordinates each part of your Chicago experience
            through a trusted local network — accommodations, reservations,
            transportation, entertainment and the schedule that holds it
            together. You speak with one team, and the planning,
            confirmations and day-to-day logistics are managed on your
            behalf.
          </p>
        </div>
      </FadeSection>

      {/* Experiences */}
      <section
        id="experiences"
        style={{ padding: "120px clamp(24px,5vw,80px)", maxWidth: 1200, margin: "0 auto" }}
      >
        <FadeSection>
          <div style={{ textAlign: "center", marginBottom: 72 }}>
            <div
              style={{
                fontFamily: sans,
                fontSize: 10,
                fontWeight: 300,
                letterSpacing: 5,
                color: WARM,
                textTransform: "uppercase",
                marginBottom: 16,
              }}
            >
              Experiences
            </div>
            <h2
              style={{
                fontFamily: serif,
                fontSize: "clamp(32px, 5vw, 48px)",
                fontWeight: 400,
                color: OFF_WHITE,
                margin: 0,
              }}
            >
              Planned Around the Reason You&apos;re Here
            </h2>
            <div style={{ marginTop: 24 }}>
              <GoldLine />
            </div>
          </div>
        </FadeSection>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
            gap: 24,
          }}
        >
          {experiences.map((e, i) => (
            <ExperienceCard key={i} item={e} index={i} />
          ))}
        </div>
      </section>

      <ExperienceBuilder />

      <ServicesPreview />

      <StatBar />

      {/* Pillars */}
      <section
        id="pillars"
        style={{ padding: "120px clamp(24px,5vw,80px)", maxWidth: 1000, margin: "0 auto" }}
      >
        <FadeSection>
          <div style={{ textAlign: "center", marginBottom: 72 }}>
            <div
              style={{
                fontFamily: sans,
                fontSize: 10,
                fontWeight: 300,
                letterSpacing: 5,
                color: WARM,
                textTransform: "uppercase",
                marginBottom: 16,
              }}
            >
              Why MICC
            </div>
            <h2
              style={{
                fontFamily: serif,
                fontSize: "clamp(32px, 5vw, 48px)",
                fontWeight: 400,
                color: OFF_WHITE,
                margin: 0,
              }}
            >
              Access, Coordination and Judgment
            </h2>
            <div style={{ marginTop: 24 }}>
              <GoldLine />
            </div>
          </div>
        </FadeSection>
        {pillars.map((p, i) => (
          <PillarRow key={i} item={p} index={i} />
        ))}
        <FadeSection>
          <p
            style={{
              fontFamily: sans,
              fontSize: 12,
              color: "rgba(239,238,235,0.35)",
              textAlign: "center",
              maxWidth: 640,
              margin: "48px auto 0",
              lineHeight: 1.7,
            }}
          >
            Every booking depends on availability, venue policy, capacity,
            ID and age requirements, and management approval — nothing is
            guaranteed until a reservation is actually confirmed.
          </p>
        </FadeSection>
      </section>

      {/* How It Works — summary */}
      <section style={{ padding: "0 clamp(24px,5vw,80px) 120px", maxWidth: 1100, margin: "0 auto" }}>
        <FadeSection>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <div
              style={{
                fontFamily: sans,
                fontSize: 10,
                fontWeight: 300,
                letterSpacing: 5,
                color: WARM,
                textTransform: "uppercase",
                marginBottom: 16,
              }}
            >
              How It Works
            </div>
            <h2
              style={{
                fontFamily: serif,
                fontSize: "clamp(28px, 4vw, 40px)",
                fontWeight: 400,
                color: OFF_WHITE,
                margin: 0,
              }}
            >
              Four Steps, Start to Finish
            </h2>
          </div>
        </FadeSection>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 32,
          }}
        >
          {[
            { num: "01", title: "Tell Us About Your Trip", desc: "Share the dates, group size, preferences, budget and the type of experience you have in mind." },
            { num: "02", title: "We Design the Experience", desc: "We create a personalized plan using our Chicago hospitality network and the priorities you gave us." },
            { num: "03", title: "Review and Confirm", desc: "You review the proposed itinerary, pricing and included services, and we adjust until it's right." },
            { num: "04", title: "Arrive and Enjoy", desc: "We coordinate the details so your group can focus on the experience rather than the logistics." },
          ].map((step, i) => (
            <FadeSection key={step.num} delay={i * 0.1}>
              <div>
                <div style={{ fontFamily: serif, fontSize: 32, color: GOLD, opacity: 0.5, marginBottom: 12 }}>
                  {step.num}
                </div>
                <h3 style={{ fontFamily: serif, fontSize: 19, fontWeight: 500, color: OFF_WHITE, margin: "0 0 10px" }}>
                  {step.title}
                </h3>
                <p style={{ fontFamily: sans, fontSize: 13, fontWeight: 300, color: "rgba(245,245,245,0.45)", lineHeight: 1.7, margin: 0 }}>
                  {step.desc}
                </p>
              </div>
            </FadeSection>
          ))}
        </div>
        <FadeSection>
          <div style={{ textAlign: "center", marginTop: 56 }}>
            <GoldButton href="/how-it-works" style={{ borderColor: "rgba(245,245,245,0.2)", color: "rgba(245,245,245,0.7)" }}>
              See the Full Process
            </GoldButton>
          </div>
        </FadeSection>
      </section>

      <FeaturedItinerary />

      {/* Neighborhoods */}
      <FadeSection>
        <div
          style={{
            padding: "0 clamp(24px,5vw,80px) 120px",
            maxWidth: 900,
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontFamily: sans,
              fontSize: 10,
              fontWeight: 300,
              letterSpacing: 5,
              color: WARM,
              textTransform: "uppercase",
              marginBottom: 20,
            }}
          >
            The City
          </div>
          <h2
            style={{
              fontFamily: serif,
              fontSize: "clamp(24px, 3.5vw, 36px)",
              fontWeight: 400,
              color: OFF_WHITE,
              margin: "0 0 32px",
            }}
          >
            Chicago, Mapped to Your Itinerary
          </h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
            {NEIGHBORHOODS.map((n) => (
              <span
                key={n}
                style={{
                  fontFamily: sans,
                  fontSize: 11,
                  letterSpacing: 2,
                  textTransform: "uppercase",
                  color: "rgba(245,245,245,0.55)",
                  border: "1px solid rgba(245,245,245,0.1)",
                  padding: "8px 18px",
                }}
              >
                {n}
              </span>
            ))}
          </div>
        </div>
      </FadeSection>

      {/* Testimonials */}
      <section style={{ padding: "120px 24px", maxWidth: 1200, margin: "0 auto" }}>
        <FadeSection>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div
              style={{
                fontFamily: sans,
                fontSize: 10,
                fontWeight: 300,
                letterSpacing: 5,
                color: WARM,
                textTransform: "uppercase",
                marginBottom: 16,
              }}
            >
              Client Voices
            </div>
            <h2
              style={{
                fontFamily: serif,
                fontSize: "clamp(28px, 4vw, 40px)",
                fontWeight: 400,
                color: OFF_WHITE,
                margin: 0,
              }}
            >
              Words of Distinction
            </h2>
          </div>
        </FadeSection>
        <Testimonials />
      </section>

      {/* Membership */}
      <section id="membership">
        <MembershipCTA />
      </section>

      <PhotoCtaBand
        heading="Your Chicago experience starts here."
        body="Tell us what you're planning. We'll take care of the details."
      />

      {/* Sticky inquiry bar */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 90,
          background: "rgba(0,0,0,0.9)",
          backdropFilter: "blur(16px)",
          borderTop: "1px solid rgba(212,175,55,0.1)",
          padding: "12px clamp(24px,5vw,80px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
        }}
      >
        <span
          style={{
            fontFamily: sans,
            fontSize: 13,
            fontWeight: 300,
            color: "rgba(245,245,245,0.5)",
            letterSpacing: 1,
          }}
        >
          Your Chicago experience starts here.
        </span>
        <GoldButton href="/start" style={{ padding: "10px 32px", fontSize: 11 }}>
          Start Planning
        </GoldButton>
      </div>
    </div>
  );
}
