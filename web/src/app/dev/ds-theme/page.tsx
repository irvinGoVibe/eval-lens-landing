import type { Metadata } from "next";

import { PageHeader } from "@/components/PageHeader";
import { FooterFrame } from "@/components/ds/FooterFrame";
import { CtaBand } from "@/components/sections/CtaBand";
import { ScrollFX } from "@/components/ScrollFX";
import { Button } from "@/components/ui/Button";

import { LabStatementHero } from "@/components/sections/lab/LabStatementHero";
import { LabBento } from "@/components/sections/lab/LabBento";
import { LabPinnedSteps } from "@/components/sections/lab/LabPinnedSteps";
import { LabFullStatement } from "@/components/sections/lab/LabFullStatement";
import { LabGallery } from "@/components/sections/lab/LabGallery";

import type { SectionNav } from "@/lib/site-nav";

export const metadata: Metadata = {
  title: "DS Theme",
  description:
    "EvalLense design-system showcase — light & dark chapters as one page.",
};

/**
 * `/dev/ds-theme` — one long cohesive premium product page assembled STRICTLY
 * from the section set shown on `/dev/ds-sections`:
 *   LabStatementHero · LabBento · LabPinnedSteps · LabFullStatement · LabGallery
 *   · the inline `.ds-cinema` cinematic section · CtaBand · FooterFrame.
 *
 * Light → ink → light arc. Surface changes use the project's canonical
 * sibling-divider primitives (`tr-masked-divider`, `tr-lens-seam`,
 * `tr-gradient-bridge`) — plain full-width elements between sections, NO
 * transform/overflow wrapper, so they never break `position:sticky` on the
 * pinned `#process` / `.ds-cinema` stages. All Lab and cinema motion is driven
 * by the single `<ScrollFX/>` at the end.
 *
 * Page-specific styles live in globals.css scoped under `.ds-theme`. The
 * `.ds-cinema` styles ship globally via `components/ds/ds.css` (imported in
 * `app/layout.tsx`). No Lab* component, ScrollFX or shared component is modified.
 */
const HEADER_NAV: SectionNav = {
  section: "DS Theme",
  links: [
    { label: "Value", href: "#value" },
    { label: "Process", href: "#process" },
    { label: "Talk to us", href: "#cta" },
  ],
};

const GALLERY_ITEMS = [
  { tag: "Seed", title: "Pre-product bets", body: "Judge teams and markets when there is more vision than traction." },
  { tag: "Series A", title: "Early traction", body: "Weigh growth, retention and unit economics against the category." },
  { tag: "Growth", title: "Scaling proof", body: "Compare efficiency and defensibility as the numbers mature." },
  { tag: "Diligence", title: "Evidence trail", body: "Every score links to the deck page and the source behind it." },
  { tag: "Committee", title: "Shared view", body: "One comparable report the whole table can read the same way." },
];

