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
          // TEST: "Book a demo" cycles these background clips so we can pick the
          // best one. Once chosen, drop `videos`/`cycleOnPrimary` and pass the
          // winner as `videoSrc="/assets/cta/<file>.mp4"`.
          videos={[
            "/assets/cta/cube-1.mp4",
            "/assets/cta/neo.mp4",
            "/assets/cta/uniqorn-1.mp4",
            "/assets/cta/uniqorn-2.mp4",
          ]}
          cycleOnPrimary
          // TEST: "Try live demo" switches to the CSS aurora and cycles its
          // palettes (logged to the console). Pick one and pass it later as
          // `auroraVariant="<id>"`.
          cycleAuroraOnSecondary
          title="See your next cohort"
          titleAccent="ranked in a day"
          sub="Batch-review every pitch deck, surface the strongest startups, and hand each team an evidence-based report — with the final call always yours."
          primary={{ label: "Book a demo", href: "/#demo" }}
          secondary={{ label: "Try live demo", href: "/try-live-demo" }}
        />
      </main>
      <Footer variant="dark" />
      <ScrollOrchestrator />
    </>
  );
}
