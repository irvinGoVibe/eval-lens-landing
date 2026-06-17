---
title: About EvalLense
status: generated
version: 0.8
updated: 2026-06-17
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
400+ прогонов, наши принципы и команда.

> Продуктовый бриф страницы для skill `build-pages`. **Первоисточник — авторский
> founder-нарратив user'а «From AI Jury to EvalLense: What 400+ AI Judging Runs
> Taught Us»** (предоставлен в диалоге). Этот бриф — его **дистилляция** в Apple-grade
> About; полная статья линкуется на блог. Факты кросс-проверены с `ai-jury-prod`
> (`judges.md`, `scope.md`, `vision.md`) — совпадают. Тексты опираются на нарратив,
> не выдумывать сверх него. Центр страницы — **креативный team-блок** (полноростовые
> портреты, имя-подложка, заезд/выезд по скроллу — референс assudamal.com/about),
> реализуется `<ScrollFX/>` + `data-pin`/`data-scrub`. Реальных фото нет → `.media-ph`.

## Роль и аудитория

- **Роль страницы:** показать людей, миссию и **путь продукта** — снять
  «безличность» AI-инструмента и усилить доверие через честную builder-историю,
  принципы и команду.
- **Для кого:** организаторы (фонды, акселераторы, конкурсы, хакатоны), партнёры,
  потенциальные сотрудники — те, кому важно понять, кто и зачем строит EvalLense.
- **Ключевое сообщение:** *«We didn't need more judges. We needed a better lens.»*
  AI структурирует и подсвечивает — решение принимает человек.
- **Целевое действие:** Book a Demo → `/company/contact`; вторичное — Read the full
  story → блог «From AI Jury to EvalLense».

## Структура секций

| # | Секция | Архетип | Движение | Поверхность | Что показываем |
|---|---|---|---|---|---|
| 1 | Hero / миссия | statement-hero | reveal | light | «We didn't need more judges. We needed a better lens.» + миссия + CTA |
| 2 | Проблема | full-bleed-statement | reveal | ink | Human review doesn't scale: 50 → 300 → 500 |
| 3 | From AI Jury to EvalLense | pinned-multi-screen | pin | light | Журней 5 шагов + свёрнутые уроки + мост «к тебе» (поглотил бывшую секцию уроков) |
| 4 | Принципы | editorial-numbered-list | reveal | light | 4 принципа, по одной строке |
| 5 | Команда (креативный блок) | pinned team-reveal | pin + scrub | ink | 2 со-фаундера + Amazon Nova credibility |
| 6 | Сегодня и куда идём | editorial-split (two columns) | reveal | light | Live today / Where we're going + для кого (слиты бывшие 7+8) |
| 7 | Final CTA + полная история | quiet-cta | reveal | ink | «A better lens» + Book a Demo + Read the full story |

> Ритм light↔ink (1L·2I·3L·4L·5I·6L·7I — без трёх подряд). Архетипы/классы — из
> [[section-types|Section Types]] (`ab-*`). Движение — через `<ScrollFX/>` +
> data-атрибуты, без сторонних библиотек. Ритм — по [[page-design-patterns|Page Design Patterns]].

## Контент по секциям

> Ниже — финальная английская копия, дистиллированная из авторского нарратива.
> Русским — только редакторские пометки. `[lens]` помечает слово под градиент-акцент.

### 1. Hero / миссия — `light`
- **Eyebrow:** About EvalLense
- **Heading (lens на `lens`):** We didn't need more judges. We needed a better lens.
  - *(альт., не используем: «Built to help people see more clearly»)*
- **Subhead (миссия первой строкой):** Our mission is simple — help organizers make better decisions on a flood of pitch decks. EvalLense turns the pile into a structured, evidence-based review: AI surfaces the signal, the person decides.
- **CTA:** Book a Demo

### 2. Проблема — `ink`
- **Eyebrow:** Why we built it
- **Heading:** Human review doesn't scale gracefully
- **Body:** At 50 submissions, reviewers stay thoughtful; at 300, consistency cracks; at 500, even excellent judges cut corners. A strong team can get a careful read from one judge and a rushed skim from the next — the strongest project isn't always the easiest to notice. That gap is where we started.

