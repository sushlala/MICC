"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowUp } from "lucide-react";

export function CtaFloat() {
  const [visible, setVisible] = useState(false);
  const pathname = usePathname();

  const isRequestPage = pathname.startsWith("/request");

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (isRequestPage) return null;

  return (
    <div
      className={cn(
        "fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 transition-all duration-300",
        visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-4 pointer-events-none"
      )}
    >
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="w-10 h-10 rounded-full bg-dark-card border border-dark-border flex items-center justify-center text-dark-muted hover:text-gold hover:border-gold/50 transition-colors"
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-4 h-4" />
      </button>
      <Link href="/request">
        <Button size="sm" className="shadow-xl shadow-gold/20">
          Request Concierge
        </Button>
      </Link>
    </div>
  );
}