export default function DsThemePage() {
  return (
    <>
      {/* ── 1 — chrome: internal-page header with in-page anchors ──
          Mounted as a SIBLING before <main> (exactly like production internal
          pages): `.section-lab` on <main> establishes a containing block, so a
          `position:fixed` header nested inside it would resolve to the band
          width and overflow on mobile. Outside <main>, it resolves to the
          viewport. */}
      <PageHeader theme="light" nav={HEADER_NAV} />

      <main className="ds-theme theme-demo section-lab">
        {/* ── 2 — HERO (soft) — the thesis ── */}
        <LabStatementHero
          surface="light"
          version={1}
          className="bg-cool-mist"
          eyebrow="Pitch-deck evaluation"
          titleLead="AI prepares the analysis."
          titleAccent="You decide."
          sub="EvalLense reads every pitch deck, extracts the claims, scores them against a fixed rubric and links each finding to its slide — so your team walks into every review with a defensible read on each company."
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

        {/* ── 3 — VALUE: bento overview (soft) ──
            LabBento `surface` is "light" | "ink" (it maps "light" → the `.soft`
            band class internally), so the plan's "soft" is expressed as "light". */}
        <LabBento
          id="value"
          surface="light"
          className="bg-line-field"
          eyebrow="What EvalLense does"
          title="From a batch of decks to a ranked, evidence-backed read"
          sub="One pass turns raw decks into comparable signals — extracted claims, rubric scores, surfaced risks and the evidence behind each one."
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
              body: "The same scoring rubric runs on every deck, so a strong score means the same thing across the batch.",
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

        {/* ── ENTERING THE DARK CHAPTER (soft → ink) ── */}
        <div
          className="tr-masked-divider tr-masked-divider--diagonal"
          data-from="soft"
          data-to="ink"
          aria-hidden="true"
        />

        {/* ── 4 — PROCESS: pinned steps (ink). Direct child of <main> (no
            transform/overflow ancestor) so the sticky pin stage works. ── */}
        <LabPinnedSteps
            id="process"
            surface="ink"
            ariaLabel="How a review runs, step by step"
            eyebrow="How a review runs"
            title={{
              line1: "One pass,",
              line2: "start to",
              line2Accent: "decision",
            }}
            sub="Each deck moves through the same pipeline. You watch it happen, step by step — and the last step is always a person."
            steps={[
              {
                num: "01",
                label: "Intake",
                desc: "Drop in a batch of decks; each is parsed and queued for review.",
              },
              {
                num: "02",
                label: "Read & extract",
                desc: "The model reads every slide and pulls the claims with the evidence behind them.",
              },
              {
                num: "03",
                label: "Score",
                desc: "A fixed rubric turns findings into comparable, traceable signals.",
              },
              {
                num: "04",
                label: "Rank",
                desc: "Scores roll up into one leaderboard you can defend line by line.",
              },
              {
                num: "05",
                label: "Decide",
                desc: "A person signs off — the final call always stays human.",
              },
            ]}
            media={{
              ratio: "4/3",
              label: "Pipeline view",
              hint: "deck moving through the steps",
              ariaLabel: "A deck moving through the review pipeline",
              parallaxY: 40,
            }}
            videoScrub={{
              src: "/assets/methodology/methodology-transition.mp4",
              frames: 0,
              ariaLabel: "Methodology transition — scrubbed by scroll through the stages",
            }}
            photos={[
              "/assets/_demo-pool/photo/deck-vault.png",
              "/assets/_demo-pool/photo/deck-scan.png",
              "/assets/_demo-pool/photo/scoring-matrix.png",
              "/assets/_demo-pool/photo/dark-unicorn-head-front.jpeg",
              "/assets/_demo-pool/photo/jury-decision.png",
            ]}
          />

        <div
          className="tr-lens-seam tr-lens-seam--strong"
          data-from="ink"
          data-to="ink"
          aria-hidden="true"
        />

        {/* ── 5 — DECISION APEX: human-in-the-loop, real <LabFullStatement>.
            Themed page-scoped (`.ds-theme #decision.band.ink`) to a deep
            nebula gradient so the apex stays cohesive with the dark chapter
            without being flat black. `.ink` supplies the light text. ── */}
        <LabFullStatement
          id="decision"
          surface="ink"
          eyebrow="Human in the loop"
          titleLead="The final call is always"
          titleAccent="yours"
          sub="EvalLense surfaces the evidence, scores it and ranks it. It never decides. The shortlist, the pass, the meeting — those stay with your team."
        />

        {/* ── 6 — CINEMA: inline `.ds-cinema` fullscreen knockout — the single
              cinematic moment. Copied VERBATIM from /dev/ds-sections; its CSS
              ships globally via components/ds/ds.css. Self-contained: full-screen
              video → knockout heading descends & zooms ×7→1 → lens fill restores
              the letters to solid → copy. 100% --pin-driven by <ScrollFX/>;
              mobile/reduced-motion = static. ── */}
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
                  <Button href="#" variant="gradient">Book a demo</Button>
                </div>
              </div>
            </div>
          </section>

        {/* ── LEAVING THE DARK CHAPTER (ink → soft) — dome divider then the
            gradient bridge, placed AFTER the .ds-cinema section (last dark item)
            and BEFORE the light #uses gallery. ── */}
        <div
          className="tr-masked-divider tr-masked-divider--dome"
          data-from="ink"
          data-to="soft"
          aria-hidden="true"
        />
        <div
          className="tr-gradient-bridge"
          data-from="ink"
          data-to="soft"
          aria-hidden="true"
        />

        {/* ── 7 — USES: horizontal gallery (light). Direct child of <main>. ── */}
        <LabGallery
          id="uses"
          surface="light"
          eyebrow="Where teams use it"
          title="One comparable read at every stage"
          sub="From first-look to committee — the same evidence-backed report the whole table reads the same way."
          laneLabel="Investment stages — horizontally scrollable"
          items={GALLERY_ITEMS}
        />

        <div
          className="tr-gradient-bridge"
          data-from="soft"
          data-to="ink"
          aria-hidden="true"
        />

        {/* ── 8 — CTA BAND (ink). CtaBand has no `id` prop, so the `#cta` anchor
            target lives on a thin wrapper around it. ── */}
        <div id="cta" className="ds-cta-anchor">
          <CtaBand
            theme="dark"
            videoSrc="/assets/cta/cube-1.mp4"
            auroraVariant="violet"
            eyebrow="Ready when you are"
            title="See your next cohort"
            titleAccent="ranked in a day"
            sub="Batch-review every pitch deck, surface the strongest startups, and hand each team an evidence-based report — with the final call always yours."
            primary={{ label: "Book a Demo", href: "#" }}
            secondary={{ label: "Try live demo", href: "#" }}
          />
        </div>

        {/* ── 9 — FOOTER (FooterFrame) ── */}
        <FooterFrame />

        {/* ── 10 — ScrollFX LAST: drives all data-reveal / data-scrub / data-pin ── */}
        <ScrollFX />
      </main>
    </>
  );
}
