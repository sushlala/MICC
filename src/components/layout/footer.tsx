"use client";

import Link from "next/link";

const GOLD = "#D4AF37";
const WARM = "#B89778";
const OFF_WHITE = "#F5F5F5";

const FOOTER_COLS = [
  {
    title: "Services",
    links: [
      { label: "Hotels & Accommodations", href: "/services/hotels-accommodations" },
      { label: "Dining Reservations", href: "/services/dining-reservations" },
      { label: "Nightlife & VIP Tables", href: "/services/nightlife-vip-tables" },
      { label: "All Services", href: "/services" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "How It Works", href: "/how-it-works" },
      { label: "Membership", href: "/membership" },
      { label: "FAQ", href: "/faq" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "Instagram", href: "https://instagram.com/micchospitality", external: true },
      { label: "LinkedIn", href: "#" },
      { label: "Contact", href: "/start" },
      { label: "Press", href: "#" },
    ],
  },
];

export function Footer() {
  return (
    <footer
      style={{
        background: "#000",
        borderTop: "1px solid rgba(245,245,245,0.04)",
        padding: "80px clamp(24px,5vw,80px) 40px",
      }}
    >
      {/* Top grid */}
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 48,
          marginBottom: 64,
        }}
      >
        {/* Brand */}
        <div>
          <Link href="/" style={{ textDecoration: "none" }}>
            <div
              className="font-display"
              style={{
                fontSize: 24,
                fontWeight: 600,
                color: GOLD,
                letterSpacing: "0.2em",
                marginBottom: 8,
              }}
            >
              MICC
            </div>
          </Link>
          <div
            className="font-sans"
            style={{
              fontSize: 11,
              color: "rgba(245,245,245,0.35)",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}
          >
            Hospitality
          </div>
          <p
            className="font-sans"
            style={{
              fontSize: 13,
              color: "rgba(245,245,245,0.3)",
              maxWidth: 280,
              marginTop: 16,
              lineHeight: 1.7,
            }}
          >
            Private concierge for Chicago — one point of contact for hotels,
            dining, nightlife, transportation and every detail in between.
          </p>
        </div>

        {/* Link columns */}
        <div style={{ display: "flex", gap: "clamp(32px, 6vw, 64px)", flexWrap: "wrap" }}>
          {FOOTER_COLS.map((col) => (
            <div key={col.title}>
              <div
                className="font-sans"
                style={{
                  fontSize: 10,
                  fontWeight: 500,
                  letterSpacing: "0.3em",
                  color: GOLD,
                  textTransform: "uppercase",
                  marginBottom: 20,
                }}
              >
                {col.title}
              </div>
              {col.links.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  target={"external" in link && link.external ? "_blank" : undefined}
                  rel={"external" in link && link.external ? "noopener noreferrer" : undefined}
                  style={{
                    display: "block",
                    fontFamily: "var(--font-sans)",
                    fontSize: 13,
                    fontWeight: 300,
                    color: "rgba(245,245,245,0.4)",
                    textDecoration: "none",
                    marginBottom: 12,
                    transition: "color 0.3s",
                  }}
                  onMouseEnter={(e) =>
                    ((e.target as HTMLElement).style.color = OFF_WHITE)
                  }
                  onMouseLeave={(e) =>
                    ((e.target as HTMLElement).style.color = "rgba(245,245,245,0.4)")
                  }
                >
                  {link.label}
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          height: 1,
          background: `linear-gradient(90deg, transparent, ${WARM}, transparent)`,
          opacity: 0.3,
        }}
      />

      {/* Bottom bar */}
      <div
        style={{
          maxWidth: 1200,
          margin: "32px auto 0",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
        }}
      >
        <p
          className="font-sans"
          style={{ fontSize: 11, color: "rgba(245,245,245,0.2)", letterSpacing: "0.05em" }}
        >
          &copy; 2026 MICC Hospitality. All rights reserved.
        </p>
        <div className="flex items-center gap-4">
          {["Privacy", "Terms"].map((label) => (
            <Link
              key={label}
              href="#"
              className="font-sans text-[11px] transition-colors duration-200"
              style={{ color: "rgba(245,245,245,0.2)", textDecoration: "none" }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = GOLD)}
              onMouseLeave={(e) =>
                ((e.target as HTMLElement).style.color = "rgba(245,245,245,0.2)")
              }
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
