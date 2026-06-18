import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { SiteEffects } from "@/components/SiteEffects";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

export const metadata: Metadata = {
  title: "Lumio — Your Connected Health Coach",
  description:
    "Lumio brings your wearables, lab results, and nutrition together into one clear picture — with a private AI coach that helps you act on it.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={geist.variable}>
      <body>
        <SiteEffects />
        {children}
      </body>
    </html>
  );
}
