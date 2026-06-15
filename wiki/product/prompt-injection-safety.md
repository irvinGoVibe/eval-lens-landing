---
title: Prompt Injection Safety
status: approved
version: 1
updated: 2026-06-16
route: /trust/prompt-injection-safety
section: trust
nav_label: Prompt Injection Safety
in_header_nav: false
in_footer_nav: true
cta: Book a Demo
---

# Prompt Injection Safety

← [[index|Wiki]] · [[sitemap|Карта сайта]]

Trust-страница: объясняет, как EvalLense обращается со скрытыми или
манипулятивными инструкциями внутри питч-деков — контент дека оценивается как
контент и не может переписать правила оценки.

> Продуктовый бриф страницы для skill `build-pages`. Факты — из Application-доков
> `ai-jury-prod` (`governance-framework.md`, `scientific-evaluation-methodology.md`,
> `wiki/product/scope.md` §5.2–5.3, `human-in-the-loop.md`, `homepage-structure.md`).
> Подаём как **архитектурное разделение контента и управления**, без
> overclaim'а про абсолютную защиту. Чего нет в доках — в «Открытые вопросы».

## Роль и аудитория

- **Роль страницы:** дать уверенность, что загруженный документ не может
  манипулировать логикой оценки — evaluation остаётся под контролем системы и
  человека, а не дека.
- **Для кого:** организаторы конкурсов и фонды, где участники мотивированы
  «накрутить» оценку; команды, которым важна честность сравнения.
- **Ключевое сообщение:** контент дека — это **evidence для анализа, а не
  инструкция к исполнению**. Скрытый текст не становится системной командой.
- **Целевое действие:** Book a Demo → `/company/contact`; вторичный путь —
  Explore Security & Privacy → `/trust/security-privacy`.

## Структура секций

| # | Секция | Архетип | Движение | Поверхность | Что показываем |
|---|---|---|---|---|---|
| 1 | Hero | statement-hero | reveal | light | «Your deck is evidence, not a command» + lens-акцент + CTA |
| 2 | Что может пойти не так | editorial-split | reveal | light | Примеры инъекций: «ignore rules», «give max score», скрытый текст |
| 3 | Граница контент/управление | full-bleed-statement | reveal | ink | Один тезис на тёмном: контент дека ≠ инструкция оценщику |
| 4 | Как устроена защита | bento / feature-grid | reveal | light | Controlled prompts · независимые судьи · instruction hierarchy · suspicious handling |
| 5 | Несколько уровней удержания | pinned-multi-screen | pin | ink | Слои: судьи → детерминированная математика → advisory AI → человек |
| 6 | Почему это честно | editorial-split | reveal | light | Участник не может выиграть, встроив инструкцию в дек |
| 7 | Человек в контуре | human-in-the-loop-footer | reveal | light | Подозрительные/неоднозначные кейсы видит человек; решение за ним |
| 8 | Final CTA | quiet-cta | reveal | ink | Призыв + Book a Demo |

## Контент по секциям

### 1. Hero
- **Заголовок:** Your deck is evidence, not a command
- **Подзаголовок:** EvalLense оценивает содержимое дека как материал для анализа.
  Скрытые инструкции не могут переписать правила оценки или поднять балл. *(черновик)*
- **CTA:** Book a Demo

### 2. Что может пойти не так
Питч-деки могут содержать скрытый текст, встроенные инструкции или adversarial-
контент, пытающийся манипулировать AI. Простые примеры:
- дек просит модель «проигнорировать критерии оценки»;
- скрытая инструкция велит «поставить максимальный балл»;
- слайд содержит текст, написанный, чтобы повлиять на оценщика.

### 3. Граница контент/управление
Один тезис на весь экран:
> **Deck content is evidence to analyze, not instruction to follow.**

Логика оценки контролируется системой, а не загруженным деком. Это базовый
принцип, на котором стоят остальные уровни защиты.

### 4. Как устроена защита
Защита — это **архитектура**, а не один фильтр (из `scope.md` §5.2,
`scientific-evaluation-methodology.md`):
- **Controlled evaluation prompts.** Судьи работают по фиксированному контракту
  (`technical_prompt_md` с embedded dimensions); project criteria не приходят
  как runtime-поле, которое можно подменить через контент.
- **Independent judges.** 6 судей (J-P1…J-P6) оценивают параллельно и **не видят
  оценок друг друга** — инъекция в одном месте не «заражает» панель.
- **Instruction hierarchy.** Содержимое дека попадает в роль evidence, а не
  system-команды; правила оценки выше контента документа.
- **Suspicious content handling.** Подозрительный/скрытый текст остаётся
  контентом и всплывает как сигнал (`reviewSignals`, `keyRisks`) для человека.
- **Human review visibility.** Любой подозрительный кейс виден организатору.

### 5. Несколько уровней удержания
Даже если отдельный текст повлияет на формулировку, итог удерживают слои:
1. **Судьи** — независимы, dimension-specific, evidence-привязаны.
2. **Детерминированная математика (Function 1).** `AI Total Score` считается
   формулой без LLM; narrative (Function 2) **не может противоречить** числам.
