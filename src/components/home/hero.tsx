import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark/60 via-dark/80 to-dark" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--color-gold)_0%,_transparent_70%)] opacity-[0.07]" />

      <Container className="relative z-10 text-center py-32">
        <p className="text-gold text-sm sm:text-base font-medium tracking-[0.3em] uppercase mb-6">
          Luxury Concierge Platform
        </p>
        <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.1] mb-6">
          Curated Luxury,
          <br />
          <span className="text-gold">On Demand</span>
        </h1>
        <p className="text-lg sm:text-xl text-dark-muted max-w-2xl mx-auto mb-10">
          From intimate dinners to grand celebrations, MICC orchestrates
          extraordinary experiences tailored to your vision.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/request">
            <Button size="lg">Request Concierge</Button>
          </Link>
          <Link href="/packages">
            <Button variant="secondary" size="lg">
              Explore Packages
            </Button>
          </Link>
        </div>
      </Container>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark to-transparent" />
    </section>
  );
}
