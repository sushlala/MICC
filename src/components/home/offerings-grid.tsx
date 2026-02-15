"use client";

import { motion } from "framer-motion";
import { PILLARS } from "@/lib/constants";
import { OfferingsCard } from "./offerings-card";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

export function OfferingsGrid() {
  return (
    <Section aria-label="Our services">
      <Container>
        <div className="text-center mb-16">
          <p className="text-gold text-sm font-medium tracking-[0.2em] uppercase mb-3">
            Our Pillars
          </p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold">
            Four Pillars of <span className="text-gold">Excellence</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PILLARS.map((pillar, i) => (
            <motion.div
              key={pillar.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <OfferingsCard
                title={pillar.name}
                tagline={pillar.tagline}
                description={pillar.description}
                slug={pillar.slug}
                icon={pillar.icon}
              />
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
