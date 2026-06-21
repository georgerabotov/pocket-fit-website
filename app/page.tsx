import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import { ScrollScrub } from "@/components/forme/ScrollScrub";
import { HeadTrack } from "@/components/forme/HeadTrack";
import { WorkoutCurl } from "@/components/forme/WorkoutCurl";
import { DressingRoom } from "@/components/forme/DressingRoom";
import { SitThought } from "@/components/forme/SitThought";

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
  title: "Pocket Fit — Are You Ready to Start Your Workout?",
  description: "Our story. A scroll-driven study of movement.",
};

export default function Home() {
  return (
    <main className={`forme-scope ${cormorant.variable} ${jost.variable}`}>
      <ScrollScrub />
      <HeadTrack />
      <WorkoutCurl />
      <DressingRoom />
      <SitThought />
    </main>
  );
}
