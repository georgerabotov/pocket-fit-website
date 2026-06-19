import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import { ScrollScrub } from "@/components/forme/ScrollScrub";
import { Editorial, Footer } from "@/components/forme/Editorial";
import { RevealInit } from "@/components/forme/RevealInit";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-jost",
});

export const metadata: Metadata = {
  title: "FORME — The Art of the Lift",
  description: "Our story. A scroll-driven study of movement.",
};

export default function Home() {
  return (
    <main className={`forme-scope ${cormorant.variable} ${jost.variable}`}>
      <RevealInit />
      <ScrollScrub />
      <Editorial />
      <Footer />
    </main>
  );
}
