import type { Metadata } from "next";
import { ScrollFX } from "@/components/ScrollFX";
import { LabBento } from "@/components/sections/lab/LabBento";
import { LabCinemaScrim } from "@/components/sections/lab/LabCinemaScrim";
import { LabFullStatement } from "@/components/sections/lab/LabFullStatement";
import { LabGallery } from "@/components/sections/lab/LabGallery";
import { LabStatementHero } from "@/components/sections/lab/LabStatementHero";

export const metadata: Metadata = { title: "DS Sections" };

const GALLERY_ITEMS = [
  { tag: "Seed", title: "Pre-product bets", body: "Judge teams and markets when there is more vision than traction." },
  { tag: "Series A", title: "Early traction", body: "Weigh growth, retention and unit economics against the category." },
  { tag: "Growth", title: "Scaling proof", body: "Compare efficiency and defensibility as the numbers mature." },
  { tag: "Diligence", title: "Evidence trail", body: "Every score links to the deck page and the source behind it." },
  { tag: "Committee", title: "Shared view", body: "One comparable report the whole table can read the same way." },
];

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

      <LabGallery
        id="gallery"
        surface="light"
        marker="06 · Horizontal gallery"
        ariaLabel="Horizontal gallery"
        eyebrow="Horizontal gallery"
        title="Equal ideas in one scrollable lane"
        sub="A horizontal lane keeps a set of equal ideas from becoming a tall wall of cards — for stages, report parts, segments and use cases."
        laneLabel="Investment stages — horizontally scrollable"
        items={GALLERY_ITEMS}
      />

      <LabCinemaScrim
        id="cinema"
        surface="ink"
        eyebrow="The handoff"
        headline="AI prepares. You decide."
        sub="A cinematic close — the video runs full-screen, then resolves into one statement on black."
        cta={{ label: "Book a demo", href: "#" }}
        media={{ videoSrc: "/assets/methodology/cinema.mp4" }}
      />

      <ScrollFX />
    </main>
  );
}
