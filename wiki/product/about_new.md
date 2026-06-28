---
title: About EvalLense
status: live
version: 1.0
updated: 2026-06-28
route: /company/about
section: company
nav_label: About
in_header_nav: false
in_footer_nav: true
cta: Book a Demo
---

# About EvalLense

← [[index|Wiki]] · [[sitemap|Карта сайта]]

Company-страница: кто стоит за EvalLense, зачем мы это строим, чему нас научили
прогоны, наши принципы и команда.

> Продуктовый бриф страницы. **Первоисточник — авторский founder-нарратив** (дистиллирован
> на страницу; полная статья линкуется на блог `/blog/founding-story`). Факты кросс-проверены
> с `ai-jury-prod` (`judges.md`, `scope.md`, `vision.md`). Бриф синхронизирован с кодом
> `web/src/app/company/about/page.tsx` (2026-06-28).

## Роль и аудитория

- **Роль страницы:** показать людей, миссию и **путь продукта** — снять
  «безличность» AI-инструмента и усилить доверие через честную builder-историю,
  принципы и команду.
- **Для кого:** организаторы (фонды, акселераторы, конкурсы, хакатоны), партнёры,
  потенциальные сотрудники — те, кому важно понять, кто и зачем строит EvalLense.
- **Ключевое сообщение:** AI структурирует и подсвечивает — решение принимает человек.
- **Целевое действие:** Book a Demo → `/#demo`; вторичное — Read the full
  story → `/blog/founding-story`.

## Структура секций

| # | Секция | Архетип | Движение | Поверхность | Что показываем |
|---|---|---|---|---|---|
| 1 | Hero / миссия | statement-hero | reveal | soft (light) | «clearer, faster, easier to defend» + миссия + CTA |
| 2 | Проблема | editorial-split | reveal | light | «Good projects get lost when review has no system» |
| 3 | From AI Jury to EvalLense | pinned-multi-screen | pin (3 шага) | ink | 3-шаговый journey + side visual + CTA «Read the full story» |
| 3b | Story Cinema | ds-Cinema | — | ink | Closing statement + видео-фон |
| 4 | Принципы | bento | reveal | soft (light) | 1 feature-карточка + 4 карточки = 5 принципов |
| 5 | Команда | dossier cards | reveal | ink | 2 со-фаундера — dossier-карточки с портретами, маркерами, чипами |
| 6 | Who we build for | IcpBento | reveal | ink | 8 ICP-сегментов в premium bento (инкапсулировано в `<IcpBento />`) |
| 7 | Final CTA | quiet-cta | reveal | ink | «See how EvalLense works on a real batch» + видео-фон |