### 3. From AI Jury to EvalLense — `light`
- **Eyebrow:** The journey
- **Heading:** From AI Jury to EvalLense
- **Subhead:** We started by building AI judges. The real work was learning when *not* to trust them — each step lights up as you scroll.
- **Steps (pinned, 5; по одной строке):**
  1. **The first idea** — a tough AI panel before the real jury, built at the Amazon Nova hackathon as **AI Jury**.
  2. **More agents, more noise** — after **400+ runs**, more judges meant more words, not more signal.
  3. **The black box** — rerun the same deck and the score moved. Fine for a demo; not for ranking real submissions.
  4. **We built a system** — we pinned down what doesn't need a model's judgment (scope, dimensions, weights, scoring math); the matrix — who scores what — became the product.
  5. **The rebrand** — a jury *decides*, the one thing we don't want the system to do. A lens *reveals*. AI Jury became EvalLense.
- **Closing + bridge (full-bleed акцент):** AI Jury was designed to judge; EvalLense is designed to help people see more clearly. Two lessons we keep: prompts steer a model but can't replace methodology, and not every shiny metric belongs (we cut a "Success Rate" that was just the score in a fancier costume). **What this means for you:** not a louder pile of AI opinions, but a structured, repeatable read you can stand behind — the decision still yours.

### 4. Принципы — `light`
- **Eyebrow:** What we hold to
- **Heading:** Four principles behind the product
- **Numbered list (по одной строке):**
  1. **AI supports the decision — it doesn't own it.**
  2. **Every score should be explainable** — what raised it, what lowered it, what was missing.
  3. **Disagreement is useful** — we show the conflict, not an average that hides it.
  4. **Methodology matters more than the model.**

### 5. Команда — `ink` *(креативный блок)*
- **Eyebrow:** Who's building it
- **Heading:** The team behind the lens
- **Credibility line (под заголовком):** EvalLense started as **AI Jury**, a prototype at the **Amazon Nova hackathon**, and grew through 400+ internal evaluation runs into the product it is today.
- **Дизайн (референс assudamal.com/about):** тёмная pinned-сцена; на каждого — имя-подложка крупной типографикой, полноростовой cut-out портрет (заезд/выезд по `--scrub`/`--pin-step`), текст сбоку. Переключение — `data-pin-step` (2 шага). Reduced-motion — двое статичными editorial-блоками.
- **Участники (2 со-фаундера, сбалансированы по объёму):**
  - **Yaroslav Volovoj — Product, Strategy & Methodology** *(co-founder · 10+ years).* Owns EvalLense's product vision and evaluation methodology — ICP/JTBD, rubric design, positioning, and go-to-market: the "methodology matters more than the model" backbone. Background across product and fintech / Web3, including stablecoin rails, payouts, and compliance-aware flows (co-founder of ItIsPay) — a reliability-first mindset. A repeat hackathon builder (winner of NEAR MetaBUILD — $70K, best use of technology; Intema accelerator winner; TON / Hackers League finalist), and EvalLense began as **AI Jury** at the Amazon Nova hackathon. Past collaborators credit him for full ownership, delivery under tight deadlines, and turning product strategy and pitch narrative into results. *Links: [LinkedIn](https://www.linkedin.com/in/yaroslavvolovoj/) · [Devpost](https://devpost.com/yaroslav-volovoj).*
  - **Vladyslav Starodubov — Engineering & Architecture** *(co-founder · ~10 years).* The CTO-level half of the team: owns system architecture, the AI evaluation pipeline, and end-to-end delivery — managing teams, development pipelines, reliability, observability, and CI/CD. A decade in web and software engineering with a track record of shipping hard systems: complex ERP platforms for managing investment deals, and engineering delivery on a Web3 product that reached a successful exit. Focus: making EvalLense dependable and repeatable at scale. *(LinkedIn — pending.)*
- **Full-stack team (одной строкой):** backed by a full-stack team across frontend (React / Next.js, TS), backend (Node.js / Python), and infrastructure (CI/CD, monitoring).

### 6. Сегодня и куда идём — `light`
- **Eyebrow:** Today & next
- **Heading:** Where we are, and where we're going
- **Live today (left column):**
  - **Structured evaluation** — Pitch is the most developed flow (six judges, P1–P6); Hackathon runs the same architecture.
  - **A trust layer** — claim checks (Truth Check), source references back to the deck, visible judge weights, an audit trail.
  - **Full human review** — organizers score, comment, deliberate; the person sets the final Jury Score, and the leaderboard ranks on it — not the AI.
  - **Feedback for every team** — even those that don't advance.
- **Where we're going (right column):**
  - **Open orchestration** — customers define their own pipelines (dimensions, lenses, routing, rubrics, weights, report formats).
  - **Scale & operations** — imports/exports, integrations, audit logs, leaderboard versioning.
  - **Granular reliability** — partial reports with coverage warnings, confidence caps, per-judge retries.
