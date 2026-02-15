"use client";

import { useEffect } from "react";
import Link from "next/link";
import { NAV_LINKS } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
};

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div
      className={cn(
        "fixed inset-0 z-[60] bg-dark/98 backdrop-blur-lg transition-all duration-300 md:hidden",
        open
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      )}
    >
      <div className="flex flex-col items-center justify-center h-full">
        <button
          className="absolute top-5 right-5 text-foreground p-2"
          onClick={onClose}
          aria-label="Close menu"
        >
          <X className="w-7 h-7" />
        </button>

        <Link
          href="/"
          className="font-display text-4xl font-bold tracking-wider text-gold mb-12"
          onClick={onClose}
        >
          MICC
        </Link>

        <nav className="flex flex-col items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xl text-foreground/80 hover:text-gold transition-colors"
              onClick={onClose}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/request" onClick={onClose}>
            <Button size="lg" className="mt-4">
              Request Concierge
            </Button>
          </Link>
        </nav>
      </div>
    </div>
  );
}
