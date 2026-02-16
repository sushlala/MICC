"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Concierge", href: "/concierge" },
  { label: "Experiences", href: "/experiences" },
  { label: "Packages", href: "/packages" },
  { label: "About", href: "/about" },
];

const SMS_HREF = "sms:+1XXXXXXXXXX";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
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
      {/* ── Desktop + Mobile Header ── */}
      <header
        className={cn(
          "sticky top-0 z-[100] h-[72px] flex items-center transition-all duration-300",
          "border-b border-[rgba(201,169,110,0.15)]",
          scrolled
            ? "bg-[rgba(13,27,42,0.9)] backdrop-blur-[12px]"
            : "bg-[var(--navy)]"
        )}
      >
        <div className="w-full max-w-[var(--container-max)] mx-auto px-[var(--container-pad)] flex items-center justify-between">
          {/* Wordmark */}
          <Link
            href="/"
            className="font-display text-[1.4rem] tracking-wider"
            style={{ color: "var(--beige)" }}
          >
            MICC
          </Link>

          {/* Center nav — desktop */}
          <nav className="hidden md:flex items-center gap-10">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[0.85rem] font-sans font-medium tracking-[0.12em] uppercase transition-colors duration-200 hover:text-[var(--beige)]"
                style={{
                  color: "var(--cream)",
                  fontVariant: "small-caps",
                }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right side — desktop CTA + mobile hamburger */}
          <div className="flex items-center gap-4">
            <a
              href={SMS_HREF}
              className="btn-primary hidden md:inline-block text-[0.8rem]"
            >
              Text Your Concierge
            </a>

            {/* Hamburger — mobile */}
            <button
              className="md:hidden flex flex-col justify-center gap-[5px] p-2"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <span className="block w-6 h-[2px] bg-[var(--beige)]" />
              <span className="block w-6 h-[2px] bg-[var(--beige)]" />
              <span className="block w-6 h-[2px] bg-[var(--beige)]" />
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile Overlay ── */}
      <div
        className={cn(
          "fixed inset-0 z-[200] bg-[var(--navy)] flex flex-col items-center justify-center transition-all duration-300 md:hidden",
          mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
      >
        {/* Close button */}
        <button
          className="absolute top-5 right-5 p-2"
          style={{ color: "var(--cream)" }}
          onClick={() => setMobileOpen(false)}
          aria-label="Close menu"
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Wordmark */}
        <Link
          href="/"
          className="font-display text-4xl tracking-wider mb-14"
          style={{ color: "var(--beige)" }}
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
              className="font-display text-[1.8rem] transition-colors duration-200 hover:text-[var(--beige)]"
              style={{ color: "var(--cream)" }}
              onClick={() => setMobileOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* ── Mobile Bottom Sticky CTA ── */}
      <div className="fixed bottom-0 left-0 right-0 z-[150] md:hidden p-3 bg-[var(--navy)] border-t border-[rgba(201,169,110,0.15)]">
        <a
          href={SMS_HREF}
          className="btn-primary block w-full text-center text-[0.85rem]"
        >
          Text Your Concierge &rarr;
        </a>
      </div>
    </>
  );
}
