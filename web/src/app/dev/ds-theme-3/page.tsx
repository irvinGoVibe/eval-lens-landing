import type { Metadata } from "next";

import { ScrollFX } from "@/components/ScrollFX";
import { Button } from "@/components/ui/Button";
import { FooterFrame } from "@/components/ds/FooterFrame";

import { LabStatementHero } from "@/components/sections/lab/LabStatementHero";
import { LabBento } from "@/components/sections/lab/LabBento";
import { LabEditorialSplit } from "@/components/sections/lab/LabEditorialSplit";
import { LabPinnedSteps } from "@/components/sections/lab/LabPinnedSteps";
import { LabSplitRing } from "@/components/sections/lab/LabSplitRing";
import { LabFullStatement } from "@/components/sections/lab/LabFullStatement";
import { LabNumbered } from "@/components/sections/lab/LabNumbered";
import { LabCompareTable } from "@/components/sections/lab/LabCompareTable";
import { LabStatBand } from "@/components/sections/lab/LabStatBand";
import { LabQuietCta } from "@/components/sections/lab/LabQuietCta";

import { LightToDarkRise, DarkToLightLift, GradientDissolve } from "./_motion";

export const metadata: Metadata = {
  title: "DS Theme 3",
  description:
    "EvalLense design-system showcase — 'Silver Nebula': one cohesive Apple-style page where a cooler silver-white light system and a single navy-violet nebula chapter belong to one electric lens palette, bound by scroll-linked transitions.",
};

/**
 * `/dev/ds-theme-3` — "Silver Nebula", composition "Order 1: Open & Deep".
 *
 * One long, cohesive, premium product page assembled ENTIRELY from the existing
 * `Lab*` library sections plus the page-scoped transition layer in `_motion.tsx`.
 * It is a re-theme + recomposition of the ds-theme-2 approach: the light chapters
 * carry a cooler silver-white card system and the single deep chapter is one
 * continuous navy-violet nebula tone-ramp (process → confidence → decision),
 * never flat #000. Everything reads as one electric lens palette
 * (violet → electric-lavender → ice-blue → aqua).
 *
 * The page is built ENTIRELY from DS Sections — the library shown at
 * `/dev/ds-sections` plus `Lab*` components — with no internal-page header.
 *
 * Transition types welding the chapters:
 *   · tr-lens-seam        hairline lens accents between same-surface light sections
 *   · LightToDarkRise     a dark slab rises over the light bento → into the pipeline
 *   · .ds-cinema          the one fullscreen cinematic moment (inline DS section)
 *   · DarkToLightLift     the light methodology lifts back over the dark cinema
 *   · GradientDissolve    a 5-stop light → nebula ramp into the CTA finale
 *
 * Surface arc (Open & Deep): soft(hero) → light(evidence) → light(value) →
 * [rise] → ink(process) → ink(confidence) → ink(decision) → ink(cinema) →
 * [lift] → light(methodology) → light(compare) → light(stats) → light(cta) →
 * [dissolve] → ink(LabQuietCta finale) → dark(FooterFrame). The darks are
 * grouped into ONE chapter so the page never flips theme section-to-section.
 *
 * The dark CTA finale is `LabQuietCta surface="ink"` and the footer is the DS
 * `FooterFrame`. All page-specific colour/layout lives in globals.css scoped
 * under `.ds-theme-3`. No Lab* component, `ScrollFX`, `_kit`, or any production
 * file is modified, and no new content sections are created — only the three
 * transition components in `_motion.tsx`.
 */
