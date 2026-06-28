import Link from "next/link";
import { Fragment, type ReactElement } from "react";
import { AngelFx } from "@/components/AngelFx";

/* ─────────────────────────────────────────────────────────────────────────
 * "Who we build for" — premium ICP bento (About §6).
 *
 * A varied-size dark bento that replaces the previous 8-equal-card grid. Each
 * card carries the review MOMENT (chip), a one-line JOB, what EvalLense gives
 * (chips), an optional data fragment, and an Explore link — over a per-segment
 * abstract SVG visual. Page-local: scoped <style> + inline SVG only; no shared
 * DS component or globals are touched.
 *
 * Asset-ready: every card's visual is encapsulated behind `visual` (a clean
 * `<Visual mode>` API) + a `.ab-bento__viz` layer, so a static image/video can
 * replace the CSS/SVG abstract later without touching content or layout.
 * ───────────────────────────────────────────────────────────────────────── */

type IcpSize = "hero" | "vertical" | "medium" | "compact" | "tile";
type IcpVisual =
  | "pitchArena"
  | "arena"
  | "telescope"
  | "gate"
  | "scale"
  | "filter"
  | "constellation"
  | "diligence";

type IcpCard = {
  key: string;
  segment: string;
  moment: string;
  job: string;
  chips: readonly string[];
  metricValue: string;
  metricLabel: string;
  cta: string;
  href: string;
  size: IcpSize;
  visual: IcpVisual;
  titleLead?: string;
  titleAccent?: string;
  outputs?: readonly string[];
  video?: string;
  /* When set, a transparent product render replaces the SVG/CSS abstract. */
  image?: string;
};

/* DOM order == mobile reading order (Pitch, Hackathons, VC, Accelerators,
   Grants, Corporate, Universities, Angel). Desktop placement is driven by
   explicit grid-area rules keyed off data-key, so DOM order stays mobile-first. */
const ICP_CARDS: readonly IcpCard[] = [
  {
    key: "pitch",
    segment: "Pitch Competitions",
    titleLead: "Pitch",
    titleAccent: "Competitions",
    outputs: [
      "Same rubric for every team",
      "Evidence-backed finalist briefs",
      "Questions for live pitching",
    ],
    moment: "Before finals day",
    job: "Turn open submissions into a finalist board your jury can actually use.",
    chips: [],
    metricValue: "",
    metricLabel: "",
    cta: "Explore pitch competitions",
    href: "/trust/use-cases",
    size: "hero",
    visual: "pitchArena",
    image: "/assets/about/icp-pitch.webp",
  },
  {
    key: "vc",
    segment: "VC Funds",
    titleLead: "VC",
    titleAccent: "Funds",
    outputs: [
      "Shortlist-ready briefs",
      "Evidence-backed gaps",
      "Questions for the first call",
    ],
    moment: "Before the pipeline meeting",
    job: "Turn inbound decks\ninto a partner-ready first read.",
    chips: ["Market signal", "Team signal", "First-call questions"],
    metricValue: "3",
    metricLabel: "key signals",
    cta: "Explore VC dealflow",
    href: "/trust/use-cases",
    size: "hero",
    visual: "telescope",
    image: "/assets/about/icp-vc.webp",
  },
  {
    key: "hack",
    segment: "Hackathons",
    moment: "Before live judging",
    job: "Review many teams fast and prepare the judge panel.",
    chips: ["First pass", "Execution notes", "Review roadmap"],
    metricValue: "48h",
    metricLabel: "review window",
    cta: "Explore hackathons",
    href: "/trust/use-cases",
    size: "tile",
    visual: "arena",
    video: "/assets/about/hackathons-bg.mp4",
  },
  {
    key: "accel",
    segment: "Accelerators",
    moment: "Before cohort selection",
    job: "Compare applicants on one standard.",
    chips: ["Side-by-side reports", "Fixed criteria", "Selection risks"],
    metricValue: "1",
    metricLabel: "shared standard",
    cta: "Explore accelerators",
    href: "/trust/use-cases",
    size: "tile",
    visual: "gate",
    image: "/assets/about/icp-accelerators.webp",
  },
  {
    key: "grants",
    segment: "Grant Programs",
    moment: "Before funding decisions",
    job: "Review applications against fixed criteria.",
    chips: ["Comparable scores", "Evidence trail", "Review record"],
    metricValue: "Fixed",
    metricLabel: "criteria",
    cta: "Explore grants",
    href: "/trust/use-cases",
    size: "tile",
    visual: "scale",
    video: "/assets/about/grants-bg.mp4",
  },
  {
    key: "corp",
    segment: "Corporate Innovation",
    moment: "Before stakeholder review",
    job: "Separate real partnership potential from theatre.",
    chips: ["Fit signals", "Readiness checks", "Evidence gaps"],
    metricValue: "Signal",
    metricLabel: "over noise",
    cta: "Explore corporate innovation",
    href: "/trust/use-cases",
    size: "tile",
    visual: "filter",
    video: "/assets/about/corp-datastream.mp4",
  },
  {
    key: "uni",
    segment: "Universities",
    moment: "Before demo day",
    job: "Compare student and research teams fairly.",
    chips: ["Transparent scoring", "Useful feedback", "Human ranking"],
    metricValue: "Fair",
    metricLabel: "by design",
    cta: "Explore universities",
    href: "/trust/use-cases",
    size: "tile",
    visual: "constellation",
    video: "/assets/about/universities-bg.mp4",
  },
  {
    key: "angel",
    segment: "Angel Investors",
    moment: "Before diligence night",
    job: "Know which decks deserve your time.",
    chips: ["Strengths", "Weaknesses", "Questions"],
    metricValue: "Top 3",
    metricLabel: "to read first",
    cta: "Explore angel review",
    href: "/trust/use-cases",
    size: "tile",
    visual: "diligence",
    image: "/assets/about/icp-angel.webp",
  },
];

