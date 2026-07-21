import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

const SITE = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://pocket-fit.app"
).replace(/\/$/, "");

const DESCRIPTION =
  "Pocket Fit builds personalized, AI-generated workout programs around your goals, equipment, and schedule. Live on iOS and Android.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: "Pocket Fit - AI workouts around your real life",
  description: DESCRIPTION,
  applicationName: "Pocket Fit",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/icon.png",
  },
  openGraph: {
    type: "website",
    siteName: "Pocket Fit",
    url: SITE,
    title: "Pocket Fit - AI workouts around your real life",
    description: DESCRIPTION,
    images: [{ url: "/icon.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pocket Fit - AI workouts around your real life",
    description: DESCRIPTION,
    images: ["/icon.png"],
  },
};

// Site-wide Organization + WebSite structured data for search engines
const orgJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE}/#organization`,
      name: "Pocket Fit",
      url: SITE,
      logo: `${SITE}/icon.png`,
    },
    {
      "@type": "WebSite",
      "@id": `${SITE}/#website`,
      name: "Pocket Fit",
      url: SITE,
      publisher: { "@id": `${SITE}/#organization` },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={geist.variable}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
