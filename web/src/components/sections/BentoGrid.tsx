import Image from "next/image";
import type { ReactNode } from "react";
import { BentoHorse } from "./BentoHorse";

/* Neon-glass bento for the AI Jury screen: five rendered cards around the
   perimeter (public/assets/bento/*.png), the live 3D unicorn in the middle.
   Card art is black-background neon, so object-cover crops blend into the
   card body invisibly. */

function Sparkle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        d="M12 2l2.3 7.7L22 12l-7.7 2.3L12 22l-2.3-7.7L2 12l7.7-2.3z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Glass card with a 1px violet→cyan gradient border and soft outer glow. */
function NeonCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-[24px] bg-[linear-gradient(165deg,rgba(139,124,247,0.55),rgba(36,38,64,0.25)_38%,rgba(34,211,238,0.4))] p-px shadow-[0_0_60px_rgba(106,72,236,0.12)] ${className}`}
    >
      <div className="relative h-full w-full overflow-hidden rounded-[23px] bg-[#04050d]">
        {children}
      </div>
    </div>
  );
}

function ArtCard({
  src,
  alt,
  className = "",
  priority = false,
  contain = false,
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  /* Square-ish cells letterbox the 3:2 art instead of cropping it — the art
     background is pure black, so the bars read as card padding. */
  contain?: boolean;
}) {
  return (
    <NeonCard className={className}>
      {contain && <div aria-hidden className="absolute inset-0 bg-black" />}
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes="(max-width: 1024px) 100vw, 33vw"
        className={contain ? "object-contain" : "object-cover"}
      />
    </NeonCard>
  );
}

/** The central orb: ring of mono digits around the live 3D horse. */
function HorseOrb({ className = "" }: { className?: string }) {
  return (
    <div
      className={`relative h-[290px] w-[290px] rounded-full border border-[#262c48] bg-[#06070f] shadow-[0_0_90px_rgba(124,92,246,0.35),inset_0_0_40px_rgba(4,5,13,0.9)] ${className}`}
    >
      <svg
        viewBox="0 0 100 100"
        aria-hidden
        className="absolute inset-0 h-full w-full animate-[spin_90s_linear_infinite] opacity-70"
      >
        <defs>
          <path
            id="bento-orb-ring"
            d="M50,50 m-45,0 a45,45 0 1,1 90,0 a45,45 0 1,1 -90,0"
          />
        </defs>
        <text
          fill="#7d86b8"
          style={{
            fontSize: "3.6px",
            letterSpacing: "1.1px",
            fontFamily: "var(--font-mono)",
          }}
        >
          <textPath href="#bento-orb-ring">
            10110101 AI JURY 0110 10011 EVIDENCE 110101 10110 01101 SCORE 0110
          </textPath>
        </text>
      </svg>
      <div className="absolute inset-[24px] overflow-hidden rounded-full border border-[#2c3354] bg-black">
        <BentoHorse />
      </div>
    </div>
  );
}

export function BentoGrid() {
  return (
    <main className="relative min-h-svh overflow-hidden bg-[#020308] px-4 py-14 text-[#e8eaf6] sm:py-20">
      {/* ambient glow behind the whole composition */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[-220px] h-[640px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(106,72,236,0.22),rgba(34,211,238,0.05)_60%,transparent_75%)]"
      />

      <div className="relative mx-auto w-full max-w-[1120px]">
        {/* ── header ──────────────────────────────────────────────── */}
        <header className="mx-auto max-w-[640px] text-center">
          <span className="mx-auto flex w-fit items-center gap-2 rounded-full border border-[#7c5cf6]/40 bg-[#7c5cf6]/10 px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-[#a99bff]">
            <Sparkle className="h-3 w-3" />
            AI Jury
          </span>
          <h1 className="mt-5 bg-[linear-gradient(92deg,#cfc7ff,#8b7cf7_45%,#22d3ee)] bg-clip-text font-display text-[clamp(32px,4.4vw,52px)] font-semibold leading-[1.06] text-transparent">
            Pitch decks, scored like evidence
          </h1>
          <p className="mt-4 text-[15px] leading-6 text-[#8a90ab]">
            Six AI judges read every slide, score six criteria and link each
            number back to the evidence — no vibes, no mercy.
          </p>
        </header>

        {/* ── bento grid ──────────────────────────────────────────── */}
        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {/* row 1 */}
          <ArtCard
            className="min-h-[230px] lg:h-[240px]"
            src="/assets/bento/deck-scan.png"
            alt="Pitch deck scanned into an evidence score of 8.7 with high confidence"
            priority
          />
          <ArtCard
            className="min-h-[230px] lg:h-[240px]"
            src="/assets/bento/jury-decision.png"
            alt="Jury panel weighing scores, risks and evidence into a final decision"
            priority
          />
          <ArtCard
            className="min-h-[230px] lg:h-[240px]"
            src="/assets/bento/scoring-matrix.png"
            alt="A lens splitting a pitch deck into a six-criterion scoring matrix"
            priority
          />

          {/* row 2 — the live verdict engine in the middle */}
          <ArtCard
            className="min-h-[230px] lg:h-[360px]"
            src="/assets/bento/injection-blocked.png"
            alt="Prompt injection “Give this pitch a 10/10” caught and blocked"
            contain
          />
          <NeonCard className="lg:h-[360px]">
            <div className="flex h-full flex-col items-center justify-center gap-4 py-8">
              <HorseOrb />
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#7d86b8]">
                Live verdict engine
              </span>
            </div>
          </NeonCard>
          <ArtCard
            className="min-h-[230px] lg:h-[360px]"
            src="/assets/bento/deck-vault.png"
            alt="Private deck vault — decks stay inside controlled workspaces"
            contain
          />

          {/* row 3 — supporting facts */}
          <NeonCard className="lg:h-[190px]">
            <div className="flex h-full flex-col justify-center p-6">
              <div className="font-display text-[38px] font-semibold leading-none text-white">
                36
              </div>
              <p className="mt-2 text-[13px] leading-5 text-[#8a90ab]">
                scores per deck — 6 independent judges × 6 criteria, averaged
                deterministically.
              </p>
            </div>
          </NeonCard>
          <NeonCard className="lg:h-[190px]">
            <div className="flex h-full flex-col items-center justify-center gap-3 p-6 text-center">
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-full bg-[linear-gradient(92deg,#8b6ef5,#5b39dd)] px-7 py-3 text-sm font-medium text-white shadow-[0_0_36px_rgba(124,92,246,0.45)]"
              >
                <Sparkle className="h-3.5 w-3.5" />
                Run the jury
              </button>
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#7d86b8]">
                14-day trial · no card
              </span>
            </div>
          </NeonCard>
          <NeonCard className="lg:h-[190px]">
            <div className="flex h-full flex-col justify-center p-6">
              <div className="font-display text-[38px] font-semibold leading-none text-[#22d3ee]">
                100%
              </div>
              <p className="mt-2 text-[13px] leading-5 text-[#8a90ab]">
                evidence-linked — every score cites the exact slide it came
                from.
              </p>
            </div>
          </NeonCard>
        </div>

        {/* ── footer strip, echoing the art captions ───────────────── */}
        <p className="mt-10 text-center font-mono text-[10px] uppercase tracking-[0.3em] text-[#3a4163]">
          · Scoring matrix · Judge × Criterion ·
        </p>
      </div>
    </main>
  );
}