function CorporateSignalFilterVisual(): ReactElement {
  return (
    <svg className="ab-viz ab-viz--filter" viewBox="0 0 480 270" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="corp-glass-edge" x1="172" y1="22" x2="288" y2="248" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#a99bff" stopOpacity="0.9" />
          <stop offset="0.48" stopColor="#2ec5e8" stopOpacity="0.88" />
          <stop offset="1" stopColor="#36e0c2" stopOpacity="0.92" />
        </linearGradient>
        <linearGradient id="corp-noise-glass" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#a99bff" stopOpacity="0.74" />
          <stop offset="0.52" stopColor="#6c4cf1" stopOpacity="0.42" />
          <stop offset="1" stopColor="#2ec5e8" stopOpacity="0.3" />
        </linearGradient>
        <linearGradient id="corp-signal-glass" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2ec5e8" stopOpacity="0.86" />
          <stop offset="1" stopColor="#36e0c2" stopOpacity="0.82" />
        </linearGradient>
        <filter id="corp-soft-glow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <rect className="corp-viz__wash corp-viz__wash--noise" x="0" y="0" width="250" height="270" />
      <rect className="corp-viz__wash corp-viz__wash--signal" x="226" y="0" width="254" height="270" />

      <g className="corp-viz__org" stroke="#a99bff" strokeWidth="0.8" opacity="0.34">
        <path d="M52 48 L88 32 L122 58 L94 92 L52 48" />
        <path d="M88 32 L150 34 M122 58 L166 82 M94 92 L144 122" />
        <circle cx="52" cy="48" r="3" fill="#6c4cf1" />
        <circle cx="88" cy="32" r="3.4" fill="#a99bff" />
        <circle cx="122" cy="58" r="3" fill="#6c4cf1" />
        <circle cx="94" cy="92" r="3" fill="#6c4cf1" />
        <circle cx="150" cy="34" r="2.6" fill="#a99bff" />
        <circle cx="166" cy="82" r="2.6" fill="#a99bff" />
        <circle cx="144" cy="122" r="2.6" fill="#a99bff" />
      </g>

      <g className="corp-viz__noise-stream">
        <g className="corp-viz__doc corp-viz__doc--one">
          <rect x="22" y="128" width="70" height="88" rx="8" fill="rgba(255,255,255,0.06)" stroke="url(#corp-noise-glass)" />
          <path d="M38 154 H76 M38 169 H70 M38 184 H80" stroke="#a99bff" strokeWidth="1.1" opacity="0.46" />
          <path d="M66 128 L92 154 H68 C67 154 66 153 66 152 Z" fill="rgba(169,155,255,0.12)" stroke="#a99bff" strokeWidth="0.8" />
        </g>
        <g className="corp-viz__badge corp-viz__badge--one">
          <rect x="98" y="34" width="78" height="104" rx="13" fill="rgba(255,255,255,0.055)" stroke="url(#corp-noise-glass)" />
          <circle cx="137" cy="66" r="13" fill="rgba(169,155,255,0.13)" stroke="#a99bff" strokeWidth="0.9" />
          <rect x="116" y="92" width="42" height="5" rx="2.5" fill="#a99bff" opacity="0.28" />
          <rect x="110" y="106" width="54" height="4" rx="2" fill="#2ec5e8" opacity="0.22" />
          <rect x="124" y="119" width="28" height="4" rx="2" fill="#a99bff" opacity="0.22" />
        </g>
        <g className="corp-viz__card corp-viz__card--one">
          <rect x="82" y="172" width="96" height="54" rx="9" fill="rgba(255,255,255,0.045)" stroke="#a99bff" strokeWidth="1" />
          <rect x="101" y="188" width="18" height="14" rx="3" stroke="#2ec5e8" strokeWidth="0.9" opacity="0.45" />
          <path d="M132 190 H160 M132 203 H154" stroke="#a99bff" strokeWidth="1.2" opacity="0.36" />
        </g>
        <g className="corp-viz__cup corp-viz__cup--one">
          <path d="M150 150 H196 L188 184 H158 Z" fill="rgba(255,255,255,0.075)" stroke="#2ec5e8" strokeWidth="1" />
          <path d="M158 162 H188" stroke="#a99bff" strokeWidth="5" strokeLinecap="round" opacity="0.24" />
          <path className="corp-viz__vapor" d="M166 144 C158 133 173 128 164 117 M182 145 C176 133 192 129 184 118" stroke="#a99bff" strokeWidth="1" opacity="0.45" />
        </g>
        <g className="corp-viz__stamp corp-viz__stamp--one">
          <path d="M36 84 L86 70 L98 106 L48 120 Z" fill="rgba(108,76,241,0.09)" stroke="#a99bff" strokeWidth="1" />
          <path d="M52 94 L82 86 M56 106 L88 97" stroke="#a99bff" strokeWidth="1" opacity="0.3" />
        </g>
      </g>

      <g className="corp-viz__scatter" filter="url(#corp-soft-glow)">
        <circle cx="30" cy="58" r="2.5" fill="#a99bff" />
        <circle cx="70" cy="118" r="2" fill="#6c4cf1" />
        <circle cx="122" cy="156" r="2.4" fill="#a99bff" />
        <circle cx="154" cy="102" r="2" fill="#6c4cf1" />
        <circle cx="184" cy="64" r="2.4" fill="#a99bff" />
        <circle cx="184" cy="202" r="2.1" fill="#6c4cf1" />
        <circle cx="216" cy="88" r="2.4" fill="#2ec5e8" />
        <circle cx="214" cy="176" r="2.4" fill="#2ec5e8" />
      </g>

      <g className="corp-viz__filter-plane">
        <path d="M226 20 H266 L252 250 H212 Z" fill="rgba(255,255,255,0.045)" stroke="url(#corp-glass-edge)" strokeWidth="1.4" />
        <path d="M236 22 H266 L252 248 H222 Z" fill="rgba(46,197,232,0.045)" />
        <path d="M225 22 L212 248 M266 22 L252 248" stroke="#36e0c2" strokeWidth="1" opacity="0.48" />
        <path className="corp-viz__filter-shine" d="M258 34 C230 86 256 134 222 224" stroke="#f5f5f7" strokeWidth="0.9" opacity="0.36" />
      </g>

      <g className="corp-viz__selected-card">
        <rect x="292" y="68" width="102" height="62" rx="12" fill="rgba(54,224,194,0.06)" stroke="url(#corp-signal-glass)" />
        <rect x="310" y="86" width="18" height="14" rx="3" stroke="#36e0c2" strokeWidth="0.9" opacity="0.7" />
        <path d="M342 88 H374 M342 102 H366" stroke="#36e0c2" strokeWidth="1.2" opacity="0.48" />
      </g>

      <g className="corp-viz__doc corp-viz__doc--two">
        <rect x="284" y="112" width="76" height="86" rx="9" fill="rgba(255,255,255,0.07)" stroke="#2ec5e8" strokeWidth="1.25" />
        <path d="M300 138 H342 M300 154 H334 M300 170 H346" stroke="#36e0c2" strokeWidth="1.15" opacity="0.46" />
        <path d="M334 112 L360 138 H336 C335 138 334 137 334 136 Z" fill="rgba(54,224,194,0.14)" stroke="#36e0c2" strokeWidth="0.9" />
      </g>

      <g className="corp-viz__cup corp-viz__cup--two">
        <path d="M354 96 H426 L414 156 H366 Z" fill="rgba(255,255,255,0.08)" stroke="#36e0c2" strokeWidth="1.6" />
        <path d="M366 112 H414" stroke="#6c4cf1" strokeWidth="7" strokeLinecap="round" opacity="0.32" />
        <path className="corp-viz__vapor" d="M374 88 C364 74 382 68 372 54 M400 88 C392 74 414 68 404 54" stroke="#2ec5e8" strokeWidth="1.25" opacity="0.58" />
      </g>

      <g className="corp-viz__signal-output" stroke="#36e0c2" strokeWidth="1.2" filter="url(#corp-soft-glow)">
        <path d="M266 86 C312 84 340 84 430 58" opacity="0.54" />
        <path d="M260 135 C318 135 352 135 452 135" opacity="0.72" />
        <path d="M264 184 C316 188 350 205 432 220" opacity="0.5" />
        <circle cx="430" cy="58" r="3.5" fill="#36e0c2" />
        <circle cx="452" cy="135" r="4.2" fill="#36e0c2" />
        <circle cx="432" cy="220" r="3.4" fill="#2ec5e8" />
      </g>

      <g className="corp-viz__clean-dots" fill="#36e0c2" filter="url(#corp-soft-glow)">
        <circle cx="300" cy="176" r="2.6" />
        <circle cx="334" cy="168" r="2.8" />
        <circle cx="370" cy="166" r="2.7" />
        <circle cx="408" cy="164" r="2.8" />
        <circle cx="318" cy="116" r="2.4" />
        <circle cx="356" cy="122" r="2.5" />
        <circle cx="396" cy="116" r="2.3" />
      </g>

      <g className="corp-viz__clean-org" stroke="#2ec5e8" strokeWidth="0.8" opacity="0.5">
        <path d="M338 204 L382 190 L426 206 L382 230 Z" />
        <circle cx="338" cy="204" r="2.7" fill="#36e0c2" />
        <circle cx="382" cy="190" r="2.9" fill="#36e0c2" />
        <circle cx="426" cy="206" r="2.7" fill="#36e0c2" />
        <circle cx="382" cy="230" r="2.7" fill="#36e0c2" />
      </g>
    </svg>
  );
}

/* ── Per-segment abstract visual. Line-art over the card; dimmed by default,
      brightened + nudged on hover (driven by CSS on .ab-bento__card:hover). ── */
