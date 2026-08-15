import type { Metadata } from "next";
import { ScrollFX } from "@/components/ScrollFX";
import { DeckNav, type DeckSlide } from "@/components/deck/DeckNav";
import {
  StatementHero,
  Bento,
  Gallery,
  EditorialSplit,
  Cinema,
  CtaBand,
} from "@/components/ds";

export const metadata: Metadata = {
  title: "EvalLens — питч на 10 минут",
  description: "Внутренний презентационный дек EvalLens для питч-компетишена.",
  robots: { index: false, follow: false },
};

/*
 * ── /deck — питч-презентация на 10 минут (RU) ────────────────────────────
 * Скролл-дек из живых DS-компонентов сайта: один блок = один слайд, стрелки
 * ←/→ листают, точки справа показывают позицию. Страница noindex — служебная.
 * Сторборд и спич: ai-jury-prod/notes/reports/2026-07-10-pitch-deck-outline.md
 */

const SLIDES: DeckSlide[] = [
  { id: "s1", label: "EvalLens" },
  { id: "s2", label: "Хакер и стартапер" },
  { id: "s3", label: "Почему мы к этому пришли" },
  { id: "s4", label: "Проблема" },
  { id: "s5", label: "Как это работает" },
  { id: "s6", label: "Панель судей P1–P6" },
  { id: "s7", label: "Пайплайн" },
  { id: "s8", label: "Evidence + live demo" },
  { id: "s9", label: "Надёжность и границы" },
  { id: "s10", label: "Финальная фраза" },
  { id: "s11", label: "Что дальше" },
];

const TEAM = [
  {
    role: "Хакер",
    name: "Владислав Стародубов",
    bio: "Инженерия и надёжность: оркестрация судей, скоринг-инфраструктура, безопасность, воспроизводимые прогоны.",
    portrait: "/assets/about/portrait-vladislav-2.webp",
    accent: "cyan" as const,
  },
  {
    role: "Стартапер",
    name: "Ярослав Воловой",
    bio: "Продукт и go-to-market: флоу ревью, путь от AI Jury к EvalLens. По обе стороны питчей — и подавался, и оценивал.",
    portrait: "/assets/about/portrait-yaroslav-2.webp",
    accent: "violet" as const,
  },
] as const;

const STORY_STEPS = [
  {
    num: "01",
    label: "AI Jury",
    desc: "Первая версия — на хакатоне Amazon Nova: могут ли специализированные AI-судьи смотреть на дек с разных углов?",
  },
  {
    num: "02",
    label: "Сотни прогонов",
    desc: "Больше судей ≠ качество. Баллы плавали, роли перекрывались, длинные отчёты создавали шум вместо ясности.",
  },
  {
    num: "03",
    label: "Контролируемая система",
    desc: "Фиксированные критерии, чёткие роли, структурированные выводы, доказательства к каждому баллу — и человек в финале.",
  },
] as const;

const PROBLEM_TILES = [
  {
    tag: "Стена",
    title: "Сильные заявки тонут в потоке",
    body: "Деки приходят быстрее, чем жюри успевает их вдумчиво читать. Та самая команда получает беглый взгляд перед решением.",
    feature: true,
    media: {
      src: "/assets/one-pager/problem-wall-broken.webp",
      width: 1600,
      height: 900,
      label: "Изображение · стена проблем · 4:3",
      hint: "Дек упирается в стену из блоков: слишком много деков, мало времени, разные критерии, bias, усталость.",
      ariaLabel:
        "Питч-дек упирается в стену проблем ручной оценки: объём, время, дрейф критериев, bias, слабый след решения",
    },
  },
  {
    tag: "Поток",
    title: "Заявок больше, чем времени",
    body: "Каждый конкурс — десятки деков и жёсткий дедлайн на оценку.",
  },
  {
    tag: "Узкое место",
    title: "Внимание жюри ограничено",
    body: "Первые деки получают настоящий разбор, остальные — взгляд по диагонали.",
  },
  {
    tag: "Планка",
    title: "Планка дрейфует",
    body: "Один судья взвешивает трекшн, другой — команду. Оценка не воспроизводится дважды.",
  },
  {
    tag: "Защитимость",
    title: "Решение трудно защитить",
    body: "Через месяц никто не восстановит, почему команда прошла — или вылетела.",
  },
] as const;

