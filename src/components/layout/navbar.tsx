"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { NAV_LINKS } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { MobileMenu } from "./mobile-menu";
import { Menu } from "lucide-react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-dark/95 backdrop-blur-md border-b border-dark-border"
            : "bg-transparent"
        )}
      >
        <Container>
          <nav className="flex items-center justify-between h-16 sm:h-20">
            <Link
              href="/"
              className="font-display text-2xl sm:text-3xl font-bold tracking-wider text-gold"
            >
              MICC
            </Link>

            <div className="hidden md:flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-foreground/70 hover:text-gold transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <Link href="/request" className="hidden sm:block">
                <Button size="sm">Request Concierge</Button>
              </Link>
              <button
                className="md:hidden text-foreground p-2"
                onClick={() => setMobileOpen(true)}
                aria-label="Open menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </nav>
        </Container>
      </header>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
