---
status: draft
version: 0.1
updated: 2026-06-16
linear_project:
linear_parent_issue:
linear_issues:
---

# Story 07 - Prompt Injection Safety page (/trust/prompt-injection-safety)

Status: Draft
Owner:
Team:
Priority:
Linear Mapping: Project by default

## Summary

Коротко:
- что меняем — добавляем внутреннюю Next.js-страницу `/trust/prompt-injection-safety`
  как Apple-grade scroll-страницу по образцу `/trust/methodology` и
  `/trust/consistency-reliability`.
- зачем меняем — Trust-раздел должен объяснять, как EvalLense обращается со
  скрытыми/манипулятивными инструкциями внутри питч-деков: контент дека
  оценивается как контент и не может переписать правила оценки.
- ожидаемый эффект — организаторы конкурсов и фонды видят, что загруженный
  документ не управляет логикой оценки; решение остаётся за системой и человеком.

## Problem

- Trust-раздел покрывает methodology и consistency, но нет страницы про
  prompt injection / content-vs-control.
- Аудитория, где участники мотивированы «накрутить» оценку, не видит, почему
  встроенная в дек инструкция не становится системной командой.
- Footer-колонка Trust не ведёт на отдельную страницу про injection safety.

## Goal

После завершения:
- страница `/trust/prompt-injection-safety` доступна, обёрнута в `SiteHeader light`
  + `Footer`, собрана по 8 секциям брифа, со scroll-driven движением через `ScrollFX`.
- footer-nav (колонка Trust) ведёт на новую страницу.
- использованы реальные подтверждённые факты (6 независимых судей J-P1…J-P6,
  advisory AI Total Score, Function 1 без LLM, ранжирование по human Jury/Final
  Score) — без draft-заглушек.

## Scope

### In scope
- `web/src/app/trust/prompt-injection-safety/page.tsx` (Server Component + metadata).
- page-scoped CSS под обёрткой `.injection …` в конце `web/src/app/globals.css`.
- footer-ссылка в `web/src/components/Footer.tsx` (колонка Trust).
- story-файл `wiki/stories/07-prompt-injection-safety.md`.

### Out of scope
- генерация реальных ассетов (используются видимые `.media-ph`).
- правки `ScrollOrchestrator`, секций главной, других trust-страниц.
- header-nav (бриф: `in_header_nav: false`).
- новые токены/цвета/тени/радиусы; новые пакеты.

## Users / Actors

- primary user: организаторы конкурсов, фонды и команды, которым важна честность
  сравнения и устойчивость оценки к манипуляциям в деке.
- system actor: статический рендер Next.js (страница без backend/process.env).

## Source of Truth

### Wiki
- [[wiki/product/prompt-injection-safety.md]] — продуктовый бриф (8 секций, факты,
  изображения, SEO) — первичный источник.
- [[wiki/architecture/page-design-patterns.md]] — архетипы, ритм, движок, QA.
- [[wiki/architecture/design-system.md]] — токены и классы.
- `web/src/app/trust/consistency-reliability/page.tsx` — структурный эталон.
- `web/src/app/trust/methodology/page.tsx` — второй образец (pin, full-bleed,
  human-in-the-loop узлы).

### Notes
- блоки `.methodology` и `.consistency` в `web/src/app/globals.css` — образец
  page-scoped CSS.

### Chat / Working Context
- батч-сборка внутренних страниц по skill `build-pages`.

## Main Flow

1. Пользователь приходит из footer-колонки Trust → `/trust/prompt-injection-safety`.
2. Hero задаёт тезис «Your deck is evidence, not a command».
3. Скролл проводит через 8 секций: что может пойти не так → граница
   контент/управление (dark statement) → как устроена защита → несколько уровней
   удержания (pinned) → почему это честно → человек в контуре → final CTA.
4. CTA `Book a Demo` (`/#demo`).

## Business Rules

- Движение — только через data-атрибуты (`data-reveal` / `data-scrub` / `data-pin`)
  и смонтированный `<ScrollFX/>` (после `<Footer/>`). Никаких per-section
  `useEffect`, никаких правок `ScrollOrchestrator`.
