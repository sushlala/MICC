"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import type { HeroProps } from "@/types/components";

export function Hero({
  images,
  headline,
  highlightedText,
  subheadline,
  ctas,
  intervalMs = 6000,
}: HeroProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const advance = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(advance, intervalMs);
    return () => clearInterval(timer);
  }, [advance, intervalMs, images.length]);

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-label="Hero"
    >
      {/* Rotating background images */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={activeIndex}
          className="absolute inset-0 z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          <Image
            src={images[activeIndex].src}
            alt={images[activeIndex].alt}
            fill
            className="object-cover"
            priority={activeIndex === 0}
            sizes="100vw"
          />
        </motion.div>
      </AnimatePresence>

      {/* Overlay */}
      <div className="absolute inset-0 z-1 bg-gradient-to-b from-dark/60 via-dark/80 to-dark" />
      <div className="absolute inset-0 z-1 bg-[radial-gradient(ellipse_at_center,_var(--color-gold)_0%,_transparent_70%)] opacity-[0.07]" />

      {/* Content */}
      <Container className="relative z-10 text-center py-32">
        <motion.p
          className="text-gold text-sm sm:text-base font-medium tracking-[0.3em] uppercase mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Luxury Concierge Platform
        </motion.p>
        <motion.h1
          className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.1] mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          {headline}
          <br />
          <span className="text-gold">{highlightedText}</span>
        </motion.h1>
        <motion.p
          className="text-lg sm:text-xl text-dark-muted max-w-2xl mx-auto mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          {subheadline}
        </motion.p>
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          {ctas.map((cta) => (
            <Link key={cta.label} href={cta.href}>
              <Button size="lg" variant={cta.variant ?? "primary"}>
                {cta.label}
              </Button>
            </Link>
          ))}
        </motion.div>
      </Container>

      {/* Gallery position indicators */}
      {images.length > 1 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === activeIndex ? "bg-gold w-6" : "bg-foreground/30 w-2"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      )}

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark to-transparent z-2" />
    </section>
  );
}
