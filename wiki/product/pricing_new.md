---
title: Pricing
status: synced
version: 0.5
updated: 2026-06-28
route: /pricing
section: pricing
nav_label: Pricing
in_header_nav: true
in_footer_nav: true
cta: Book a Demo
---

# Pricing

← [[index|Wiki]] · [[sitemap|Карта сайта]]

Прайсинг-страница: 4 публичных тарифа, сравнение фич по тарифам, категориальное
сравнение с unnamed-альтернативами, Cinema «How it works», сетка возможностей, FAQ
и финальный CTA. **Намеренно ломает editorial-scroll формат** — это плотная
конверсионная утилита (карточки + таблицы + FAQ), а не нарратив.

> Продуктовый бриф страницы. Цены/лимиты/сроки/top-up —
> **источник истины: финмодель `ai_jury_financial_model_v0_7_2_ru` лист «Тарифы»
> (v0.4)**, сверено с `ai-jury-prod/notes/research/pricing-model.en.md` v0.4
> (совпадает). Конкуренты/фичи/позиционирование — `competitor-landscape.md` §5/§8
> (draft v0.2 — фичи конкурентов верифицировать перед публикацией). Бренд на сайте
> — **EvalLense** (в бизнес-доках продукт зовётся «AI Jury» — на странице не путать).
> Валюта — **только USD**. Раздел «Контент по секциям» — финальная EN-копия.

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
`versus-table`, `faq`). Тональная карта: §1–§4 — light ds-zone (ZoneBlobs + lobes);
§4b Cinema — ink; §5 Bento — ink; §6 FAQ — ink; §7 CTA — dark. Движение:
`data-reveal` only (без pin/scrub), `<ScrollFX/>` — один раз после `<Footer/>`.

| # | Секция | DS-компонент | Поверхность | Что показываем |
|---|---|---|---|---|
| 1 | Hero | `StatementHero` (DS) | light | «Pay for the event, not every seat» + медиа-слот 16:9 |
| 2 | Тарифы (4 карточки) | page-local `pr-plans` | light | Free · Standard (рекоменд.) · Pro · Enterprise + строка smaller plans |
| 3 | Сравнение по тарифам | page-local `pr-compare` | light/soft | матрица 22 строки × 6 уровней |
| 4 | Where EvalLense fits | page-local `pr-fit` (ink) | ink | 2 unnamed-категории + таблица 8 строк + EvalLense + 2 positioning-строки |
| 4b | How it works | `Cinema` (DS) | ink | cinematic knockout над видео |
| 5 | Возможности | `Bento` (DS, version 2) | ink | 6 тайлов — Intake · Six-judge review · Evidence reports · Human decision · Trust layer · Plan controls |
| 6 | FAQ по прайсингу | `Faq` (DS) | ink | 9 вопросов |
| 7 | Final CTA | `CtaBand` (DS) | dark | «Ready to evaluate your next cohort?» + Book a demo / Start free |

### Header nav (страница использует section-anchors, ≤3):
- Plans → `#plans`
- Compare → `#compare`
- FAQ → `#faq`

## Контент по секциям

> Ниже — финальная английская копия. Русским — только редакторские пометки в
> скобках. `[lens]` помечает слово/фразу под градиент-акцент.

### 1. Hero — `StatementHero`, `light`, `id="top"`
- **Eyebrow:** Pricing
- **Heading:** Pay for the [event,] not every seat
  - `titleLead`: "Pay for the" · `titleAccent`: "event," · `titleTrail`: "not every seat"
- **Subhead:** Each plan gives you a fixed number of evaluated submissions for one event window. No seats, tokens, or usage surprises.
- **CTA:** *(нет — StatementHero рендерится без кнопок; конверсия через карточки §2 и CTA §7)*
- **Медиа-слот:** 16:9, `.media-ph` placeholder (глобальный примитив, не пустой div)
  - Label: "Image · an event filtered through a lens into a ranked result · 16:9"
  - Hint: Pitches pass through a lens and emerge as a ranked leaderboard — lens-gradient violet→cyan→aqua over an Apple-neutral surface, calm; no security theatre, no shield icons.
  - ariaLabel: "An event filtered through a lens into a single ranked result"

### 2. Тарифы (4 карточки) — `pr-plans`, `id="plans"`, `light`

*(Секция не содержит явного heading/eyebrow/sub — только карточки и strip-строка.)*

**Cards (4 headline, из массива `PLANS`):**

