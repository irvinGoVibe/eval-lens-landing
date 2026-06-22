import type { Metadata } from "next";

import { PageHeader } from "@/components/PageHeader";
import { Footer } from "@/components/Footer";
import { CtaBand } from "@/components/sections/CtaBand";
import { ScrollFX } from "@/components/ScrollFX";

import { LabStatementHero } from "@/components/sections/lab/LabStatementHero";
import { LabBento } from "@/components/sections/lab/LabBento";
import { LabGallery } from "@/components/sections/lab/LabGallery";
import { LabEditorialSplit } from "@/components/sections/lab/LabEditorialSplit";
import { LabPinnedSteps } from "@/components/sections/lab/LabPinnedSteps";
import { LabSplitRing } from "@/components/sections/lab/LabSplitRing";
import { LabFullStatement } from "@/components/sections/lab/LabFullStatement";
import { LabCinemaScrim } from "@/components/sections/lab/LabCinemaScrim";
import { LabNumbered } from "@/components/sections/lab/LabNumbered";
import { LabCompareTable } from "@/components/sections/lab/LabCompareTable";
import { LabStatBand } from "@/components/sections/lab/LabStatBand";
import { LabQuietCta } from "@/components/sections/lab/LabQuietCta";

import type { SectionNav } from "@/lib/site-nav";

import { RiseOver, LensBridge, GlassWipe } from "./_motion";

export const metadata: Metadata = {
  title: "DS Theme 2",
  description:
    "EvalLense design-system showcase — one cohesive Apple-style page where light and dark belong to a single lens palette, bound by motion transitions.",
};

/**
 * `/dev/ds-theme-2` — one long, cohesive, premium product page assembled
 * entirely from the existing `Lab*` library sections plus the page-scoped
 * transition layer in `_motion.tsx`. It fixes the "zebra" problem of the first
 * pass: instead of alternating white/black blocks, the light chapters and the
 * single deep nebula chapter share ONE lens palette (violet → cyan → aqua) and
 * are welded by five transition types —
 *   · `tr-lens-seam`        hairline accents inside a surface
 *   · `LensBridge`          glass product-window straddling light → dark
 *   · `GlassWipe`           frosted Vision-Pro panel; surface ramps behind it
 *   · `LabCinemaScrim`      the one fullscreen cinematic moment
 *   · `RiseOver --light`    the light chapter lifts back over the dark cinema
 *   · `tr-gradient-bridge`  soft → ink ramp into the CTA finale
 *
 * Surface arc (≈63% light): soft → soft → light → light → [lens+wipe] → ink →
 * ink → ink(nebula) → ink(cinema) → [rise] → light → light → soft → soft →
 * ink(cta) → dark(footer). The darks are grouped into ONE chapter so the page
 * never flips theme section-to-section. All page-specific colour lives in
 * globals.css scoped under `.ds-theme-2`; no Lab* component or ScrollFX is
 * modified. Content follows the EvalLense pipeline: Intake → Read → Extract →
 * Score → Compare → Rank → Evidence → Human Decision.
 */
const HEADER_NAV: SectionNav = {
  section: "DS Theme 2",
  links: [
    { label: "Value", href: "#value" },
    { label: "Process", href: "#process" },
    { label: "Methodology", href: "#methodology" },
    { label: "Talk to us", href: "#cta" },
  ],
};

