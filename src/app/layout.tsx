import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CtaFloat } from "@/components/layout/cta-float";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "MICC — Curated Luxury, On Demand",
    template: "%s | MICC",
  },
  description:
    "MICC is a premium concierge platform offering luxury event production, media, lighting, and lifestyle management in Los Angeles.",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "MICC",
    title: "MICC — Curated Luxury, On Demand",
    description:
      "MICC is a premium concierge platform offering luxury event production, media, lighting, and lifestyle management in Los Angeles.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "MICC — Curated Luxury, On Demand",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${playfairDisplay.variable} antialiased`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] bg-gold text-dark px-4 py-2 rounded-lg font-medium"
        >
          Skip to main content
        </a>
        <Navbar />
        <main id="main-content" className="min-h-screen">
          {children}
        </main>
        <Footer />
        <CtaFloat />
      </body>
    </html>
  );
}