| Поле | Free Trial | Standard ⭐ | Pro | Enterprise |
|---|---|---|---|---|
| name | Free Trial | Standard | Pro | Enterprise |
| price | $0 | $1,500 | $3,900 | from $15,000 |
| cadence | 3 submissions | 150 submissions | 500 submissions | 1,000+ submissions |
| validity | lifetime · no credit card | 120 days · 5 projects | 180 days · unlimited projects | contract term |
| message | Test EvalLense with 3 real submissions. | For a full pitch competition with up to 150 submissions. | Evaluate large cohorts and recurring programs. | Corporate, universities, and custom judging workflows. |
| bestFor | Best for: a first look before you commit. | Best for: a single full event. | Best for: large or recurring programs. | Best for: custom, high-volume programs. |
| CTA | Start free | Start Standard | Start Pro | Talk to sales |
| CTA variant | ghost | primary | ghost | ghost |
| href | /company/contact | /company/contact | /company/contact | /company/contact |
| recommended | — | ✓ (badge + primary button) | — | — |

**Bullets per card:**

- **Free Trial:** 3 submissions (lifetime) · All 6 AI judges (preview) · Evidence-linked reports · Human-in-the-loop scoring
- **Standard:** Full evaluation workflow included · Leaderboard + CSV / PDF export · Custom criteria weights · Top-up +25 / $300 ($12 each)
- **Pro:** Everything in Standard · Limited custom AI judges · BYO LLM (add-on) · Top-up +50 / $500 ($10 each)
- **Enterprise:** Everything in Pro · White-label branding · SLA + security review · Dedicated support

**Strip под карточками:**
> For smaller events: Starter is $199 for 15 submissions. Pilot is $500 for 40. See the full comparison below.

*(Starter и Pilot живут только в матрице §3, не в headline-карточках.)*

### 3. Сравнение — `pr-compare`, `id="compare"`, `soft`
- **Eyebrow:** Full comparison (с точкой-декором `.dot`)
- **Heading:** Compare [plans] — `plans` = grad-word
- **Subhead:** Compare submissions, validity, projects, exports, support, and admin controls.

**Колонки:** Free · Starter · Pilot · Standard (highlighted, "recommended") · Pro · Enterprise

**Строки (22 строки, из массива `COMPARE_ROWS`):**

| Строка | Free | Starter | Pilot | Standard | Pro | Enterprise |
|---|---|---|---|---|---|---|
| Price | $0 | $199 | $500 | $1,500 | $3,900 | from $15,000 |
| Submissions included | 3 | 15 | 40 | 150 | 500 | custom |
| Validity | lifetime trial | 90 days | 90 days | 120 days | 180 days | contract term |
| Projects | 1 | 1 | 2 | 5 | unlimited | custom |
| Top-up package | — | +10 / $150 | +10 / $150 | +25 / $300 | +50 / $500 | custom |
| Effective price per submission | — | $15 | $15 | $12 | $10 | custom |
| 6 AI judges (P1–P6) | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Evidence-linked rationale | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Human-in-the-loop scoring | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Review Board + leaderboard | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Prompt-injection safety & privacy | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Self-upload page | — | ✓ | ✓ | ✓ | ✓ | ✓ |
| CSV export | — | ✓ | ✓ | ✓ | ✓ | ✓ |
| PDF export | — | — | ✓ | ✓ | ✓ | ✓ |
| Remove watermark | — | — | ✓ | ✓ | ✓ | ✓ |
| Custom AI judges | — | — | — | add-on | limited | ✓ |
| BYO LLM | — | — | — | — | add-on | ✓ |
| White-label branding | — | — | — | — | — | ✓ |
| SLA + security review | — | — | — | — | — | ✓ |
| Admin seats | 1 | 1 | 2 | 5 | 10 | custom |
| Human judges | 0 | 2 | 5 | 10 | 25 | custom |
| Support | — | — | Async setup | Setup call + priority | Setup call + priority | Dedicated |

> **Принцип:** безопасность и доверие (prompt-injection safety, privacy,
> evidence-linked scoring, human-in-the-loop) — **на всех тарифах, включая Free
> Trial.** Дифференцируем объёмом и admin-возможностями, не доверием.

> **Упрощение vs бриф v0.4:** таблица убрала fair-use rows (file size / slides /
> concurrent runs) и детальные sub-groups (Collection / Reports / Review). Добавлена
> строка «Effective price per submission». Support: «Setup call + priority» без
> указания минут (30- / 60-min убраны из копии).

