import type { Metadata } from "next";
import Image from "next/image";
import type { CSSProperties } from "react";
import styles from "./banners.module.css";

export const metadata: Metadata = {
  title: "Brandbook · EvalLens Dev",
  description: "EvalLens brand guidelines, assets, and download center.",
  robots: {
    index: false,
    follow: false,
  },
};

const assetFormats = ["SVG", "PNG", "PDF", "AI", "EPS", "PSD"];

const iconFamilies = [
  {
    name: "Favicon",
    sizes: "16 · 32 · 96",
    note: "ICO master included",
  },
  {
    name: "Android",
    sizes: "36 · 48 · 72 · 96 · 144 · 192",
    note: "0.75× through 4×",
  },
  {
    name: "Apple",
    sizes: "57 · 60 · 72 · 76 · 114 · 120 · 144 · 152 · 180 · 192",
    note: "Touch icon family",
  },
  {
    name: "Microsoft",
    sizes: "70 · 144 · 150 · 310",
    note: "Browser tile family",
  },
];

const iconScale = [16, 32, 48, 96, 180, 192];

const typeScale = [
  { role: "Display", size: "88", weight: "600", sample: "Lens your next unicorn." },
  { role: "Heading 1", size: "64", weight: "600", sample: "Human-controlled." },
  { role: "Heading 2", size: "40", weight: "600", sample: "Evidence, not instinct." },
  { role: "Heading 3", size: "24", weight: "600", sample: "Review every deck." },
  { role: "Body", size: "18", weight: "400", sample: "AI reviews. Human decides." },
  { role: "Label", size: "12", weight: "400", sample: "BATCH REVIEW · EVIDENCE MAP" },
];

const brandColors = [
  { name: "Violet", hex: "#674DE8" },
  { name: "Electric violet", hex: "#9E4BE8" },
  { name: "Magenta", hex: "#D24AE9" },
  { name: "Lavender", hex: "#EDA8F2" },
  { name: "Ink", hex: "#000000" },
  { name: "Paper", hex: "#F5F5F7" },
];

const brandBoards = [
  {
    name: "Logo system",
    detail: "Primary, reversed, and symbol lockups",
    src: "/assets/brand/brandbook/evallens-logo-system-board.png",
    width: 1435,
    height: 1096,
  },
  {
    name: "Usage & scale",
    detail: "Spelling, clear space, typography, and sizing",
    src: "/assets/brand/brandbook/evallens-usage-scale-board.png",
    width: 1469,
    height: 1071,
  },
  {
    name: "Brand overview",
    detail: "Color, applications, social, and display guidance",
    src: "/assets/brand/brandbook/evallens-brand-overview-board.png",
    width: 1448,
    height: 1086,
  },
];

const downloads = [
  {
    name: "Complete brand kit",
    detail: "ZIP · logo masters, icons, banner, tokens",
    href: "/assets/brand/downloads/evallens-brand-kit.zip",
    featured: true,
  },
  {
    name: "Primary logo",
    detail: "SVG · black wordmark",
    href: "/assets/brand/evallens-logo-dark.svg",
  },
  {
    name: "Reversed logo",
    detail: "SVG · white wordmark",
    href: "/assets/brand/evallens-logo-light.svg",
  },
  {
    name: "Unicorn symbol",
    detail: "SVG · transparent",
    href: "/assets/brand/evallens-mark.svg",
  },
  {
    name: "Social banner",
    detail: "PNG · 1200 × 630",
    href: "/opengraph-image.png",
  },
  {
    name: "Design tokens",
    detail: "JSON · colors and typography",
    href: "/assets/brand/downloads/evallens-brand-tokens.json",
  },
  {
    name: "Color tokens",
    detail: "CSS · custom properties",
    href: "/assets/brand/downloads/evallens-brand-tokens.css",
  },
  {
    name: "Typography setup",
    detail: "CSS · system stack and type scale",
    href: "/assets/brand/downloads/evallens-typography.css",
  },
  ...brandBoards.map((board) => ({
    name: `${board.name} board`,
    detail: `PNG · ${board.width} × ${board.height}`,
    href: board.src,
  })),
];

