import type { Metadata } from "next";
import { Suspense } from "react";
import { Container } from "@/components/ui/container";
import { RequestForm } from "@/components/request/request-form";

export const metadata: Metadata = {
  title: "Request Concierge",
  description:
    "Submit your request and let MICC curate an extraordinary experience tailored to your vision.",
};

export default function RequestPage() {
  return (
    <section className="relative pt-32 pb-20 sm:pt-40">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--color-gold)_0%,_transparent_60%)] opacity-[0.06]" />
      <Container className="relative z-10 max-w-3xl">
        <div className="text-center mb-12">
          <p className="text-gold text-sm font-medium tracking-[0.2em] uppercase mb-3">
            Request Concierge
          </p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">
            Let&apos;s Create Something{" "}
            <span className="text-gold">Extraordinary</span>
          </h1>
          <p className="text-dark-muted text-lg">
            Fill out the details below and our team will reach out within 24
            hours to bring your vision to life.
          </p>
        </div>

        <Suspense>
          <RequestForm />
        </Suspense>
      </Container>
    </section>
  );
}
