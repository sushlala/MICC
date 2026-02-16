"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import type { CtaBannerProps } from "@/types/components";

export function CtaBanner({
  heading,
  body,
  ctaLabel,
  ctaHref,
}: CtaBannerProps) {
  return (
    <Section aria-label="Get started">
      <Container>
        <motion.div
          className="relative overflow-hidden rounded-2xl border border-gold/20 bg-gradient-to-br from-dark-card to-dark p-10 sm:p-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--color-gold)_0%,_transparent_50%)] opacity-[0.08]" />
          <div className="relative z-10">
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              {heading}
            </h2>
            <p className="text-dark-muted text-lg max-w-xl mx-auto mb-8">
              {body}
            </p>
            <Link href={ctaHref}>
              <Button size="lg">{ctaLabel}</Button>
            </Link>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
