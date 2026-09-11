"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";

interface MembershipHeroProps {
  eyebrow: string;
  headline: string;
  subheadline: string;
}

export function MembershipHero({
  eyebrow,
  headline,
  subheadline,
}: MembershipHeroProps) {
  return (
    <section
      className="relative pt-32 pb-20 sm:pt-40 sm:pb-24 overflow-hidden"
      aria-label="Membership"
    >
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />
      <Container className="relative z-10">
        <div className="max-w-3xl">
          <motion.p
            className="text-gold text-xs font-medium tracking-[0.2em] uppercase mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            {eyebrow}
          </motion.p>
          <motion.h1
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-light leading-[1.1] mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            {headline}
          </motion.h1>
          <motion.p
            className="text-dark-muted text-lg max-w-xl leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            {subheadline}
          </motion.p>
        </div>
      </Container>
    </section>
  );
}
