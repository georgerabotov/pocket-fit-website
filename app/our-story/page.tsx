import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import { ScrollScrub } from "@/components/forme/ScrollScrub";
import { HeadTrack } from "@/components/forme/HeadTrack";
import { WorkoutCurl } from "@/components/forme/WorkoutCurl";
import { LockerJourney } from "@/components/forme/LockerJourney";
import { OneYearLater } from "@/components/forme/OneYearLater";
import { Journey } from "@/components/forme/Journey";

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
  title: "Our Story - Pocket Fit",
  description: "Our story. A scroll-driven study of movement.",
};

export default function OurStory() {
  return (
    <main className={`forme-scope ${cormorant.variable} ${jost.variable}`}>
      <ScrollScrub />
      <HeadTrack />
      <WorkoutCurl />
      <LockerJourney />
      <OneYearLater />
      <Journey />
    </main>
  );
}