export default function DsTheme3Page() {
  return (
    <main className="ds-theme-3 theme-demo section-lab">
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

        {/* ── 2 — EVIDENCE: editorial split (light) · Read → Extract ── */}
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

        <div className="tr-lens-seam" aria-hidden="true" />

        {/* ── 3 — VALUE: bento overview (light) · Intake → Read → Extract → Score ── */}
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

        {/* ── transition · LIGHT → DARK: a dark slab rises over the bento and
            bleeds into the pipeline chapter ── */}
        <LightToDarkRise
          eyebrow="Inside the pipeline"
          line="The same five steps run on every deck — and the last one is always a person."
        />

        {/* ── 4 — PROCESS: pinned steps (ink) · Intake → Decide ── */}
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

        {/* ── 5 — CONFIDENCE: split + scrub ring (ink) · Score ── */}
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

        {/* ── 6 — DECISION APEX: full statement (ink · deep nebula) · Human Decision ── */}
        <LabFullStatement
          id="decision"
          surface="ink"
          eyebrow="Human in the loop"
          titleLead="The final call is always"
          titleAccent="yours"
          sub="EvalLense surfaces the evidence, scores it and ranks it. It never decides. The shortlist, the pass, the meeting — those stay with your team."
        />

        {/* ── 7 — CINEMA: the one fullscreen cinematic moment (ink) · inline
            .ds-cinema DS section (from /dev/ds-sections). Self-contained:
            full-screen video → knockout heading descends & zooms ×7→1 → lens
            fill restores letters → copy. 100% --pin-driven by <ScrollFX/>. ── */}
        <section
          className="band ink ds-cinema lab-cine"
          data-pin
          data-pin-steps="1"
          aria-label="AI prepares. You decide."
        >
          <div className="ds-cinema__stage" data-pin-stage>
            <video
              className="ds-cinema__vid"
              autoPlay
              muted
              loop
              playsInline
              aria-hidden="true"
            >
              <source src="/assets/methodology/cinema.mp4" type="video/mp4" />
            </video>
            <div className="ds-cinema__fill" aria-hidden="true" />
            {/* desktop knockout — landscape viewBox, single line */}
            <svg
              className="ds-cinema__knockout ds-cinema__knockout--d"
              viewBox="0 0 1280 900"
              preserveAspectRatio="xMidYMid slice"
              aria-hidden="true"
            >
              <defs>
                <mask id="ds-cinema-mask">
                  <rect width="1280" height="900" fill="#fff" />
                  <text x="640" y="420" textAnchor="middle" className="ds-cinema__masktext">
                    AI prepares. You decide.
                  </text>
                </mask>
              </defs>
              <rect
                className="ds-cinema__scrimrect"
                width="1280"
                height="900"
                mask="url(#ds-cinema-mask)"
              />
            </svg>
            {/* mobile knockout — portrait viewBox, headline wrapped to two lines so
                the slice doesn't crop it; same --pin animation, portrait origin */}
            <svg
              className="ds-cinema__knockout ds-cinema__knockout--m"
              viewBox="0 0 440 900"
              preserveAspectRatio="xMidYMid slice"
              aria-hidden="true"
            >
              <defs>
                <mask id="ds-cinema-mask-m">
                  <rect width="440" height="900" fill="#fff" />
                  <text
                    x="220"
                    y="404"
                    textAnchor="middle"
                    className="ds-cinema__masktext ds-cinema__masktext--m"
                  >
                    <tspan x="220">AI prepares.</tspan>
                    <tspan x="220" dy="84">You decide.</tspan>
                  </text>
                </mask>
              </defs>
              <rect
                className="ds-cinema__scrimrect"
                width="440"
                height="900"
                mask="url(#ds-cinema-mask-m)"
              />
            </svg>
            <div className="ds-cinema__copy">
              <h2 className="ds-cinema__headline">AI prepares. You decide.</h2>
              <p className="sub ds-cinema__sub">
                Evidence-first scoring, then a human signs off — see the full run on your
                own decks.
              </p>
              <div className="sect-cta ds-cinema__cta">
                <Button href="#cta" variant="gradient">Book a demo</Button>
              </div>
            </div>
          </div>
        </section>

        {/* ── transition · DARK → LIGHT: the light methodology chapter lifts back
            over the cinema ── */}
        <DarkToLightLift>
          {/* ── 8 — METHODOLOGY: numbered (light) · Evidence / transparency ── */}
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
        </DarkToLightLift>

        <div className="tr-lens-seam" aria-hidden="true" />

        {/* ── 9 — COMPARE: table (light) · Compare → Rank ── */}
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

        {/* ── 10 — STAT BAND (light) · outcomes ── */}
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

        {/* ── 11 — QUIET CTA (light) ── */}
        <LabQuietCta
          surface="light"
          className="bg-violet-halo"
          eyebrow="See it on your own decks"
          title="Bring a batch. Get a defensible read."
          sub="We will run EvalLense on your real pipeline and walk you through the evidence."
          cta={{ label: "Book a Demo", href: "#cta" }}
        />

        {/* ── transition · LIGHT → DARK: gradient dissolve into the CTA finale ── */}
        <GradientDissolve />

        {/* ── 12 — CTA FINALE (ink · DS LabQuietCta) ── */}
        <LabQuietCta
          id="cta"
          surface="ink"
          eyebrow="Ready when you are"
          title="Put the evidence in front of every decision"
          sub="Bring a batch of real decks and we will walk you through the evidence behind every score — and the final call always stays yours."
          cta={{ label: "Book a Demo", href: "#cta" }}
        />

        {/* ── 13 — FOOTER (DS FooterFrame) ── */}
        <FooterFrame />

        {/* ── ScrollFX LAST: drives every data-reveal / data-scrub / data-pin ── */}
        <ScrollFX />
      </main>
  );
}
