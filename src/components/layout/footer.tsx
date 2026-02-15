import Link from "next/link";
import { Container } from "@/components/ui/container";
import { PILLARS } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-dark-border bg-dark py-16">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <Link
              href="/"
              className="font-display text-2xl font-bold tracking-wider text-gold"
            >
              MICC
            </Link>
            <p className="mt-3 text-sm text-dark-muted leading-relaxed">
              Curated Luxury, On Demand.
              <br />
              Premium concierge experiences for those who expect the extraordinary.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">
              Navigate
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link href="/" className="text-sm text-dark-muted hover:text-gold transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-dark-muted hover:text-gold transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/packages" className="text-sm text-dark-muted hover:text-gold transition-colors">
                  Packages
                </Link>
              </li>
              <li>
                <Link href="/request" className="text-sm text-dark-muted hover:text-gold transition-colors">
                  Request Concierge
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">
              Pillars
            </h3>
            <ul className="space-y-2.5">
              {PILLARS.map((pillar) => (
                <li key={pillar.slug}>
                  <Link
                    href={`/pillars/${pillar.slug}`}
                    className="text-sm text-dark-muted hover:text-gold transition-colors"
                  >
                    {pillar.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">
              Contact
            </h3>
            <ul className="space-y-2.5">
              <li className="text-sm text-dark-muted">hello@micc.com</li>
              <li className="text-sm text-dark-muted">Los Angeles, CA</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-dark-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-dark-muted">
            &copy; {new Date().getFullYear()} MICC. All rights reserved.
          </p>
          <p className="text-xs text-dark-muted">Curated Luxury, On Demand.</p>
        </div>
      </Container>
    </footer>
  );
}
