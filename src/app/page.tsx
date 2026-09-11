"use client";

import { useState, useEffect, useRef, type ReactNode } from "react";
import Link from "next/link";

// ─── Color tokens ───
const GOLD = "#D4AF37";
const WARM = "#B89778";
const OFF_WHITE = "#F5F5F5";
const CHARCOAL = "#1A1A1A";
const BLACK = "#000000";
const DARK_CARD = "rgba(26,26,26,0.65)";

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
function Hero({ onInquiry }: { onInquiry: () => void }) {
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
        background: `linear-gradient(135deg, ${BLACK} 0%, #0a0a0a 40%, #111 100%)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Ambient glow */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "50%",
          width: "120vw",
          height: "80vh",
          transform: "translateX(-50%)",
          background: `radial-gradient(ellipse at center, rgba(212,175,55,0.05) 0%, transparent 70%)`,
          pointerEvents: "none",
        }}
      />
      {/* Subtle grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.03,
          backgroundImage: `linear-gradient(rgba(212,175,55,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,0.3) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "80px 24px",
          textAlign: "center",
        }}
      >
        {/* Eyebrow */}
        <div
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(24px)",
            transition: "all 1.2s cubic-bezier(.23,1,.32,1) 0.3s",
          }}
        >
          <div
            style={{
              fontFamily: sans,
              fontSize: 11,
              fontWeight: 300,
              letterSpacing: 6,
              color: GOLD,
              textTransform: "uppercase",
              marginBottom: 32,
            }}
          >
            Curated Luxury, On Demand
          </div>
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
              fontWeight: 400,
              color: OFF_WHITE,
              lineHeight: 1.05,
              margin: 0,
              letterSpacing: -1,
            }}
          >
            Your World,
            <br />
            <span style={{ fontStyle: "italic", color: GOLD }}>Elevated</span>
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
              color: "rgba(245,245,245,0.55)",
              maxWidth: 520,
              margin: "32px auto 48px",
              lineHeight: 1.7,
              letterSpacing: 0.5,
            }}
          >
            Exclusive nightlife access. Luxury travel. Bespoke event production.
            One concierge for every elevated experience.
          </p>
        </div>

        {/* CTAs */}
        <div
          style={{
            opacity: loaded ? 1 : 0,
            transition: "opacity 1.2s cubic-bezier(.23,1,.32,1) 1.2s",
            display: "flex",
            gap: 20,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <GoldButton onClick={onInquiry}>Request Access</GoldButton>
          <GoldButton
            href="#experiences"
            style={{ borderColor: "rgba(245,245,245,0.2)", color: "rgba(245,245,245,0.7)" }}
          >
            Explore Experiences
          </GoldButton>
        </div>
      </div>

      {/* Bottom fade */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 180,
          background: `linear-gradient(transparent, ${BLACK})`,
          pointerEvents: "none",
        }}
      />

      {/* Scroll indicator */}
      <div
        style={{
          position: "absolute",
          bottom: 40,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
          opacity: loaded ? 0.4 : 0,
          transition: "opacity 1.5s ease 1.8s",
        }}
      >
        <div style={{ width: 1, height: 40, background: `linear-gradient(transparent, ${GOLD})` }} />
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
const experiences = [
  {
    title: "Nightlife Access",
    sub: "VIP Tables & Bottle Service",
    desc: "Skip the line. Own the room. Exclusive reservations at the most sought-after venues worldwide.",
    icon: "★",
  },
  {
    title: "Luxury Travel",
    sub: "Private Jets & Curated Stays",
    desc: "From penthouse suites to private islands — travel designed for those who expect the extraordinary.",
    icon: "✦",
  },
  {
    title: "Event Production",
    sub: "Bespoke Experiences",
    desc: "Immersive events crafted with cinematic precision. Lighting, sound, and atmosphere perfected.",
    icon: "◆",
  },
  {
    title: "Content & Media",
    sub: "Premium Visual Storytelling",
    desc: "Elevate your brand with luxury-grade photography, videography, and creative direction.",
    icon: "▲",
  },
  {
    title: "Lighting & Sound",
    sub: "Immersive Atmosphere Design",
    desc: "Transform any space into a sensory world. Custom lighting installations and pristine audio engineering for unforgettable ambiance.",
    icon: "◈",
  },
  {
    title: "Lifestyle Management",
    sub: "Personal Concierge Services",
    desc: "One dedicated point of contact for every need. Reservations, personal shopping, logistics — handled with precision and absolute discretion.",
    icon: "⬡",
  },
];

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
      <div
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          background: hov ? "rgba(212,175,55,0.06)" : DARK_CARD,
          border: `1px solid ${hov ? "rgba(212,175,55,0.3)" : "rgba(245,245,245,0.06)"}`,
          backdropFilter: "blur(20px)",
          padding: "48px 36px",
          transition: "all 0.5s cubic-bezier(.23,1,.32,1)",
          cursor: "pointer",
          position: "relative",
          overflow: "hidden",
          height: "100%",
        }}
      >
        {/* Corner accent */}
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: hov ? 60 : 40,
            height: hov ? 60 : 40,
            borderTop: `1px solid ${GOLD}`,
            borderRight: `1px solid ${GOLD}`,
            transition: "all 0.5s ease",
            opacity: hov ? 0.8 : 0.3,
          }}
        />
        <div
          style={{ fontFamily: serif, fontSize: 28, color: GOLD, marginBottom: 20, opacity: 0.7 }}
        >
          {item.icon}
        </div>
        <div
          style={{
            fontFamily: sans,
            fontSize: 10,
            fontWeight: 400,
            letterSpacing: 3,
            color: WARM,
            textTransform: "uppercase",
            marginBottom: 8,
          }}
        >
          {item.sub}
        </div>
        <h3
          style={{
            fontFamily: serif,
            fontSize: 26,
            fontWeight: 500,
            color: OFF_WHITE,
            margin: "0 0 16px",
            letterSpacing: 0.5,
          }}
        >
          {item.title}
        </h3>
        <p
          style={{
            fontFamily: sans,
            fontSize: 14,
            fontWeight: 300,
            color: "rgba(245,245,245,0.5)",
            lineHeight: 1.7,
            margin: 0,
          }}
        >
          {item.desc}
        </p>
        <div
          style={{
            marginTop: 28,
            display: "flex",
            alignItems: "center",
            gap: 8,
            color: GOLD,
            fontFamily: sans,
            fontSize: 11,
            letterSpacing: 2,
            textTransform: "uppercase",
            opacity: hov ? 1 : 0.5,
            transition: "opacity 0.4s",
          }}
        >
          <span>Discover</span>
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
    </FadeSection>
  );
}

