import type { Metadata } from "next";
import LanyardPricing from "./LanyardPricing";

export const metadata: Metadata = {
  title: "Pricing — Pocket Fit",
  description:
    "One plan, total access. Grab your membership pass — personalized AI workouts, live tracking, analytics, and an AI coach.",
};

export default function PricingPage() {
  return <LanyardPricing />;
}
