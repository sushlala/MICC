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
      className="relative pt-40 pb-20 overflow-hidden"
      aria-label="Membership"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--color-gold)_0%,_transparent_70%)] opacity-[0.06]" />
      <Container className="relative z-10 text-center">
        <motion.p
          className="text-gold text-sm font-medium tracking-[0.3em] uppercase mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {eyebrow}
        </motion.p>
        <motion.h1
          className="font-display text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.1] mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          {headline}
        </motion.h1>
        <motion.p
          className="text-lg text-dark-muted max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          {subheadline}
        </motion.p>
      </Container>
    </section>
  );
}
