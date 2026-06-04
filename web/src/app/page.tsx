import { Footer } from "@/components/Footer";
import { ScrollOrchestrator } from "@/components/ScrollOrchestrator";
import { SiteHeader } from "@/components/SiteHeader";
import { Decisions } from "@/components/sections/Decisions";
import { Hero } from "@/components/sections/Hero";
import { MistBridge } from "@/components/sections/MistBridge";
import { OrangeGlow } from "@/components/sections/OrangeGlow";
import { Problem } from "@/components/sections/Problem";
import { Results } from "@/components/sections/Results";
import { Trust } from "@/components/sections/Trust";
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
        <Results />
        <Trust />
      </main>
      <Footer />
      <ScrollOrchestrator />
    </>
  );
}