function Visual({ mode }: { mode: IcpVisual }): ReactElement {
  const g = `g-${mode}`;
  switch (mode) {
    case "pitchArena":
      return (
        <svg className="ab-viz ab-viz--pitch-arena" viewBox="0 0 520 360" fill="none" aria-hidden="true">
          <defs>
            <linearGradient id={g} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#a99bff" stopOpacity="0.96" />
              <stop offset="0.52" stopColor="#2ec5e8" stopOpacity="0.92" />
              <stop offset="1" stopColor="#36e0c2" stopOpacity="0.98" />
            </linearGradient>
            <linearGradient id="pitch-arena-screen" x1="242" y1="74" x2="368" y2="206" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#f5f5f7" stopOpacity="0.26" />
              <stop offset="0.5" stopColor="#a99bff" stopOpacity="0.14" />
              <stop offset="1" stopColor="#2ec5e8" stopOpacity="0.18" />
            </linearGradient>
            <linearGradient id="pitch-arena-stage" x1="184" y1="210" x2="390" y2="302" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#6c4cf1" stopOpacity="0.18" />
              <stop offset="0.52" stopColor="#2ec5e8" stopOpacity="0.2" />
              <stop offset="1" stopColor="#36e0c2" stopOpacity="0.16" />
            </linearGradient>
            <filter id="pitch-arena-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <g className="pitch-arena__decks" strokeWidth="1.1">
            <g className="pitch-arena__deck pitch-arena__deck--one">
              <rect x="18" y="90" width="56" height="74" rx="9" fill="rgba(255,255,255,0.055)" stroke="#a99bff" />
              <path d="M33 113 H59 M33 128 H54 M33 143 H64" stroke="#a99bff" opacity="0.4" />
            </g>
            <g className="pitch-arena__deck pitch-arena__deck--two">
              <rect x="44" y="184" width="60" height="78" rx="10" fill="rgba(46,197,232,0.055)" stroke="#2ec5e8" />
              <path d="M60 208 H88 M60 224 H82 M60 240 H92" stroke="#2ec5e8" opacity="0.42" />
            </g>
            <g className="pitch-arena__deck pitch-arena__deck--three">
              <rect x="86" y="118" width="52" height="68" rx="9" fill="rgba(108,76,241,0.075)" stroke="#6c4cf1" />
              <path d="M100 140 H124 M100 155 H120 M100 169 H128" stroke="#c9c1ff" opacity="0.38" />
            </g>
          </g>

          <g className="pitch-arena__beams" strokeLinecap="round" filter="url(#pitch-arena-glow)">
            <path d="M94 151 C150 142 177 160 226 198" stroke="#a99bff" />
            <path d="M84 218 C147 218 184 212 231 224" stroke="#2ec5e8" />
            <path d="M132 152 C178 126 210 120 257 132" stroke="#6c4cf1" />
            <path d="M312 204 C360 188 394 185 430 196" stroke="#36e0c2" />
            <path d="M338 228 C380 230 406 235 438 248" stroke="#2ec5e8" opacity="0.64" />
          </g>

          <g className="pitch-arena__screen">
            <path d="M226 70 C272 52 332 52 378 70 L368 198 C326 184 274 184 236 198 Z" fill="url(#pitch-arena-screen)" stroke={`url(#${g})`} strokeWidth="1.25" />
            <path d="M252 100 H344 M252 122 H324" stroke="#f5f5f7" strokeWidth="1.2" opacity="0.34" />
            <path d="M253 154 C274 140 292 165 310 146 C326 130 340 144 352 124" stroke="#36e0c2" strokeWidth="1.4" opacity="0.72" />
            <text x="252" y="180" fill="#c9c1ff" fontSize="12" fontFamily="var(--font-mono)" letterSpacing=".08em">PITCH SLIDE</text>
          </g>

          <g className="pitch-arena__stage">
            <ellipse cx="290" cy="266" rx="112" ry="34" fill="url(#pitch-arena-stage)" stroke={`url(#${g})`} strokeWidth="1.25" />
            <ellipse cx="290" cy="266" rx="72" ry="18" stroke="#f5f5f7" strokeWidth="0.8" opacity="0.2" />
            <path d="M206 268 L228 306 H352 L374 268" fill="rgba(255,255,255,0.045)" stroke="#2ec5e8" strokeWidth="1" opacity="0.82" />
          </g>

          <g className="pitch-arena__mic" filter="url(#pitch-arena-glow)">
            <path d="M288 166 V238" stroke="#c9c1ff" strokeWidth="2" strokeLinecap="round" />
            <rect x="276" y="140" width="24" height="38" rx="12" fill="rgba(255,255,255,0.08)" stroke="#f5f5f7" strokeWidth="1" />
            <path d="M279 154 H297 M279 164 H297" stroke="#36e0c2" strokeWidth="1" opacity="0.58" />
            <path d="M268 238 H308" stroke="#a99bff" strokeWidth="1.5" strokeLinecap="round" />
          </g>

          <g className="pitch-arena__lenses" fontFamily="var(--font-mono)" fontSize="10" letterSpacing=".04em">
            {[
              [220, 104, "P1"],
              [362, 104, "P2"],
              [394, 184, "P3"],
              [340, 248, "P4"],
              [235, 248, "P5"],
              [190, 184, "P6"],
            ].map(([cx, cy, label]) => (
              <g key={label} className="pitch-arena__lens">
                <circle cx={cx} cy={cy} r="15" fill="rgba(255,255,255,0.045)" stroke={`url(#${g})`} strokeWidth="1" />
                <circle cx={cx} cy={cy} r="8" stroke="#36e0c2" strokeWidth="0.8" opacity="0.5" />
                <text x={cx} y={Number(cy) + 3.5} textAnchor="middle" fill="#f5f5f7" opacity="0.78">{label}</text>
              </g>
            ))}
          </g>

          <g className="pitch-arena__board">
            <rect x="414" y="132" width="86" height="124" rx="16" fill="rgba(255,255,255,0.06)" stroke={`url(#${g})`} strokeWidth="1.2" />
            <text x="432" y="157" fill="#f5f5f7" fontSize="11" fontFamily="var(--font-mono)" letterSpacing=".08em">FINALIST</text>
            <text x="432" y="172" fill="#36e0c2" fontSize="11" fontFamily="var(--font-mono)" letterSpacing=".08em">BOARD</text>
            {[0, 1, 2].map((i) => (
              <g key={i} transform={`translate(432 ${190 + i * 20})`}>
                <text x="0" y="4" fill="#a99bff" fontSize="10" fontFamily="var(--font-mono)">0{i + 1}</text>
                <rect x="25" y="-6" width={34 + i * 6} height="8" rx="4" fill={i === 1 ? "#36e0c2" : "#2ec5e8"} opacity={i === 1 ? "0.62" : "0.36"} />
              </g>
            ))}
          </g>
        </svg>
      );
    case "arena":
      return (
        <svg className="ab-viz ab-viz--arena" viewBox="0 0 240 240" fill="none" aria-hidden="true">
          <defs>
            <linearGradient id={g} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#a99bff" />
              <stop offset="1" stopColor="#2ec5e8" />
            </linearGradient>
          </defs>
          <circle cx="120" cy="120" r="30" stroke={`url(#${g})`} strokeWidth="1.5" />
          <circle className="ab-viz__ring" cx="120" cy="120" r="20" stroke="#a99bff" strokeWidth="1" opacity="0.6" />
          <g className="ab-viz__nodes" fill="#36e0c2">
            <circle cx="120" cy="40" r="4.5" />
            <circle cx="190" cy="80" r="4.5" />
            <circle cx="192" cy="164" r="4.5" />
            <circle cx="120" cy="200" r="4.5" />
            <circle cx="48" cy="164" r="4.5" />
            <circle cx="46" cy="80" r="4.5" />
          </g>
          <g className="ab-viz__shortlist" stroke="#2ec5e8" strokeWidth="1" opacity="0.5">
            <path d="M120 40 L120 90" />
            <path d="M190 80 L150 108" />
            <path d="M46 80 L90 108" />
            <path d="M120 200 L120 150" />
          </g>
        </svg>
      );
    case "telescope":
      return (
        <svg className="ab-viz ab-viz--telescope" viewBox="0 0 200 300" fill="none" aria-hidden="true">
          <defs>
            <linearGradient id={g} x1="0" y1="1" x2="0" y2="0">
              <stop offset="0" stopColor="#36e0c2" />
              <stop offset="1" stopColor="#a99bff" />
            </linearGradient>
          </defs>
          <g className="ab-viz__stream" stroke="#a99bff" strokeWidth="1.1" opacity="0.5">
            <rect x="78" y="230" width="44" height="30" rx="4" />
            <rect x="78" y="186" width="44" height="30" rx="4" />
            <rect x="78" y="142" width="44" height="30" rx="4" />
          </g>
          <ellipse cx="100" cy="108" rx="58" ry="22" stroke={`url(#${g})`} strokeWidth="1.6" />
          <ellipse className="ab-viz__ring" cx="100" cy="108" rx="40" ry="14" stroke="#2ec5e8" strokeWidth="1" opacity="0.55" />
          <g className="ab-viz__signals">
            <circle cx="60" cy="48" r="5" fill="#a99bff" />
            <circle cx="100" cy="34" r="5" fill="#2ec5e8" />
            <circle cx="140" cy="48" r="5" fill="#36e0c2" />
            <path d="M100 92 L60 53 M100 92 L100 40 M100 92 L140 53" stroke="#2ec5e8" strokeWidth="0.9" opacity="0.45" />
          </g>
        </svg>
      );
    case "gate":
      return (
        <svg className="ab-viz ab-viz--gate" viewBox="0 0 220 240" fill="none" aria-hidden="true">
          <defs>
            <linearGradient id={g} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#a99bff" />
              <stop offset="1" stopColor="#36e0c2" />
            </linearGradient>
          </defs>
          <g className="ab-viz__paths" stroke="#a99bff" strokeWidth="1.1" opacity="0.5" fill="none">
            <path d="M8 48 C70 48 86 110 110 110" />
            <path d="M8 96 C70 96 90 110 110 110" />
            <path d="M8 144 C70 144 90 110 110 110" />
            <path d="M8 192 C70 192 86 110 110 110" />
          </g>
          <rect x="104" y="58" width="12" height="104" rx="6" stroke={`url(#${g})`} strokeWidth="1.6" fill="#0a0a0d" />
          <path className="ab-viz__cohort" d="M116 110 L212 110" stroke="#36e0c2" strokeWidth="1.6" />
          <circle cx="212" cy="110" r="4.5" fill="#36e0c2" />
        </svg>
      );
    case "scale":
      return (
        <svg className="ab-viz ab-viz--scale" viewBox="0 0 240 220" fill="none" aria-hidden="true">
          <defs>
            <linearGradient id={g} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#a99bff" />
              <stop offset="1" stopColor="#2ec5e8" />
            </linearGradient>
          </defs>
          <path d="M120 36 L120 150" stroke="#a99bff" strokeWidth="1.3" />
          <path className="ab-viz__beam" d="M60 70 L180 70" stroke={`url(#${g})`} strokeWidth="1.6" />
          <circle cx="120" cy="70" r="5" fill="#2ec5e8" />
          <g stroke="#a99bff" strokeWidth="1" opacity="0.6">
            <path d="M60 70 L46 116 M60 70 L74 116" />
            <path d="M180 70 L166 116 M180 70 L194 116" />
          </g>
          <path d="M40 116 A20 14 0 0 0 80 116 Z" stroke={`url(#${g})`} strokeWidth="1.3" fill="#11111a" />
          <path d="M160 116 A20 14 0 0 0 200 116 Z" stroke={`url(#${g})`} strokeWidth="1.3" fill="#1b1b26" />
          <path className="ab-viz__trail" d="M40 168 H200" stroke="#36e0c2" strokeWidth="1" strokeDasharray="3 7" opacity="0.6" />
        </svg>
      );
    case "filter":
      return <CorporateSignalFilterVisual />;
    case "constellation":
      return (
        <svg className="ab-viz ab-viz--constellation" viewBox="0 0 260 200" fill="none" aria-hidden="true">
          <defs>
            <linearGradient id={g} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#a99bff" />
              <stop offset="1" stopColor="#36e0c2" />
            </linearGradient>
          </defs>
          <g className="ab-viz__edges" stroke="#2ec5e8" strokeWidth="0.9" opacity="0.5">
            <path d="M44 56 L120 40 L196 70 L120 110 L44 56" />
            <path d="M120 110 L80 158 M120 110 L168 156 M196 70 L220 120" />
          </g>
          <g className="ab-viz__stars" fill="#36e0c2">
            <circle cx="44" cy="56" r="4" /><circle cx="120" cy="40" r="4.5" />
            <circle cx="196" cy="70" r="4" /><circle cx="120" cy="110" r="5" />
            <circle cx="80" cy="158" r="4" /><circle cx="168" cy="156" r="4" />
            <circle cx="220" cy="120" r="3.5" />
          </g>
          <path className="ab-viz__board" d="M30 178 H230" stroke="#a99bff" strokeWidth="1" opacity="0.55" />
        </svg>
      );
    case "diligence":
      return (
        <svg className="ab-viz ab-viz--diligence" viewBox="0 0 200 130" fill="none" aria-hidden="true">
          <defs>
            <linearGradient id={g} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#a99bff" />
              <stop offset="1" stopColor="#2ec5e8" />
            </linearGradient>
          </defs>
          <g className="ab-viz__minidecks" stroke="#a99bff" strokeWidth="1.1" opacity="0.55">
            <rect x="20" y="40" width="32" height="46" rx="4" />
            <rect x="60" y="40" width="32" height="46" rx="4" />
            <rect x="100" y="40" width="32" height="46" rx="4" />
          </g>
          <g className="ab-viz__lens">
            <circle cx="118" cy="60" r="22" stroke={`url(#${g})`} strokeWidth="1.6" fill="rgba(54,224,194,0.05)" />
            <path d="M134 76 L150 92" stroke={`url(#${g})`} strokeWidth="2" strokeLinecap="round" />
          </g>
        </svg>
      );
  }
}

