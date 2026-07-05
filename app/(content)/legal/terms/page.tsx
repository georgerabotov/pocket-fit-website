import type { Metadata } from "next";
import { LegalDoc } from "@/components/site/LegalDoc";
import content from "@/lib/pocketContent.json";

export const metadata: Metadata = {
  title: "Terms and Conditions — Pocket Fit",
  description: "The terms that govern your use of the Pocket Fit app.",
};

export default function TermsPage() {
  return (
    <LegalDoc title={content.terms.title} paragraphs={content.terms.paragraphs} />
  );
}
