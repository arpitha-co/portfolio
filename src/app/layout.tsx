import type { Metadata, Viewport } from "next";
import { Inter, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { site } from "@/content/site";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });
const instrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});
const jetbrains = JetBrains_Mono({ variable: "--font-jetbrains", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.role}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  keywords: [
    "AI Engineer",
    "Robotics",
    "Computer Vision",
    "Vision-Language-Action models",
    "VLA",
    "Robot learning",
    "Machine Learning",
    "Deep Learning",
    "Franka Panda",
    "Arpitha Thimmegowda",
  ],
  authors: [{ name: site.name, url: site.url }],
  openGraph: {
    type: "website",
    title: `${site.name} — ${site.role}`,
    description: site.description,
    url: site.url,
    siteName: site.name,
    locale: "en_US",
  },
  twitter: { card: "summary_large_image", title: `${site.name} — ${site.role}`, description: site.description },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#0b0c0e",
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: site.role,
  url: site.url,
  image: `${site.url}${site.photo}`,
  sameAs: [site.social.github, site.social.linkedin],
  alumniOf: ["OTH Amberg-Weiden", "The Oxford College of Engineering"],
  knowsAbout: ["Robotics", "Computer Vision", "Machine Learning", "Vision-Language-Action models"],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${instrument.variable} ${jetbrains.variable}`}>
      <body className="min-h-dvh flex flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-md focus:bg-accent focus:px-3 focus:py-2 focus:text-ink"
        >
          Skip to content
        </a>
        <Nav />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </body>
    </html>
  );
}
