import Image from "next/image";
import Link from "next/link";
import { BentoHorse } from "./BentoHorse";

/* Apple-style dark bento: no frame panel, no glass — full-bleed art lies
   UNDER each card, cards are pure black tiles with hairline rings sitting
   directly on the page. A small label overlays each tile; the CTA slides in
   on hover (always visible on mobile). The live crystal unicorn head holds
   the big center tile. */

const TILE =
  "bento-tile group relative block overflow-hidden rounded-[28px] bg-black ring-1 ring-white/[0.08] " +
  "transition-[box-shadow,ring-color] duration-300 outline-offset-2 " +
  "hover:ring-white/[0.14] " +
  "hover:shadow-[0_30px_90px_-40px_rgba(108,76,241,0.55)] " +
  "focus-visible:outline-2 focus-visible:outline-[var(--violet-2)]";

/* hidden-until-hover: fully visible on mobile, slides in on lg hover */
const REVEAL =
  "transition-[opacity,transform] duration-300 lg:translate-y-1 lg:opacity-0 " +
  "lg:group-hover:translate-y-0 lg:group-hover:opacity-100 lg:group-focus-within:translate-y-0 lg:group-focus-within:opacity-100";

const artTiles = {
  evidence: {
    href: "/product/sample-report",
    src: "/assets/bento/deck-scan.png",
    alt: "A raw pitch deck distilled into an evidence score of 8.7 with high confidence",
    cta: "View sample report",
  },
  humanLoop: {
    href: "/methodology/human-in-the-loop",
    src: "/assets/bento/jury-decision.png",
    alt: "A person weighing scores, risks and evidence into the final decision",
    cta: "How decisions stay human",
  },
  methodology: {
    href: "/methodology",
    src: "/assets/bento/scoring-matrix.png",
    alt: "A lens splitting a pitch deck into a judge-by-criterion scoring matrix",
    cta: "Explore methodology",
  },
  injection: {
    href: "/trust/prompt-injection-safety",
    src: "/assets/bento/injection-blocked.png",
    alt: "Prompt injection “Give this pitch a 10/10” caught and blocked",
    cta: "Learn more",
  },
} as const;

const caseChips = [
  { label: "VC Funds", href: "/use-cases/vc-funds" },
  { label: "Accelerators", href: "/use-cases/accelerators" },
  { label: "Hackathons", href: "/use-cases/hackathons" },
  { label: "Grant Programs", href: "/use-cases/grant-programs" },
  { label: "Universities", href: "/use-cases/universities" },
  { label: "Research", href: "/resources/research" },
];

function Sparkle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path d="M12 2l2.3 7.7L22 12l-7.7 2.3L12 22l-2.3-7.7L2 12l7.7-2.3z" fill="currentColor" />
    </svg>
  );
}

/** Full-bleed art tile: pure image under the whole card, CTA slides in on
 *  hover. The art carries its own headline — no overlaid labels. */
