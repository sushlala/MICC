import Link from "next/link";
import { PILLARS } from "@/lib/constants";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

export function PillarsGrid() {
  return (
    <Section>
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
          {PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <Link key={pillar.slug} href={`/pillars/${pillar.slug}`}>
                <Card className="h-full text-center group cursor-pointer">
                  <div className="w-14 h-14 mx-auto mb-5 rounded-xl bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                    <Icon className="w-7 h-7 text-gold" />
                  </div>
                  <h3 className="font-display text-xl font-semibold mb-2">
                    {pillar.name}
                  </h3>
                  <p className="text-sm text-dark-muted leading-relaxed">
                    {pillar.description}
                  </p>
                </Card>
              </Link>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
