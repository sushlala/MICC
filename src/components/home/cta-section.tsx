import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

export function CtaSection() {
  return (
    <Section>
      <Container>
        <div className="relative overflow-hidden rounded-2xl border border-gold/20 bg-gradient-to-br from-dark-card to-dark p-12 sm:p-16 lg:p-20 text-center">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--color-gold)_0%,_transparent_50%)] opacity-[0.08]" />

          <div className="relative z-10">
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Ready to Elevate
              <br />
              <span className="text-gold">Your Night?</span>
            </h2>
            <p className="text-dark-muted text-lg max-w-xl mx-auto mb-8">
              Tell us your vision and let MICC handle the rest. From concept to
              execution, we make the extraordinary effortless.
            </p>
            <Link href="/request">
              <Button size="lg">Request Concierge</Button>
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  );
}
