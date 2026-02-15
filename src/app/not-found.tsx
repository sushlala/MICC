import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="min-h-screen flex items-center justify-center">
      <Container className="max-w-lg text-center">
        <p className="font-display text-8xl font-bold text-gold mb-6">404</p>
        <h1 className="font-display text-2xl sm:text-3xl font-bold mb-4">
          Page Not Found
        </h1>
        <p className="text-dark-muted mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link href="/">
          <Button>Back to Home</Button>
        </Link>
      </Container>
    </section>
  );
}
