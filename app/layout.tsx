import type { Metadata } from "next";
import { Barlow_Semi_Condensed, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { site } from "@/lib/site";

const barlow = Barlow_Semi_Condensed({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-barlow",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Barndominiums & Post-Frame Builders in Holton, KS`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    "post-frame construction",
    "barndominium builder",
    "pole barn",
    "Holton KS",
    "northeast Kansas",
    "shop builder",
    "machine shed",
    "metal buildings Kansas",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.name,
    title: `${site.name} | Barndominiums & Post-Frame Builders`,
    description: site.description,
    images: [{ url: "/photos/p08.jpg", width: 1920, height: 1440, alt: "Custom barndominium by Chris Gross Construction" }],
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "GeneralContractor",
  name: site.name,
  legalName: site.legalName,
  image: `${site.url}/photos/p08.jpg`,
  url: site.url,
  telephone: site.phoneDisplay,
  email: site.emailDisplay,
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: site.address.city,
    addressRegion: site.address.state,
    postalCode: site.address.zip,
    addressCountry: "US",
  },
  geo: { "@type": "GeoCoordinates", latitude: site.geo.lat, longitude: site.geo.lng },
  areaServed: site.serviceArea.map((name) => ({ "@type": "City", name })),
  openingHours: "Mo-Fr 07:00-17:00",
  slogan: site.tagline,
  sameAs: site.externalProfiles.map((profile) => profile.href),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${barlow.variable} ${inter.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