- Только канонические токены `:root` и существующие глобальные классы.
- Контент дека — evidence для анализа, а не system-команда; правила оценки выше
  контента документа.
- 6 судей (J-P1…J-P6) независимы и не видят оценок друг друга.
- AI Total Score — advisory, не ранжирует; ранжирование по human Jury/Final Score.
- Function 1 (математика) без LLM; narrative (Function 2) не противоречит числам.
- Без overclaim'а про абсолютную защиту — формулировка на уровне content-vs-control
  + human final.
- `prefers-reduced-motion` тих: контент гейтится, для pin-секции есть
  reduced-motion-оверрайд.

## Edge Cases

- Узкие экраны: pinned layers-секция снимает pin (`max-width:880px`) и раскрывает
  все шаги; split-секции схлопываются в один столбец; bento/feature-грид → 1–2
  колонки.
- Reduced-motion: reveal/pin статичны, описания слоёв видимы.
- Горизонтальный скролл запрещён: flex/grid-дети `min-width:0`, медиа без
  фикс-ширин, `media-ph` держит `aspect-ratio`.

## Technical Impact

- frontend: новая страница + page-scoped CSS + footer-ссылка.
- backend: нет.
- database: нет.
- infrastructure: нет (статический рендер на Vercel).

## Dependencies

### Depends on
- generic scroll-FX примитивы и `ScrollFX` (Story 04).
- `.media-ph` примитив; `SiteHeader light`, `Footer`.

### Blocks
- генерацию реальных ассетов для слотов hero / holding-layers.

## Deliverables

- `web/src/app/trust/prompt-injection-safety/page.tsx`
- CSS-блок `.injection …` в `web/src/app/globals.css`
- footer-ссылка в `web/src/components/Footer.tsx`
- `wiki/stories/07-prompt-injection-safety.md`

## Acceptance Criteria

- [ ] маршрут `/trust/prompt-injection-safety` доступен и рендерится
- [ ] страница обёрнута в `SiteHeader light` + `Footer`; `<ScrollFX/>` смонтирован
      после `<Footer/>`
- [ ] собраны ровно 8 секций из «Структура секций» брифа
- [ ] есть тёмный full-bleed statement (секция 3) и pinned-multi-screen слоёв
      (секция 5)
- [ ] использованы реальные факты (6 судей J-P1…J-P6, advisory AI Total Score не
      ранжирует, Function 1 без LLM, ранжирование по human Jury/Final Score) —
      без draft-заглушек
- [ ] добавлена footer-ссылка (колонка Trust); существующие ссылки не сломаны
- [ ] использованы только канонические токены/классы (нет `--wf-*` / `--sd-*`,
      новых цветов/теней/радиусов)
- [ ] чередование light/.ink; media-ph в hero и слоях секции 5
- [ ] движение через data-атрибуты + `ScrollFX`, без per-section `useEffect`
- [ ] `prefers-reduced-motion` тих (контент виден)
- [ ] `cd web && pnpm build` зелёный

## Linear Publish Plan

(заполняется, только если Linear подключён)

### Publish Mode
- [ ] Project + child issues
- [ ] Issues only

### Issues
- [ ]

## Definition of Done

- [ ] source logic зафиксирована в wiki (бриф approved)
- [ ] реализация завершена
- [ ] acceptance criteria подтверждены
- [ ] изменения отражены в relevant docs

## Open Questions

(перенесено из брифа §Открытые вопросы)
- Уровень технической детализации: доки описывают архитектурное разделение, но не
  конкретные input-sanitization-механизмы. На странице держим формулировку на
  уровне «content vs control + human final», без заявленных защит, которых нет.
- Можно ли показывать примеры реальных инъекций из внутренних прогонов —
  согласовать, чтобы не раскрывать чувствительное. Сейчас примеры обобщённые.
- Формулировка гарантий: финальный copy hero/секции 6 — из утверждённых
  маркетинг-материалов, без обещания «100% защиты».

## Change Log

- 2026-06-16 - created