function SectionHeading({
  index,
  id,
  title,
  meta,
}: {
  index: string;
  id: string;
  title: string;
  meta?: string;
}) {
  return (
    <div className={styles.sectionHeading}>
      <div>
        <span className={styles.index}>{index}</span>
        <h2 id={id}>{title}</h2>
      </div>
      {meta && <span className={styles.size}>{meta}</span>}
    </div>
  );
}

function FormatList() {
  return (
    <span className={styles.formats}>
      {assetFormats.map((format) => (
        <span key={format}>{format}</span>
      ))}
    </span>
  );
}

export default function BrandbookPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <span className={styles.eyebrow}>EvalLens · Identity system</span>
        <h1>Brandbook.</h1>
        <p>
          The working source for logo masters, social previews, spelling,
          sizing, color, typography, application icons, and downloadable files.
        </p>
        <div className={styles.headerActions}>
          <a
            className={styles.primaryDownload}
            href="/assets/brand/downloads/evallens-brand-kit.zip"
            download
          >
            Download complete kit
            <span>ZIP</span>
          </a>
          <a className={styles.textLink} href="#downloads">
            Browse individual files ↓
          </a>
        </div>
      </header>

      <section className={styles.section} aria-labelledby="foundation-title">
        <SectionHeading
          index="01"
          id="foundation-title"
          title="Brand foundation"
          meta="Purpose · promise · voice"
        />

        <div className={styles.foundation}>
          <article className={styles.foundationLead}>
            <span className={styles.specLabel}>Brand promise</span>
            <p>
              AI reviews.
              <br />
              <span>Human decides.</span>
            </p>
          </article>
          <article>
            <span className={styles.specLabel}>Purpose</span>
            <h3>Find the strongest teams without losing human judgment.</h3>
            <p>
              EvalLens turns every pitch deck into comparable evidence, giving
              accelerators, investors, and competition teams a faster and more
              transparent way to review a batch.
            </p>
          </article>
          <article>
            <span className={styles.specLabel}>Voice</span>
            <h3>Precise, direct, and calmly confident.</h3>
            <p>
              Explain the evidence. Keep claims specific. Use plain language.
              Never imply that AI makes the final decision.
            </p>
          </article>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="boards-title">
        <SectionHeading
          index="02"
          id="boards-title"
          title="Identity boards"
          meta="Reference sheets · direct downloads"
        />

        <div className={styles.boardGrid}>
          {brandBoards.map((board, index) => (
            <figure
              className={index === 2 ? styles.boardWide : undefined}
              key={board.name}
            >
              <a href={board.src} download>
                <Image
                  src={board.src}
                  alt={`${board.name} brand guideline board`}
                  width={board.width}
                  height={board.height}
                  sizes={
                    index === 2
                      ? "(max-width: 900px) 100vw, 1320px"
                      : "(max-width: 900px) 100vw, 660px"
                  }
                />
              </a>
              <figcaption>
                <span>
                  <strong>{board.name}</strong>
                  <small>{board.detail}</small>
                </span>
                <a href={board.src} download aria-label={`Download ${board.name}`}>
                  PNG ↓
                </a>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className={styles.section} aria-labelledby="og-banner-title">
        <SectionHeading
          index="03"
          id="og-banner-title"
          title="Default social preview"
          meta="Open Graph · 1200 × 630"
        />

        <figure className={styles.preview}>
          <div
            className={styles.banner}
            role="img"
            aria-label="EvalLens. AI reviews. Human decides."
          >
            <Image
              className={styles.finalBanner}
              src="/opengraph-image.png"
              alt=""
              fill
              priority
              sizes="(max-width: 1280px) 100vw, 1200px"
            />
          </div>
          <figcaption>
            1.91:1 · canonical image for Open Graph and Twitter/X
          </figcaption>
        </figure>
      </section>

      <section className={styles.section} aria-labelledby="logo-system-title">
        <SectionHeading
          index="04"
          id="logo-system-title"
          title="Logo system"
          meta="Master lockups"
        />

        <div className={styles.assetRows}>
          <article className={styles.assetRow}>
            <div className={styles.assetInfo}>
              <span className={styles.assetNumber}>01</span>
              <h3>Primary</h3>
              <p>Use the black wordmark on light and neutral surfaces.</p>
              <FormatList />
            </div>
            <div className={`${styles.logoSurface} ${styles.logoSurfaceLight}`}>
              <Image
                className={styles.logoLockup}
                src="/assets/brand/evallens-logo-dark.svg"
                alt="EvalLens logo with black wordmark"
                width={720}
                height={250}
                style={{ width: "min(78%, 720px)", height: "auto" }}
              />
            </div>
          </article>

          <article className={styles.assetRow}>
            <div className={styles.assetInfo}>
              <span className={styles.assetNumber}>02</span>
              <h3>Reversed</h3>
              <p>Use the white wordmark on black and dark imagery.</p>
              <FormatList />
            </div>
            <div className={`${styles.logoSurface} ${styles.logoSurfaceDark}`}>
              <Image
                className={styles.logoLockup}
                src="/assets/brand/evallens-logo-light.svg"
                alt="EvalLens logo with white wordmark"
                width={720}
                height={250}
                style={{ width: "min(78%, 720px)", height: "auto" }}
              />
            </div>
          </article>

          <article className={styles.assetRow}>
            <div className={styles.assetInfo}>
              <span className={styles.assetNumber}>03</span>
              <h3>Symbol</h3>
              <p>For avatars, favicons, compact controls, and app icons.</p>
              <FormatList />
            </div>
            <div className={styles.symbolSurfaces}>
              <div className={styles.symbolDark}>
                <Image
                  src="/assets/brand/evallens-mark.svg"
                  alt="EvalLens unicorn symbol"
                  width={284}
                  height={284}
                  style={{ width: "min(48%, 284px)", height: "auto" }}
                />
              </div>
              <div className={styles.symbolLight}>
                <Image
                  src="/assets/brand/evallens-mark.svg"
                  alt=""
                  width={156}
                  height={156}
                  style={{ width: "min(38%, 156px)", height: "auto" }}
                />
              </div>
            </div>
          </article>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="usage-title">
        <SectionHeading
          index="05"
          id="usage-title"
          title="Usage & scale"
          meta="Working web specification"
        />

        <div className={styles.usageGrid}>
          <article className={styles.spelling}>
            <span className={styles.specLabel}>Brand spelling</span>
            <div
              className={styles.correctWordmark}
              role="img"
              aria-label="EvalLens"
            >
              <Image
                src="/assets/brand/evallens-logo-light.svg"
                alt=""
                width={720}
                height={250}
              />
            </div>
            <p className={styles.spellingRule}>
              Capital E · capital L · no final <span>e</span>
            </p>
            <div className={styles.incorrect}>
              <p>EvalLense</p>
              <span>Do not use</span>
            </div>
            <p className={styles.usageNote}>
              Source filenames retain the historical “EvalLense” spelling.
              Public-facing copy must always use “EvalLens”.
            </p>
          </article>

          <article className={styles.minimums}>
            <span className={styles.specLabel}>Recommended minimum size</span>
            <div className={styles.minimumVisuals}>
              <div>
                <span>Logo lockup</span>
                <Image
                  className={styles.minimumLogo}
                  src="/assets/brand/evallens-logo-light.svg"
                  alt="EvalLens logo at recommended minimum width"
                  width={160}
                  height={55}
                  style={{ width: 160, height: 55 }}
                />
                <b>160 px</b>
              </div>
              <div>
                <span>Symbol only</span>
                <Image
                  className={styles.minimumMark}
                  src="/assets/brand/evallens-mark.svg"
                  alt="EvalLens symbol at recommended minimum width"
                  width={24}
                  height={24}
                />
                <b>24 px</b>
              </div>
            </div>
            <p className={styles.usageNote}>
              Below these sizes, prefer the standalone symbol and verify it at
              native pixel density.
            </p>
          </article>

          <article className={styles.clearSpace}>
            <span className={styles.specLabel}>Clear space</span>
            <div className={styles.clearSpaceVisual}>
              <div className={styles.clearSpaceBox}>
                <Image
                  src="/assets/brand/evallens-mark.svg"
                  alt="EvalLens symbol clear-space construction"
                  width={190}
                  height={190}
                  style={{ width: "50%", height: "50%" }}
                />
              </div>
              <p>
                Keep a minimum clear space equal to the width of the symbol’s
                vertical stem on every side.
              </p>
            </div>
          </article>

          <article className={styles.iconScale}>
            <span className={styles.specLabel}>App icon scale</span>
            <div className={styles.iconScaleRow}>
              {iconScale.map((size) => (
                <div key={size}>
                  <div className={styles.iconScaleStage}>
                    <Image
                      src="/assets/brand/evallens-mark.svg"
                      alt=""
                      width={size}
                      height={size}
                      style={{ width: size, height: "auto", maxWidth: "100%" }}
                    />
                  </div>
                  <span>{size} px</span>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="icons-title">
        <SectionHeading
          index="06"
          id="icons-title"
          title="Icon export matrix"
          meta="All source dimensions"
        />

        <div className={styles.iconTable} role="table" aria-label="Icon sizes">
          {iconFamilies.map((family) => (
            <div className={styles.iconTableRow} role="row" key={family.name}>
              <strong role="cell">{family.name}</strong>
              <span role="cell">{family.sizes}</span>
              <small role="cell">{family.note}</small>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section} aria-labelledby="type-title">
        <SectionHeading
          index="07"
          id="type-title"
          title="Website typography"
          meta="SF Pro / system stack"
        />

        <div className={styles.typeIntro}>
          <div className={styles.typeHero}>Aa</div>
          <div>
            <h3>SF Pro Display / SF Pro Text</h3>
            <p>
              The website uses the native Apple/system sans stack. The EvalLens
              wordmark is custom vector artwork and must never be recreated by
              typesetting.
            </p>
          </div>
          <code>600 / 400</code>
        </div>

        <div className={styles.fontActions}>
          <a
            href="/assets/brand/downloads/evallens-typography.css"
            download
          >
            Download typography CSS
          </a>
          <a
            href="https://developer.apple.com/fonts/"
            target="_blank"
            rel="noreferrer"
          >
            Get SF Pro from Apple ↗
          </a>
        </div>

        <div className={styles.typeTable}>
          {typeScale.map((item) => (
            <div
              className={styles.typeRow}
              style={{ "--sample-size": `${item.size}px` } as CSSProperties}
              key={item.role}
            >
              <div>
                <strong>{item.role}</strong>
                <span>
                  {item.size}px · {item.weight}
                </span>
              </div>
              <p>{item.sample}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section} aria-labelledby="color-title">
        <SectionHeading
          index="08"
          id="color-title"
          title="Core color"
          meta="Extracted from vector masters"
        />

        <div className={styles.colorRail}>
          {brandColors.map((color) => (
            <div key={color.hex}>
              <span
                className={styles.colorSwatch}
                style={{ background: color.hex }}
                aria-hidden="true"
              />
              <strong>{color.name}</strong>
              <code>{color.hex}</code>
            </div>
          ))}
        </div>
      </section>

      <section
        className={styles.section}
        id="downloads"
        aria-labelledby="downloads-title"
      >
        <SectionHeading
          index="09"
          id="downloads-title"
          title="Download center"
          meta="Files served directly"
        />

        <div className={styles.downloadGrid}>
          {downloads.map((item) => (
            <a
              className={item.featured ? styles.downloadFeatured : undefined}
              href={item.href}
              download
              key={item.name}
            >
              <span>
                <strong>{item.name}</strong>
                <small>{item.detail}</small>
              </span>
              <b aria-hidden="true">↓</b>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
