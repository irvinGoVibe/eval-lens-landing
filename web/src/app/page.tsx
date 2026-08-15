import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { ScrollOrchestrator } from "@/components/ScrollOrchestrator";
import { SiteHeader } from "@/components/SiteHeader";
import { CtaBand } from "@/components/sections/CtaBand";
import { Decisions } from "@/components/sections/Decisions";
import { EvalLenseBentoSection } from "@/components/sections/EvalLenseBentoSection";
import { Hero } from "@/components/sections/Hero";
import { HomeBlogBlock } from "@/components/sections/HomeBlogBlock";
import { MistBridge } from "@/components/sections/MistBridge";
import { OrangeGlow } from "@/components/sections/OrangeGlow";
import { Problem } from "@/components/sections/Problem";
import { Workflow } from "@/components/sections/Workflow";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <div className="progress" id="progress"></div>
      <SiteHeader />
      <main id="top">
        <Hero />
        <Problem />
        <OrangeGlow />
        {/* <MistBridge /> — kept for upcoming iteration; styles in globals.css */}
        <Workflow />
        <Decisions />
        <HomeBlogBlock />
        <EvalLenseBentoSection />
        <CtaBand
          theme="dark"
          bleed
          videoSrc="/assets/cta/cube-1.mp4"
          videoPoster="/assets/cta/cube-1-poster.webp"
          auroraVariant="violet"
          title="See your next cohort"
          titleAccent="ranked in a day"
          sub="Batch-review every pitch deck, surface the strongest startups, and hand each team an evidence-based report — with the final call always yours. The first run is free through August 31, for batches up to 10 decks."
          primary={{ label: "Book a demo", href: "https://calendly.com/evallens/30min" }}
          secondary={{ label: "Send your batch", href: "/company/contact#batch" }}
        />
      </main>
      <Footer variant="dark" />
      <ScrollOrchestrator />
    </>
  );
}
