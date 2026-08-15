---
title: AI-видимость — baseline 2026-08-15
source: ChatGPT (веб-поиск), запросы задавал фаундер
---

# Baseline AI-выдачи, 15.08.2026

Замер в ChatGPT по запросам про screening-платформы, альтернативы Dealum, LLM-as-a-judge
и AI-оценку заявок. **Контраст с классическим поиском разительный.**

| Канал | Результат |
|---|---|
| Google/классический поиск ([замер](visibility-baseline-2026-08-15.md)) | **0 из 15** запросов, бренд-SERP занят чужими |
| ChatGPT | **Присутствуем и рекомендуемся** в нескольких ответах |

## Что GPT говорит о нас сам

1. **Попадаем в список AI-native решений первыми:**
   > «If AI-powered screening is your priority... AI-native solutions are emerging:
   > **EvalLens** — LLM-based multi-judge pitch evaluation»
   (перед Spectup и Flowlie)

2. **Рекомендуется в составе стека для акселератора:**
   > «AI-first evaluation → **EvalLens** layered on top of any intake platform»

   Это позиционирование «слой поверх интейка», а не замена CRM — ровно наш operating-layer нарратив.

3. **GPT знает продукт в деталях** (прочитал сайт и блог): шесть оценочных линз с перечислением
   измерений, evidence-linked скоринг вместо чёрного ящика, «conflicting opinions surfaced rather
   than averaged away» (наш Spread), human-in-the-loop, origin story AI Jury, «more than 400
   internal evaluation experiments», вывод «больше судей не улучшило надёжность», limited partner
   program вместо открытой регистрации.

4. **Наш gap-нарратив воспроизводится дословно.** GPT независимо формулирует, чего нет у рынка:
   multiple independent AI judges · evidence citations for every score · consensus vs disagreement
   analysis · judge consistency analytics · human accountability workflows. Это буквально список
   наших дифференциаторов.

## Проблема, которую замер вскрыл

В одном месте GPT пишет **«products like EvalLense»** — с лишней «e». Наше историческое неверное
написание утекло в паблик и AI его выучил. Это тот же баг, который сидел в корневом `<title>`
сайта и в доках (`evallense.com`). Домен-канон и написание бренда теперь везде поправлены
(`EvalLens`, `evallens.io`), но AI переучится только после переиндексации.

## Конкурентная карта (новое — раньше её у нас не было)

До этого замера в наших материалах фигурировали только Sopact и Evalyze. Реальная картина шире.

**Прямые конкуренты (AI-first screening для организаторов):**

| Продукт | Фокус | Наше отличие |
|---|---|---|
| Peachdeck | AI-скоринг деков + мэтчинг с инвест-тезисом | у них один скоринг, у нас панель + Spread |
| Metric | End-to-end скрининг заявок, кастомные рубрики, комитет | ближайший по охвату; у нас evidence-per-claim и детерминизм |
| Evala AI | CRM акселератора + AI-скрининг + пайплайн | они CRM-first, мы evaluation-first |
| Jolders | Оценка форм, деков и видео-питчей | шире по форматам, мельче по методологии |
| Frictionless Intelligence | Полный воркфлоу питч-конкурса, live-скоринг | энтерпрайз, demo-gated |
| VentureLens | AI-комитет с audit trail | ближе всех по нарративу, ранняя стадия |
| Startup Screener | Прозрачный evidence-based ревью | пересекается с нашим позиционированием |
| evala.AI | Брендированный портал оценки | воркфлоу > методология |

**Смежные (интейк/CRM, не оценка):** F6S, Skipso, AcceleratorApp, Innoloft (LoftOS), Babele, Dealum.
**LLM-eval инфраструктура (другой рынок, но пересекается в терминах):** Future AGI, Confident AI
(DeepEval), Galileo, Braintrust, Arize Phoenix, Ragas.
**Founder-facing (другая сторона стола):** PitchLens, Gover, Spectup, Flowlie.

## Что это меняет в планах

1. **Приоритет pSEO смещается.** В [pseo-opportunity-map](../wiki/product/site/pseo-opportunity-map.md)
   предлагался `/compare/evalyze` как защита бренда. Теперь видно, что сравнительные страницы
   нужнее против **Peachdeck / Metric / Evala AI / Jolders** — это те, кого GPT называет
   альтернативами в нашей же категории.
2. **AI-канал работает лучше классического поиска.** Значит llms.txt, FAQPage и статьи с
   извлекаемыми ответами дают эффект раньше, чем позиции в Google. Усиливать этот канал.
3. **Написание бренда критично.** Каждое «EvalLense» в паблике учит модели неверному имени.
4. **Повторный замер** — через месяц, теми же запросами, плюс проверить: исчезло ли «EvalLense»
   и появились ли мы по «pitch competition judging software» (там пока держит Sopact).
