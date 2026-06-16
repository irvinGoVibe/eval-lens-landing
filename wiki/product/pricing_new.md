---
title: Pricing
status: generated
version: 0.3
updated: 2026-06-17
route: /pricing
section: pricing
nav_label: Pricing
in_header_nav: true
in_footer_nav: true
cta: Book a Demo
---

# Pricing

← [[index|Wiki]] · [[sitemap|Карта сайта]]

Прайсинг-страница: 4 публичных тарифа, сравнение фич по тарифам, сравнение с
альтернативами и сетка возможностей. **Намеренно ломает editorial-scroll формат** —
это плотная конверсионная утилита (карточки + таблицы + FAQ), а не нарратив.

> Продуктовый бриф страницы для skill `build-pages`. Цены/лимиты/сроки/top-up —
> **источник истины: финмодель `ai_jury_financial_model_v0_7_2_ru` лист «Тарифы»
> (v0.4)**, сверено с `ai-jury-prod/notes/research/pricing-model.en.md` v0.4
> (совпадает). Конкуренты/фичи/позиционирование — `competitor-landscape.md` §5/§8
> (draft v0.2 — фичи конкурентов верифицировать перед публикацией). Бренд на сайте
> — **EvalLense** (в бизнес-доках продукт зовётся «AI Jury» — на странице не путать).
> Валюта — **только USD**. Раздел «Контент по секциям» — финальная EN-копия. Чего
> нет / расходится — в «Открытые вопросы».

## Роль и аудитория

- **Роль страницы:** показать модель монетизации и снять ценовые возражения —
  EvalLense оплачивается **за мероприятие** (пакет AI-оценённых заявок + срок
  действия), а не per-seat и не помесячно. Дать сравнить тарифы между собой и с
  альтернативными способами оценки.
- **Для кого:** организаторы, принимающие решение о покупке — VC-фонды,
  акселераторы, конкурсы, хакатоны, грантовые программы, вузы.
- **Ключевое сообщение:** платите за **AI-оценённые заявки**, а не за места,
  кредиты или токены; цена покрывает прозрачную AI-оценку (интеллект), а не просто
  приём заявок — поэтому дороже event-ops инструментов, но прозрачнее и дешевле
  зрелых awards-платформ.
- **Целевое действие:** Book a Demo → `/company/contact`; вторичное — Start Free
  (бесплатная проба, 3 заявки).

## Структура секций