const FLOW_STEPS = [
  {
    num: "01",
    label: "Соберите заявки",
    desc: "Вручную или по публичной ссылке — все деки конкурса в одном месте.",
  },
  {
    num: "02",
    label: "Задайте свою планку",
    desc: "Критерии, веса и шкала под ваш конкурс — планка одна для всех.",
  },
  {
    num: "03",
    label: "Машинный первый разбор",
    desc: "Структурированный разбор каждого дека — примерно 4–5 минут на дек после загрузки.",
  },
  {
    num: "04",
    label: "Leaderboard когорты",
    desc: "Вся когорта на одной планке — разброс и лидеры видны сразу.",
  },
  {
    num: "05",
    label: "Отчёт по каждой команде",
    desc: "Тезис, риски, пробелы, рекомендация. Финальный балл ставит человек.",
  },
] as const;

const JUDGES = [
  {
    tag: "P1",
    title: "Значимость проблемы",
    body: "Реальна ли боль — срочная, конкретная, у понятной аудитории?",
  },
  {
    tag: "P2",
    title: "Отличие решения",
    body: "Ясно ли решение и отличается ли оно по существу, а не по словам?",
  },
  {
    tag: "P3",
    title: "Привлекательность рынка",
    body: "Правдоподобна ли возможность и стоит ли она усилий?",
  },
  {
    tag: "P4",
    title: "Бизнес-модель и GTM",
    body: "Есть ли правдоподобный путь к выручке и дистрибуции?",
  },
  {
    tag: "P5",
    title: "Команда",
    body: "Может ли именно эта команда реально исполнить план?",
  },
  {
    tag: "P6",
    title: "Реализуемость",
    body: "Реалистичен ли план с учётом ресурсов, времени и зависимостей?",
  },
] as const;

const PIPELINE_STEPS = [
  {
    num: "01",
    label: "Decode",
    desc: "Достаём и нормализуем контент дека: PDF, слайды, ссылки — в единый текстовый вид.",
  },
  {
    num: "02",
    label: "Judges",
    desc: "Шесть ролевых судей независимо оценивают каждый своё измерение — без доступа к чужим зонам.",
  },
  {
    num: "03",
    label: "Summarize",
    desc: "Выводы судей сводятся в структурированный отчёт по фиксированному контракту.",
  },
  {
    num: "04",
    label: "Score",
    desc: "Баллы агрегируются в итоговый — с порогами STRONG / MID / WEAK. Каждый шаг воспроизводим и логируется.",
  },
] as const;

const EVIDENCE_POINTS = [
  { title: "Балл → цитата из дека", body: "Каждая оценка ссылается на конкретное место в материалах." },
  { title: "Риски и пробелы", body: "Что проверить в обсуждении и каких данных не хватает." },
  { title: "Вопросы для жюри", body: "Готовые вопросы к команде — с чего начать разговор." },
  { title: "Рекомендация", body: "Копать глубже или пас — с обоснованием." },
] as const;

const RELIABILITY_TILES = [
  {
    tag: "Человек решает",
    title: "Финальный балл ставит человек",
    body: "AI готовит разбор и доказательства; решение и ранжирование остаются за жюри.",
    feature: true,
    media: {
      ratio: "4/3",
      src: "/assets/security-privacy/final-decision-human-ranking.webp",
      width: 1619,
      height: 972,
      label: "Изображение · AI готовит → человек решает · 4:3",
      hint: "Слева карточки отчётов, в центре линии доказательств, справа капсула финального балла человека.",
      ariaLabel: "AI готовит анализ; финальный балл ставит человек",
    },
  },
  {
    tag: "Сотни прогонов",
    title: "Настроено на данных",
    body: "Скоринг-логика — не эксперимент v0: она правилась по сотням реальных прогонов.",
  },
  {
    tag: "Калибровка",
    title: "Bias под контролем",
    body: "Ловим дрейф баллов, первичный bias судей и компрессию оценок — количественно, на измеримых уликах.",
  },
  {
    tag: "Пороги",
    title: "STRONG · MID · WEAK",
    body: "Итог агрегируется по фиксированным порогам: от 7.0 — STRONG, ниже 5.0 — WEAK.",
  },
  {
    tag: "Границы",
    title: "Чего система не делает",
    body: "Не предсказывает успех стартапа и не заменяет жюри. Она делает первый разбор одинаково тщательным для всех.",
  },
] as const;