export function IcpBento(): ReactElement {
  return (
    <section className="band ink ab-segments ab-bento" aria-label="Who EvalLense is built for">
      <style>{ICP_BENTO_CSS}</style>
      <AngelFx />
      <div className="wrap">
        <div className="head" data-reveal="up">
          <span className="eyebrow">
            <span className="dot" aria-hidden="true"></span>
            Who we build for
          </span>
          <h2 className="title">
            Built for teams that review at <span className="grad-word">scale</span>
          </h2>
          <p className="sub">
            They do not need AI to choose the winner. They need a faster, more
            consistent way to compare applications and focus human attention on
            the decisions that matter.
          </p>
        </div>

        <ul className="ab-bento__grid" data-reveal="up" aria-label="EvalLense use cases by review moment">
          {ICP_CARDS.map((c) => (
            <li key={c.key} data-key={c.key} className={`ab-bento__card ab-bento__card--${c.size}`}>
              {c.image ? (
                <div className="ab-bento__bgimg" aria-hidden="true">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={c.image} alt="" loading="lazy" decoding="async" />
                </div>
              ) : c.video ? (
                <video
                  className="ab-bento__bgvid"
                  autoPlay
                  muted
                  loop
                  playsInline
                  aria-hidden="true"
                >
                  <source src={c.video} type="video/mp4" />
                </video>
              ) : (
                <div className="ab-bento__viz" aria-hidden="true">
                  <Visual mode={c.visual} />
                </div>
              )}
              <div className="ab-bento__content">
                <span className="ab-bento__moment">{c.moment}</span>
                <h3 className="ab-bento__seg">
                  {c.titleAccent ? (
                    <>
                      {c.titleLead}{" "}
                      <span className="ab-bento__seg-accent">{c.titleAccent}</span>
                    </>
                  ) : (
                    c.segment
                  )}
                </h3>
                {c.outputs ? null : (
                  <p className="ab-bento__metric">
                    <span className="ab-bento__metric-v">{c.metricValue}</span>
                    <span className="ab-bento__metric-l">{c.metricLabel}</span>
                  </p>
                )}
                <p className="ab-bento__job">
                  {c.job.split("\n").map((ln, i) => (
                    <Fragment key={i}>
                      {i > 0 ? <br /> : null}
                      {ln}
                    </Fragment>
                  ))}
                </p>
                {c.outputs ? (
                  <ol className="ab-bento__outputs">
                    {c.outputs.map((o, i) => (
                      <li key={o} className="ab-bento__out">
                        <span className="ab-bento__out-n">{String(i + 1).padStart(2, "0")}</span>
                        {o}
                      </li>
                    ))}
                  </ol>
                ) : (
                  <ul className="ab-bento__chips">
                    {c.chips.map((chip) => (
                      <li key={chip} className="ab-bento__chip">
                        {chip}
                      </li>
                    ))}
                  </ul>
                )}
                <Link href={c.href} className="ab-bento__cta">
                  {c.cta}
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
                    <path d="M3 8h9M9 5l3 3-3 3" />
                  </svg>
                </Link>
              </div>
            </li>
          ))}
        </ul>

        <p className="ab-segments__claim" data-reveal="up">
          We are not building an artificial jury. We are building a{" "}
          <span className="ab-bento__claim-grad">better lens for human judgment</span>.
        </p>
      </div>
    </section>
  );
}