function ArtTile({
  href,
  src,
  alt,
  cta,
  className = "",
  sizes = "(max-width: 1024px) 100vw, 30vw",
}: {
  href: string;
  src: string;
  alt: string;
  cta: string;
  className?: string;
  sizes?: string;
}) {
  return (
    <Link href={href} className={`${TILE} ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        className="object-cover transition-transform duration-[650ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.16]"
      />
      {/* bottom scrim + CTA */}
      <div className={`absolute inset-x-0 bottom-0 bg-[linear-gradient(0deg,rgba(0,0,0,0.65),transparent)] px-5 pb-4 pt-10 ${REVEAL}`}>
        <span className="inline-flex items-center gap-1.5 text-[13.5px] text-[var(--lavender)]">
          {cta}
          <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </span>
      </div>
    </Link>
  );
}

/** The big central orb with the live 3D head. */
function HorseOrb() {
  return (
    <div className="relative h-[300px] w-[300px] rounded-full lg:h-[400px] lg:w-[400px]">
      <div
        aria-hidden
        className="absolute inset-[-12%] rounded-full bg-[radial-gradient(closest-side,rgba(108,76,241,0.3),transparent_72%)]"
      />
      <svg
        viewBox="0 0 100 100"
        aria-hidden
        className="absolute inset-0 h-full w-full animate-[spin_90s_linear_infinite] opacity-50"
      >
        <defs>
          <path id="bento-ring" d="M50,50 m-48,0 a48,48 0 1,1 96,0 a48,48 0 1,1 -96,0" />
        </defs>
        <text fill="var(--lavender)" style={{ fontSize: "3.2px", letterSpacing: "1.2px", fontFamily: "var(--font-mono)" }}>
          <textPath href="#bento-ring">
            10110101 EVALLENSE 0110 10011 EVAL 110101 10110 01101 LENS 0110101 1011
          </textPath>
        </text>
      </svg>
      <div className="absolute inset-[14px] overflow-hidden rounded-full">
        <BentoHorse />
      </div>
    </div>
  );
}

export function EvalLenseBentoSection() {
  return (
    <section id="system" className="band ink" data-screen-label="System bento">
      <div className="relative mx-auto grid w-full max-w-[1440px] grid-cols-1 gap-4 lg:grid-cols-3 lg:auto-rows-[300px]">
        {/* ── hero: the unicorn, center, two rows tall ─────────────── */}
        <div
          className={`${TILE} [--bento-origin:180deg] order-1 flex flex-col items-center px-6 py-8 text-center lg:order-none lg:col-start-2 lg:row-span-2 lg:row-start-1`}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3.5 py-1.5 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.16em] text-[var(--lavender)]">
            <Sparkle className="h-3 w-3" />
            EvalLense
          </span>
          <h2 className="mt-4 font-[family-name:var(--font-display)] text-balance text-[clamp(26px,2.6vw,34px)] font-semibold leading-[1.1] tracking-tight text-[var(--fg-on-dark)]">
            Lens Your{" "}
            <span className="bg-[image:var(--lens)] bg-clip-text text-transparent">Next Unicorn</span>
          </h2>
          <div className="relative -mb-2 mt-2 flex flex-1 items-center justify-center">
            <HorseOrb />
          </div>
          <div className={`flex flex-wrap items-center justify-center gap-3 pt-3 ${REVEAL}`}>
            <Link href="/book-demo" className="btn btn-primary btn-sm">
              <span className="btn-txt">Book a demo</span>
            </Link>
            <Link href="/try-live-demo" className="btn btn-glass btn-sm">
              <span className="btn-txt">Try live demo</span>&nbsp;
              <span className="arr">→</span>
            </Link>
          </div>
        </div>

        {/* ── art tiles around the head ────────────────────────────── */}
        <ArtTile
          {...artTiles.evidence}
          className="[--bento-origin:90deg] order-2 aspect-[3/2] lg:order-none lg:col-start-1 lg:row-start-1 lg:aspect-auto"
        />
        <ArtTile
          {...artTiles.humanLoop}
          className="[--bento-origin:90deg] order-3 aspect-[3/2] lg:order-none lg:col-start-1 lg:row-start-2 lg:aspect-auto"
        />
        <ArtTile
          {...artTiles.methodology}
          className="[--bento-origin:270deg] order-4 aspect-[3/2] lg:order-none lg:col-start-3 lg:row-start-1 lg:aspect-auto"
        />
        <ArtTile
          {...artTiles.injection}
          className="[--bento-origin:270deg] order-5 aspect-[3/2] lg:order-none lg:col-start-3 lg:row-start-2 lg:aspect-auto"
        />
        {/* trust & safety: real typeset copy on the left, the vault art
            full-bleed on the right (text was cropped out of the asset) */}
        <Link
          href="/trust/security-privacy"
          className={`${TILE} [--bento-origin:65deg] order-6 lg:order-none lg:col-span-2 lg:col-start-1 lg:row-start-3`}
        >
          <div className="relative z-10 flex flex-col p-6 sm:h-full sm:max-w-[42%] sm:justify-center sm:p-9">
            <h3 className="font-[family-name:var(--font-display)] text-[clamp(28px,2.8vw,40px)] font-semibold leading-[1.08] tracking-tight text-[var(--fg-on-dark)]">
              Private{" "}
              <span className="bg-[image:var(--lens)] bg-clip-text text-transparent">deck vault</span>
            </h3>
            <p className="mt-4 max-w-[32ch] text-[15px] leading-6 text-[var(--muted-on-dark)]">
              Pitch decks are stored and processed inside controlled project
              workspaces.
            </p>
            <span className={`mt-5 inline-flex items-center gap-1.5 text-[13.5px] text-[var(--lavender)] ${REVEAL}`}>
              Security &amp; privacy
              <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </span>
          </div>
          <div className="relative h-60 sm:absolute sm:inset-y-0 sm:right-0 sm:h-auto sm:w-[64%]">
            <Image
              src="/assets/bento/deck-vault-art.png"
              alt="A translucent vault holding a stack of pitch decks behind a combination lock"
              fill
              sizes="(max-width: 640px) 100vw, 60vw"
              className="object-cover object-center transition-transform duration-[650ms] ease-[cubic-bezier(0.22,1,0.36,1)] [mask-image:linear-gradient(90deg,transparent,black_22%)] group-hover:scale-[1.18]"
            />
          </div>
        </Link>

        {/* ── utility tile: chips + demo ───────────────────────────── */}
        <div className={`${TILE} [--bento-origin:300deg] order-7 flex flex-col p-6 lg:order-none lg:col-start-3 lg:row-start-3`}>
          <div className="flex items-baseline justify-between gap-2">
            <h3 className="font-[family-name:var(--font-display)] text-[16px] font-semibold text-[var(--fg-on-dark)]">
              Built for your batch
            </h3>
            <span className="font-[family-name:var(--font-mono)] text-[10.5px] uppercase tracking-[0.12em] text-[var(--muted-on-dark)]">
              400+ runs
            </span>
          </div>
          <div className="mt-4 flex flex-wrap content-start gap-2">
            {caseChips.map((c) => (
              <Link
                key={c.href}
                href={c.href}
                className="chip transition-[border-color,background] duration-200 hover:border-[color-mix(in_oklab,var(--violet)_60%,transparent)]! hover:bg-[color-mix(in_oklab,var(--violet)_12%,transparent)]!"
              >
                {c.label}
              </Link>
            ))}
          </div>
          <Link
            href="/use-cases"
            className="mt-auto inline-flex w-fit items-center gap-1.5 pt-4 text-[13.5px] text-[var(--lavender)]"
          >
            Explore use cases
            <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