> Ритм по поверхностям: 1S·2L·3I·3bI·4S·5I·6I·7I. Движение — через `<ScrollFX/>` +
> data-атрибуты, без per-section useEffect. Архетипы/классы — из [[section-types|Section Types]].
> Заголовочный nav (PageHeader): Story (#story) · Principles (#principles) · Team (#team).

## Контент по секциям

> Ниже — копия, взятая точно из кода. `[lens]` помечает слово под градиент-акцент (`grad-word`).

### 1. Hero / миссия — `soft`

- **Eyebrow:** About EvalLense
- **H1:** We built EvalLense to make startup review clearer, faster, and easier to [lens]defend
- **Subhead:** EvalLense turns messy startup applications into structured evidence, comparable scores, and questions reviewers can actually use. AI prepares the analysis. People keep the judgment.
- **CTA:** Book a Demo → `/#demo`
- **Visual:** Observatory hero PNG `/assets/entry-hub/evallense-observatory-hero-01.png` (16:9, `ev-drift` class, transparent cut-out на soft-фоне). Страница применяет page-local инъекцию стилей для увеличения и подъёма изображения под кнопку.
- **Background:** `<BlobField />` (ambient)

### 2. Проблема — `light` (не ink)

- **Eyebrow:** The problem
- **H2:** Good projects get [lens]lost when review has no system
- **Subhead:** Accelerators, funds, competitions, and innovation teams all face the same review problem: too many decks, uneven criteria, and not enough time to explain the call.
- **Visual:** Image `/assets/about/problem-wall.webp` (editorial split, медиа справа)
- **Background:** `<BlobField variant="b" />`

> ⚠️ В брифе v0.8 эта секция помечена как `ink` — в живом коде она `band` (light). Исправлено.

### 3. From AI Jury to EvalLense — `ink` (dark), pinned

- **id:** `story`
- **aria-label:** From AI Jury to EvalLense — the history in three steps
- **data-pin / data-pin-steps:** 3
- **Eyebrow:** From AI jury to human-controlled evaluation
- **H2:** What [lens]hundreds of runs taught us
- **Subhead:** EvalLense started as AI Jury. The early idea was simple: use several specialized AI judges instead of one generic model opinion. Then the runs exposed the real problem.
- **Steps (3, не 5):**
  1. **01 · AI Jury** — The first version was built during the Amazon Nova hackathon. It tested whether specialized AI judges could evaluate pitch decks from different angles.
  2. **02 · Hundreds of runs** — Adding more judges did not solve quality. Scores shifted, roles overlapped, and long reports created noise instead of clarity.
  3. **03 · A controlled system** — So we stopped designing an artificial jury. We started building a controlled evaluation system: fixed criteria, clear roles, structured outputs, evidence-linked reports, and human review.
- **CTA:** Read the full story → `/blog/founding-story` (Button variant="gradient" + arrow)
- **Side visual:** `<ParallaxFloat>` с `/assets/methodology/eval-lens-roadmap-vertical-02.png` (781×1857, tall transparent cut-out, floatY=8, tilt=5)

> ⚠️ В брифе v0.8 секция помечена как `light` — в живом коде она `ink`. Шагов было 5 — теперь 3.
> Закрывающий параграф «bridge» убран из шага 3 и вынесен в Cinema (3b).
> Slug блог-статьи изменился: `/blog/from-ai-jury-to-evallense-400-ai-judging-runs` → `/blog/founding-story`.

### 3b. Story Cinema — `ink`

- **Компонент:** `<Cinema>` из `@/components/ds`
- **id:** `story-claim`
- **surface:** `ink`
- **Headline:** AI Jury tried to judge. EvalLense helps people see clearly before they decide.
- **Lines (desktop):**
  - AI Jury tried to judge.
  - EvalLense helps people see
  - clearly before they decide.
- **Lines (mobile):**
  - AI Jury tried
  - to judge.
  - EvalLense helps
  - people see clearly
  - before they decide.
- **Media:** видео `/assets/about/about-story-cinema.mp4`

> Этого подраздела не было в брифе v0.8.

### 4. Принципы — `soft`

- **id:** `principles`
- **Eyebrow:** Our principles
- **H2:** The [lens]principles behind every evaluation
- **Subhead:** These principles keep EvalLense useful: AI supports the work, scores link to evidence, disagreement stays visible, and methodology comes before the model.
- **Layout:** bento — левая feature-карточка (тёмная, видео-фон) + правая 2×2 сетка светлых карточек
- **Feature card (принцип 1):**
  - Eyebrow: "Human in the loop"
  - H3: AI prepares the analysis. [lens]Humans own the decision.
  - Body: EvalLense can structure evidence, surface risks, and prepare a ranking view. The final score, context, and decision stay under human control.
  - Видео: `/assets/about/principles-feature-bg.mp4` (autoplay, muted, loop; poster `/assets/about/principles-feature-poster.jpg`)
- **Cards (принципы 2–5):**
  | # | Заголовок | Тело |
  |---|---|---|
  | 01 | Every score needs evidence. | Reviewers should be able to see what influenced the result, which slide or claim supported it, and what information was missing. |
  | 02 | Disagreement should be visible. | When evaluation lenses disagree, EvalLense does not hide the conflict inside an average. It shows the split so reviewers know where to look. |
  | 03 | The same standard for every team. | Every application is judged against the same criteria and the same scale, so results stay comparable across the whole batch — and where repeated runs differ, that is visible too. |
  | 04 | Methodology beats model choice. | Reliable evaluation needs clear criteria, controlled roles, structured outputs, and consistent scoring logic. The model is only one part of the system. |

> ⚠️ В брифе v0.8 было 4 принципа и заголовок «Four principles behind the product».
> В живом коде 5 принципов (1 feature + 4 cards). Layout изменился на bento.
> Формулировки принципов полностью переписаны по сравнению с бывшим брифом.

### 5. Команда — `ink`

- **id:** `team`
- **Eyebrow:** The team
- **H2:** Built by product, engineering, and [lens]evaluation people
- **Trust-line:** Two founders. [lens]16+ years of shared context. / From university friends to building a system for better judgment.
- **Компоненты:** `<TeamTilt />` (ambient tilt-effect) + 2 `<article class="ab-dossier">` cards

**Founder 1 — Yaroslav Volovoj**
- Role: Product & GTM
- Bio: Turns messy startup evaluation into a product people can actually use. Owns the review flow, GTM logic, and the bridge from AI Jury to EvalLense.
- Marker: "Founder mode: on"
- Off-screen: Off-screen: sharp decks, product calls, and probably a pickleball court.
- Hobby: Hackathons & sport
- Dream: Grow a unicorn!
- Spec chips: Product Strategy · GTM · Review UX
- Portrait: `/assets/about/portrait-yaroslav-2.webp` (1254×1224)
- Link: LinkedIn → https://www.linkedin.com/in/yaroslavvolovoj/
- Accent: violet

**Founder 2 — Vladislav Starodubov** *(код: «Vladislav», не «Vladyslav»)*
- Role: Engineering & Reliability
- Bio: Builds the system behind EvalLense: judge orchestration, scoring infrastructure, security, and repeatable evaluation runs.
- Marker: "Keeps it working"
- Off-screen: Off-screen: architecture maps, edge cases, and systems that refuse to break.
- Hobby: Hard work & good company
- Dream: Grow a unicorn!
- Spec chips: AI Pipeline · Reliability · Architecture
- Portrait: `/assets/about/portrait-vladislav-2.webp` (1080×1377)
- Link: Telegram → https://t.me/vrway
- Accent: cyan

> ⚠️ Бриф v0.8 содержал длинные резюме в стиле CV (Amazon Nova credibility line, hackathon wins,
> 10+ лет и т.д.). В живом коде — компактный dossier-формат: одна роль, короткий bio, marker/
> offscreen/hobby/dream, ≤3 spec-chips. Arseniy по-прежнему скрыт.
> Ключевое изменение в именах: в коде «Vladislav» (не «Vladyslav»).
> Портреты теперь real webp, не `.media-ph`.

### 6. Who we build for — `ink` (`<IcpBento />`)

- **Компонент:** `<IcpBento />` из `@/components/sections/IcpBento`
- **Eyebrow:** Who we build for
- **H2:** Built for teams that review at [lens]scale
- **Subhead:** They do not need AI to choose the winner. They need a faster, more consistent way to compare applications and focus human attention on the decisions that matter.
- **Closing claim:** "We are not building an artificial jury. We are building a [lens]better lens for human judgment."
- **8 ICP-карточек (bento grid):**

| Key | Сегмент | Момент | Job | Chips / Outputs | Размер |
|---|---|---|---|---|---|
| pitch | Pitch Competitions | Before finals day | Turn open submissions into a finalist board your jury can actually use. | 01 Same rubric for every team · 02 Evidence-backed finalist briefs · 03 Questions for live pitching | hero |
| vc | VC Funds | Before the pipeline meeting | Turn inbound decks into a partner-ready first read. | Market signal · Team signal · First-call questions | hero |
| hack | Hackathons | Before live judging | Review many teams fast and prepare the judge panel. | First pass · Execution notes · Review roadmap | tile |
| accel | Accelerators | Before cohort selection | Compare applicants on one standard. | Side-by-side reports · Fixed criteria · Selection risks | tile |
| grants | Grant Programs | Before funding decisions | Review applications against fixed criteria. | Comparable scores · Evidence trail · Review record | tile |
| corp | Corporate Innovation | Before stakeholder review | Separate real partnership potential from theatre. | Fit signals · Readiness checks · Evidence gaps | tile |
| uni | Universities | Before demo day | Compare student and research teams fairly. | Transparent scoring · Useful feedback · Human ranking | tile |
| angel | Angel Investors | Before diligence night | Know which decks deserve your time. | Strengths · Weaknesses · Questions | tile |

- **Визуалы:** Pitch и VC имеют реальные продуктовые рендеры (webp); Hackathon/Grants/Corp/Universities используют видео-фоны; Accelerators — webp-рендер; Angel — webp-рендер. Pitch и VC — hero-size; остальные — tile.
- **Ссылки:** все CTA → `/trust/use-cases`

> ⚠️ В брифе v0.8 секция 6 называлась «Сегодня и куда идём» (editorial-split с двумя колонками
> live today / where we're going). В живом коде эта секция полностью заменена `<IcpBento />`.
> Roadmap-контент («Open orchestration», «Scale & operations» и т.д.) с About-страницы убран.

### 7. Final CTA — `ink`

- **Eyebrow:** Get to know us
- **H2:** See how EvalLense works on a [lens]real batch
- **Subhead:** Book a demo to walk through the workflow, review example reports, and see how EvalLense helps your team compare applications without giving up human control.
- **CTA:** Book a Demo → `/#demo`
- **Visual:** Full-bleed looping video `/assets/about/about-cta-bg.mp4` + darkening scrim

> ⚠️ В брифе v0.8 заголовок был «We're building a better lens for human judgment»,
> субтекст и CTA также отличались. Вторичного CTA «Read the full story» в этой секции нет
> (он перенесён в секцию 3).

## Числа и факты

| Факт | Значение | Источник |
|---|---|---|
| Формулировка прогонов на странице | «hundreds of runs» | H2 секции 3, verbatim в коде |
| Внутренних прогонов (маркетинговая цифра) | **1000+** | MEMORY.md (синхронизировать в docs, если нужно) |
| Происхождение | AI Jury · Amazon Nova hackathon prototype | секция 3, шаг 01 |
| Команда | 2 со-фаундера (Yaroslav · Vladislav) | код, TEAM array |
| Совместный контекст | 16+ лет | trust-line секции 5 |
| Режимы | Pitch (P1–P6 в визуале IcpBento) и Hackathon | IcpBento, judges.md |
| Ранжирование | по human Jury Score, не по advisory AI | нарратив |
| Сегментов аудитории | 8 (IcpBento) | IcpBento, ICP_CARDS |

## Изображения и медиа

| Слот | Путь | Где | Формат |
|---|---|---|---|
| hero | `/assets/entry-hub/evallense-observatory-hero-01.png` | Секция 1 | PNG transparent cut-out, 1536×1024 |
| problem | `/assets/about/problem-wall.webp` | Секция 2 | WebP, 1500×844 |
| story roadmap | `/assets/methodology/eval-lens-roadmap-vertical-02.png` | Секция 3 side | PNG transparent, 781×1857 |
| story cinema | `/assets/about/about-story-cinema.mp4` | Секция 3b | MP4 video |
| principles feature | `/assets/about/principles-feature-bg.mp4` | Секция 4 feature card | MP4 video |
| principles poster | `/assets/about/principles-feature-poster.jpg` | Секция 4 feature card | JPG poster |
| portrait yaroslav | `/assets/about/portrait-yaroslav-2.webp` | Секция 5 | WebP, 1254×1224 |
| portrait vladislav | `/assets/about/portrait-vladislav-2.webp` | Секция 5 | WebP, 1080×1377 |
| icp-pitch | `/assets/about/icp-pitch.webp` | IcpBento pitch card | WebP |
| icp-vc | `/assets/about/icp-vc.webp` | IcpBento vc card | WebP |
| icp-accelerators | `/assets/about/icp-accelerators.webp` | IcpBento accel card | WebP |
| icp-angel | `/assets/about/icp-angel.webp` | IcpBento angel card | WebP |
| hackathons-bg | `/assets/about/hackathons-bg.mp4` | IcpBento hack card | MP4 |
| grants-bg | `/assets/about/grants-bg.mp4` | IcpBento grants card | MP4 |
| corp-datastream | `/assets/about/corp-datastream.mp4` | IcpBento corp card | MP4 |
| universities-bg | `/assets/about/universities-bg.mp4` | IcpBento uni card | MP4 |
| cta-bg | `/assets/about/about-cta-bg.mp4` | Секция 7 | MP4 |

## Внутренние ссылки

- **Footer nav:** пункт `About` → `/company/about` (секция COMPANY).
- **Cross-links со страницы:**
  - **блог «founding-story»** (`/blog/founding-story`) — полная builder-история (CTA в секции 3)
  - **use-cases** (`/trust/use-cases`) — все 8 ICP CTA из IcpBento
  - **demo anchor** (`/#demo`) — Hero CTA и Final CTA

## SEO / meta

- **`<title>`:** About EvalLense — A better lens for human judgment
- **meta description:** EvalLense helps startup programs, funds, and competitions review applications with structured AI analysis, evidence-backed reports, and human-controlled decisions.
- Заданы в `export const metadata` в `page.tsx`; OG-изображение — hero-слот.

## Движение и анимации

- `<ScrollFX />` — монтируется один раз после `<Footer/>`; data-reveal="up|left|scale" + data-pin / data-pin-steps.
- Секция 3 (Story): `data-pin data-pin-steps="3"` — 3 шага step-pin.
- Секция 5 (Team): `<TeamTilt />` — ambient tilt, `data-reveal="up"` на каждой dossier-карточке + `--reveal-delay`.
- IcpBento: `<AngelFx />` — ambient.
- Portraits, Observatory hero: анимация `ev-drift`; VC render: `compass-fly` + `compass-float`.
- `prefers-reduced-motion`: все анимации гасятся через CSS.

## Источники истины

### Wiki (landing)
- [[vision|Vision]] — зачем продукт, проблема время/объективность
- [[sitemap|Карта сайта]] — Company → About; блог featured article
- [[design-system|Design System]] / [[section-types|Section Types]] / [[page-design-patterns|Page Design Patterns]]

### Application (`ai-jury-prod`) — кросс-проверка
- `wiki/product/judges.md` — режимы Pitch/Hackathon, судьи, ранжирование по human score
- `wiki/product/vision.md` / `scope.md` — проблема, границы, сегменты

## Открытые вопросы

- **Цифра прогонов:** на странице «hundreds of runs» (verbatim), в MEMORY.md — 1000+.
  Если хотим 1000+ на About, нужно править H2 и step 02.
- **Vladislav vs Vladyslav:** в TEAM array кода — «Vladislav». В бывшем брифе — «Vladyslav».
  LinkedIn-ссылка у Vladislav до сих пор не указана (Telegram: t.me/vrway).
- **Arseniy:** по-прежнему скрыт (нет данных). Вернуть третью карточку, когда будут фамилия, роль, фото.
- **Roadmap-контент** («Open orchestration / Scale & operations / Granular reliability») убран
  с About. Если нужен, найти ему место (отдельная страница, Methodology или Pricing).
- **IcpBento CTA:** все 8 карточек ведут на `/trust/use-cases`. Уточнить, нужны ли
  разные якоря или landing-страницы под сегменты.
- **Блог-статья:** slug теперь `/blog/founding-story` — убедиться, что эта статья опубликована.
- **«Truth Check»** (упоминался в v0.8 в live-today секции) с About убран; теперь только
  в полной статье и на Trust-страницах.