Прайсинг использует **утилитарные паттерны** (`pricing-tiers`, `comparison-table`,
`versus-table`, `faq` — реальные типы из [[section-types|Section Types]] #13–16).
Ритм соблюдаем мягче, чем на editorial-страницах (это утилита), но ≥1 тёмная полоса
(versus + CTA) сохраняется; новые цвета не вводим.

| # | Секция | Архетип | Движение | Поверхность | Что показываем |
|---|---|---|---|---|---|
| 1 | Hero | statement-hero | reveal | light | «Pay per event, not per seat» + lens-акцент + Start Free / Book a Demo |
| 2 | Тарифы (4 карточки) | pricing-tiers | reveal | light | Free · Standard (рекоменд.) · Pro · Enterprise + строка smaller plans (Starter/Pilot) |
| 3 | Что входит | comparison-table | reveal | light | матрица фич × 6 уровней (Free · Starter · Pilot · Standard · Pro · Enterprise) |
| 4 | EvalLense vs альтернативы | versus-table | reveal | ink | named-матрица фич (без чужих цен) + 2 positioning-строки |
| 5 | Возможности по категориям | bento | reveal | light | Intake · AI Evaluation · Reports · Review & Decision · Security & Trust · Admin |
| 6 | FAQ по прайсингу | faq | reveal | light | что такое «заявка», срок, top-up, подписка, пилот, данные, кто решает |
| 7 | Final CTA | quiet-cta | reveal | ink | призыв + Book a Demo / Start Free |

## Контент по секциям

> Ниже — финальная английская копия. Русским — только редакторские пометки в
> скобках. `[lens]` помечает слово/фразу под градиент-акцент.

### 1. Hero — `light`
- **Eyebrow:** Pricing
- **Heading (A, рекоменд.; lens на `per event`):** Pay per event, not per seat
- **Heading (B; lens на `evaluate`):** Pricing by the submissions you evaluate
- **Subhead:** Every plan is a package of AI-evaluated submissions with a validity window. You pay for transparent AI evaluation — not just collecting decks. No credits, no tokens, no per-seat fees.
- **CTA:** Start Free (3 submissions)
- **Secondary CTA:** Book a Demo

### 2. Тарифы (4 карточки) — `light`
- **Eyebrow:** Plans
- **Heading:** Pick the plan that fits your event
- **Subhead:** Each plan includes AI evaluation reports for a fixed number of participant submissions. Add more anytime with top-up packages.
- **Cards (4 headline):**
  - **Free Trial** — `$0` · 3 submissions (lifetime) · no credit card. *Message:* Try EvalLense on your first 3 submissions. *CTA:* Start Free
  - **Standard** ⭐ *Recommended (lens-бордер/бейдж)* — `$1,500` · 150 submissions · 120 days · 5 projects. *Message:* Run a full pitch competition. *CTA:* Get Started
  - **Pro** — `$3,900` · 500 submissions · 180 days · unlimited projects. *Message:* Evaluate large cohorts and recurring programs. *CTA:* Get Started
  - **Enterprise** — `from $15,000` · 1,000+ submissions · contract term. *Message:* Corporate, universities, and custom judging workflows. *CTA:* Talk to Sales → `/company/contact`
- **Smaller plans strip (узкая строка под карточками):** Smaller event? **Starter — $199 / 15 submissions** · **Pilot — $500 / 40 submissions**. See the full comparison below. *(Starter и Pilot живут в матрице секции 3, не в headline-карточках.)*

### 3. Что входит — `light`
- **Eyebrow:** Compare plans
- **Heading:** What's included, plan by plan
- **Subhead:** The full feature matrix across all six levels — including Starter and Pilot. On mobile: horizontal scroll.
- **Columns:** Free Trial · Starter · Pilot · Standard · Pro · Enterprise
- **Row groups (значения из `pricing-model.en.md` v0.4 §10–§11, §15):**
  - **Submissions:** 3 (lifetime) · 15 · 40 · 150 · 500 · custom
  - **Validity:** lifetime trial · 90 days · 90 days · 120 days · 180 days · contract term
  - **Projects:** 1 · 1 · 2 · 5 · unlimited · custom
  - **Top-up packages:** — · +10/$150 · +10/$150 · +25/$300 · +50/$500 · custom *(эффективная цена: $15 / $15 / $12 / $10 за заявку)*
  - **Collection:** manual upload — all plans; self-upload page — all except Free
  - **Evaluation (бренд-обещание, на всех платных):** 6 AI judges (P1–P6) · scoring by dimensions · role-based perspectives · evidence-linking · human final scoring *(на Free — limited/preview)*
  - **Reports:** AI report (limited on Free) · CSV export (from Starter) · PDF export (from Pilot)
  - **Review:** leaderboard — preview (Free) · basic (Starter) · full (Pilot+)
  - **Admin:** custom criteria (preset → limited → yes → custom) · custom AI judges (add-on Standard / limited Pro / yes Enterprise) · branding (watermark → basic → advanced → white-label) · remove watermark (from Pilot) · BYO LLM (Pro add-on / Enterprise) · SLA + security review (Enterprise)
  - **Seats:** admin seats 1 · 1 · 2 · 5 · 10 · custom; human judges 0 · 2 · 5 · 10 · 25 · custom
  - **Support:** — · — · async setup · 30-min setup call + priority · 60-min setup call + priority · dedicated
  - **Fair-use:** max file 20/30/50/75/100/custom MB · max slides 20/30/40/50/75/custom · concurrent runs 1/1/2/5/10/custom

> **Принцип:** безопасность и доверие (prompt-injection safety, privacy,
> evidence-linked scoring, human-in-the-loop) — **на всех тарифах, включая Free
> Trial.** Дифференцируем объёмом и admin-возможностями, не доверием.

### 4. EvalLense vs альтернативы — `ink`
- **Eyebrow:** How we compare
- **Heading:** One column with the whole picture
- **Subhead:** Workflow platforms run the event; AI analysts review a single deck. EvalLense does both — structured AI evaluation across a whole competition, with a person deciding.
- **Named-матрица (БЕЗ чужих цен; колонки из `competitor-landscape.md`):** YouNoodle (competition workflow) · Evalato (awards/applications) · PitchBob VC (AI deck analyst) · **EvalLense**

| Feature | YouNoodle | Evalato | PitchBob VC | **EvalLense** |
|---|:--:|:--:|:--:|:--:|
| AI deck evaluation at the core | ✗ | ✗ | ✓ | ✅ |
| Six independent judges (P1–P6) | ✗ | ✗ | partial | ✅ |
| Transparent rationale (no black box) | ✗ | ✗ | partial | ✅ |
| Evidence-linked scoring | ✗ | ✗ | partial | ✅ |
| Evaluation across a whole event (not one deck) | ✓ | ✓ | ✗ | ✅ |
| Leaderboard / ranking | ✓ | ✓ | ✗ | ✅ |
| Human-in-the-loop final decision | manual | manual | ✗ | ✅ |
| Questions for live jury | ✗ | ✗ | ✗ | ✅ |

- **Positioning-строки под таблицей (verbatim из `competitor-landscape.md` §8):**
  - vs workflow-платформы: **«They manage the competition. We help understand who should win and why.»**
  - vs AI-аналитики деков: **«They review decks. We run structured evaluation across an entire competition.»**

> ⚠️ Цены конкурентов на странице НЕ показываем (решение user) — снимает риск
> устаревания. Значения ✓/✗/partial сверены с `competitor-landscape.md` §5
> (feature matrix) и §8 (differentiation): PitchBob = single-deck AI analyst, без
> event-workflow и leaderboard; YouNoodle/Evalato = workflow без AI-first оценки.
> Research — draft v0.2, перед публикацией финально верифицировать фичи.

### 5. Возможности по категориям — `light`
- **Eyebrow:** Everything included
- **Heading:** What every plan can do
- **Subhead:** The same evaluation engine, across six product areas.
- **Tiles (bento):**
  - **Intake** *(feature)* — Collect decks (PDF, PPT, PPTX, Google Slides) by hand or via a self-upload link.
  - **AI Evaluation** — Six independent judges across P1–P6, each score with a confidence signal and evidence.
  - **Reports** — An explainable report per participant: strengths, weaknesses, and the questions to ask live.
  - **Review & Decision** — A Review Board and a leaderboard ranked by your Final Score.
  - **Security & Trust** — Prompt-injection safety, privacy, and no-black-box rationale — on every plan.
  - **Admin** — Custom weights, reusable templates, branding, and SSO / API by plan.

### 6. FAQ по прайсингу — `light`
- **Eyebrow:** Pricing FAQ
- **Heading:** Questions, answered
- **Items (из `pricing-model.en.md` §9, §14):**
  - **What counts as a submission?** — One submitted pitch deck or application that receives one successfully generated AI evaluation report.
  - **Is this a subscription?** — No. You pay per event — a package of submissions with a validity window, not a monthly per-seat fee.
  - **What if I run out of submissions?** — Add more anytime with top-up packages (from $150 for 10, cheaper on higher plans), or move up a plan.
  - **How long do submissions last?** — Starter and Pilot, 90 days; Standard, 120 days; Pro, 180 days; Enterprise, the contract term.
  - **What if a deck can't be processed?** — It doesn't count as an evaluated submission. Disagreeing with the AI output isn't a failed evaluation either.
  - **What if a team resubmits after the report?** — A new report counts as a new evaluation.
  - **Is there a paid pilot?** — Yes — Pilot, $500 for 40 submissions. Talk to sales.
  - **Is my data safe?** — Yes, on every plan. *(→ [[sitemap|Security & Privacy]])*
  - **Who makes the final decision?** — A person. AI prepares the analysis; you decide. *(→ [[sitemap|Methodology]])*

### 7. Final CTA — `ink`
- **Eyebrow:** Get started
- **Heading:** Run your next event on EvalLense
- **Subhead:** Start free on three submissions, or book a demo to see the whole workflow on your own decks.
- **CTA:** Book a Demo
- **Secondary CTA:** Start Free

## Числа и факты

| Факт | Значение | Источник |
|---|---|---|
| Free Trial | $0 / 3 заявки (lifetime) / 1 проект | финмодель «Тарифы» v0.4; `pricing-model.en.md` §4 |
| Starter | $199 / 15 заявок / 90 дней / 1 проект | там же §5 |
| Pilot (bridge) | $500 / 40 заявок / 90 дней / 2 проекта | там же §6 |
| Standard (рекомендуемый) | $1,500 / 150 заявок / 120 дней / 5 проектов | там же §5 |
| Pro | $3,900 / 500 заявок / 180 дней / unlimited | там же §5 |
| Enterprise | от $15,000 / 1,000+ заявок / contract | финмодель; `pricing-model.en.md` §18 (Enterprise Event from $15,000) |
| Top-up | +10/$150 ($15) · +25/$300 ($12) · +50/$500 ($10) | там же §7 |
| Seats / human judges | 1/0 · 1/2 · 2/5 · 5/10 · 10/25 · custom | там же §11 |
| Единица оплаты | AI-оценённая заявка (no credits/tokens) | там же §1–§2 |
| AI-судей / измерений | 6 (P1–P6) | `overview.md` / `judges.md` |
| Ранжирование | по human Final Score, не по AI | `overview.md`, `judges.md` |

> Валюта — **только USD** (решение user). Research-цифры в `competitor-landscape.md`
> §9 (Standard 100 / Pro 300 заявок, Enterprise $7,500) и `pricing-model.en.md`
> §13 (Starter как публичная карточка) **устарели/переопределены** финмоделью v0.4
> и решением user — приоритет у них.

## Изображения

| Слот | Где на странице | Что изображено | Промпт-набросок (стиль бренда) |
|---|---|---|---|
| hero | секция 1 | Линза, через которую «мероприятие» становится ranked-результатом | lens-градиент violet→cyan→aqua, Apple-нейтраль, calm, без security-театра; `.media-ph` 16:9 |

Доп. изображения не обязательны — страница табличная. Для OG — слот `hero`.

## Внутренние ссылки

- **Header nav:** **top-level** пункт `Pricing` → `/pricing` (`in_header_nav: true`).
- **Footer nav:** `Pricing` (группа — см. «Открытые вопросы» по footer-структуре).
- **Cross-links со страницы:**
  - [[sitemap|Product Overview]] — как устроен workflow
  - [[sitemap|Methodology]] — почему оценка прозрачна
  - [[sitemap|Security & Privacy]] — безопасность данных (из FAQ)
  - `/company/contact` — Book a Demo / Talk to Sales

## SEO / meta

- **`<title>`:** EvalLense — Pricing: Pay-per-Event Pitch Evaluation
- **meta description:** Transparent EvalLense pricing: pay per event, not per seat.
  Plans are packages of AI-evaluated submissions; six AI judges on every plan, the
  human decides. *(≤155)*
- **OG-изображение:** слот `hero`

## Источники истины

### Wiki (landing)
- [[overview|Обзор продукта]] — workflow, 6 судей, модули
- [[sitemap|Карта сайта]] — прайсинг помечен как post-MVP (этим брифом возвращаем)
- [[design-system|Design System]] / [[section-types|Section Types]] — pricing-tiers, comparison-table, versus-table, faq, bento

### Business / research (`ai-jury-prod` и Drive) — сверено 2026-06-17
- `ai_jury_financial_model_v0_7_2_ru` лист «Тарифы» (v0.4) — **цены, лимиты, сроки,
  top-up — источник истины** (xlsx на Drive, не в репо)
- `notes/research/pricing-model.en.md` v0.4 — feature-матрица (§10), seats (§11),
  fair-use (§15), FAQ (§9/§14), единица оплаты (§1–2), веб-копия (§13) — совпадает с финмоделью
- `notes/research/competitor-landscape.md` v0.2 — конкуренты, feature matrix (§5),
  differentiation + positioning-строки (§8); фичи конкурентов — верифицировать

## Acceptance (что считать готовым)

- [ ] страница доступна по `/pricing`, обёрнута в `PageHeader` + `Footer`
- [ ] 4 публичные карточки (Free · Standard ⭐ · Pro · Enterprise) с ценами из финмодели; Standard выделен
- [ ] строка smaller plans (Starter/Pilot) под карточками; они же — в матрице
- [ ] матрица фич × 6 уровней, versus-таблица (без чужих цен), bento возможностей, FAQ
- [ ] `Pricing` добавлен в header nav (top-level) и footer
- [ ] валюта только USD; имя EvalLense (не «AI Jury»)
- [ ] только токены/классы из design-system (новые pricing-паттерны — на токенах)
- [ ] `cd web && pnpm build` зелёный; `prefers-reduced-motion` уважается

## Открытые вопросы

**Решено (user, 2026-06-16):** 4 карточки = Free · Standard ⭐ · Pro · Enterprise
(Starter/Pilot → матрица); сравнение = named-матрица фич без чужих цен;
Enterprise = «от $15 000» + Talk to Sales; валюта — только USD.

Осталось:
- **Расхождение раскладки карточек.** `pricing-model.en.md` §13 даёт публичные
  карточки Starter · Standard · Pro · Enterprise (Free = top-block, Pilot = bridge).
  Бриф следует **решению user**: карточки Free · Standard · Pro · Enterprise,
  Starter/Pilot → матрица. Если переиграем — синхронизировать.
- **Верификация фич конкурентов.** ✓/✗/partial сверены с `competitor-landscape.md`
  §5/§8, но research — draft v0.2; финально подтвердить факты перед публикацией.
- **Wording «validity window»** — как подавать покупателю: «150 submissions, valid
  for 120 days»? Подтвердить формулировку.
- **Прайсинг = Phase 2 (post-MVP) в roadmap.** Эта страница выносит монетизацию
  вперёд — подтвердить, что публикуем тарифы до запуска биллинга (решение user).
- **Новые design-паттерны** (`pricing-tiers`, `comparison-table`, `versus-table`,
  `faq`) — есть в [[section-types|Section Types]], но добавить правила в
  [[design-system|Design System]] / [[page-design-patterns|Patterns]], чтобы pricing
  не был «одноразовой» вёрсткой.
- **Footer/nav-структура** — в какую группу footer кладём Pricing; в header — top-level.
- **Sitemap** — прайсинг был post-MVP; обновить [[sitemap|Карту сайта]], чтобы
  `/pricing` не остался «осиротевшим».
- **Имя бренда** — в финмодели/research продукт зовётся «AI Jury»; на странице —
  только **EvalLense**.
