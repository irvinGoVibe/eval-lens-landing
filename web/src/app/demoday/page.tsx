import type { Metadata } from "next";
import Image from "next/image";
import { Hero } from "@/components/sections/Hero";
import { ScrollOrchestrator } from "@/components/ScrollOrchestrator";
import { ScrollFX } from "@/components/ScrollFX";
import { Button } from "@/components/ui/Button";
import { TeamTilt } from "@/components/TeamTilt";
import { ParallaxFloat } from "@/components/ParallaxFloat";
import { Bento, PinnedSteps, Cinema, Gallery, RoutingMatrix, StatementHero, Eyebrow, Numbered } from "@/components/ds";
import { DelayedLoopVideo } from "@/components/DelayedLoopVideo";
import type { RoutingJudge } from "@/components/ds";
import { ZoneToneFlipReverse } from "@/components/ZoneToneFlipReverse";
import { ZoneToneFlip } from "@/components/ZoneToneFlip";
import { ZoneBlobs } from "@/components/ZoneBlobs";
// DS blocks are added here as we compose the page, e.g.:
// import { StatementHero, Bento, Numbered, CtaBand } from "@/components/ds";

export const metadata: Metadata = {
  title: "Demo Day — EvalLens",
  description: "EvalLens demo day.",
};

/* ── Demo Day ──────────────────────────────────────────────────────────────
 * Public page assembled for the demo-day presentation. No site header/footer —
 * full-bleed deck surface. Built block-by-block from the deck: the user names
 * each screen, we drop in the matching block.
 *
 * The home Hero owns `id="hero"` and its full intro choreography (dual-video
 * sync, unicorn reveal, staggered copy fade) lives in ScrollOrchestrator — so
 * we mount that here, exactly as the home page does. When DS blocks land later
 * we'll reconcile with ScrollFX (Cinema / PinnedSteps depend on it).
 * -------------------------------------------------------------------------- */

/* From AI Jury to EvalLens — history steps revealed through the pin.
   Ported verbatim from company/about. */
const STORY_STEPS = [
  {
    num: "01",
    label: "AI Jury",
    desc: "Первая версия появилась на Amazon Nova Hackathon. Мы проверяли, могут ли специализированные AI-судьи оценивать питчи с разных сторон.",
  },
  {
    num: "02",
    label: "Hundreds of runs",
    desc: "Больше судей не решили проблему качества. Оценки плавали, роли пересекались, а длинные отчёты создавали шум вместо ясности.",
  },
  {
    num: "03",
    label: "A controlled system",
    desc: "Поэтому мы перестали проектировать искусственное жюри и начали строить контролируемую систему оценки: фиксированные критерии, ясные роли, структурированные выводы, отчёты с привязкой к evidence и human review.",
  },
];

/* Pipeline — the five fixed stages. Adapted for the demoday process narrative. */
const PIPELINE_STEPS = [
  {
    num: "01",
    label: "Декодирование",
    desc: "PDF, PPTX или Google Slides приводятся к единому структурированному формату для дальнейшего анализа.",
  },
  {
    num: "02",
    label: "Панель AI-судей",
    desc: "Шесть специализированных судей независимо оценивают проект по одним и тем же критериям, не влияя друг на друга.",
  },
  {
    num: "03",
    label: "Агрегация результатов",
    desc: "Все оценки, выводы и доказательства объединяются в единую структуру по фиксированным правилам.",
  },
  {
    num: "04",
    label: "Итоговая оценка",
    desc: "Система рассчитывает итоговый балл с учётом ваших критериев и весов. Финальное решение принимает человек.",
  },
  {
    num: "05",
    label: "Отчёт",
    desc: "Для каждого проекта формируется понятный отчёт с баллами, доказательствами, рисками и рекомендациями.",
  },
];

/* Slide 7 — the six Pitch Competition dimensions (P1–P6), framed as criteria.
   These are the scored dimensions, NOT the judge lenses (J-P1…J-P6), which live
   only in the Routing Matrix below. */
const DIMENSIONS = [
  { tag: "P1", title: "Значимость проблемы", body: ["Насколько проблема реальна, важна и требует решения?"] },
  { tag: "P2", title: "Отличие решения", body: ["Насколько решение убедительно и отличается от существующих альтернатив?"] },
  { tag: "P3", title: "Привлекательность рынка", body: ["Достаточно ли велик рынок и есть ли потенциал для роста?"] },
  { tag: "P4", title: "Бизнес-модель", body: ["Понятно ли, как продукт будет привлекать клиентов и зарабатывать?"] },
  { tag: "P5", title: "Команда", body: ["Способна ли команда реализовать этот проект?"] },
  { tag: "P6", title: "Реализуемость", body: ["Реалистичен ли план с учётом ресурсов, сроков и рисков?"] },
];