- **Who it's for (compact):** VC scouts · accelerators · hackathon organizers · competitions · grants · corporate innovation · universities.

### 7. Final CTA + полная история — `ink`
- **Eyebrow:** Get to know us
- **Heading:** We're building a better lens for human judgment
- **Subhead:** Not an artificial jury — a clearer way for people to decide. Book a demo, or read the full story of how we got here.
- **CTA:** Book a Demo
- **Secondary CTA:** Read the full story → блог «From AI Jury to EvalLense»

## Числа и факты

| Факт | Значение | Источник |
|---|---|---|
| Внутренних прогонов | **400+** | авторский нарратив; homepage-structure.md |
| Происхождение | AI Jury · Amazon Nova hackathon prototype | нарратив; homepage-structure.md |
| Команда | 2 со-фаундера (Yaroslav · Vladyslav) + full-stack team | pitch-deck «Team expertise», LinkedIn |
| Опыт | Yaroslav 10+ лет (product/fintech/Web3) · Vladyslav ~10 лет (engineering/CTO-level) | pitch-deck, LinkedIn, founder |
| Builder-трек Yaroslav | NEAR MetaBUILD winner ($70K, best use of tech) · Intema accelerator winner · TON/Hackers League finalist | Devpost, LinkedIn (provided) |
| Трек Vladyslav | ERP для управления инвест-сделками · engineering delivery Web3-проекта с exit | founder (provided 2026-06-17) |
| Режимы | Pitch (6 судей, P1–P6) развит; Hackathon (5 судей, H1–H6) — та же архитектура, нужна доработка | нарратив; `judges.md` |
| Ранжирование | по human Jury Score, не по advisory AI | нарратив; `judges.md` |
| Live сегодня (founder, шипается на неделе) | Trust Layer · Truth Check · full human review/deliberation · participant feedback | решение фаундера 2026-06-17 |
| Куда идём | open orchestration · scale & ops · granular reliability | нарратив §What comes next |
| Сегментов аудитории | 7 | About copy / нарратив |

> **Honesty (из авторского нарратива):** «400+» — продуктовая история (не точная
> метрика). Hackathon подаём как «та же архитектура, ещё дорабатывается» — это
> снимает прежнее расхождение Pitch-only vs Hackathon. Prompt-injection и точные
> модели — детали для полной статьи/Trust-страниц, не для About (см. «Открытые вопросы»).

## Изображения

| Слот | Где на странице | Что изображено | Промпт-набросок (стиль бренда) |
|---|---|---|---|
| hero | секция 1 | Линза, фокусирующая поток заявок в один ясный сигнал | lens-градиент violet→cyan→aqua, Apple-нейтраль, calm; `.media-ph` 16:9 |
| journey | секция 3 | Цепочка AI Jury → noise → black box → system → EvalLense вдоль lens-трека | ink, узлы загораются по шагам; `.media-ph` 4:3 |
| portrait-yaroslav | секция 6 | Полноростовой cut-out портрет, нейтральный фон | портрет 3:4, мягкий фиолетовый rim-light, calm; имя-подложка за спиной |
| portrait-vladyslav | секция 6 | Полноростовой cut-out портрет | то же, 3:4 |

Портреты — `.media-ph` (3/4) до реальных фото; полные промпты в шапке `page.tsx`.

## Внутренние ссылки

- **Header/Footer nav:** пункт `About` → `/company/about` (footer-секция COMPANY).
- **Cross-links со страницы:**
  - [[sitemap|Methodology]] — методология оценки, судьи и измерения
  - [[sitemap|Consistency & Reliability]] — как измеряем стабильность
  - [[sitemap|Product Overview]] — что делает продукт
  - **блог «From AI Jury to EvalLense»** (`/blog/from-ai-jury-to-evallense-400-ai-judging-runs`) — полная builder-история (источник этой страницы)

## SEO / meta

- **`<title>`:** About EvalLense — A Better Lens for Human Judgment
- **meta description:** Who's building EvalLense and why: the journey from AI Jury
  to a controlled evaluation system across 400+ runs, our principles, and the team.
  AI prepares the analysis; people decide. *(≤155)*
- **OG-изображение:** слот `hero`

## Источники истины

### Wiki (landing)
- [[vision|Vision]] — зачем продукт, проблема время/объективность
- [[sitemap|Карта сайта]] — Company → About; блог featured article
- [[design-system|Design System]] / [[section-types|Section Types]] / [[page-design-patterns|Page Design Patterns]] — pinned, bento, editorial, scrub

