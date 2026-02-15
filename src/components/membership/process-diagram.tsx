"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import type { ProcessStep } from "@/types/components";

interface ProcessDiagramProps {
  eyebrow: string;
  heading: string;
  steps: ProcessStep[];
}

export function ProcessDiagram({
  eyebrow,
  heading,
  steps,
}: ProcessDiagramProps) {
  return (
    <Section aria-label="How it works" className="bg-dark-card/50">
      <Container>
        <div className="text-center mb-16">
          <p className="text-gold text-sm font-medium tracking-[0.2em] uppercase mb-3">
            {eyebrow}
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold">
            {heading}
          </h2>
        </div>
        <div className="relative max-w-3xl mx-auto">
          {/* Vertical connector line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-dark-border hidden sm:block" />

          <div className="space-y-12">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                className="relative flex items-start gap-6"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
              >
                <div className="relative z-10 w-12 h-12 shrink-0 rounded-full border-2 border-gold bg-dark flex items-center justify-center">
                  <span className="text-gold font-display font-bold">
                    {step.number}
                  </span>
                </div>
                <div className="pt-2">
                  <h4 className="font-display text-lg font-semibold mb-1">
                    {step.title}
                  </h4>
                  <p className="text-sm text-dark-muted leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