### 4. Where EvalLense fits — `pr-fit`, `ink`
- **Eyebrow:** Where EvalLense fits (с точкой `.dot`)
- **Heading:** Event workflow and AI evaluation in [one place] — `one place` = grad-word
- **Subhead:** Event platforms manage submissions and judges. AI deck tools review one deck at a time. EvalLense evaluates the full cohort — six independent judges, evidence-linked rationale, a leaderboard, and a human-owned final decision.

**FIT_BLOCKS (category framing, 3 блока):**

| Категория | Body | Gap |
|---|---|---|
| Event-workflow platforms | Collect submissions, assign judges, publish results. | No AI-first pitch evaluation; judging stays manual. |
| AI deck-analysts | Score and summarize one deck at a time. | No event workflow, no judge panel, no leaderboard. |
| **EvalLense** | Both, plus what neither has: six independent judges (P1–P6), transparent evidence-linked rationale, a leaderboard, and human-in-the-loop final scoring. | *(null — нет gap, это мы)* |

**FIT_TABLE (comparison table, 8 строк):**
Колонки: Event-workflow platforms · AI deck-analysts · **EvalLense** (highlighted `.pr-td--us`)

| Capability | Event-workflow platforms | AI deck-analysts | EvalLense |
|---|---|---|---|
| AI deck evaluation as core | ✗ | ✓ | ✓ |
| Six independent judges (P1–P6) | ✗ | partial | ✓ |
| Transparent rationale (no black box) | ✗ | partial | ✓ |
| Evidence-linked scoring | ✗ | partial | ✓ |
| Whole-event evaluation (not single deck) | ✓ | ✗ | ✓ |
| Leaderboard / ranking | ✓ | ✗ | ✓ |
| Human-in-the-loop final decision | manual | ✗ | ✓ |
| Questions for the live jury | ✗ | ✗ | ✓ |

**Positioning statements (`.pr-statement`, staggered reveal):**
1. "They manage the competition. EvalLense helps compare who is strongest and why."
2. "They review decks. We run structured evaluation across an entire competition."

> ⚠️ Named-таблицу конкурентов сознательно **НЕ показываем** (решение user,
> 2026-06-17). Причины: чужие фичи устаревают и неверифицируемы (research draft v0.2),
> named-таблица образовывает покупателя об альтернативах и звучит оборонительно.
> Категориальная рамка даёт differentiation без named-liability. Если понадобится
> named-сравнение — на отдельной «Why EvalLense» с верифицированными, датированными
> фактами, **не на pricing**.

### 4b. How it works — `Cinema` (DS), `ink` *(секция добавлена, в бриф v0.4 отсутствовала)*
- **Eyebrow:** How it works
- **Headline:** From submission to shortlist
- **Sub:** Each submission is reviewed by six AI judges, linked to evidence, and placed in a leaderboard for human review.
- **Медиа:** video `/assets/cta/cube-1.mp4` (autoplay, muted)

*(Cinema — DS-примитив; cinematic knockout над видео. Отрисовывается между §4 (pr-fit) и §5 (Bento). Разделители: ZoneToneFlip после §4 / `tr-masked-divider` ink→ink перед §5.)*

### 5. Возможности — `Bento` (DS, version 2), `ink`
- **Eyebrow:** Core toolkit included
- **Title:** The full evaluation [toolkit] is included — `toolkit` = titleAccent
- **Sub:** Every plan includes the same evaluation core: judges, evidence, reports, review, and safety. Plans only change limits, volume, and admin control.

**Tiles (6, из массива `CAPABILITIES`):**

| Tag | Title | Body | Feature / Media |
|---|---|---|---|
| Intake | Collect every deck | Collect decks (PDF, PPT, PPTX, Google Slides) by hand or via a self-upload link. | `feature: true` + `PricingToolkitCard` (стеклянный стол с инструментами оценки) |
| Six-judge review | Six independent judges | Each deck is reviewed across P1–P6, with a score, confidence signal, and evidence behind the call. | — |
| Evidence reports | Reports you can defend | Each participant gets strengths, weaknesses, evidence, and sharper questions for the live review. | — |
| Human decision | The human makes the final call | Use the Review Board to compare teams, adjust context, and rank by your Final Score. | — |
| Trust layer | Safety is part of the workflow | Prompt-injection checks, privacy controls, and no-black-box rationale are built in from the start. | — |
| Plan controls | Controls scale by plan | Weights, templates, branding, SSO, and API access scale with the plan you choose. | — |

