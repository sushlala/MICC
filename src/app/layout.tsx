import type { Metadata } from "next";
import { DM_Sans, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CtaFloat } from "@/components/layout/cta-float";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-cormorant-garamond",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: {
    default: "MICC Hospitality — Chicago, Handled.",
    template: "%s | MICC Hospitality",
  },
  description:
    "MICC Hospitality is a private concierge for Chicago — hotels, dining, nightlife, transportation and private experiences, coordinated through one point of contact.",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "MICC Hospitality",
    title: "MICC Hospitality — Chicago, Handled.",
    description:
      "MICC Hospitality is a private concierge for Chicago — hotels, dining, nightlife, transportation and private experiences, coordinated through one point of contact.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "MICC Hospitality — Chicago, Handled.",
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
        className={`${dmSans.variable} ${cormorantGaramond.variable} antialiased`}
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