// ─── Pillars ───
const pillars = [
  {
    num: "01",
    title: "Access",
    desc: "Doors open that others don't know exist. The most exclusive venues, tables, and experiences — curated and confirmed.",
  },
  {
    num: "02",
    title: "Production",
    desc: "Every detail orchestrated. Lighting. Sound. Atmosphere. We don't plan events — we engineer moments.",
  },
  {
    num: "03",
    title: "Media",
    desc: "Your story told through a luxury lens. Content creation, creative direction, and visual identity that commands attention.",
  },
  {
    num: "04",
    title: "Concierge",
    desc: "One point of contact for everything. Travel, reservations, logistics — handled with precision and discretion.",
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
          { val: "500+", label: "Exclusive Events" },
          { val: "12", label: "Major Cities" },
          { val: "100%", label: "Invitation Only" },
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
      "MICC turned our product launch into an experience people are still talking about. The attention to detail was otherworldly.",
    name: "Alexis R.",
    role: "Brand Director",
  },
  {
    quote:
      "I've worked with concierge services globally. MICC operates at a different altitude entirely.",
    name: "James T.",
    role: "Private Client",
  },
  {
    quote: "From the venue to the lighting to the guest list — flawless. They don't miss.",
    name: "Priya K.",
    role: "Event Planner",
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
            fontSize: 12,
            fontWeight: 500,
            letterSpacing: 2,
            color: GOLD,
            textTransform: "uppercase",
          }}
        >
          {t.name}
        </div>
        <div
          style={{
            fontFamily: sans,
            fontSize: 11,
            fontWeight: 300,
            color: "rgba(245,245,245,0.35)",
            marginTop: 4,
            letterSpacing: 1,
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
          The Inner Circle
          <br />
          <span style={{ color: GOLD, fontStyle: "italic" }}>Awaits</span>
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
          Priority access. Dedicated concierge. Invitations to events the world never sees.
          Membership is by application only.
        </p>
        <GoldButton filled href="/membership">
          Apply for Membership
        </GoldButton>
      </div>
    </FadeSection>
  );
}