**PricingToolkitCard (feature tile):**
- Статичный PNG «стеклянного стола» + дрейфующие оптические прожекторы (React-оверлей, свет НЕ впечён в PNG)
- ariaLabel: "A top-down glass evaluation table laid out with deck cards, six judge lenses, a rubric ruler, a score dial, evidence pins, a red-flag marker, a decision stamp, and a pricing token"

> Изменено vs v0.4: eyebrow «Everything included» → «Core toolkit included»; heading
> «What every plan can do» → «The full evaluation toolkit is included»; sub изменён;
> поверхность light → **ink**; все 6 тайлов переименованы (теги + заголовки + тела).

### 6. FAQ — `Faq` (DS), `id="faq"`, `ink`
- **Eyebrow:** Pricing FAQ
- **Title:** Pricing [questions] — `questions` = titleAccent
- *(было «Questions, answered» в v0.4 — изменено)*

**Items (9 вопросов):**

1. **What counts as a submission?** — One submitted pitch deck or application that receives one successfully generated AI evaluation report.
2. **Is this a subscription?** — No. You pay per event — a package of submissions with a validity window, not a monthly per-seat fee.
3. **What if I run out of submissions?** — Add more anytime with top-up packages (from $150 for 10, cheaper on higher plans), or move up a plan.
4. **How long do submissions last?** — Starter and Pilot, 90 days; Standard, 120 days; Pro, 180 days; Enterprise, the contract term.
5. **What if a deck can't be processed?** — It doesn't count as an evaluated submission. Disagreeing with the AI output isn't a failed evaluation either.
6. **What if a team resubmits after the report?** — A new report counts as a new evaluation.
7. **Is there a paid pilot?** — Yes — Pilot, $500 for 40 submissions. Talk to sales.
8. **Is my data safe?** — Yes. Safety and privacy controls are included on every plan. *(inline link → `/trust/security-privacy`)*
9. **Who makes the final decision?** — A person. AI prepares the analysis; you decide. *(inline link → `/trust/methodology`)*

### 7. Final CTA — `CtaBand` (DS), `dark`
- **Eyebrow:** Get started
- **Title:** Ready to evaluate your next [cohort?] — `cohort?` = titleAccent
- **Sub:** Start with 3 free submissions, or book a demo using your own decks.
- **Primary CTA:** Book a demo → `/company/contact`
- **Secondary CTA:** Start free → `/company/contact`
- **Медиа:** video `/assets/cta/neo.mp4`

*(Было «Run your next event on EvalLense» / «Start free on three submissions...» в v0.4 — изменено.)*

## Числа и факты

| Факт | Значение | Источник |
|---|---|---|
| Free Trial | $0 / 3 заявки (lifetime) / 1 проект / 1 admin seat | финмодель «Тарифы» v0.4; `pricing-model.en.md` §4 |
| Starter | $199 / 15 заявок / 90 дней / 1 проект / 1 admin seat / 2 human judges | там же §5 |
| Pilot (bridge) | $500 / 40 заявок / 90 дней / 2 проекта / 2 admin seats / 5 human judges | там же §6 |
| Standard (рекомендуемый) | $1,500 / 150 заявок / 120 дней / 5 проектов / 5 admin seats / 10 human judges | там же §5 |
| Pro | $3,900 / 500 заявок / 180 дней / unlimited / 10 admin seats / 25 human judges | там же §5 |
| Enterprise | от $15,000 / 1,000+ заявок / contract / custom seats | финмодель; `pricing-model.en.md` §18 |
| Top-up | +10/$150 ($15) · +10/$150 ($15) · +25/$300 ($12) · +50/$500 ($10) · custom | там же §7 |
| Effective price/sub | — · $15 · $15 · $12 · $10 · custom | кодовый массив COMPARE_ROWS |
| Единица оплаты | AI-оценённая заявка (no credits/tokens) | там же §1–§2 |
| AI-судей / измерений | 6 (P1–P6) | `overview.md` / `judges.md` |
| Ранжирование | по human Final Score, не по AI | `overview.md`, `judges.md` |

> Валюта — **только USD** (решение user). Fair-use лимиты (max file / max slides /
> concurrent runs) убраны из публичной таблицы (были в brief v0.4 §3) — на странице
> не показываем, только в условиях сервиса.

