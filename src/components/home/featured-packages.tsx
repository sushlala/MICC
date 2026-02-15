import Link from "next/link";
import { SEED_PACKAGES } from "@/lib/constants";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

export function FeaturedPackages() {
  const featured = SEED_PACKAGES.slice(0, 3);

  return (
    <Section className="bg-dark-card/50">
      <Container>
        <div className="text-center mb-16">
          <p className="text-gold text-sm font-medium tracking-[0.2em] uppercase mb-3">
            Featured
          </p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold">
            Signature <span className="text-gold">Packages</span>
          </h2>
          <p className="mt-4 text-dark-muted max-w-xl mx-auto">
            Curated experiences designed to deliver unforgettable moments. Every
            detail, handled.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featured.map((pkg) => (
            <Card key={pkg.id} className="flex flex-col">
              <div className="flex items-start justify-between mb-4">
                <Badge>{pkg.pillar.replace("-", " ")}</Badge>
                <span className="text-gold font-semibold">
                  From ${pkg.base_price.toLocaleString()}
                </span>
              </div>
              <h3 className="font-display text-2xl font-semibold mb-2">
                {pkg.name}
              </h3>
              <p className="text-sm text-dark-muted leading-relaxed mb-6 flex-1">
                {pkg.description}
              </p>
              <ul className="space-y-2 mb-6">
                {pkg.inclusions.slice(0, 3).map((item) => (
                  <li
                    key={item}
                    className="text-sm text-foreground/70 flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link href={`/request?package=${pkg.slug}`}>
                <Button variant="secondary" className="w-full">
                  Book This Package
                </Button>
              </Link>
            </Card>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/packages">
            <Button variant="ghost" size="lg">
              View All Packages &rarr;
            </Button>
          </Link>
        </div>
      </Container>
    </Section>
  );
}