### Авторский нарратив (provided by user)
- «From AI Jury to EvalLense: What 400+ AI Judging Runs Taught Us» — **первоисточник**
  истории, уроков, статуса и roadmap (дистиллирован в этот бриф; полная версия → блог)

### Application (`ai-jury-prod`) — кросс-проверка 2026-06-17
- `wiki/product/judges.md` — режимы Pitch/Hackathon, судьи, ранжирование по human score
- `wiki/product/vision.md` / `scope.md` — проблема, границы, сегменты
- `wiki/product/site/homepage-structure.md` — 400+ прогонов, Amazon Nova

## Acceptance (что считать готовым)

- [ ] страница доступна по `/company/about`, обёрнута в `SiteHeader` + `Footer`
- [ ] все 7 секций из «Структура секций» собраны с финальной EN-копией
- [ ] секция 6 «Сегодня и куда идём» — две колонки (live / next); live-часть (trust layer/Truth Check/full review/participant) синхронна с реальным релизом
- [ ] журней (3) несёт свёрнутые уроки + мост «что это значит для тебя»; Amazon Nova credibility-line в team-секции (5)
- [ ] **креативный team-блок** (секция 6): pinned-сцена, 2 со-фаундера, портреты заезжают/выезжают, имя-подложка, био сбоку; reduced-motion — статичные блоки
- [ ] есть pinned-multi-screen (3 журней, 5 команда) + тёмный full-bleed statement (2)
- [ ] вторичный CTA «Read the full story» ведёт на блог-статью
- [ ] портреты — `.media-ph` 3:4 с промптами; ссылка в footer-nav (COMPANY)
- [ ] только токены/классы design-system; движение через `<ScrollFX/>` + data-атрибуты, без useEffect
- [ ] `cd web && pnpm build` зелёный; `prefers-reduced-motion` уважается

## Открытые вопросы

- **⚠️ «Live сегодня» vs другие доки — нужна синхронизация.** Trust Layer, Truth
  Check, full human review/deliberation, participant feedback поданы как **работающие
  сегодня** (решение фаундера, 2026-06-17 — шипается на этой неделе, считаем фактом).
  Но `ai-jury-prod/scope.md` и наши брифы Trust/Product (methodology, reports,
  consistency) пока помечают Truth Check / deliberation / participant reports / partial
  reports как **post-MVP**. Перед публикацией About: (а) убедиться, что фичи реально
  live, (б) синхронизировать scope.md и смежные страницы, иначе сайт сам себе противоречит.
- **✅ Био — два со-фаундера, стандартизированы по объёму.** Yaroslav (product/
  методология, fintech, hackathon-builder, AI Jury origin) + LinkedIn/Devpost; Vladyslav
  (CTO-level delivery, ~10 лет, ERP для инвест-сделок, Web3-exit). Суть отзывов коллег
  вплетена в текст Yaroslav без сырых цитат и без отдельного блока (по решению user).
  Metaverse/esports/podcast-портфель сознательно НЕ выносим (шум для B2B-About).
- **✅ Arseniy — скрыт пока что** (по решению user). Вернуть третью карточку, когда
  будут его данные (фамилия, роль-детали, фото). Team-блок собран на 2 шага.
  Осталось закрыть по команде:
  - **Vladyslav** — LinkedIn-ссылка (бэкграунд уже норм).
  - **Латиница имён** — подтвердить: «Volovoj» (LinkedIn) vs «Volovoy» (deck); «Vladyslav».
  - **Опыт Yaroslav 10+ vs 14+** — взял 10+ (по свежему deck); подтвердить.
- **Фото команды** — нужны реальные полноростовые cut-out (3:4); пока `.media-ph`.
- **Модели per-layer (Gemini 2.5 Flash / Claude Sonnet 4.6)** — в полном нарративе
  названы; на About **намеренно не выносим** (бренд: стек — не для внешних текстов).
  Решение фаундера: показывать ли названия моделей на About или держать в блог-статье.
- **Prompt-injection / Success Rate / Worry Score / Truth Check** — глубокие
  builder-детали; на About даём только «cut Success Rate» как урок, остальное — в
  полной статье и на Trust-страницах. Подтвердить глубину для About.
- **Блог-статья** — нужен опубликованный маршрут `/blog/from-ai-jury-to-evallense-…`
  для вторичного CTA «Read the full story»; до публикации — линк-заглушка.
- **Контакт CTA** — Book a Demo → `/company/contact` (если ещё не собрана — временный якорь).
