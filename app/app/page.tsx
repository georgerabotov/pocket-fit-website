import type { Metadata } from "next";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Integrations } from "@/components/Integrations";
import { SocialProof } from "@/components/SocialProof";
import { Metrics } from "@/components/Metrics";
import { Records } from "@/components/Records";
import { Intelligence } from "@/components/Intelligence";
import { FeatureGrid } from "@/components/FeatureGrid";
import { Privacy } from "@/components/Privacy";
import { Testimonials } from "@/components/Testimonials";
import { FinalCta } from "@/components/FinalCta";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Pocket Fit - Your Connected Health Coach",
  description:
    "Pocket Fit brings your wearables, lab results, and nutrition together into one clear picture - with a private AI coach that helps you act on it.",
};

export default function AppPage() {
  return (
    <>
      <SmoothScroll />
      <Nav />
      <main>
        <Hero />
        <Integrations />
        <SocialProof />
        <Metrics />
        <Records />
        <Intelligence />
        <FeatureGrid />
        <Privacy />
        <Testimonials />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