type FlowStep = { num: string; label: string; desc: string };

/** Тёмная слайд-секция со списком шагов — паттерн op-flow с /one-pager. */
function StepsSlide({
  ariaLabel,
  eyebrow,
  titleLead,
  titleAccent,
  sub,
  steps,
  image,
}: {
  ariaLabel: string;
  eyebrow: string;
  titleLead: string;
  titleAccent: string;
  sub: string;
  steps: readonly FlowStep[];
  image?: { src: string; alt: string; width: number; height: number };
}) {
  return (
    <section className={image ? "dk-flow" : "dk-flow dk-flow--solo"} aria-label={ariaLabel}>
      <div className="wrap">
        <div className="dk-flow__grid">
          <div className="dk-flow__copy">
            <p className="dk-flow__eyebrow">{eyebrow}</p>
            <h2 className="dk-flow__title">
              {titleLead} <span className="dk-flow__accent">{titleAccent}</span>
            </h2>
            <p className="dk-flow__sub">{sub}</p>
            <ol className="dk-flow__steps">
              {steps.map((s) => (
                <li key={s.num} className="dk-flow__step">
                  <span className="dk-flow__num">{s.num}</span>
                  <div>
                    <h3 className="dk-flow__step-label">{s.label}</h3>
                    <p className="dk-flow__step-desc">{s.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          {image ? (
            <figure className="dk-flow__media">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                loading="lazy"
                decoding="async"
              />
            </figure>
          ) : null}
        </div>
      </div>
    </section>
  );
}

const DECK_CSS = `
  /* каждый слайд занимает минимум экран и центрирует контент по вертикали */
  .dk-slide > section{ min-height:100svh; display:grid; align-content:center; box-sizing:border-box; }
  .dk-slide--free > section{ min-height:0; display:block; }

  /* ── тёмные шаговые секции (адаптация op-flow с /one-pager) ── */
  .dk-flow{ position:relative; isolation:isolate; z-index:1; overflow:hidden; padding:clamp(40px,5vw,72px) var(--gutter); color:#f5f5f7; background-color:#060510; background-image:radial-gradient(130% 90% at 82% 0%, rgba(124,92,255,.18), transparent 60%); }
  .dk-flow__grid{ display:grid; grid-template-columns:minmax(0,1fr) minmax(0,.72fr); gap:clamp(34px,6vw,96px); align-items:center; }
  .dk-flow--solo .dk-flow__grid{ grid-template-columns:minmax(0,860px); justify-content:center; }
  .dk-flow__eyebrow{ font-family:var(--font-mono); font-size:12px; letter-spacing:.16em; text-transform:uppercase; color:#9aa0ff; margin:0 0 18px; }
  .dk-flow__title{ font-size:clamp(30px,4vw,54px); line-height:1.05; letter-spacing:-.03em; font-weight:600; margin:0 0 18px; color:#fff; }
  .dk-flow__accent{ background:linear-gradient(96deg,#a99bff,#2ec5e8 56%,#36e0c2); -webkit-background-clip:text; background-clip:text; color:transparent; }
  .dk-flow__sub{ font-size:clamp(16px,1.4vw,19px); line-height:1.5; color:rgba(255,255,255,.6); max-width:48ch; margin:0; }
  .dk-flow__steps{ list-style:none; margin:clamp(24px,3vw,38px) 0 0; padding:0; }
  .dk-flow__step{ display:grid; grid-template-columns:auto 1fr; gap:16px; padding:13px 0; border-top:1px solid rgba(255,255,255,.1); }
  .dk-flow__step:last-child{ border-bottom:1px solid rgba(255,255,255,.1); }
  .dk-flow__num{ font-family:var(--font-mono); font-size:14px; letter-spacing:.1em; color:rgba(255,255,255,.4); padding-top:2px; }
  .dk-flow__step-label{ font-family:var(--font-mono); font-size:14px; letter-spacing:.08em; text-transform:uppercase; color:#fff; font-weight:500; margin:0 0 6px; }
  .dk-flow__step-desc{ font-size:15px; line-height:1.5; color:rgba(255,255,255,.56); margin:0; }
  .dk-flow__media{ margin:0; }
  .dk-flow__media img{ display:block; width:100%; height:auto; max-width:460px; max-height:80svh; object-fit:contain; margin-inline:auto; }
  @media (max-width:900px){ .dk-flow__grid, .dk-flow--solo .dk-flow__grid{ grid-template-columns:1fr; gap:36px; } .dk-flow__media img{ max-width:380px; } }

  /* ── слайд команды ── */
  .dk-team{ position:relative; isolation:isolate; overflow:hidden; padding:clamp(56px,7vw,110px) var(--gutter); color:#f5f5f7; background-color:#060510; background-image:radial-gradient(120% 90% at 18% 0%, rgba(46,197,232,.14), transparent 60%); text-align:center; }
  .dk-team__grid{ display:grid; grid-template-columns:repeat(2,minmax(0,380px)); gap:clamp(24px,4vw,56px); justify-content:center; margin-top:clamp(30px,4vw,52px); }
  .dk-team__card{ background:rgba(255,255,255,.04); border:1px solid rgba(255,255,255,.1); border-radius:20px; padding:clamp(20px,2.4vw,32px); text-align:left; }
  .dk-team__portrait{ width:100%; aspect-ratio:1/1; object-fit:cover; object-position:top; border-radius:14px; display:block; margin-bottom:18px; }
  .dk-team__role{ font-family:var(--font-mono); font-size:12px; letter-spacing:.16em; text-transform:uppercase; margin:0 0 8px; }
  .dk-team__role--cyan{ color:#2ec5e8; }
  .dk-team__role--violet{ color:#a99bff; }
  .dk-team__name{ font-size:clamp(20px,1.8vw,26px); font-weight:600; letter-spacing:-.02em; color:#fff; margin:0 0 10px; }
  .dk-team__bio{ font-size:15px; line-height:1.55; color:rgba(255,255,255,.6); margin:0; }
  @media (max-width:760px){ .dk-team__grid{ grid-template-columns:1fr; } }

  /* ── навигация дека ── */
  .deck-nav__dots{ position:fixed; right:18px; top:50%; transform:translateY(-50%); z-index:60; list-style:none; margin:0; padding:0; display:grid; gap:10px; }
  .deck-nav__dot{ width:10px; height:10px; border-radius:50%; border:1px solid rgba(127,127,140,.8); background:rgba(255,255,255,.35); padding:0; cursor:pointer; box-shadow:0 0 0 2px rgba(255,255,255,.18); transition:transform .2s, background .2s; }
  .deck-nav__dot.is-active{ background:linear-gradient(96deg,#a99bff,#2ec5e8); transform:scale(1.35); border-color:transparent; }
  .deck-nav__count{ position:fixed; left:18px; bottom:14px; z-index:60; font-family:var(--font-mono); font-size:12px; letter-spacing:.12em; color:rgba(127,127,140,.9); background:rgba(255,255,255,.55); border:1px solid rgba(127,127,140,.25); border-radius:999px; padding:4px 10px; backdrop-filter:blur(6px); }
`;

export default function DeckPage() {
  return (
    <>
      <main className="dk-page section-lab ds">
        {/* 1 · Титул + хук */}
        <div className="dk-slide" id="s1">
          <StatementHero
            surface="light"
            version={1}
            pattern
            eyebrow="EVALLENS"
            titleLead="Операционный слой"
            titleAccent="структурированной оценки"
            titleTrail="питчей"
            sub="Жюри получает по каждой команде отчёт с доказательствами — а не впечатление по памяти. Финальное решение всегда за человеком."
          />
        </div>

        {/* 2 · Кто мы — хакер и стартапер */}
        <div className="dk-slide" id="s2">
          <section className="dk-team" aria-label="Команда — хакер и стартапер">
            <div className="wrap">
              <p className="dk-flow__eyebrow">КТО МЫ</p>
              <h2 className="dk-flow__title">
                Хакер и <span className="dk-flow__accent">стартапер</span>
              </h2>
              <p className="dk-flow__sub">
                Вместе 16+ лет — от университетской дружбы до системы для лучших решений. Сами были по обе стороны питчей.
              </p>
              <div className="dk-team__grid">
                {TEAM.map((m) => (
                  <article key={m.name} className="dk-team__card">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img className="dk-team__portrait" src={m.portrait} alt={m.name} loading="lazy" decoding="async" />
                    <p className={`dk-team__role dk-team__role--${m.accent}`}>{m.role}</p>
                    <h3 className="dk-team__name">{m.name}</h3>
                    <p className="dk-team__bio">{m.bio}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>
        </div>

        {/* 3 · Почему мы к этому пришли — от AI Jury к EvalLens */}
        <div className="dk-slide" id="s3">
          <StepsSlide
            ariaLabel="Путь от AI Jury к EvalLens в три шага"
            eyebrow="ПОЧЕМУ МЫ К ЭТОМУ ПРИШЛИ"
            titleLead="Чему нас научили"
            titleAccent="сотни прогонов"
            sub="EvalLens начинался как AI Jury — искусственное жюри. Прогоны показали настоящую проблему."
            steps={STORY_STEPS}
            image={{
              src: "/assets/methodology/eval-lens-roadmap-vertical-02.webp",
              alt: "Дорожная карта: от AI Jury через сотни прогонов к контролируемой системе оценки",
              width: 781,
              height: 1857,
            }}
          />
        </div>

        {/* 4 · Проблема */}
        <div className="dk-slide" id="s4">
          <Bento
            surface="light"
            version={2}
            ariaLabel="Почему ручная оценка ломается на объёме"
            eyebrow="ПРОБЛЕМА"
            title="Деков больше, чем времени их читать."
            titleAccent="времени"
            sub="На объёме сильные заявки получают беглый взгляд, планка дрейфует между судьями, а решение потом трудно защитить."
            items={PROBLEM_TILES.map((t) => ({
              tag: t.tag,
              title: t.title,
              body: t.body,
              feature: "feature" in t ? t.feature : undefined,
              media: "media" in t ? t.media : undefined,
            }))}
          />
        </div>

        {/* 5 · Как это работает — флоу организатора */}
        <div className="dk-slide" id="s5">
          <StepsSlide
            ariaLabel="Как проходит один прогон оценки, по шагам"
            eyebrow="КАК ЭТО РАБОТАЕТ"
            titleLead="Один прогон — от заявок до"
            titleAccent="решения"
            sub="Планка задаётся один раз — EvalLens применяет её к каждому деку одинаково."
            steps={FLOW_STEPS}
            image={{
              src: "/assets/one-pager/guided-selection-roadmap.webp",
              alt: "Весь прогон одной линией: сбор заявок, планка, машинный разбор, leaderboard, отчёты — финальный балл за человеком",
              width: 1040,
              height: 2080,
            }}
          />
        </div>

        {/* 6 · Панель ролевых судей */}
        <div className="dk-slide" id="s6">
          <Gallery
            surface="light"
            version={4}
            ariaLabel="Шесть ролевых судей и их измерения"
            eyebrow="МЕТОДОЛОГИЯ · ПАНЕЛЬ СУДЕЙ"
            title="Шесть судей — шесть измерений"
            accentWords={["Шесть"]}
            sub="Оценивает не «один ChatGPT», а панель ролевых судей. Каждый видит только свою зону — это убирает перекрытие ролей и эффект ореола."
            laneLabel="Измерения оценки P1–P6"
            items={JUDGES.map((j) => ({ tag: j.tag, title: j.title, body: j.body }))}
          />
        </div>

        {/* 7 · Пайплайн */}
        <div className="dk-slide" id="s7">
          <StepsSlide
            ariaLabel="Четыре шага пайплайна оценки"
            eyebrow="МЕТОДОЛОГИЯ · ПАЙПЛАЙН"
            titleLead="Под капотом —"
            titleAccent="четыре шага"
            sub="Каждый дек проходит один и тот же воспроизводимый путь."
            steps={PIPELINE_STEPS}
          />
        </div>

        {/* 8 · Evidence before score + live demo */}
        <div className="dk-slide" id="s8">
          <EditorialSplit
            surface="ink"
            version={2}
            ariaLabel="Доказательство раньше балла — что внутри отчёта"
            eyebrow="ДОКАЗАТЕЛЬСТВО РАНЬШЕ БАЛЛА · LIVE DEMO"
            titleLead="Каждый балл привязан к"
            titleAccent="доказательству"
            titleTrail=""
            sub="Это не «нравится / не нравится» — это проверяемые утверждения со ссылкой на дек. Дальше — вживую: leaderboard когорты и отчёт одной команды."
            points={EVIDENCE_POINTS.map((p) => ({ title: p.title, body: p.body }))}
            media={{
              ratio: "4/3",
              src: "/assets/one-pager/organizer-report.webp",
              width: 1400,
              height: 1050,
              label: "Изображение · отчёт по команде · 4:3",
              hint: "Карточка отчёта: балл системы, баллы по критериям, сильные стороны, риски, вопросы жюри.",
              ariaLabel:
                "Отчёт по команде: балл системы, баллы по критериям, сильные стороны, риски, недостающие данные, вопросы жюри — финальный балл за жюри",
            }}
          />
        </div>

        {/* 9 · Надёжность и честные границы */}
        <div className="dk-slide" id="s9">
          <Bento
            surface="ink"
            version={1}
            ariaLabel="Надёжность системы и её честные границы"
            eyebrow="НАДЁЖНОСТЬ И ГРАНИЦЫ"
            title="Настроено на данных. Честно про границы."
            titleAccent="данных"
            sub="Систему калибровали на измеримых артефактах — и мы прямо говорим, чего она не делает."
            items={RELIABILITY_TILES.map((t) => ({
              tag: t.tag,
              title: t.title,
              body: t.body,
              feature: "feature" in t ? t.feature : undefined,
              media: "media" in t ? t.media : undefined,
            }))}
          />
        </div>

        {/* 10 · Финальная фраза */}
        <div className="dk-slide dk-slide--free" id="s10">
          <Cinema
            maskId="deck-cinema"
            surface="ink"
            headline="AI Jury пытался судить. EvalLens помогает видеть ясно — прежде чем решать."
            lines={["AI Jury пытался судить.", "EvalLens помогает видеть", "ясно — прежде чем решать."]}
            mobileLines={["AI Jury", "пытался судить.", "EvalLens помогает", "видеть ясно —", "прежде чем решать."]}
            media={{
              videoSrc: "/assets/about/about-story-cinema.mp4",
              poster: "/assets/about/about-story-cinema-poster.webp",
            }}
          />
        </div>

        {/* 11 · Что дальше */}
        <div className="dk-slide" id="s11">
          <CtaBand
            theme="dark"
            videoSrc="/assets/cta/cube-1.mp4"
            videoPoster="/assets/cta/cube-1-poster.webp"
            eyebrow="ЧТО ДАЛЬШЕ"
            title="Следующая когорта —"
            titleAccent="на одной планке"
            sub="Рабочий продукт уже сегодня: приём заявок по публичной ссылке, панель судей, отчёты, leaderboard. Приходите с вашим конкурсом — прогоним пилот."
            primary={{ label: "Пилот на вашем конкурсе", href: "/company/contact" }}
            secondary={{ label: "Забронировать демо", href: "https://calendly.com/evallens/30min" }}
          />
        </div>

        <style>{DECK_CSS}</style>
      </main>
      <DeckNav slides={SLIDES} />
      <ScrollFX />
    </>
  );
}
