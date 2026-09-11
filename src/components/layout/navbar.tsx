"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const GOLD = "#D4AF37";
const OFF_WHITE = "#F5F5F5";

const NAV_ITEMS = [
  { label: "Experiences", href: "/#experiences" },
  { label: "Pillars", href: "/#pillars" },
  { label: "Membership", href: "/membership" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-[100] h-[72px] flex items-center transition-all duration-500",
          scrolled
            ? "bg-[rgba(0,0,0,0.85)] backdrop-blur-[18px] border-b border-[rgba(212,175,55,0.12)]"
            : "bg-transparent border-b border-transparent"
        )}
      >
        <div className="w-full max-w-[var(--container-max)] mx-auto px-[var(--container-pad)] flex items-center justify-between">
          {/* Wordmark */}
          <Link href="/" className="flex items-center gap-2.5">
            <span
              className="font-display text-[1.4rem] tracking-[0.2em] font-semibold"
              style={{ color: GOLD }}
            >
              MICC
            </span>
            <span
              className="font-sans text-[0.6rem] font-light tracking-[0.35em] uppercase hidden sm:block"
              style={{ color: "rgba(245,245,245,0.45)" }}
            >
              Hospitality
            </span>
          </Link>

          {/* Center nav — desktop */}
          <nav className="hidden md:flex items-center gap-9">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="font-sans text-[0.7rem] font-normal tracking-[0.2em] uppercase transition-colors duration-300"
                style={{ color: "rgba(245,245,245,0.7)", textDecoration: "none" }}
                onMouseEnter={(e) => ((e.target as HTMLElement).style.color = GOLD)}
                onMouseLeave={(e) =>
                  ((e.target as HTMLElement).style.color = "rgba(245,245,245,0.7)")
                }
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-4">
            {/* Inquire button — desktop */}
            <Link
              href="/request"
              className="hidden md:inline-block font-sans text-[0.7rem] font-medium tracking-[0.2em] uppercase transition-all duration-300 px-7 py-[10px]"
              style={{
                border: `1px solid ${GOLD}`,
                color: GOLD,
                background: "transparent",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.background = GOLD;
                el.style.color = "#000";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.background = "transparent";
                el.style.color = GOLD;
              }}
            >
              Inquire
            </Link>

            {/* Hamburger — mobile */}
            <button
              className="md:hidden flex flex-col justify-center gap-[5px] p-2"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <span className="block w-6 h-[1px]" style={{ background: GOLD }} />
              <span className="block w-6 h-[1px]" style={{ background: GOLD }} />
              <span className="block w-4 h-[1px]" style={{ background: GOLD }} />
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile Overlay ── */}
      <div
        className={cn(
          "fixed inset-0 z-[200] flex flex-col items-center justify-center transition-all duration-300 md:hidden",
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        style={{ background: "#000" }}
      >
        {/* Close button */}
        <button
          className="absolute top-5 right-5 p-2"
          style={{ color: OFF_WHITE }}
          onClick={() => setMobileOpen(false)}
          aria-label="Close menu"
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Wordmark */}
        <Link
          href="/"
          className="font-display text-4xl tracking-[0.2em] font-semibold mb-14"
          style={{ color: GOLD }}
          onClick={() => setMobileOpen(false)}
        >
          MICC
        </Link>

        {/* Links */}
        <nav className="flex flex-col items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-display text-[1.8rem] transition-colors duration-200"
              style={{ color: OFF_WHITE, textDecoration: "none" }}
              onClick={() => setMobileOpen(false)}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = GOLD)}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.color = OFF_WHITE)}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/request"
            className="font-sans text-[0.75rem] tracking-[0.2em] uppercase mt-4 px-10 py-3"
            style={{ border: `1px solid ${GOLD}`, color: GOLD, textDecoration: "none" }}
            onClick={() => setMobileOpen(false)}
          >
            Inquire
          </Link>
        </nav>
      </div>
    </>
  );
}
