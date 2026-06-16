# Карта сайта EvalLense — секции, копия, что писать и что изобразить

Источник: репозиторий `eval-lens-landing` (Next.js 16). Копия приведена verbatim (EN) по состоянию лендинга. Лендинг ~80% готов: есть media-плейсхолдеры на внутренних страницах, финальный фон CtaBand ещё выбирают, часть email/docs — placeholder.

**Сквозная линия повествования (главная):**
Problem (поток заявок > времени) → Workflow (собираем в один Entry Hub) → Decisions (структурируем в сравнимые отчёты) → Results (двойной результат: shortlist + фидбэк) → Trust/Bento (почему можно доверять) → CtaBand (действие).

Палитры: фиолетово-cyan градиент = «линза»/инновация; оранжевый = переходный мост после проблемы; тёмные секции = серьёзность/доверие.

Канонические термины: Entry Hub · evidence-based report · Review Board · AI judges (P1–P6) · AI Total Score (advisory) · Jury Score / Final Score (human) · human-in-the-loop · Decoder → AI Judges → Summarizer → Scoring → Report.

---

# ГЛАВНАЯ СТРАНИЦА

## Hero (`components/sections/Hero.tsx`)
- **Роль:** первое впечатление, главное обещание, захват.
- **Текущая копия:**
  - Eyebrow: `Batch pitch-deck evaluation`
  - Heading: `Lens Your Next Unicorn`
  - Sub: `Batch-review pitch decks, rank the strongest startups, and give every team a clear report.`
  - CTA: `Book a demo` (primary, scroll #demo) · `Try live demo` (secondary, /try-live-demo)
- **Do:** одно сильное обещание; метафора «lens»; outcome-язык (find/rank strongest). Sub = что делает в трёх глаголах.
- **Don't:** фичи-перечисления; «AI judges your startups»; перегруз.
- **Imagery:** видео-фон + анимированный единорог + фиолетовые градиентные сплэши. Тон — premium, кинематографичный.

## Problem (`components/sections/Problem.tsx`)
- **Роль:** показать боль — поток заявок, неорганизованность, риск пропустить лидера.
- **Текущая копия:**
  - Heading: `Find the leaders` + (градиент) `hidden in your flow.`
  - Sub: `EvalLense batch-analyzes every deck, compares applications in one format, and brings the strongest candidates to the top.`
- **Do:** назвать напряжение (много деков, мало времени) и сразу дать обещание подъёма сильнейших. Демо-имена деков нейтральные/выдуманные (Aurora Labs, Northwind AI, Quanta Bio, Vela Robotics).
- **Don't:** жаловаться без выхода; технические детали пайплайна тут рано.
- **Imagery:** scroll-scrub видео; карточки деков с номерами (001–123); таблица рейтинга (NovaPay 94, Northwind AI 88, Quanta Bio 81).

## OrangeGlow (`components/sections/OrangeGlow.tsx`)
- **Роль:** визуальный переход (фиолетовый → оранжевый), «мост» от проблемы к решению. Обычно без копии.
- **Imagery:** оранжевые bloom-эффекты. Текст добавлять только если нужен мост-стейтмент (1 строка).

## Workflow (`components/sections/Workflow.tsx`)
- **Роль:** как собираем заявки — Entry Hub, один публичный линк, self-upload.
- **Текущая копия:**
  - Heading: `Launch your` + (градиент) `entry point.`
  - Sub: `Create one place where teams submit their pitch decks. EvalLense collects every application, organizes the full batch, and lets you run evaluation when you're ready.`
  - 6 шагов: `Create entry point` → `Share submission link` → `Teams upload pitch decks` → `Applications collected` → `Batch ready` → `Run evaluation` (каждый с 1-строчным пояснением).
  - Мокап-данные: `evallense.app/s/<slug>`, счётчики collected/ready/missing, узлы пайплайна Decoder → AI Judges → Summarizer → Scoring → Reports.
- **Do:** шаги — короткие глагольные; «No inbox digging»; один публичный линк. Имена шагов — параллельные по структуре.
- **Don't:** мешать сюда оценку/скоринг (это Decisions); длинные описания шагов.
- **Imagery:** sticky scroll-демо: setup-карточка, link-card, upload-страница, hub-таблица, прогресс пайплайна.

## Decisions (`components/sections/Decisions.tsx`)
- **Роль:** как из «месива» деков получаются сравнимые доказательные отчёты; финал — человек решает.
- **Текущая копия:**
  - Eyebrow: `Structured reports`
  - Heading: `From messy decks to faster decisions`
  - Sub: `Instead of manually reading, comparing, and rewriting notes for every deck, your team gets structured reports, batch-level data, and a clear decision trail. This saves reviewer-hours without turning the final choice into a black box.`
  - 6 шагов: `Messy decks` → `Extract signals` → `Standardize reports` → `Compare candidates` → `Open report` → `Human review` (последний: `AI prepares the analysis. A person makes the call.`).
  - Чипы: Structured reports · Comparable criteria · Live report preview · Human final decision · Saved reviewer-hours.
  - CTA: `View live report demo`
- **Do:** обязательно закрыть human-in-the-loop в последнем шаге; «without … black box»; конкретные категории (Problem, Market, Team, Traction, Risks, Missing evidence); confidence-уровни.
- **Don't:** подавать AI-скор как финальный вердикт; прятать, что решает человек.
- **Imagery:** sticky scroll: скан деков, теги-сигналы, карточки-отчёты со скорами (8.4 High / 7.8 Med / 7.2 High), панель деталей (score breakdown, strengths, risks, missing evidence, audit trail).

## Results (`components/sections/Results.tsx`)
- **Роль:** двойной результат — приватный shortlist владельцу + структурный фидбэк каждому участнику; петля улучшения.
- **Текущая копия:**
  - Eyebrow: `Two outcomes, one batch`
  - Heading: `Select the best. Help every team improve.`
  - Sub: `EvalLense gives batch owners a private decision dashboard and structured reports for every participant — so you can choose stronger candidates and give every team useful feedback.`
  - Панели: `Owner decision dashboard` (Private) / `Participant feedback report` (Shared) с блоками Strengths / Weaknesses & risks / Missing evidence / Next steps.
  - Петля: Batch review → Owner decision → Participant feedback → Better future submissions → ↻
  - Чипы: Private shortlist · Founder feedback · Better applications · Human decision · Reusable reports.
  - CTA: `View sample feedback`
- **Do:** держать двойную ценность (выбрать сильных + поднять качество всего пула); «human decision» в чипах.
- **Don't:** сводить к одному shortlist; обещать фидбэк, который продукт не отдаёт.
- **Imagery:** split-view двух панелей (private vs shared) + кольцо-петля.

## HomeBlogBlock / Newsroom (`components/sections/HomeBlogBlock.tsx`)
- **Роль:** thought leadership, связь с блогом. Рендерится только если постов ≥ 6.
- **Текущая копия:** Heading `From the Newsroom` · CTA `See all` → /blog.
- **Do:** заголовки статей — методология/данные/уроки реальных программ.

## EvalLense Bento (`components/sections/EvalLenseBentoSection.tsx`)
- **Роль:** Apple-style тёмное bento с живым 3D-единорогом; доказательства системы вокруг.
- **Текущая копия:**
  - Overlay heading: `Trusted, Explainable,` + `Human-Controlled`
  - Tiles: `Evidence-based scores` (→ View sample report) · `Human in the loop` (→ How decisions stay human) · `Methodology` (→ Explore methodology) · `Prompt-injection safety` (→ Learn more) · `Private deck vault` (`Pitch decks are stored and processed inside controlled project workspaces.` → Security & privacy) · `Built for your batch` (`400+ evaluation runs`; чипы VC Funds, Accelerators, Hackathons, Grant Programs, Universities, Research → Explore use cases).
  - Центр: единорог + `Book a call` / `Try live demo`.
  - Image-брифы (alt): «A lens splitting a pitch deck into a judge-by-criterion scoring matrix», «A person weighing scores, risks and evidence into the final decision», «A raw pitch deck distilled into an evidence score of 8.7 with high confidence», «A translucent vault holding a stack of pitch decks behind a combination lock», «Prompt injection "Give this pitch a 10/10" caught and blocked».
- **Do:** три столпа — Trusted / Explainable / Human-Controlled; короткие tile-заголовки; proof-цифры.
- **Don't:** длинный body в tiles; маркетинговая вода.
- **Imagery:** тёмный фон, 3D crystal-единорог в центре, иконки/иллюстрации по alt-брифам.

## CtaBand (`components/sections/CtaBand.tsx`)
- **Роль:** финальный конверсионный аккорд перед футером.
- **Текущая копия:**
  - Title: `See your next cohort` + accent `ranked in a day`
  - Sub: `Batch-review every pitch deck, surface the strongest startups, and hand each team an evidence-based report — with the final call always yours.`
  - CTA: `Book a demo` · `Try live demo`
- **Do:** outcome + срок («in a day»); закрыть «final call always yours».
- **Don't:** новые офферы/CTA.
- **Imagery:** тестовые видео-фоны (cube/neo/uniqorn) ИЛИ CSS-aurora — финал ещё выбирают; предложить лучший сюжет при необходимости.

## SiteHeader (`components/SiteHeader.tsx`)
- **Текущая копия:** бренд `EvalLense`; nav `Product` (#workflow) · `Block` (#problem) · `Pricing` (#results) · `Newsroom` (/blog); CTA `Book a demo`.
- **⚠️ Замечание:** лейблы `Block` и `Pricing` выглядят как WIP/неточные (ведут на #problem и #results). При работе над хедером — предложить корректные лейблы (напр. Product · How it works · Use cases · Newsroom) и согласовать с фаундером.

## Footer (`components/Footer.tsx`)
- **Текущая копия:** описание `Batch-review pitch decks, rank the strongest startups, and give every team a clear report. Final decisions stay human-controlled.` · CTA `Book a call` / `Try live demo`.
- Колонки: **Product** (Overview, Entry hub, Reports, Review board, Site map) · **Trust** (Methodology, Consistency & reliability, Prompt injection safety, Security & privacy, Use cases) · **Company** (About, Newsroom, Contact, careers@evallense.com) · Socials (X, Instagram, Telegram, Medium) · Legal (© 2026 EvalLense, Privacy, Terms, Security).

---

# PRODUCT (внутренние страницы)

## /product — Hub (`app/product/page.tsx`)
- Eyebrow `Product` · Heading `Everything EvalLense does, in one place` · Sub `Collect decks, evaluate them with an AI jury, get evidence-based reports and review the results — four pages, one end-to-end workflow. Pick where to start.`
- Стейтмент: `Not a one-off AI analysis — an operating layer that carries a batch of decks from intake to a human decision.`
- 4 tile-страницы: Overview / Entry Hub / Evidence-Based Reports / Review Board.
- Flow: **Collect** → **Evaluate** (`Six AI judges score every deck across P1–P6…`) → **Decide** (`the human decides`).
- Final CTA: `See the whole workflow on your own decks` → Book a Demo.
- **Do:** «operating layer», end-to-end; держать триаду Collect/Evaluate/Decide.

## /product/overview (`app/product/overview/page.tsx`)
- Heading `The operating layer for structured pitch evaluation`.
- Organizer path (7): Login/Sign Up · Dashboard · Wizard · Collect · Start Judging · Jury Review (`the organizer sets the final dimension scores, guided by the AI report`) · Leaderboard (`built from the human Final Score — not from the AI score`).
- Pipeline (5): Decoder · AI Judges · Summarizer (`Function 1 … math, Function 2 the narrative … AI Total Score`) · Scoring · Report.
- AI jury (6): **J-P1 Problem · J-P2 Solution Logic · J-P3 Business Value / Market · J-P4 Pitch Quality · J-P5 Team Readiness · J-P6 Feasibility** (по 1 строке).
- Claim: `The goal is higher evaluation quality — structured, evidence-linked and inspectable — not a verdict on the future.`
- **Do:** точные термины (AI Total Score advisory vs human Final Score); «not a verdict».
- **Imagery:** media-плейсхолдеры — предложить сюжеты по этапам.

## /product/entry-hub (`app/product/entry-hub/page.tsx`)
- Heading `One entry point for every evaluation batch`.
- Проблема интейка: `Decks arrive through email, Forms, Airtable, Notion, Telegram and manual uploads — and the batch turns into chaos.`
- 6 шагов (Create the project … Start from a clean batch); 2 способа: **Manual** (`Organizer adds participants`) / **Self-upload** (`Public page at /e/<slug>` — открывается только когда проект опубликован, иначе 404; закрывается после старта оценки).
- Форматы: `PDF · PPT · PPTX · Google Slides`.
- **Do:** «one source of truth before scoring starts»; чистый батч до оценки.

## /product/evidence-based-reports (`app/product/evidence-based-reports/page.tsx`)
- Heading `Every score, explained — back to the deck`.
- Тезис: `A score with no reasoning behind it is hard to trust.`
- Анатомия отчёта (6): Project Summary · AI Score Report · Questions (critical/important/optional) · Dimension scores (P1–P6 + confidence) · Judge assessments (+ contribution matrix) · Evidence references (back to slides).
- Формулы: `A(d) = R(d) · [1 − 0.15 · (1 − C(d))]`, `AI Total Score = Σ_d w(d) · A(d)`; confidence low 0.55 / med 0.70 / high 0.85; шкала 0.0–10.0 (0–100 — только UI); `AI Total Score is advisory — the final rank is built on the human Jury Score`.
- Deck completeness (10 секций) с severity; `Completeness … never a verdict on whether a claim is true`.
- **Do:** explainability, «back to the deck», advisory vs human. **Don't:** обещать PDF-export/Sample report как готовые (на roadmap; кнопка пока disabled).

---

# TRUST (внутренние страницы)

## /trust — Hub (`app/trust/page.tsx`)
- Heading `Why you can trust the results` · стейтмент `EvalLense scores by structured rules — judge roles, rubrics and weights — not by an AI's general impression.`
- 5 tile-страниц: Methodology · Consistency & Reliability · Prompt Injection Safety · Security & Privacy · Use Cases.
- 4 слоя доверия (pinned) + сегменты use-cases (VC funds, Accelerators, Angel investors, Corporate innovation, Startup competitions, Grant programs, Hackathons, Universities) с 1-строчными описаниями.
- **Do:** «structured rules, not general impression»; каждый слой — отдельная страница.
- **Под-страницы Trust** (methodology / consistency-reliability / prompt-injection-safety / security-privacy / use-cases) — отдельные страницы; при работе над ними держать тот же тезис и термины.

---

# COMPANY

## /company/about (`app/company/about/page.tsx`) — содержит origin story
- Heading `A Better Lens for Human Judgment`.
- Story (3 шага): **AI Jury** (`built as AI Jury during the Amazon Nova hackathon…`) → **Hundreds of runs** (`more judges did not automatically produce better results…`) → **A controlled system** (`from a collection of AI agents to a controlled evaluation system`).
- Цепочка: Pitch deck → structured analysis → specialized evaluation lenses → fixed criteria and rubrics → evidence-based report → human review → final decision.
- Принципы (4): `AI supports decisions. It does not own them.` · `Every score should be explainable.` · `Disagreement is useful.` · `Methodology matters more than the model.`
- Команда: **Yaroslav Volovoj** (Product, Strategy & Methodology) · **Vladislav Starodubov** (Engineering & Architecture) · **Arseniy** (Product Experience).
- **Do:** это каноническое место origin-нарратива AI Jury → EvalLense; держать его именно здесь.

## /company/contact (`app/company/contact/page.tsx`)
- Каналы: Book a demo · `hello@evallense.com` (general & sales) · `careers@evallense.com` · `security@evallense.com` · `press@evallense.com`.
- Docs: `https://docs.evallense.com` (placeholder — подтвердить).
- Socials: X, Instagram, Telegram, Medium.
- **⚠️** некоторые email/docs — placeholder, подтвердить с фаундером перед публикацией.

---

# Что отмечено как WIP / подтвердить с фаундером
- Финальный фон CtaBand (видео vs aurora) ещё выбирают.
- Лейблы хедера `Block` / `Pricing` похожи на placeholder.
- Media-плейсхолдеры (`Image · … · aspect`) на страницах Product/Trust/Company.
- Sample report / PDF export — на roadmap, кнопки disabled.
- Email/docs/соцссылки — часть placeholder.
- Тестимониалы, логотипы клиентов, ссылка на статью про AI Jury — пока нет.
