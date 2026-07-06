import type { Metadata } from "next";
import { LegalDoc } from "@/components/site/LegalDoc";
import content from "@/lib/pocketContent.json";

export const metadata: Metadata = {
  title: "Privacy Policy - Pocket Fit",
  description:
    "How Pocket Fit collects, uses, and safeguards your information.",
};

export default function PrivacyPage() {
  return (
    <LegalDoc
      title={content.privacy.title}
      paragraphs={content.privacy.paragraphs}
    />
  );
}
