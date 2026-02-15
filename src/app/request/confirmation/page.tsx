import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Request Confirmed",
  description: "Your concierge request has been submitted successfully.",
};

export default function ConfirmationPage() {
  return (
    <section className="min-h-screen flex items-center justify-center py-32">
      <Container className="max-w-xl text-center">
        <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-gold/10 flex items-center justify-center">
          <CheckCircle className="w-10 h-10 text-gold" />
        </div>

        <h1 className="font-display text-3xl sm:text-4xl font-bold mb-4">
          Request <span className="text-gold">Received</span>
        </h1>

        <p className="text-dark-muted text-lg mb-2">
          Thank you for choosing MICC.
        </p>
        <p className="text-dark-muted mb-10">
          Our team will review your request and respond within{" "}
          <span className="text-foreground font-medium">24 hours</span>. Keep
          an eye on your inbox for next steps.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/">
            <Button variant="secondary">Back to Home</Button>
          </Link>
          <Link href="/packages">
            <Button>Explore Packages</Button>
          </Link>
        </div>
      </Container>
    </section>
  );
}
