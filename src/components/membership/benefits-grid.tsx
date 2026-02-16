"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import {
  Crown,
  Sparkles,
  Shield,
  Clock,
  Star,
  HeartHandshake,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Crown,
  Sparkles,
  Shield,
  Clock,
  Star,
  HeartHandshake,
};

export interface Benefit {
  title: string;
  description: string;
  icon: string;
}

interface BenefitsGridProps {
  eyebrow: string;
  heading: string;
  benefits: Benefit[];
}

export function BenefitsGrid({
  eyebrow,
  heading,
  benefits,
}: BenefitsGridProps) {
  return (
    <Section aria-label="Membership benefits">
      <Container>
        <div className="text-center mb-16">
          <p className="text-gold text-sm font-medium tracking-[0.2em] uppercase mb-3">
            {eyebrow}
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold">
            {heading}
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((b, i) => {
            const Icon = iconMap[b.icon];
            return (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <Card className="h-full" hover={false}>
                  <div className="w-12 h-12 mb-4 rounded-lg bg-gold/10 flex items-center justify-center">
                    {Icon && <Icon className="w-6 h-6 text-gold" />}
                  </div>
                  <h3 className="font-display text-lg font-semibold mb-2">
                    {b.title}
                  </h3>
                  <p className="text-sm text-dark-muted leading-relaxed">
                    {b.description}
                  </p>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
