import type { Metadata } from "next";
import { EvalLenseBentoSection } from "@/components/sections/EvalLenseBentoSection";
import { ScrollUnlock } from "./ScrollUnlock";

export const metadata: Metadata = {
  title: "EvalLense — Trusted, Explainable, Human-Controlled",
  description:
    "EvalLense turns pitch deck flow into structured evaluation, explainable reports, and human-controlled decisions.",
};

export default function BentoPage() {
  return (
    <main className="bg-black">
      <ScrollUnlock />
      <EvalLenseBentoSection />
    </main>
  );
}