/* Slide 8 — the real Judge Routing Matrix (Pitch preset). Each judge has one
   primary dimension (J-P3 owns two; J-P4 Pitch Quality reads everything as
   advisory). Weights: primary 1.00 · secondary 0.50 · advisory 0.25 · none 0.
   Ported verbatim from trust/methodology §6. */
const ROUTING_DIMENSIONS = ["Problem", "Solution", "Market", "GTM", "Team", "Feasibility"];
const ROUTING_DIMENSIONS_FULL = [
  "Problem significance",
  "Solution differentiation",
  "Market attractiveness",
  "Business model / GTM",
  "Team / founder fit",
  "Feasibility / readiness",
];
const ROUTING_JUDGES: RoutingJudge[] = [
  { code: "J-P1", name: "Problem", cells: ["primary", "advisory", "advisory", "none", "none", "advisory"] },
  { code: "J-P2", name: "Solution Logic", cells: ["secondary", "primary", "advisory", "advisory", "none", "secondary"] },
  { code: "J-P3", name: "Business Value / Market", cells: ["advisory", "advisory", "primary", "primary", "none", "advisory"] },
  { code: "J-P4", name: "Pitch Quality", cells: ["advisory", "advisory", "advisory", "advisory", "advisory", "advisory"] },
  { code: "J-P5", name: "Team Readiness", cells: ["none", "none", "advisory", "advisory", "primary", "secondary"] },
  { code: "J-P6", name: "Feasibility", cells: ["advisory", "secondary", "secondary", "secondary", "secondary", "primary"] },
];

/* Slide 9 — hero outcome stat-row (illustrative, framed as a 20–30 min manual
   read). Page-local markup, ported verbatim from product/evidence-based-reports. */
const HERO_STATS = [
  { v: "Начинайте с отчёта", k: "Сначала ключевые выводы, затем исходный дек." },
  { v: "До 40 часов экономии", k: "Массовая оценка десятков проектов вместо ручного разбора каждого." },
  { v: "Вся когорта в одном месте", k: "Сравнивайте все проекты по единому стандарту оценки." },
] as const;

/* Team — founder dossier cards. Ported verbatim from company/about. */
type TeamMember = {
  surname: string;
  name: string;
  role: string;
  bio?: string;
  /** Handwritten / marker-style note over the card. */
  marker?: string;
  /** One light, human "Off-screen: …" line. */
  offscreen?: string;
  dream?: string;
  hobby?: string;
  /** Transparent cut-out portrait (webp) + its intrinsic size, when shipped. */
  portrait?: string;
  pw?: number;
  ph?: number;
  /** ≤3 specialization chips. */
  spec?: readonly string[];
  signals?: readonly string[];
  linkedin?: string;
  telegram?: string;
};
const TEAM: TeamMember[] = [
  {
    surname: "Volovoj",
    name: "Yaroslav Volovoj",
    role: "Product & GTM",
    marker: "Founder mode: on",
    offscreen: "Off-screen: sharp decks, product calls, and probably a pickleball court.",
    dream: "Grow a unicorn!",
    hobby: "Hackathons & sport",
    portrait: "/assets/about/portrait-yaroslav-2.webp",
    pw: 1254,
    ph: 1224,
    spec: ["Product Strategy", "GTM", "Review UX"],
    signals: ["Team", "P5", "Verify live"],
    linkedin: "https://www.linkedin.com/in/yaroslavvolovoj/",
  },
  {
    surname: "Starodubov",
    name: "Vladislav Starodubov",
    role: "Engineering & Reliability",
    marker: "Keeps it working",
    offscreen: "Off-screen: architecture maps, edge cases, and systems that refuse to break.",
    dream: "Grow a unicorn!",
    hobby: "Hard work & good company",
    portrait: "/assets/about/portrait-vladislav-2.webp",
    pw: 1080,
    ph: 1377,
    spec: ["AI Pipeline", "Reliability", "Architecture"],
    signals: ["Team", "P5", "Verify live"],
    telegram: "https://t.me/vrway",
  },
];

