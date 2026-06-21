import type { Metadata } from "next";
import { ScrollFX } from "@/components/ScrollFX";
import { LabBento } from "@/components/sections/lab/LabBento";
import { LabFullStatement } from "@/components/sections/lab/LabFullStatement";
import { LabStatementHero } from "@/components/sections/lab/LabStatementHero";

export const metadata: Metadata = { title: "DS Sections" };

const BENTO_ITEMS = [
  {
    tag: "Pattern",
    title: "Background pattern language",
    body: "Soft lens grids, hairline structure and ambient media areas give pages enough context to judge sections.",
    feature: true,
    media: {
      label: "Image · pattern system · 16:9",
      hint: "Layered lens grid, section masks and media frames on a dark surface.",
      ariaLabel: "Background pattern system visual slot",
    },
  },
  {
    tag: "Motion",
    title: "One scroll runtime",
    body: "Sections use data attributes and the shared ScrollFX loop.",
  },
  {
    tag: "Media",
    title: "Visible placeholders",
    body: "Every future image or video slot is labeled and ratio-locked.",
  },
  {
    tag: "QA",
    title: "Reusable checks",
    body: "Each section can be inspected at mobile, tablet and desktop widths.",
  },
];

/**
 * /dev/ds-sections — DS SECTIONS workspace.
 *
 * Вытягиваем реальные секции (section-lab / gallery) сюда. Версии + переключатель
 * Light/Soft/Dark даёт DevInspector (цепляется к любой `.lab-*` секции внутри
 * `section-lab`, управляется кнопкой dev:show/hide) — ровно как на /dev/section-lab.
 *
 * ⚠️ `<ScrollFX/>` ОБЯЗАТЕЛЕН: без него все `data-reveal`-элементы секций остаются
 * opacity:0 (секция выглядит пустой). Lab-hero сам форсит reveal, остальные — нет.
 *
 * 1 — Hero (LabStatementHero): 4 версии · 2 — Bento (LabBento): 3 версии.
 */
export default function DsSectionsPage() {
  return (
    <main className="ds-sections section-lab">
      <LabStatementHero
        marker="01 · Statement hero"
        surface="soft"
        version={1}
        eyebrow="Statement hero"
        titleLead="AI prepares the analysis — a human"
        titleAccent="decides"
        sub="Evidence-first scoring, then a person signs off — built to read on light and dark."
        ctas={[
          { label: "Get started", href: "#" },
          { label: "See how it works", href: "#" },
        ]}
        media={{
          ratio: "16/9",
          label: "Hero · lens",
          hint: "Lens-gradient violet→cyan→aqua over Apple-neutral, calm depth",
          ariaLabel: "Hero lens illustration",
        }}
      />

      <LabBento
        id="bento"
        surface="ink"
        marker="07 · Bento overview"
        ariaLabel="Bento overview"
        eyebrow="Bento overview"
        title="A compact map of reusable ingredients"
        sub="The bento pattern is for overview, not decoration: one large idea plus supporting tiles that explain how the system holds together."
        items={BENTO_ITEMS}
      />

      <LabFullStatement
        marker="02 · Full-bleed statement"
        surface="ink"
        ariaLabel="Full-bleed statement"
        eyebrow="The thesis"
        titleLead="AI does the reading; the"
        titleAccent="decision"
        titleTrail="stays human"
        sub="One clear sentence between dense sections — a deliberate pause that says what the product stands for before the next block of detail."
      />

      <ScrollFX />
    </main>
  );
}
