"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import type { StorySectionProps } from "@/types/components";

export function StorySection({
  eyebrow,
  heading,
  body,
  imageSrc,
  imageAlt,
  ctaLabel,
  ctaHref,
}: StorySectionProps) {
  return (
    <Section aria-label="Our story">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            className="relative aspect-[4/3] rounded-2xl overflow-hidden"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              className="object-cover"
              loading="lazy"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-gold text-sm font-medium tracking-[0.2em] uppercase mb-3">
              {eyebrow}
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-6">
              {heading}
            </h2>
            <p className="text-dark-muted leading-relaxed mb-8">{body}</p>
            <Link href={ctaHref}>
              <Button variant="secondary">{ctaLabel}</Button>
            </Link>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