## Изображения

| Слот | Где | Что изображено | Промпт / реализация |
|---|---|---|---|
| hero | §1 StatementHero | Линза, через которую питчи становятся ranked-результатом | lens-градиент violet→cyan→aqua, Apple-нейтраль, calm; `.media-ph` 16:9; генератор НЕ подключён |
| toolkit | §5 Bento, tile 1 (Intake) | Стеклянный стол с физическими инструментами оценки | статичный PNG + React-оверлей дрейфующих прожекторов (`PricingToolkitCard`) |

## Внутренние ссылки

- **Header nav:** top-level `Pricing` → `/pricing` (`in_header_nav: true`); section-anchors Plans/#plans · Compare/#compare · FAQ/#faq.
- **Footer nav:** `Pricing` (группа — см. «Открытые вопросы»).
- **Cross-links со страницы:**
  - [[sitemap|Security & Privacy]] → `/trust/security-privacy` (из FAQ Q8)
  - [[sitemap|Methodology]] → `/trust/methodology` (из FAQ Q9)
  - `/company/contact` — все CTA (Start free / Start Standard / Start Pro / Talk to sales / Book a demo)

## SEO / meta

- **`<title>`:** EvalLense — Pricing: Pay-per-Event Pitch Evaluation
- **meta description:** Transparent EvalLense pricing: pay per event, not per seat. Plans are packages of AI-evaluated submissions; six AI judges on every plan, the human decides. *(≤155)*
- **OG-изображение:** слот `hero`

## Источники истины

### Wiki (landing)
- [[overview|Обзор продукта]] — workflow, 6 судей, модули
- [[sitemap|Карта сайта]] — прайсинг как live-страница `/pricing`
- [[design-system|Design System]] / [[section-types|Section Types]] — pricing-tiers, comparison-table, versus-table, faq, bento

### Business / research (`ai-jury-prod` и Drive) — сверено 2026-06-17
- `ai_jury_financial_model_v0_7_2_ru` лист «Тарифы» (v0.4) — **цены, лимиты, сроки,
  top-up — источник истины**
- `notes/research/pricing-model.en.md` v0.4 — feature-матрица (§10), seats (§11),
  FAQ (§9/§14), единица оплаты (§1–2)
- `notes/research/competitor-landscape.md` v0.2 — конкуренты, positioning (§8);
  фичи конкурентов — верифицировать (на pricing НЕ показываем)

## Acceptance (что считать готовым)

- [x] страница доступна по `/pricing`, обёрнута в `PageHeader` + `Footer`
- [x] 4 публичные карточки (Free · Standard ⭐ · Pro · Enterprise) с ценами из финмодели; Standard выделен
- [x] строка smaller plans (Starter/Pilot) под карточками; они же — в матрице
- [x] матрица фич × 6 уровней (22 строки), unnamed категориальная таблица (8 строк), Cinema «How it works», Bento возможностей (6 тайлов), FAQ (9 вопросов)
- [x] `Pricing` в header nav (top-level) + section-anchors Plans/Compare/FAQ
- [x] валюта только USD; имя EvalLense (не «AI Jury»)
- [x] только токены/классы из design-system
- [ ] `cd web && pnpm build` зелёный; `prefers-reduced-motion` уважается

## Открытые вопросы

**Решено:**
- 4 карточки = Free · Standard ⭐ · Pro · Enterprise (Starter/Pilot → матрица) — user 2026-06-16
- named-таблицу конкурентов **не показываем**, unnamed категориальная рамка — user 2026-06-17
- Hero без CTA-кнопок (конверсия через карточки §2 и CTA §7)
- Surface §5 и §6 переведены в ink (было light в v0.4)
- Positioning line: «We help understand who should win and why» → «EvalLense helps compare who is strongest and why»

**Осталось:**
- **Footer/nav-структура** — в какую группу footer кладём Pricing; в header — top-level.
- **Sitemap** — `/pricing` должен быть помечен как live, не post-MVP.
- **Имя бренда** — в финмодели/research продукт зовётся «AI Jury»; на странице — только **EvalLense**.
- **PricingToolkitCard изображение** — слот открыт (`.media-ph`), реальный PNG ещё не сгенерирован через FLUX.2 [dev].
- **Fair-use лимиты** — убраны из публичной таблицы; нужно определить, где они живут (условия сервиса / help center).