// ─── Inquiry Modal ───
function InquiryModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 300,
        background: "rgba(0,0,0,0.85)",
        backdropFilter: "blur(20px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        animation: "fadeIn 0.4s ease",
        padding: "24px",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: CHARCOAL,
          border: `1px solid rgba(212,175,55,0.15)`,
          padding: "clamp(32px, 5vw, 56px) clamp(24px, 5vw, 48px)",
          width: "100%",
          maxWidth: 480,
        }}
      >
        <div
          style={{
            fontFamily: sans,
            fontSize: 10,
            letterSpacing: 4,
            color: GOLD,
            textTransform: "uppercase",
            marginBottom: 12,
          }}
        >
          Private Inquiry
        </div>
        <h3
          style={{
            fontFamily: serif,
            fontSize: 28,
            color: OFF_WHITE,
            margin: "0 0 32px",
            fontWeight: 400,
          }}
        >
          Tell Us What You Need
        </h3>
        {(["Your Name", "Email", "Phone"] as const).map((placeholder, i) => (
          <input
            key={i}
            placeholder={placeholder}
            style={{
              width: "100%",
              background: "rgba(0,0,0,0.4)",
              border: "1px solid rgba(245,245,245,0.08)",
              color: OFF_WHITE,
              padding: "14px 16px",
              fontFamily: sans,
              fontSize: 14,
              marginBottom: 16,
              outline: "none",
              boxSizing: "border-box",
              transition: "border-color 0.3s",
            }}
            onFocus={(e) => (e.target.style.borderColor = "rgba(212,175,55,0.4)")}
            onBlur={(e) => (e.target.style.borderColor = "rgba(245,245,245,0.08)")}
          />
        ))}
        <select
          style={{
            width: "100%",
            background: "rgba(0,0,0,0.4)",
            border: "1px solid rgba(245,245,245,0.08)",
            color: "rgba(245,245,245,0.5)",
            padding: "14px 16px",
            fontFamily: sans,
            fontSize: 14,
            marginBottom: 16,
            outline: "none",
            boxSizing: "border-box",
            appearance: "none",
          }}
        >
          <option>Select Service</option>
          <option>Nightlife &amp; VIP Access</option>
          <option>Luxury Travel</option>
          <option>Event Production</option>
          <option>Content &amp; Media</option>
          <option>Full Concierge</option>
        </select>
        <textarea
          placeholder="Tell us about your vision..."
          rows={3}
          style={{
            width: "100%",
            background: "rgba(0,0,0,0.4)",
            border: "1px solid rgba(245,245,245,0.08)",
            color: OFF_WHITE,
            padding: "14px 16px",
            fontFamily: sans,
            fontSize: 14,
            resize: "vertical",
            marginBottom: 24,
            outline: "none",
            boxSizing: "border-box",
          }}
        />
        <GoldButton filled style={{ width: "100%", padding: "14px 40px" }}>
          Submit Inquiry
        </GoldButton>
        <p
          style={{
            fontFamily: sans,
            fontSize: 11,
            color: "rgba(245,245,245,0.25)",
            textAlign: "center",
            marginTop: 16,
            letterSpacing: 0.5,
          }}
        >
          All inquiries are confidential. Response within 24 hours.
        </p>
      </div>
      <style>{`@keyframes fadeIn { from { opacity:0; } to { opacity:1; } }`}</style>
    </div>
  );
}

// ─── Page ───
export default function HomePage() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div style={{ background: BLACK, color: OFF_WHITE, minHeight: "100vh", overflowX: "hidden" }}>
      <Hero onInquiry={() => setModalOpen(true)} />

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
              What We Curate
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
              Featured Experiences
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
              The Foundation
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
              Our Pillars
            </h2>
            <div style={{ marginTop: 24 }}>
              <GoldLine />
            </div>
          </div>
        </FadeSection>
        {pillars.map((p, i) => (
          <PillarRow key={i} item={p} index={i} />
        ))}
      </section>

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

      <InquiryModal open={modalOpen} onClose={() => setModalOpen(false)} />

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
          Ready for something extraordinary?
        </span>
        <GoldButton onClick={() => setModalOpen(true)} style={{ padding: "10px 32px", fontSize: 11 }}>
          Curated Access Awaits
        </GoldButton>
      </div>
    </div>
  );
}