/* Scoped, page-local CSS (no backticks / no interpolation inside — keeps JSX
   parsing safe). Colours follow the brief's palette. */
const ICP_BENTO_CSS = `
  .ab-bento{ position:relative; isolation:isolate; overflow-x:clip; }
  .ab-bento::before{
    content:""; position:absolute; inset:0; z-index:0; pointer-events:none;
    background:radial-gradient(70% 50% at 50% -4%, rgba(108,76,241,.16), transparent 70%),
               radial-gradient(60% 50% at 100% 100%, rgba(46,197,232,.10), transparent 72%);
  }
  .ab-bento > .wrap{ position:relative; z-index:1; }
  .ab-bento .head{ text-align:center; max-width:48rem; margin-inline:auto; }

  .ab-bento__grid{
    list-style:none; margin:clamp(60px,6.5vw,96px) 0 0; padding:0;
    display:grid; grid-template-columns:repeat(12,minmax(0,1fr));
    grid-auto-rows:minmax(104px,auto); gap:clamp(24px,2.2vw,32px); align-items:stretch;
  }
  /* explicit desktop placement — hierarchy AROUND a central hero (DOM order
     stays mobile-first). VC = narrow vertical card, first on the LEFT. Pitch =
     dominant CENTRE card. Hack + Accel stack on the right; the rest form a
     bottom row, so every card orbits the centre. */
  .ab-bento [data-key="vc"]{ grid-area:1 / 1 / 4 / 7; }       /* left vertical, tall+narrow */
  .ab-bento [data-key="pitch"]{ grid-area:4 / 7 / 7 / 13; }   /* centre hero, dominant */
  .ab-bento [data-key="hack"]{ grid-area:1 / 7 / 2 / 13; }   /* right, top */
  .ab-bento [data-key="accel"]{ grid-area:2 / 7 / 3 / 13; }  /* right, under hack */
  .ab-bento [data-key="angel"]{ grid-area:5 / 1 / 6 / 7; }    /* bottom row, under VC */
  .ab-bento [data-key="corp"]{ grid-area:4 / 1 / 5 / 7; }     /* bottom row, under pitch L */
  .ab-bento [data-key="grants"]{ grid-area:3 / 7 / 4 / 13; }  /* bottom row, under pitch R */
  .ab-bento [data-key="uni"]{ grid-area:6 / 1 / 7 / 7; }    /* bottom row, far right */

  .ab-bento__card{
    position:relative; overflow:hidden; min-width:0; isolation:isolate;
    display:flex; flex-direction:column; justify-content:flex-end;
    padding:clamp(16px,1.4vw,22px);
    border-radius:clamp(22px,2vw,30px);
    border:1px solid rgba(255,255,255,.08);
    background:
      radial-gradient(120% 90% at 0% 0%, rgba(108,76,241,.11), transparent 58%),
      radial-gradient(120% 90% at 100% 100%, rgba(46,197,232,.08), transparent 60%),
      rgba(255,255,255,.035);
    transition:border-color .35s ease, transform .35s ease, box-shadow .35s ease;
  }
  .ab-bento__card::after{ /* legibility scrim under the text */
    content:""; position:absolute; inset:0; z-index:0; pointer-events:none;
    background:linear-gradient(180deg, transparent 24%, rgba(5,5,7,.62) 72%, rgba(5,5,7,.9) 100%);
  }
  .ab-bento__card:hover{
    border-color:rgba(169,155,255,.34);
    transform:translateY(-3px);
    box-shadow:0 26px 60px -34px rgba(108,76,241,.5);
  }
  .ab-bento [data-key="corp"]::after{
    background:
      linear-gradient(90deg, rgba(5,5,7,.9) 0%, rgba(5,5,7,.74) 42%, rgba(5,5,7,.3) 78%, rgba(5,5,7,.7) 100%),
      linear-gradient(180deg, transparent 18%, rgba(5,5,7,.36) 72%, rgba(5,5,7,.82) 100%);
  }
  .ab-bento [data-key="hack"]::after{
    background:
      radial-gradient(72% 130% at 20% 88%, rgba(5,5,7,.88), rgba(5,5,7,.48) 52%, transparent 82%),
      linear-gradient(180deg, rgba(5,5,7,.08) 0%, rgba(5,5,7,.52) 64%, rgba(5,5,7,.9) 100%);
  }
  /* grants: video background — left + bottom scrim keeps the label legible */
  .ab-bento [data-key="grants"]::after{
    background:
      linear-gradient(96deg, rgba(5,5,7,.92) 0%, rgba(5,5,7,.66) 40%, rgba(5,5,7,.2) 74%, transparent 100%),
      linear-gradient(180deg, transparent 30%, rgba(5,5,7,.42) 80%, rgba(5,5,7,.8) 100%);
  }

  /* visual layer */
  .ab-bento__viz{ position:absolute; inset:0; z-index:0; pointer-events:none;
    opacity:.5; transition:opacity .4s ease, transform .5s ease; }
  .ab-bento__card:hover .ab-bento__viz{ opacity:.92; transform:scale(1.02); }
  .ab-bento__bgvid{ position:absolute; inset:0; z-index:0; width:100%; height:100%;
    object-fit:cover; pointer-events:none; opacity:.9; transition:opacity .4s ease, transform .6s ease; }
  .ab-bento__card:hover .ab-bento__bgvid{ opacity:1; transform:scale(1.04); }

  /* product-render image layer — replaces the SVG/CSS abstract, floats right */
  .ab-bento__bgimg{ position:absolute; inset:0; z-index:0; pointer-events:none;
    opacity:.95; transition:opacity .4s ease, transform .55s ease; }
  .ab-bento__card:hover .ab-bento__bgimg{ opacity:1; transform:scale(1.035); }
  /* oversize render: spills past the card edges (top / bottom / right) */
  .ab-bento__bgimg img{
    position:absolute; top:50%; right:-14%;
    height:165%; width:auto; max-width:none;
    transform:translateY(-50%);
    object-fit:contain; object-position:center;
    filter:drop-shadow(0 18px 36px rgba(8,6,22,.62));
  }
  /* hero carries copy — render erupts from the TOP-RIGHT corner, text stays clear */
  .ab-bento__card--hero .ab-bento__bgimg img{
    top:-16%; right:-9%;
    width:68%; height:130%; object-position:right top;
    transform:scale(.9); transform-origin:center;             /* −10%: pulls in so only one element still spills */
    animation:compass-fly 24s ease-in-out 1.4s infinite both; /* slow occasional flight: rises UP and back, away from neighbour cards (no dive toward accel) */
    will-change:transform,opacity;
  }
  /* compass (VC render) keeps a gentle continuous float/tilt under the fly cycle */
  .ab-bento__card--hero .ab-bento__bgimg{
    animation:compass-float 9s ease-in-out infinite;
    transform-origin:center; will-change:transform;
  }
  /* accelerators: sunk deep INTO the card — only the top edge of the front arc
     breaks the frame; leaned ~12° left, otherwise contained */
  .ab-bento [data-key="accel"] .ab-bento__bgimg img{
    height:120%; right:-3%; top:50%;
    transform:translateY(-50%) rotate(-12deg) scale(.9); transform-origin:center;
  }
  /* universities: chess-pieces video backing — left+bottom scrim keeps the
     label legible over the bright (white-pieces) side of the clip */
  .ab-bento [data-key="uni"]::after{
    background:
      linear-gradient(96deg, rgba(5,5,7,.92) 0%, rgba(5,5,7,.66) 40%, rgba(5,5,7,.2) 74%, transparent 100%),
      linear-gradient(180deg, transparent 30%, rgba(5,5,7,.42) 80%, rgba(5,5,7,.8) 100%);
  }
  /* angel investor: keep the glass angel mostly inside its own tile so it
     supports the label instead of dominating neighboring cards. */
  .ab-bento [data-key="angel"]{ z-index:4; }
  .ab-bento [data-key="angel"]:hover{ z-index:8; }
  .ab-bento [data-key="angel"] .ab-bento__bgimg img{
    height:136%; width:auto; right:1.5%; left:auto; top:auto; bottom:8%;
    transform:rotate(-5deg); transform-origin:bottom right; object-position:right bottom;
  }
  /* pitch competitions — podium render sits bottom-right; this hero card must
     NOT inherit the VC compass fly/float, so both animations are killed */
  .ab-bento [data-key="pitch"] .ab-bento__bgimg{ animation:none; }
  .ab-bento [data-key="pitch"] .ab-bento__bgimg img{
    width:92%; height:auto; max-width:none;
    top:auto; bottom:-6%; right:-6%; left:auto;
    object-position:right bottom; object-fit:contain;
    transform:none; animation:none;
  }

  /* compass motion: gentle continuous float/tilt under the dramatic fly cycle */
  @keyframes compass-float{
    0%,100%{ transform:translate3d(0,0,0) rotate(0deg); }
    25%{ transform:translate3d(-1.4%,-1.1%,0) rotate(-2.2deg); }
    50%{ transform:translate3d(1.2%,.6%,0) rotate(1.6deg); }
    75%{ transform:translate3d(-.6%,1%,0) rotate(-1.2deg); }
  }
  /* rests at home, then makes a slow, occasional flight: lifts straight UP and a
     touch left — above the glass cards and away from the Accelerator/Pitch
     neighbours — hovers, then settles back into the exact home spot. */
  @keyframes compass-fly{
    0%,62%{ transform:scale(.9) translate(0,0) rotate(0deg); opacity:1;
      animation-timing-function:cubic-bezier(.45,0,.35,1); }
    78%{ transform:scale(.85) translate(-8%,-52%) rotate(-5deg); opacity:1;
      animation-timing-function:cubic-bezier(.4,0,.4,1); }
    92%,100%{ transform:scale(.9) translate(0,0) rotate(0deg); opacity:1; }
  }
  @media (prefers-reduced-motion: reduce){
    .ab-bento__card--hero .ab-bento__bgimg,
    .ab-bento__card--hero .ab-bento__bgimg img{ animation:none !important; }
  }
  /* let the render break fully out of the card frame */
  .ab-bento__card:has(.ab-bento__bgimg){ overflow:visible; z-index:2; }
  .ab-bento__card:has(.ab-bento__bgimg):hover{ z-index:6; }
  /* left-weighted scrim, kept rounded since the card no longer clips it */
  .ab-bento__card:has(.ab-bento__bgimg)::after{
    border-radius:inherit;
    background:
      linear-gradient(96deg, rgba(5,5,7,.92) 0%, rgba(5,5,7,.68) 38%, rgba(5,5,7,.16) 74%, transparent 100%),
      linear-gradient(180deg, transparent 44%, rgba(5,5,7,.4) 86%, rgba(5,5,7,.72) 100%);
  }
  .ab-bento [data-key="corp"] .ab-bento__viz{ z-index:1; opacity:.82; }
  .ab-bento [data-key="corp"] .ab-bento__content{ z-index:2; }
  .ab-bento [data-key="corp"]:hover .ab-bento__viz{ opacity:1; }
  .ab-viz{ position:absolute; display:block; }
  .ab-viz--pitch-arena{ top:-3%; right:-3%; width:82%; height:auto; }
  .ab-viz--filter{ top:-18%; right:-6%; width:106%; height:auto; }
  .ab-viz--arena{ top:8%; right:6%; width:60%; height:auto; }
  .ab-viz--telescope{ top:4%; right:8%; width:52%; height:auto; }
  .ab-viz--gate{ top:10%; right:4%; width:62%; height:auto; }
  .ab-viz--scale{ top:8%; right:4%; width:64%; height:auto; }
  .ab-viz--constellation{ top:8%; right:4%; width:66%; height:auto; }
  .ab-viz--diligence{ top:14%; right:5%; width:54%; height:auto; }

  /* content */
  .ab-bento__content{ position:relative; z-index:1; display:flex; flex-direction:column; gap:10px; }
  .ab-bento__moment{
    font-family:var(--font-mono); font-size:10.5px; letter-spacing:.16em; text-transform:uppercase;
    color:#a99bff;
  }
  .ab-bento [data-key="hack"] .ab-bento__moment{
    color:#c9c1ff;
    text-shadow:0 0 14px rgba(169,155,255,.42);
  }
  .ab-bento__seg{
    margin:0; font-family:var(--font-display); font-weight:600; letter-spacing:-.018em;
    line-height:1.06; color:#f5f5f7; font-size:clamp(21px,1.7vw,25px);
  }
  .ab-bento [data-key="hack"] .ab-bento__seg{
    color:#fff;
    font-size:clamp(21px,1.9vw,27px);
    text-shadow:0 2px 18px rgba(0,0,0,.5), 0 0 18px rgba(46,197,232,.22);
  }
  .ab-bento__metric{ margin:0; display:none; align-items:baseline; gap:9px; }
  .ab-bento__metric-v{
    font-family:var(--font-display); font-weight:650; line-height:1; letter-spacing:-.03em;
    background:linear-gradient(96deg, #a99bff, #2ec5e8 56%, #36e0c2);
    -webkit-background-clip:text; background-clip:text; color:transparent;
  }
  .ab-bento__metric-l{
    font-family:var(--font-mono); font-size:11px; letter-spacing:.04em; color:rgba(245,245,247,.46);
  }
  .ab-bento__job{ margin:0; font-size:14.5px; line-height:1.45; color:rgba(245,245,247,.68); max-width:44ch; }
  .ab-bento__chips{ list-style:none; margin:2px 0 0; padding:0; display:flex; flex-wrap:wrap; gap:7px; }
  .ab-bento__chip{
    font-size:11.5px; line-height:1; padding:6px 11px; border-radius:980px;
    border:1px solid rgba(255,255,255,.08); background:rgba(255,255,255,.045);
    color:rgba(245,245,247,.72); transition:border-color .3s ease, color .3s ease;
  }
  .ab-bento__card:hover .ab-bento__chip{ border-color:rgba(169,155,255,.28); color:rgba(245,245,247,.85); }
  .ab-bento__cta{
    margin-top:4px; display:inline-flex; align-items:center; gap:7px;
    font-size:13.5px; font-weight:500; color:#a99bff; text-decoration:none; width:fit-content;
  }
  .ab-bento [data-key="hack"] .ab-bento__cta{
    margin-top:1px;
    color:#7ee9ff;
    font-size:14px;
    text-shadow:0 0 14px rgba(46,197,232,.34);
  }
  .ab-bento__cta svg{ width:15px; height:15px; transition:transform .25s ease; }
  .ab-bento__card:hover .ab-bento__cta{ color:#c8c4f0; }
  .ab-bento__card:hover .ab-bento__cta svg{ transform:translateX(4px); }
  .ab-bento__seg-accent{ background:linear-gradient(96deg, #a99bff, #2ec5e8 56%, #36e0c2);
    -webkit-background-clip:text; background-clip:text; color:transparent; }
  .ab-bento__outputs{ list-style:none; margin:4px 0 0; padding:0; display:grid; gap:9px; position:relative; z-index:1; }
  .ab-bento__out{ display:flex; align-items:baseline; gap:11px; font-size:14.5px; line-height:1.35; color:rgba(245,245,247,.84); }
  .ab-bento__out-n{ font-family:var(--font-mono); font-size:12px; letter-spacing:.04em; color:#a99bff; flex:none; }
  .ab-bento [data-key="vc"]{ justify-content:center; }

  /* hero + compact lead with a big data fragment */
  .ab-bento__card--hero .ab-bento__metric,
  .ab-bento__card--compact .ab-bento__metric{ display:flex; }
  .ab-bento__card--hero .ab-bento__seg{ font-size:clamp(26px,2.6vw,38px); }
  .ab-bento__card--hero .ab-bento__job{ font-size:clamp(15px,1.1vw,17px); }
  .ab-bento__card--hero .ab-bento__metric-v{ font-size:clamp(34px,3.6vw,56px); }
  .ab-bento__card--hero .ab-bento__content{ gap:9px; max-width:30ch; }
  .ab-bento [data-key="pitch"]{
    justify-content:flex-start;
    padding:clamp(18px,1.7vw,26px);
  }
  .ab-bento [data-key="pitch"]::after{
    background:
      radial-gradient(70% 92% at 78% 42%, rgba(46,197,232,.14), transparent 68%),
      linear-gradient(94deg, rgba(5,5,7,.94) 0%, rgba(5,5,7,.82) 38%, rgba(5,5,7,.28) 70%, transparent 100%),
      linear-gradient(180deg, rgba(5,5,7,.26) 0%, transparent 48%, rgba(5,5,7,.76) 100%);
  }
  .ab-bento [data-key="pitch"] .ab-bento__viz{
    opacity:.86;
    transform:translate3d(0,0,0);
  }
  .ab-bento [data-key="pitch"]:hover .ab-bento__viz{
    opacity:1;
    transform:scale(1.015) translate3d(1%,-1%,0);
  }
  .ab-bento [data-key="pitch"] .ab-bento__content{
    min-height:100%;
    max-width:min(31ch,43%);
    gap:10px;
    padding-top:2px;
  }
  .ab-bento [data-key="pitch"] .ab-bento__seg{
    max-width:8.5ch;
  }
  .ab-bento [data-key="pitch"] .ab-bento__job{
    max-width:30ch;
    color:rgba(245,245,247,.78);
  }
  .ab-bento [data-key="pitch"] .ab-bento__outputs{
    gap:8px;
    margin-top:2px;
  }
  .ab-bento [data-key="pitch"] .ab-bento__out{
    font-size:clamp(12.5px,1vw,14px);
    color:rgba(245,245,247,.82);
  }
  .ab-bento [data-key="pitch"] .ab-bento__out-n{
    color:#36e0c2;
  }
  .ab-bento [data-key="pitch"] .ab-bento__cta{
    margin-top:auto;
    color:#8ceeff;
  }
  .ab-bento [data-key="pitch"]:hover .ab-bento__cta{ color:#c9c1ff; }
  .ab-bento__card--compact{ justify-content:center; }
  .ab-bento__card--compact .ab-bento__metric-v{ font-size:clamp(34px,3.4vw,46px); }
  .ab-bento__card--compact .ab-bento__job{ display:none; }
  .ab-bento__card--tile{ justify-content:center; }
  .ab-bento__card--tile .ab-bento__job,
  .ab-bento__card--tile .ab-bento__chips,
  .ab-bento__card--tile .ab-bento__metric{ display:none; }
  .ab-bento__card--tile .ab-bento__seg{ font-size:clamp(17px,1.4vw,21px); }
  .ab-bento__card--tile .ab-bento__content{ gap:6px; }

  .ab-bento .ab-segments__claim{
    position:relative; color:#f5f5f7; text-align:center;
    margin:clamp(44px,4.8vw,66px) auto 0; max-width:30ch;
    letter-spacing:-.012em; line-height:1.26; padding-top:clamp(22px,2.4vw,32px);
  }
  .ab-bento .ab-segments__claim::before{
    content:""; position:absolute; top:0; left:50%; transform:translateX(-50%);
    width:48px; height:2px; border-radius:2px; background:var(--lens);
  }
  .ab-bento__claim-grad{
    background:linear-gradient(96deg, #a99bff, #2ec5e8 56%, #36e0c2);
    -webkit-background-clip:text; background-clip:text; color:transparent;
  }

  /* Corporate Innovation: artifact noise through a glass signal filter. */
  .pitch-arena__decks,
  .pitch-arena__screen,
  .pitch-arena__stage,
  .pitch-arena__mic,
  .pitch-arena__board,
  .pitch-arena__lenses{
    transform-box:fill-box;
    transform-origin:center;
  }
  .pitch-arena__decks{ animation:pitch-decks-enter 10s ease-in-out infinite; }
  .pitch-arena__deck{ transform-box:fill-box; transform-origin:center; }
  .pitch-arena__deck--one{ animation:pitch-deck-float 8s ease-in-out infinite; }
  .pitch-arena__deck--two{ animation:pitch-deck-float 9.5s ease-in-out -2s infinite; }
  .pitch-arena__deck--three{ animation:pitch-deck-float 8.8s ease-in-out -4s infinite; }
  .pitch-arena__beams path{
    stroke-width:1.05;
    opacity:.46;
    animation:pitch-beam-pulse 5.8s ease-in-out infinite;
  }
  .pitch-arena__beams path:nth-child(2),
  .pitch-arena__beams path:nth-child(4){ animation-delay:-1.6s; }
  .pitch-arena__screen{ animation:pitch-screen-float 8s ease-in-out infinite; }
  .pitch-arena__stage{ animation:pitch-stage-breathe 7s ease-in-out infinite; }
  .pitch-arena__mic{ animation:pitch-mic-glint 5.6s ease-in-out infinite; }
  .pitch-arena__board{ animation:pitch-board-rise 7.5s ease-in-out infinite; }
  .pitch-arena__lens{
    transform-box:fill-box;
    transform-origin:center;
    animation:pitch-lens-pulse 6s ease-in-out infinite;
  }
  .pitch-arena__lens:nth-child(2){ animation-delay:-.8s; }
  .pitch-arena__lens:nth-child(3){ animation-delay:-1.6s; }
  .pitch-arena__lens:nth-child(4){ animation-delay:-2.4s; }
  .pitch-arena__lens:nth-child(5){ animation-delay:-3.2s; }
  .pitch-arena__lens:nth-child(6){ animation-delay:-4s; }

  @keyframes pitch-decks-enter{
    0%,100%{ transform:translate3d(-5px,3px,0); opacity:.72; }
    48%{ transform:translate3d(9px,-2px,0); opacity:.92; }
  }
  @keyframes pitch-deck-float{
    0%,100%{ transform:rotate(-4deg) translate3d(0,0,0); }
    50%{ transform:rotate(3deg) translate3d(8px,-7px,0); }
  }
  @keyframes pitch-beam-pulse{
    0%,100%{ opacity:.28; }
    50%{ opacity:.7; }
  }
  @keyframes pitch-screen-float{
    0%,100%{ transform:translateY(0) rotate(-.5deg); }
    50%{ transform:translateY(-5px) rotate(.7deg); }
  }
  @keyframes pitch-stage-breathe{
    0%,100%{ opacity:.74; transform:translateY(0) scale(1); }
    50%{ opacity:.96; transform:translateY(2px) scale(1.012); }
  }
  @keyframes pitch-mic-glint{
    0%,100%{ opacity:.76; transform:translateY(0); }
    50%{ opacity:1; transform:translateY(-3px); }
  }
  @keyframes pitch-board-rise{
    0%,100%{ opacity:.78; transform:translate3d(0,2px,0); }
    50%{ opacity:1; transform:translate3d(0,-5px,0); }
  }
  @keyframes pitch-lens-pulse{
    0%,100%{ opacity:.66; transform:scale(.96); }
    50%{ opacity:1; transform:scale(1.06); }
  }

  .corp-viz__wash{ opacity:.7; }
  .corp-viz__wash--noise{
    fill:url(#corp-noise-glass);
    opacity:.11;
  }
  .corp-viz__wash--signal{
    fill:url(#corp-signal-glass);
    opacity:.08;
  }
  .corp-viz__noise-stream{
    transform-box:fill-box; transform-origin:center;
    animation:corp-artifact-stream 13s ease-in-out infinite;
  }
  .corp-viz__doc,
  .corp-viz__badge,
  .corp-viz__card,
  .corp-viz__cup,
  .corp-viz__stamp,
  .corp-viz__selected-card{
    transform-box:fill-box; transform-origin:center;
  }
  .corp-viz__doc--one{ animation:corp-object-wobble 10s ease-in-out infinite; }
  .corp-viz__doc--two{ animation:corp-object-wobble 11s ease-in-out -2.5s infinite; }
  .corp-viz__badge--one{ animation:corp-object-wobble 12s ease-in-out -1.5s infinite; }
  .corp-viz__card--one{ animation:corp-object-wobble 9s ease-in-out -3s infinite; }
  .corp-viz__cup--one{ animation:corp-cup-float 11s ease-in-out -2s infinite; }
  .corp-viz__cup--two{ animation:corp-cup-float 12s ease-in-out -4s infinite; }
  .corp-viz__stamp--one{ animation:corp-stamp-slide 8s ease-in-out infinite; }
  .corp-viz__vapor{ animation:corp-vapor 5.5s ease-in-out infinite; }
  .corp-viz__filter-plane{
    transform-box:fill-box; transform-origin:center;
    animation:corp-filter-pulse 6.5s ease-in-out infinite;
  }
  .corp-viz__filter-shine{ animation:corp-filter-shine 5s ease-in-out infinite; }
  .corp-viz__scatter{ animation:corp-noise-scatter 7s ease-in-out infinite; }
  .corp-viz__signal-output,
  .corp-viz__clean-dots,
  .corp-viz__clean-org{
    animation:corp-clean-flow 8s ease-in-out infinite;
  }
  .corp-viz__selected-card{ animation:corp-selected-card 9s ease-in-out infinite; }
  .corp-viz__org{ animation:corp-org-drift 14s ease-in-out infinite; }

  @keyframes corp-artifact-stream{
    0%,100%{ transform:translate3d(-5px,3px,0) scale(.98); opacity:.76; }
    48%{ transform:translate3d(12px,-4px,0) scale(1.03); opacity:.9; }
    72%{ transform:translate3d(18px,2px,0) scale(1.01); opacity:.62; }
  }
  @keyframes corp-object-wobble{
    0%,100%{ transform:rotate(-3deg) translateY(0); }
    50%{ transform:rotate(4deg) translateY(-7px); }
  }
  @keyframes corp-cup-float{
    0%,100%{ transform:rotate(4deg) translateY(0); }
    50%{ transform:rotate(-4deg) translateY(-8px); }
  }
  @keyframes corp-stamp-slide{
    0%,100%{ transform:rotate(-10deg) translate3d(0,0,0); opacity:.62; }
    50%{ transform:rotate(4deg) translate3d(10px,-6px,0); opacity:.38; }
  }
  @keyframes corp-vapor{
    0%,100%{ opacity:.22; transform:translateY(0); }
    50%{ opacity:.46; transform:translateY(-6px); }
  }
  @keyframes corp-filter-pulse{
    0%,100%{ opacity:.78; filter:drop-shadow(0 0 10px rgba(46,197,232,.18)); }
    50%{ opacity:.98; filter:drop-shadow(0 0 18px rgba(54,224,194,.28)); }
  }
  @keyframes corp-filter-shine{
    0%,100%{ opacity:.2; }
    50%{ opacity:.52; }
  }
  @keyframes corp-noise-scatter{
    0%,100%{ transform:translate3d(0,0,0); opacity:.55; }
    55%{ transform:translate3d(8px,-5px,0); opacity:.28; }
  }
  @keyframes corp-clean-flow{
    0%,100%{ transform:translate3d(0,0,0); opacity:.74; }
    50%{ transform:translate3d(8px,0,0); opacity:1; }
  }
  @keyframes corp-selected-card{
    0%,100%{ transform:translateY(0); opacity:.68; }
    50%{ transform:translateY(-5px); opacity:.94; }
  }
  @keyframes corp-org-drift{
    0%,100%{ transform:translate3d(0,0,0); opacity:.34; }
    50%{ transform:translate3d(5px,-5px,0); opacity:.22; }
  }

  /* slow ambient drift — extremely subtle */
  @keyframes ab-drift{ 0%,100%{ transform:translateY(0); } 50%{ transform:translateY(-4px); } }
  .ab-viz__signals,.ab-viz__nodes,.ab-viz__stars{ animation:ab-drift 9s ease-in-out infinite; }
  .ab-viz__noise{ animation:ab-drift 7s ease-in-out infinite; }

  /* ── Tablet ── */
  @media (max-width:1024px){
    .ab-bento__grid{ grid-template-columns:repeat(6,minmax(0,1fr)); grid-auto-rows:minmax(120px,auto); }
    .ab-bento [data-key="pitch"]{ grid-area:7 / 1 / 10 / 7; }
    .ab-bento [data-key="hack"]{ grid-area:4 / 1 / 5 / 4; }
    .ab-bento [data-key="vc"]{ grid-area:1 / 1 / 4 / 7; }
    .ab-bento [data-key="accel"]{ grid-area:4 / 4 / 5 / 7; }
    .ab-bento [data-key="grants"]{ grid-area:5 / 1 / 6 / 4; }
    .ab-bento [data-key="corp"]{ grid-area:5 / 4 / 6 / 7; }
    .ab-bento [data-key="uni"]{ grid-area:6 / 1 / 7 / 4; }
    .ab-bento [data-key="angel"]{ grid-area:6 / 4 / 7 / 7; }
    .ab-bento__card--compact{ justify-content:flex-end; }
  }

  /* ── Mobile ── */
  @media (max-width:640px){
    .ab-bento__grid{ display:flex; flex-direction:column; gap:22px; }
    .ab-bento__card{ min-height:148px; }
    .ab-bento__card--hero{ min-height:212px; }
    .ab-bento [data-key="pitch"].ab-bento__card--hero{ min-height:344px; }
    .ab-bento [data-key="pitch"] .ab-bento__content{ max-width:100%; min-height:302px; }
    .ab-bento [data-key="pitch"] .ab-bento__viz{ opacity:.56; }
    .ab-viz--pitch-arena{ top:28%; right:-44%; width:128%; opacity:.48; }
    .ab-bento__card--compact{ min-height:160px; }
    .ab-bento__card--tile{ min-height:108px; }
    .ab-bento__job{ display:none; }
    .ab-bento__card--hero .ab-bento__job{ display:block; }
    /* tame the breakout on narrow screens */
    .ab-bento__card:has(.ab-bento__bgimg){ overflow:hidden; z-index:1; }
    .ab-bento__bgimg img{ height:132%; right:-7%; }
    .ab-bento [data-key="angel"] .ab-bento__bgimg img{ height:112%; right:-4%; top:50%; bottom:auto; transform:translateY(-50%) rotate(-4deg); }
    .ab-bento__card--hero .ab-bento__bgimg img{ height:120%; right:-6%; width:74%; }
  }

  @media (prefers-reduced-motion: reduce){
    .ab-bento__card,.ab-bento__viz,.ab-bento__cta svg,.ab-bento__chip{ transition:none; }
    .ab-viz__signals,.ab-viz__nodes,.ab-viz__stars,.ab-viz__noise{ animation:none; }
    .corp-viz__noise-stream,
    .corp-viz__doc--one,
    .corp-viz__doc--two,
    .corp-viz__badge--one,
    .corp-viz__card--one,
    .corp-viz__cup--one,
    .corp-viz__cup--two,
    .corp-viz__stamp--one,
    .corp-viz__vapor,
    .corp-viz__filter-plane,
    .corp-viz__filter-shine,
    .corp-viz__scatter,
    .corp-viz__signal-output,
    .corp-viz__clean-dots,
    .corp-viz__clean-org,
    .corp-viz__selected-card,
    .corp-viz__org,
    .pitch-arena__decks,
    .pitch-arena__deck--one,
    .pitch-arena__deck--two,
    .pitch-arena__deck--three,
    .pitch-arena__beams path,
    .pitch-arena__screen,
    .pitch-arena__stage,
    .pitch-arena__mic,
    .pitch-arena__board,
    .pitch-arena__lens{ animation:none; }
    .ab-bento__card:hover{ transform:none; }
    .ab-bento__card:hover .ab-bento__viz{ transform:none; }
    .ab-bento__card:hover .ab-bento__bgimg{ transform:none; }
  }
`;