export default function DemoDayPage() {
  return (
    <>
      <main className="demoday about section-lab ds">
        {/* The whole deck is dark. Force an ink page background so any section
            that renders a transparent `.band` (e.g. PinnedSteps `.lab-process`,
            which on its Lab stand expects a tonal-zone background) shows black
            instead of the white document body — otherwise white heading text
            lands on white. */}
        <style>{`
          .demoday{ background: var(--bg-ink); }
          .demoday.ds::before{ display:none; }
          /* ZoneBlobs ships six drifting PNGs; six of them animating over the
             zone's stacked gradient layers drops frames on this page. Keep the
             three that carry the composition (left/right/left) and drop the
             rest — local to the deck, the shared component is untouched. */
          .demoday .ds-blob--d,
          .demoday .ds-blob--e,
          .demoday .ds-blob--f{ display:none; }
          .demoday #origin .ds-cinema__fill{
            background:
              linear-gradient(
                180deg,
                #f8fbff 0%,
                #f8fbff 47%,
                #8d8bff 47%,
                #48b9f4 58%,
                #36e0c2 100%
              );
          }
          .demoday #deck-bento .lab-bento__tile h3{
            font-size:clamp(36px,4.4vw,50px);
            line-height:1.04;
          }
        `}</style>
        <Hero
          primaryAction="restart-unicorn"
          primaryLabel="Start Demo"
          showSecondary={false}
          showSub={false}
        />
        {/* Next blocks go here, in presentation order. */}

        {/* Block A — Team (ported verbatim from company/about #team). Founder
            dossier cards (Intelligence Wall), DARK. Two glass cards built in
            code; portraits are real cut-outs, all text is HTML. */}
        <section id="team" className="band ink ab-founders-sec" aria-label="The team behind EvalLens">
          <div className="wrap">
            <div className="head ab-founders__intro" data-reveal="up">
              <span className="eyebrow">
                <span className="dot" aria-hidden="true"></span>
                The team
              </span>
              <h2 className="title">Мы знаем эту проблему с <span className="grad-word">обеих сторон</span></h2>
              {/* trust-line — early-team durability: shared context, low founder-
                  conflict risk. "16+ years" carries the lens gradient. */}
              <p className="ab-trust">
                <span className="ab-trust__lead">
                  Два основателя. <span className="ab-trust__years">16+ лет</span> общего контекста.
                </span>
                <span className="ab-trust__sub">
                  От университетской дружбы до системы для более точной оценки.
                </span>
              </p>
            </div>
            <div className="ab-founders">
              <TeamTilt />
              {TEAM.map((m, i) => (
                <article
                  key={m.name}
                  className="ab-dossier"
                  data-accent={i === 0 ? "violet" : "cyan"}
                  data-reveal="up"
                  style={{ ["--reveal-delay" as string]: `${i * 120}ms` }}
                >
                  {/* moving brand-colour lamps (on hover) + always-on sheen */}
                  <span className="ab-dossier__lamps" aria-hidden="true">
                    <span className="ab-dossier__lamp ab-dossier__lamp--1" />
                    <span className="ab-dossier__lamp ab-dossier__lamp--2" />
                    <span className="ab-dossier__lamp ab-dossier__lamp--3" />
                  </span>
                  <span className="ab-dossier__sheen" aria-hidden="true" />

                  <div className="ab-dossier__portrait">
                    <span className="ab-dossier__tag">Founder</span>
                    {m.spec ? (
                      <ul className="ab-dossier__specs" aria-label="Focus areas">
                        {m.spec.map((s) => (
                          <li key={s} className="ab-spec chip-pulse">{s}</li>
                        ))}
                      </ul>
                    ) : null}
                    {m.portrait ? (
                      <Image
                        className="ab-dossier__photo"
                        src={m.portrait}
                        alt={`Portrait of ${m.name}`}
                        width={m.pw ?? 1200}
                        height={m.ph ?? 1500}
                        sizes="(max-width:880px) 90vw, 500px"
                      />
                    ) : (
                      <span className="ab-dossier__photo-ph" aria-hidden="true" />
                    )}
                    {m.marker ? (
                      <span className="ab-dossier__marker">{m.marker}</span>
                    ) : null}
                  </div>

                  <div className="ab-dossier__body">
                    <span className="ab-dossier__role">{m.role}</span>
                    <h3 className="ab-dossier__name">{m.name}</h3>
                    {m.bio ? (
                      <p className="ab-dossier__bio">{m.bio}</p>
                    ) : null}
                    {m.offscreen ? (
                      <p className="ab-dossier__offscreen">{m.offscreen}</p>
                    ) : null}
                    <div className="ab-dossier__foot">
                      <ul className="ab-dossier__pills">
                        {m.hobby ? (
                          <li className="ab-pill">
                            <span className="ab-pill__k">Hobby:</span>
                            {m.hobby}
                          </li>
                        ) : null}
                        {m.dream ? (
                          <li className="ab-pill">
                            <span className="ab-pill__k">Dream:</span>
                            {m.dream}
                            <span className="ab-pill__logo" aria-hidden="true" />
                          </li>
                        ) : null}
                      </ul>
                      {m.telegram ? (
                        <a
                          className="ab-dossier__link"
                          href={m.telegram}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          TG<span aria-hidden="true"> ↗</span>
                        </a>
                      ) : m.linkedin ? (
                        <a
                          className="ab-dossier__link"
                          href={m.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          LinkedIn<span aria-hidden="true"> ↗</span>
                        </a>
                      ) : null}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Story opener — Cinema (ink). Bridges the team into the AI Jury
            history that follows: the headline is knocked out of the scrim and
            the unicorn reel plays through the letters. */}
        <Cinema
          id="origin"
          surface="ink"
          eyebrow="Как мы пришли к этому"
          headline="Все началось с хакатона"
          lines={["Все началось с", "хакатона"]}
          mobileLines={["Все началось с", "хакатона"]}
          sub="Amazon Nova Hackathon. Один вопрос: может ли команда специализированных AI-судей оценивать питчи лучше, чем одна универсальная модель?"
          media={{
            videoSrc: "/assets/cta/uniqorn-1.mp4",
            poster: "/assets/cta/uniqorn-1-poster.webp",
          }}
          maskId="demoday-origin"
        />

        {/* Dark spacer — Cinema above and #story below are BOTH [data-pin]
            sections. Two adjacent sticky pin stages fight each other's scroll
            math (it broke the pipeline stepper once already); a plain
            non-pinned black band between them is the fix. */}
        <section
          aria-hidden="true"
          className="band ink"
          style={{ minHeight: "40svh", background: "var(--bg-ink)" }}
        />

        {/* Block B — Hundreds of runs (ported verbatim from company/about
            #story). From AI Jury to EvalLens — pinned multi-screen, DARK.
            The #story-claim Cinema block that follows it on About is a separate
            section and is intentionally NOT ported. */}
        <section
          id="story"
          className="band ink ab-story"
          data-pin
          data-pin-steps="3"
          aria-label="From AI Jury to EvalLens — the history in three steps"
        >
          <div className="ab-story__stage" data-pin-stage>
            <div className="wrap ab-story__grid">
              <div className="ab-story__col">
                <div className="head ab-story__head">
                  <span className="eyebrow">
                    <span className="dot" aria-hidden="true"></span>
                    From AI jury to human-controlled evaluation
                  </span>
                  <h2 className="title">Чему нас научили <span className="grad-word">сотни пробегов</span>?</h2>
                  <p className="sub">
                    EvalLens начинался как AI Jury. Первая идея была простой:
                    использовать несколько специализированных AI-судей вместо
                    мнения одной универсальной модели. Но прогоны быстро
                    показали настоящую проблему.
                  </p>
                </div>
                <ol className="ab-story__track">
                  {STORY_STEPS.map((s, i) => (
                    <li
                      key={s.label}
                      className="ab-story__step"
                      data-pin-step
                      style={{ ["--i" as string]: String(i) }}
                    >
                      <span className="ab-story__num">{s.num}</span>
                      <span className="ab-story__label">{s.label}</span>
                      <span className="ab-story__desc">{s.desc}</span>
                    </li>
                  ))}
                </ol>
              </div>
              <div className="ab-story__side">
                {/* story visual — the full EvalLens origin journey (AI Jury →
                    hackathon → brainstorm → lens parts → Evaluation Lens →
                    EvalLens → unicorn). Tall transparent cutout, shown large to
                    fill the pinned stage. The authored pipeline list above was
                    removed in favour of this single image. */}
                <ParallaxFloat
                  className="ab-story__media ab-story__media--img"
                  src="/assets/methodology/eval-lens-roadmap-vertical-02.webp"
                  alt="The EvalLens origin journey: from AI Jury and a hackathon, through brainstorming and lens parts, to the Evaluation Lens and EvalLens"
                  width={781}
                  height={1857}
                  sizes="(max-width: 880px) 70vw, 380px"
                  floatY={8}
                  tilt={5}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Slide 4 — Bento overview (DS, ink). Placeholder copy; real content
            TBD. Feature tile carries the media slot (no asset yet → component
            placeholder). */}
        <Bento
          id="deck-bento"
          eyebrow="The problem"
          title="Оценка ломается с обеих сторон"
          titleAccent="обеих сторон"
          sub="Организаторы не успевают оценивать. Фаундеры не понимают, почему проиграли. Причина одна и та же."
          items={[
            {
              tag: "Organizer",
              title: "Деков больше\nчем времени",
              body: "Поток заявок превышает возможности жюри, поэтому глубина оценки зависит от места проекта в очереди.",
              feature: true,
            },
            {
              tag: "Organizer",
              title: "Планка оценки дрейфует",
              body: "Один и тот же дек получает разные баллы в зависимости от судьи, усталости и порядка просмотра.",
            },
            {
              tag: "Founder",
              title: "Дек читают по диагонали",
              body: "Сильные аргументы остаются незамеченными, а решение зависит от первого впечатления.",
            },
            {
              tag: "Founder",
              title: "Нет понятной обратной связи",
              body: "Фаундер получает итоговый балл, но не понимает, что именно нужно исправить.",
            },
          ]}
        />

        {/* Slide 4.5 — Flow statement (Cinema, DS, ink). Cinematic knockout:
            the media plays through the letters. Bridges the problem into the
            pipeline that follows. Title placeholder — refine copy later. */}
        <Cinema
          id="deck-flow"
          surface="ink"
          headline="Один процесс. Один стандарт оценки."
          lines={["Один процесс.", "Один стандарт оценки."]}
          mobileLines={["Один процесс.", "Один стандарт", "оценки."]}
          sub="От загрузки заявки до итогового отчёта каждый проект проходит один и тот же путь."
          media={{
            videoSrc: "/assets/methodology/cinema.mp4",
            poster: "/assets/methodology/cinema-poster.webp",
          }}
          maskId="demoday-flow"
        />

        {/* Dark spacer — a plain non-pinned black band that separates the two
            pinned sections (Cinema above, PinnedSteps below). Two adjacent
            [data-pin] sticky stages fight each other's scroll math and break the
            stepper; a normal-flow band between them is the fix. */}
        <section
          aria-hidden="true"
          className="band ink"
          style={{ minHeight: "40svh", background: "var(--bg-ink)" }}
        />

        {/* Slide 5 — Pipeline (PinnedSteps, DS, ink). Copied verbatim from
            trust/methodology §5a "Every deck follows the same path". */}
        <PinnedSteps
          id="pipeline"
          surface="ink"
          version={3}
          ariaLabel="Каждый проект проходит пять одинаковых этапов"
          eyebrow="Один стандарт оценки"
          title={{ line1: "", line1Accent: "Каждый проект", line2: "проходит один и тот же путь" }}
          sub="Процесс остаётся неизменным, поэтому каждый проект оценивается по одному стандарту."
          steps={PIPELINE_STEPS}
          media={{
            ratio: "4/3",
            label: "Diagram · pipeline · 4:3",
            hint: "Декодирование → AI-судьи → Агрегация → Итоговая оценка → Отчёт, узлы подсвечены вдоль трека",
            ariaLabel:
              "Горизонтальный трек из пяти этапов процесса, от декодирования до отчёта",
          }}
          videoScrub={{
            src: "/assets/methodology/methodology-transition.mp4?v=3",
            poster: "/assets/methodology/methodology-transition-poster.webp",
            frames: 0,
            ariaLabel:
              "Methodology transition — scrubbed by scroll through the stages",
          }}
        />

        {/* Slide 6 — "Not a wrapper over GPT" (Gallery, DS, ink, v3 Expanded).
            Four differentiators vs a single ChatGPT prompt: panel / contract /
            calibration / advisor. */}
        <Gallery
          id="not-a-wrapper"
          surface="ink"
          version={3}
          eyebrow="Не один универсальный промпт"
          title="Не обёртка над GPT"
          accentWords={["GPT"]}
          sub="Четыре вещи отличают EvalLens от одного вызова универсальной модели."
          laneLabel="Четыре отличия EvalLens от одного вызова универсальной модели"
          items={[
            {
              tag: "Панель, а не промпт",
              title: "Шесть ролевых судей",
              body: "Каждый судья отвечает только за своё измерение. Это устраняет эффект ореола и смешение критериев.",
            },
            {
              tag: "Контракт, а не сочинение",
              title: "Единый контракт оценки",
              body: "Каждый прогон проходит по одной структуре. Каждый балл подтверждается конкретным фрагментом дека.",
            },
            {
              tag: "Калибровка, а не ощущения",
              title: "400+ калибровочных прогонов",
              body: "Мы измеряем дрейф оценок, bias судей и стабильность результатов, чтобы оценка была воспроизводимой.",
            },
            {
              tag: "Советник, а не приговор",
              title: "Человек принимает решение",
              body: "EvalLens готовит структурированный разбор. Финальный балл и решение всегда остаются за человеком.",
            },
          ]}
        />

        {/* ── ONE continuous tonal zone (slides 7–9) ───────────────────────
            The zone must BRACKET the seam, not start after it: slide 7 is the
            dark side of the flip, slides 8–9 the light side. Layer stack
            (z-index:-1, DOM order = back→front):
              1) --lobes                 light BASE
              2) --lobes-dark + sparks   dark layer. Forced on with
                 `ds-zone__bg--on` because no forward <ZoneToneFlip/> precedes
                 it here — the deck is already dark when the zone opens.
              3) --lobes + .ds-relight   RE-LIGHT layer, opacity:0
              4) .ds-flip-bridge + __glow  the brand bloom, opacity:0
            <ZoneToneFlipReverse/> scrubs 3) in and flashes 4) across the seam —
            that's the colour-to-colour blink, no grey mid-tone. ── */}
        <div className="ds-zone">
          <div
            className="ds-zone__bg ds-zone__bg--contained ds-canvas__bg--lobes"
            aria-hidden="true"
          />
          <div
            className="ds-zone__bg ds-zone__bg--contained ds-canvas__bg--lobes-dark ds-zone__bg--on"
            aria-hidden="true"
          >
            <span className="ds-canvas__spark ds-canvas__spark--1" />
            <span className="ds-canvas__spark ds-canvas__spark--2" />
            <span className="ds-canvas__spark ds-canvas__spark--3" />
          </div>
          <div
            className="ds-zone__bg ds-zone__bg--contained ds-canvas__bg--lobes ds-relight"
            aria-hidden="true"
          />
          {/* SECOND dark layer, opacity:0. Sits above .ds-relight so it can
              cover the light again, and is driven by the forward <ZoneToneFlip/>
              via `targetSelector` — the two flips never fight over one opacity. */}
          <div
            className="ds-zone__bg ds-zone__bg--contained ds-canvas__bg--lobes-dark ds-redark"
            aria-hidden="true"
          />
          <div className="ds-flip-bridge" aria-hidden="true" />
          <div className="ds-flip-bridge__glow" aria-hidden="true" />

          {/* Blobs belong to the light tail only — clipped off the dark head
              (slide 7). Tune the % if section heights change. */}
          <ZoneBlobs top="30%" />

          {/* Slide 7 — Dimension Matrix (Gallery, DS, ink). The six scored
              dimensions are framed as criteria. This is the DARK side of the flip. */}
          <Gallery
            id="matrix"
            surface="ink"
            version={4}
            eyebrow="Шесть критериев оценки"
            title="Шесть критериев. Один стандарт оценки."
            accentWords={["Один", "стандарт"]}
            sub="Каждый проект оценивается по одним и тем же критериям, поэтому результаты остаются сопоставимыми."
            laneLabel="Шесть критериев оценки, P1-P6"
            items={DIMENSIONS}
          />

          {/* Reverse tone-flip seam (slide 7 → 8): dark→light through the brand
              bridge, no grey. */}
          <ZoneToneFlipReverse />

          {/* Slide 8 — Routing matrix (RoutingMatrix, DS, light). Full judge ×
              dimension table. Ported verbatim from methodology §6. */}
          <RoutingMatrix
            id="routing"
            eyebrow="Контролируемое влияние"
            title="Каждый судья влияет на свой балл"
            accentWords={["влияет"]}
            sub="Каждый судья влияет только на свои критерии оценки."
            dimensions={ROUTING_DIMENSIONS}
            dimensionsFull={ROUTING_DIMENSIONS_FULL}
            judges={ROUTING_JUDGES}
          />

          {/* Slide 9 — "A score you can explain", lifted whole from
              product/evidence-based-reports §1: the StatementHero plus its
              page-local stat-row. Both need the `.evidence-reports` scope (it
              owns `.evr-*` and the v3 hero-image rule), so the class rides a
              local wrapper — putting it on <main> would drag that page's
              Cinema/Bento overrides onto our other slides.

              `id` is NOT "hero": the home Hero owns that, and a second #hero
              re-arms the global scroll-lock. `headingLevel="h2"` keeps one h1. */}
          <div className="evidence-reports">
            <StatementHero
              id="score"
              surface="light"
              version={3}
              headingLevel="h2"
              eyebrow="Отчёт с доказательствами"
              titleLead="Балл, который можно объяснить."
              titleAccent="Доказательства"
              titleTrail="которые можно проверить."
              sub="Каждый вывод связан с конкретными слайдами дека, поэтому вы понимаете не только итоговую оценку, но и причины, которые к ней привели."
              media={{
                ratio: "3/2",
                label: "Image · score linked to the deck · 3:2",
                hint: "A score with thin lines tracing back to deck slides — lens-gradient violet→cyan→aqua, calm",
                ariaLabel:
                  "An overall score with a dimension radar, linked to deck slides — Market TAM and Traction MAU",
                src: "/assets/evidence-reports/hero-score-dashboards-01.webp",
                width: 1536,
                height: 1024,
              }}
            />

            <section
              className="band soft evr-statband"
              aria-label="Illustrative outcomes, based on a 20–30 minute manual read per deck"
            >
              <div className="wrap">
                <ul className="evr-stats" data-reveal="up">
                  {HERO_STATS.map((s) => (
                    <li key={s.v} className="evr-stat">
                      <span className="evr-stat__v">{s.v}</span>
                      <span className="evr-stat__k">{s.k}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </div>

          {/* Forward tone-flip seam (slide 9 → 10): light→dark back through the
              same brand bloom, so the seam is a colour transition, not a cut.
              It drives `.ds-redark` — the SECOND dark layer — leaving the first
              one (which held the dark head of the zone) alone. */}
          <ZoneToneFlip targetSelector=".ds-redark" />

          {/* Slide 10 — After the scores (Numbered, DS, v3). Ported verbatim from
              product/review-board §2. Its surface is baked to `ink` in the
              component, but INSIDE the zone `.band` goes transparent (ds.css
              scopes that under `.ds-zone`), so the zone's dark layer shows
              through and the flip stays visible. The `\n` in `sub` is
              intentional: the component turns it into a <br/>. */}
          <Numbered
          id="decision"
          version={3}
          eyebrow="После оценки"
          title="Оценённая когорта всё ещё требует решения"
          titleAccent="решения"
          sub="AI может оценить каждый проект. Но жюри всё равно должно сравнить доказательства, разобрать расхождения и решить, кто проходит дальше."
          items={[
            {
              num: "01",
              title: "Отдельные отчёты скрывают различия",
              body: "Важные различия легко упустить, когда каждый отчёт находится в отдельной вкладке.",
            },
            {
              num: "02",
              title: "Оценки должны быть подтверждены доказательствами",
              body: "Оценка ничего не значит, если нельзя увидеть, на чём она основана.",
            },
            {
              num: "03",
              title: "За прогрессом оценки сложно следить",
              body: "Ревьюерам нужен единый экран, где видно, что уже готово, что находится на проверке, что оценено, а что заблокировано.",
            },
            {
              num: "04",
              title: "Решения теряют контекст",
              body: "Оценки, комментарии и обоснования должны оставаться доступными даже после того, как финальный шорт-лист уже сформирован.",
            },
            ]}
          />
        </div>

        {/* Slide 11 — HITL / "what we do not claim" (ink). Lifted whole from
            trust/consistency-reliability §8: a page-local replica of the
            StatementHero v3 editorial layout, reusing the global `ds-hero`
            classes, with a delayed-loop video in the media slot. Its `<style>`
            is scoped by the section's own `.consistency-honest-edge` class, so
            nothing leaks onto the rest of the deck. Copy is placeholder — the
            user will rewrite it. It sits OUTSIDE the light zone above (ink). */}
        <section className="band ink ds-hero consistency-honest-edge">
          <style>{`
            .consistency-honest-edge{ overflow:hidden; }
            .consistency-honest-edge .cr-honest-media{
              position:relative; width:100%; aspect-ratio:16/9; overflow:hidden;
              border-radius:clamp(22px,2.2vw,30px);
            }
            /* media ~1.5x, anchored at its LEFT edge so it grows into the empty
               right gutter (bleeds off the edge, clipped by the section) and
               never reaches the copy or heading. Desktop only; 1x when stacked. */
            @media (min-width:621px){
              .consistency-honest-edge .cr-honest-media{
                transform:scale(1.5); transform-origin:left center;
              }
            }
            .consistency-honest-edge .cr-honest-media video{
              position:absolute; inset:0; width:100%; height:100%;
              object-fit:cover; transform:scale(1.08); transform-origin:center;
              -webkit-mask-image:
                linear-gradient(to right, transparent, #000 9%, #000 91%, transparent),
                linear-gradient(to bottom, transparent, #000 10%, #000 90%, transparent);
              -webkit-mask-composite:source-in;
              mask-image:
                linear-gradient(to right, transparent, #000 9%, #000 91%, transparent),
                linear-gradient(to bottom, transparent, #000 10%, #000 90%, transparent);
              mask-composite:intersect;
            }
            .consistency-honest-edge .cr-honest-media::after{
              content:""; position:absolute; inset:0; border-radius:inherit; pointer-events:none;
              background:radial-gradient(122% 100% at 50% 50%, transparent 50%, rgba(5,4,12,.55) 82%, rgba(5,4,12,.92) 100%);
            }
          `}</style>
          <div className="ds-hero__v ds-hero__v3" data-version="3">
            <div className="wrap ds-hero__editorial">
              <div className="ds-hero__ed-copy">
                <Eyebrow>Что остаётся за человеком</Eyebrow>
                {/* h2: the page's one h1 lives in the home Hero */}
                <h2 className="ds-hero__title ds-hero__title--left">
                  Система анализирует. Человек оценивает.
                </h2>
                <p className="sub ds-hero__sub ds-hero__sub--left">
                  EvalLens структурирует разбор, собирает доказательства и
                  подсвечивает риски. Финальный балл, сравнение команд и решение
                  всегда остаются за жюри.
                </p>
              </div>
              <div className="ds-hero__ed-media cr-honest-media" aria-hidden="true">
                {/* plays once, holds the last frame, then replays after a 7s gap */}
                <DelayedLoopVideo
                  src="/assets/consistency/honest-edge-bg.mp4"
                  poster="/assets/consistency/honest-edge-bg-poster.webp"
                  gap={7}
                />
              </div>
            </div>
          </div>
        </section>

        {/* page-local: fade the closer's video in from black at its top so it
            blends into the ink HITL section above instead of a hard seam. The
            fade sits at z-index 0 inside .ds-hero__v--media — above the video
            (-2) and the scrim (-1), below the text overlay (1). Shared component
            untouched. Ported from trust/consistency-reliability §9. */}
        <style>{`
          #live-demo .ds-hero__v--media::before{
            content:""; position:absolute; left:0; right:0; top:0; z-index:0;
            height:clamp(140px,20vh,260px); pointer-events:none;
            background:linear-gradient(180deg, #05050a 0%, rgba(5,5,10,.55) 44%, transparent 100%);
          }
        `}</style>

        {/* Slide 12 — the closer. StatementHero (ink, v1) with a full-bleed
            video background, lifted from trust/consistency-reliability
            §get-started. It owns its own background, so it stays OUTSIDE the
            tonal zone above. Copy is rewritten for the demo day: the deck ends
            here and we switch to the live product.
            `headingLevel="h2"` keeps the page at one h1 (the home Hero). */}
        <StatementHero
          id="live-demo"
          surface="ink"
          version={1}
          headingLevel="h2"
          background="video"
          backgroundSrc="/assets/consistency/consistency-cta-bg-2.mp4"
          backgroundPoster="/assets/consistency/consistency-cta-bg-2-poster.webp"
          eyebrow="Live demo"
          titleLead="From here, we show it"
          titleAccent="live"
          sub="Сейчас мы покажем вам живой пайплайн, как работает наша система."
          ctas={[{
            label: "Погнали!",
            href: "https://ai-jury-prod.vercel.app/dashboard",
            target: "_blank",
          }]}
        />
      </main>
      {/* Two scroll engines coexist on this page (the only page that does).
          ScrollOrchestrator drives the home Hero intro (dual-video sync +
          unicorn reveal) and is the SOLE owner of `hero-ready`: it sets the
          class after the intro and never removes it. ScrollFX drives the
          ported DS sections' [data-reveal] / [data-scrub] / [data-pin]
          mechanics (Cinema #deck-flow, PinnedSteps #pipeline, Gallery
          #not-a-wrapper). They don't overlap selectors, and ScrollFX detects
          the home Hero (`#hero .hero-video`) and deliberately does NOT touch
          the `hero-ready` scroll-lock here — otherwise its cleanup (Strict
          Mode / async video race) would strip the class, re-lock the body
          (overflow:hidden) and break every sticky pin stage. See ScrollFX.tsx
          for the guard. */}
      <ScrollOrchestrator />
      <ScrollFX />
    </>
  );
}
