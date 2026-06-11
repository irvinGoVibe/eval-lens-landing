import type { Metadata } from "next";
import { BentoGrid } from "@/components/sections/BentoGrid";

export const metadata: Metadata = {
  title: "AI Jury — Pitch decks, scored like evidence",
  description:
    "Six AI judges score every pitch deck across six criteria, with each number linked back to the evidence.",
};

export default function BentoPage() {
  return <BentoGrid />;
}
