import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export function PhotoCtaBand({
  heading,
  body,
  ctaLabel = "Start Planning",
  ctaHref = "/start",
}: {
  heading: string;
  body: string;
  ctaLabel?: string;
  ctaHref?: string;
}) {
  return (
    <section className="relative py-28 sm:py-36 overflow-hidden">
      <Image
        src="https://images.unsplash.com/photo-1486607303850-bc051a4ffad4?q=80&w=2400&auto=format&fit=crop"
        alt="Chicago high-rise architecture photographed from above"
        fill
        sizes="100vw"
        style={{ objectFit: "cover" }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(4,4,5,0.75) 0%, rgba(4,4,5,0.55) 40%, rgba(4,4,5,0.65) 75%, rgba(4,4,5,0.85) 100%)",
        }}
      />
      <Container className="relative z-10 text-center">
        <p className="text-gold text-xs font-medium tracking-[0.2em] uppercase mb-5">
          Private Concierge · Chicago
        </p>
        <h2 className="font-display text-3xl sm:text-4xl font-light mb-3 max-w-xl mx-auto">
          {heading}
        </h2>
        <p className="text-dark-muted max-w-md mx-auto mb-9 leading-relaxed">
          {body}
        </p>
        <Link href={ctaHref}>
          <Button size="lg">{ctaLabel}</Button>
        </Link>
      </Container>
      <span className="absolute bottom-4 right-5 text-[9px] tracking-wide text-white/35 z-10">
        Photo / Unsplash
      </span>
    </section>
  );
}