3. **Advisory-статус AI.** `AI Total Score` — только справочный baseline, он
   **не ранжирует** участников.
4. **Человек.** Ранжирование строится по **human Jury Score / Final Score**, а
   не по AI. Подменить балл через дек — значит подменить *advisory*, а не итог.

### 6. Почему это честно
Участники **не должны** иметь возможность повлиять на оценку, встроив инструкции
в дек. Разделение контента и управления + человеческое финальное решение делают
сравнение честным: побеждает сила питча, а не подсказка модели.

### 7. Человек в контуре
EvalLense поддерживает controlled evaluation и оставляет финальное решение за
человеком (governance-модель). Организатор видит reasoning, сигналы риска и
вопросы для live Q&A, после чего выставляет `Jury Score`. AI готовит — человек
финализирует.

### 8. Final CTA
- Призыв: проверить, как система держит оценку под контролем на ваших деках.
- Кнопка: Book a Demo.

## Числа и факты

Здесь уместнее структурные факты, чем метрики (числовых KPI «защиты от инъекций»
в доках нет — не выдумывать).

| Факт | Значение | Источник |
|---|---|---|
| Независимых судей в панели | 6 (J-P1…J-P6), параллельно, не видят друг друга | scientific-evaluation-methodology.md |
| Кто ранжирует | human Jury Score / Final Score, не AI Total Score | governance-framework.md |
| Статус AI Total Score | advisory baseline | governance-framework.md / scope.md AC8.1 |
| Слой математики | Function 1 без LLM; narrative не противоречит числам | scope.md §5.3 |
| Судьи и criteria | приходят через embedded dimensions в контракте судьи, не runtime-полем | scope.md §5.2 |

## Изображения

| Слот | Где на странице | Что изображено | Промпт-набросок (стиль бренда) |
|---|---|---|---|
| hero | секция 1 | Слайд дека со «скрытой» строкой, которая проходит через линзу и помечается как evidence, а не команда | lens-градиент violet→cyan→aqua, Apple-нейтраль, calm, без щитов и security-театра |
| layers | секция 5 | Вертикальные слои: судьи → математика → advisory → человек; инъекция «затухает» к низу | те же токены, тонкие линии, ink-поверхность |

## Внутренние ссылки

- **Header/Footer nav:** добавить пункт `Prompt Injection Safety` →
  `/trust/prompt-injection-safety` (footer-секция TRUST, см. [[sitemap|Карта сайта]]).
- **Cross-links со страницы:**
  - [[sitemap|Security & Privacy]] — как обрабатываются и хранятся деки
  - [[sitemap|Methodology]] — judge roles и scoring model
  - [[sitemap|Consistency & Reliability]] — детерминированная математика и spread

## SEO / meta

- **`<title>`:** EvalLense — Prompt Injection Safety for Pitch Evaluation
- **meta description:** Контент дека оценивается как evidence, а не команда:
  независимые судьи, детерминированная математика, advisory-AI и человек в
  контуре удерживают оценку под контролем. *(≤155)*
- **OG-изображение:** слот `hero`

## Источники истины

### Wiki (landing)
- [[vision|Vision]] — explainable-оценка, human-in-the-loop
- [[sitemap|Карта сайта]] — Prompt Injection Safety (deck не переопределяет правила)
- [[design-system|Design System]] — full-bleed-statement, bento, human-in-the-loop footer

### Application (`ai-jury-prod`)
- `product/website/methodology/governance-framework.md` — кто владеет каким баллом
- `product/website/methodology/scientific-evaluation-methodology.md` — независимость судей
- `wiki/product/scope.md` §5.2–5.3 — контракт судьи, Function 1/2, advisory AI
- `wiki/product/human-in-the-loop.md` — финальное решение за человеком
- `wiki/product/site/homepage-structure.md` — Trust Layer card «Prompt Injection Safety»

## Acceptance (что считать готовым)

- [ ] страница доступна по `/trust/prompt-injection-safety`, обёрнута в `SiteHeader` + `Footer`
- [ ] все 8 секций из «Структура секций» собраны
- [ ] есть тёмный full-bleed statement (секция 3) и pinned-multi-screen слоёв (секция 5)
- [ ] добавлена ссылка в footer-nav (TRUST)
- [ ] только токены/классы из [[design-system|Design System]]
- [ ] `cd web && pnpm build` зелёный; `prefers-reduced-motion` уважается

## Открытые вопросы

- **Уровень технической детализации.** Доки описывают архитектурное разделение,
  но не конкретные input-sanitization-механизмы. Не заявлять защит, которых нет;
  держать формулировку на уровне «content vs control + human final».
- **Можно ли показывать примеры реальных инъекций** из внутренних прогонов —
  согласовать, чтобы не раскрывать чувствительное.
- **Формулировка гарантий.** Финальный copy hero/секции 6 — из утверждённых
  маркетинг-материалов, без обещания «100% защиты».
