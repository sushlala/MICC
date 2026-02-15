import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CtaFloat } from "@/components/layout/cta-float";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "MICC | Curated Luxury, On Demand",
    template: "%s | MICC",
  },
  description:
    "MICC is a luxury concierge platform offering curated experiences in media, infrastructure, concierge services, and creative events.",
  openGraph: {
    title: "MICC | Curated Luxury, On Demand",
    description:
      "MICC is a luxury concierge platform offering curated experiences in media, infrastructure, concierge services, and creative events.",
    type: "website",
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
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <CtaFloat />
      </body>
    </html>
  );
}
