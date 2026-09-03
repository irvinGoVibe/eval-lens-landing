import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { ScrollFX } from "@/components/ScrollFX";
import { FooterFrame } from "@/components/ds/FooterFrame";
import {
  Bento,
  Cinema,
  CtaBand,
  EditorialSplit,
  Gallery,
  Numbered,
  StatementHero,
} from "@/components/ds";
import type { SectionNav } from "@/lib/site-nav";

export const metadata: Metadata = {
  title: "DS Theme — EvalLens",
  description: "A cohesive page composed from the current EvalLens design system.",
};

const NAV: SectionNav = {
  section: "DS Theme",
  links: [
    { label: "Value", href: "#value" },
    { label: "Process", href: "#process" },
    { label: "Decision", href: "#decision" },
    { label: "CTA", href: "#cta" },
  ],
};

const GALLERY = [
  { tag: "Seed", title: "Pre-product bets", body: "Compare teams when vision is stronger than traction." },
  { tag: "Series A", title: "Early traction", body: "Read growth and retention against the category." },
  { tag: "Growth", title: "Scaling proof", body: "Compare efficiency, evidence and defensibility." },
  { tag: "Committee", title: "Shared view", body: "One report the whole table can interrogate." },
];

export default function DsThemePage() {
  return (
    <>
      <PageHeader theme="light" nav={NAV} />
      <main className="ds-theme section-lab ds">
        <StatementHero
          surface="light"
          version={1}
          eyebrow="Pitch-deck evaluation"
          titleLead="AI prepares the analysis."
          titleAccent="You decide."
          sub="A complete design-system page: quiet editorial surfaces, one dark chapter, evidence-led visuals and a clear close."
          ctas={[
            { label: "View sections", href: "/dev/ds-sections" },
            { label: "View atoms", href: "/dev/ds-atoms" },
          ]}
        />

        <Bento
          id="value"
          surface="light"
          version={1}
          eyebrow="What the system holds"
          title="A reusable visual language, not a page template"
          sub="Sections share typography, spacing and interaction rules while each page keeps its own narrative."
          items={[
            { tag: "Evidence", title: "Every score has a source", body: "Findings stay connected to the document behind them.", feature: true },
            { tag: "Consistency", title: "One rubric", body: "Every entry is read through the same dimensions." },
            { tag: "Control", title: "Human decision", body: "The final call remains with the review team." },
            { tag: "Scale", title: "Batch first", body: "The same system works across an entire intake." },
          ]}
        />

        <EditorialSplit
          id="process"
          surface="light"
          version={1}
          eyebrow="Grounded analysis"
          titleLead="Every finding links back to a"
          titleAccent="slide"
          sub="The editorial split pairs a concise argument with a visible, ratio-locked media area."
          points={[
            { title: "Source first", body: "Claims are connected to the exact page that supports them." },
            { title: "Inspectable score", body: "A reviewer can see what raised or lowered each dimension." },
            { title: "Ready for discussion", body: "Open questions are carried into the human review room." },
          ]}
          media={{ ratio: "4/3", label: "Report · evidence chain · 4:3", hint: "Finding → quote → page reference", ariaLabel: "Evidence-chain media placeholder" }}
        />

        <Numbered
          id="decision"
          surface="ink"
          version={3}
          eyebrow="Operating principles"
          title="Three rules behind every page"
          sub="The dark chapter changes the pace once, then gives the reader a clear path to the close."
          items={[
            { num: "01", title: "Evidence before opinion", body: "Show the basis of a conclusion before presenting its score." },
            { num: "02", title: "One system, varied rhythm", body: "Reuse primitives without making every page identical." },
            { num: "03", title: "Human responsibility", body: "Automation prepares the decision; people remain accountable." },
          ]}
        />

        <Gallery
          surface="light"
          version={1}
          eyebrow="Horizontal gallery"
          title="Equal ideas in one readable lane"
          sub="Use a gallery when several items have equal hierarchy and should not become a tall card wall."
          laneLabel="Review stages — horizontally scrollable"
          items={GALLERY}
        />

        <Cinema
          surface="ink"
          headline="AI prepares. You decide."
          mobileLines={["AI prepares.", "You decide."]}
          sub="One cinematic transition resolves the page into its central principle."
          cta={{ label: "Explore the visual lab", href: "/dev/visual-lab" }}
          media={{ videoSrc: "/assets/methodology/cinema.mp4" }}
        />

        <div id="cta">
          <CtaBand
            theme="dark"
            videoSrc="/assets/cta/cube-1.mp4"
            auroraVariant="violet"
            eyebrow="Design-system showcase"
            title="Build pages from"
            titleAccent="shared primitives"
            sub="Inspect the atoms, sections and visual layers before composing a production page."
            primary={{ label: "DS Sections", href: "/dev/ds-sections" }}
            secondary={{ label: "Brandbook", href: "/dev/brandbook" }}
          />
        </div>

        <FooterFrame />
        <ScrollFX />
      </main>
    </>
  );
}