export default function DsTheme2Page() {
  return (
    <>
      {/* chrome: internal-page header as a SIBLING before <main> so its
          position:fixed resolves to the viewport, not the .section-lab band. */}
      <PageHeader theme="light" nav={HEADER_NAV} />

      <main className="ds-theme-2 theme-demo section-lab">
        {/* ── 1 — HERO (soft) · chapter anchor ── */}
        <LabStatementHero
          surface="soft"
          version={1}
          className="bg-cool-mist"
          eyebrow="Pitch-deck evaluation"
          titleLead="AI prepares the analysis."
          titleAccent="You decide."
          sub="EvalLense reads every deck, extracts the claims, scores them against one fixed rubric and links each finding to its slide — so your team walks into every review with a defensible read on each company."
          ctas={[
            { label: "Book a Demo", href: "#cta", variant: "primary" },
            { label: "Try live demo", href: "#cta", variant: "ghost" },
          ]}
          media={{
            ratio: "16/10",
            label: "Product preview",
            hint: "score report / evidence view",
            ariaLabel: "EvalLense report preview",
          }}
        />

        <div className="tr-lens-seam" aria-hidden="true" />

        {/* ── 2 — VALUE: bento overview (soft) · Intake → Read → Extract → Score ── */}
        <LabBento
          id="value"
          surface="light"
          className="bg-line-field"
          eyebrow="What one pass produces"
          title="From a batch of decks to a ranked, evidence-backed read"
          sub="One pass turns raw decks into comparable signals — claims pulled off each slide, rubric scores, surfaced risks and the evidence behind every one."
          items={[
            {
              tag: "Extract",
              title: "Every claim, pulled from the deck",
              body: "Market size, traction, team, moat — read off each slide and normalised so they line up across companies.",
              feature: true,
              media: {
                label: "Evidence view",
                hint: "claim → source slide",
                ariaLabel: "Extracted claim linked to its source slide",
              },
            },
            {
              tag: "Score",
              title: "A fixed rubric, applied evenly",
              body: "The same rubric runs on every deck, so a strong score means the same thing across the batch.",
            },
            {
              tag: "Rank",
              title: "A leaderboard you can defend",
              body: "Scores roll up into one ordered list — with the reasoning attached to each position.",
            },
            {
              tag: "Evidence",
              title: "Every finding traces to a slide",
              body: "No bare scores. Each signal carries the slide, the quote and what was missing.",
            },
          ]}
        />

        <div className="tr-lens-seam" aria-hidden="true" />

        {/* ── 3 — STAGES: horizontal gallery (light) · breaks the grid rhythm ── */}
        <LabGallery
          id="stages"
          surface="light"
          eyebrow="Across every stage"
          title="One comparable read, from first cheque to committee"
          sub="The same pipeline reads a pre-seed teaser and a Series-B data room — only the weighting changes, never the standard."
          laneLabel="Investment stages — horizontally scrollable"
          items={[
            { tag: "Seed", title: "Pre-product bets", body: "Judge team and market when there is more vision than traction." },
            { tag: "Series A", title: "Early traction", body: "Weigh growth, retention and unit economics against the category." },
            { tag: "Growth", title: "Scaling proof", body: "Compare efficiency and defensibility as the numbers mature." },
            { tag: "Diligence", title: "Evidence trail", body: "Every score links back to the deck page and the source behind it." },
            { tag: "Committee", title: "Shared view", body: "One report the whole table can read the same way." },
          ]}
        />

        <div className="tr-lens-seam" aria-hidden="true" />

        {/* ── 4 — EVIDENCE: editorial split (light) · Read → Extract ── */}
        <LabEditorialSplit
          id="evidence"
          surface="light"
          eyebrow="Read, then extract"
          titleLead="It reads every slide and pulls the"
          titleAccent="evidence"
          titleTrail=" behind each claim"
          sub="Before anything is scored, EvalLense reads the full deck the way a reviewer would — pulling claims, the numbers behind them and the gaps where a claim has no support. The score comes later, and it is always traceable to what is on the page."
          media={{
            ratio: "4/3",
            label: "Extraction view",
            hint: "claims highlighted on a slide",
            ariaLabel: "Deck slide with extracted claims highlighted",
          }}
        />

        {/* ── transition · LENS BRIDGE → FROSTED GLASS WIPE (light → dark) ──
            The glass product-window straddles the light editorial and the
            darkening wipe; the wipe's frosted slab then travels the viewport
            while the surface ramps soft → nebula behind it. */}
        <LensBridge
          label="Live report window"
          hint="claims · scores · evidence — carried into the pipeline"
          ariaLabel="A glass product window carrying the report from the light chapter into the pipeline"
        />
        <GlassWipe
          eyebrow="Inside the pipeline"
          line="The same five steps run on every deck — and the last one is always a person."
        />

        {/* ── 5 — PROCESS: pinned steps (ink) · Intake → Decide ── */}
        <LabPinnedSteps
          id="process"
          surface="ink"
          ariaLabel="How a review runs, step by step"
          eyebrow="How a review runs"
          title={{ line1: "One pass,", line2: "start to", line2Accent: "decision" }}
          sub="Each deck moves through the same pipeline. You watch it happen, step by step — and the last step is always a person."
          steps={[
            { num: "01", label: "Intake", desc: "Drop in a batch of decks; each is parsed and queued for review." },
            { num: "02", label: "Read & extract", desc: "The model reads every slide and pulls the claims with the evidence behind them." },
            { num: "03", label: "Score", desc: "A fixed rubric turns findings into comparable, traceable signals." },
            { num: "04", label: "Rank", desc: "Scores roll up into one leaderboard you can defend line by line." },
            { num: "05", label: "Decide", desc: "A person signs off — the final call always stays human." },
          ]}
          media={{
            ratio: "16/10",
            label: "Pipeline view",
            hint: "deck moving through the steps",
            ariaLabel: "A deck moving through the review pipeline",
            parallaxY: 40,
          }}
        />

        <div
          className="tr-lens-seam tr-lens-seam--strong"
          data-from="ink"
          data-to="ink"
          aria-hidden="true"
        />

        {/* ── 6 — CONFIDENCE: split + scrub ring (ink) · Score ── */}
        <LabSplitRing
          id="confidence"
          surface="ink"
          eyebrow="Confidence, shown"
          titleLead="A score you can"
          titleAccent="explain"
          titleTrail=", with the evidence"
          sub="Every score carries a confidence figure and the inputs that produced it — so you see not just the number, but how sure the model is and why."
          ring={{ label: "Confidence", value: 82, caption: "demo value · sample deck" }}
          breakdown={[
            { label: "Evidence coverage", value: 88 },
            { label: "Claim consistency", value: 79 },
            { label: "Source quality", value: 74 },
          ]}
          breakdownCaption="weighted inputs · illustrative"
          media={{
            ratio: "4/3",
            label: "Confidence view",
            hint: "ring + weighted inputs",
            ariaLabel: "Confidence ring with weighted scoring inputs",
          }}
        />

        <div
          className="tr-lens-seam tr-lens-seam--strong"
          data-from="ink"
          data-to="ink"
          aria-hidden="true"
        />

        {/* ── 7 — DECISION APEX: full statement (ink · deep nebula) · Human Decision ── */}
        <LabFullStatement
          id="decision"
          surface="ink"
          eyebrow="Human in the loop"
          titleLead="The final call is always"
          titleAccent="yours"
          sub="EvalLense surfaces the evidence, scores it and ranks it. It never decides. The shortlist, the pass, the meeting — those stay with your team."
        />

        {/* ── 8 — CINEMA: the one fullscreen cinematic moment (ink) ── */}
        <LabCinemaScrim
          eyebrow="AI prepares the analysis"
          headline="YOU DECIDE"
          sub="The evidence is ready. The decision is yours."
          cta={{ label: "Book a Demo", href: "#cta" }}
          media={{
            videoSrc: "/assets/methodology/cinema.mp4",
            poster: "/assets/_demo-pool/photo/jury-decision.png",
          }}
        />

        {/* ── transition · the light chapter RISES back over the cinema (dark → light) ── */}
        <RiseOver className="ds2-riseover--light">
          {/* ── 9 — METHODOLOGY: numbered (light) · Evidence / transparency ── */}
          <LabNumbered
            id="methodology"
            surface="light"
            eyebrow="Transparent by construction"
            title="Nothing about the score is a black box"
            sub="You can trace any number back to the slide it came from."
            items={[
              { num: "01", title: "Fixed rubric", body: "The same criteria apply to every deck, published up front." },
              { num: "02", title: "Linked evidence", body: "Each finding points to the exact slide and quote behind it." },
              { num: "03", title: "Confidence on every score", body: "Low-confidence findings are flagged, not hidden." },
              { num: "04", title: "Human sign-off", body: "The model proposes; a reviewer disposes. Always." },
            ]}
          />
        </RiseOver>

        <div className="tr-lens-seam" aria-hidden="true" />

        {/* ── 10 — COMPARE: table (light) · Compare → Rank ── */}
        <LabCompareTable
          id="compare"
          surface="light"
          eyebrow="Manual review vs EvalLense"
          title="Same decks, a defensible read"
          sub="What changes when one rubric runs every deck and every finding carries its evidence."
          columns={["", "Manual pass", "EvalLense"]}
          rows={[
            ["Coverage", "Whoever had time", "Every deck, every slide"],
            ["Consistency", "Varies by reviewer", "One rubric, same weights"],
            ["Evidence", "In someone's notes", "Linked to the slide"],
            ["Ranking", "Argued in the room", "Ordered, with reasoning"],
            ["Decision", "Human", "Human"],
          ]}
          recommendedIndex={2}
          recommendedNote="AI prepares the analysis — the decision stays yours"
        />

        <div className="tr-lens-seam" aria-hidden="true" />

        {/* ── 11 — STAT BAND (soft) · outcomes ── */}
        <LabStatBand
          surface="light"
          eyebrow="What teams see"
          title="Faster reviews, with the receipts"
          stats={[
            { value: "10×", label: "more decks reviewed per week", src: "pilot teams, vs manual" },
            { value: "< 3 min", label: "to a first scored read", src: "median per deck" },
            { value: "100%", label: "of findings linked to a slide", src: "by construction" },
          ]}
        />

        <div className="tr-lens-seam" aria-hidden="true" />

        {/* ── 12 — QUIET CTA (soft) ── */}
        <LabQuietCta
          surface="light"
          className="bg-violet-halo"
          eyebrow="See it on your own decks"
          title="Bring a batch. Get a defensible read."
          sub="We will run EvalLense on your real pipeline and walk you through the evidence."
          cta={{ label: "Book a Demo", href: "#cta" }}
        />

        <div
          className="tr-gradient-bridge"
          data-from="soft"
          data-to="ink"
          aria-hidden="true"
        />

        {/* ── 13 — CTA BAND (ink · finale) ── */}
        <div id="cta" className="ds2-cta-anchor">
          <CtaBand
            theme="dark"
            videoSrc="/assets/cta/cube-1.mp4"
            auroraVariant="violet"
            eyebrow="Ready when you are"
            title="Put the evidence in front of every"
            titleAccent="decision"
            sub="Bring a batch of real decks and we will walk you through the evidence behind every score."
            primary={{ label: "Book a Demo", href: "#cta" }}
            secondary={{ label: "Try live demo", href: "#cta" }}
          />
        </div>

        {/* ── 14 — FOOTER (dark) ── */}
        <Footer variant="dark" />

        {/* ── ScrollFX LAST: drives every data-reveal / data-scrub / data-pin ── */}
        <ScrollFX />
      </main>
    </>
  );
}
