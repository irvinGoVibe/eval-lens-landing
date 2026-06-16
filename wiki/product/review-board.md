---
title: Review Board
status: approved
version: 1
updated: 2026-06-16
route: /product/review-board
section: product
nav_label: Review Board
in_header_nav: false
in_footer_nav: true
cta: Book a Demo
---

# Review Board

← [[index|Wiki]] · [[sitemap|Карта сайта]]

Product-страница: объясняет рабочую доску, где команда сравнивает оценённые
стартапы, строит shortlist и принимает финальные решения — после AI-оценки.

> Продуктовый бриф страницы для skill `build-pages`. Факты — из Application-доков
> `ai-jury-prod` (`wiki/product/human-in-the-loop.md`, `user-flow.md` §10–12,
> `scope.md` §6/§8, `report.md` §12, `governance-framework.md`). MVP — один
> организатор; multi-organizer/blind/deliberation — post-MVP. Чего нет — в
> «Открытые вопросы».

## Роль и аудитория

- **Роль страницы:** показать Review Board как **decision workspace** — где
  человек сравнивает результаты, применяет суждение и принимает финальное решение
  после AI-оценки.
- **Для кого:** review-команды и program owners, которым нужно перейти от
  отдельных отчётов к batch-level решениям.
- **Ключевое сообщение:** AI готовит анализ — команда сравнивает результаты,
  применяет суждение и принимает финальное решение. Человек владеет итогом.
- **Целевое действие:** Book a Demo → `/company/contact`.

## Структура секций

| # | Секция | Архетип | Движение | Поверхность | Что показываем |
|---|---|---|---|---|---|
| 1 | Hero | statement-hero | reveal | light | «Where AI analysis becomes a human decision» + lens-акцент + CTA |
| 2 | Зачем команде доска | editorial-split | reveal | light | Много отчётов трудно сравнивать вручную; решения нужно фиксировать |
| 3 | Что на доске | bento | reveal | ink | Startup list · scores · judge summaries · status · comparison · leaderboard |
| 4 | Human-in-the-loop | pinned-multi-screen | pin | light | AI report → live Q&A → Jury Score (0–10) → Leaderboard |
| 5 | Сравнение и leaderboard | editorial-split | reveal | ink | Сравнение side-by-side, сортировка, shortlist, ранжирование по Final Score |
| 6 | Decision trail | full-bleed-statement | reveal | light | AI score + human score видимы вместе → объяснимость решения |
| 7 | Final CTA | quiet-cta | reveal | ink | Призыв + Book a Demo |

## Контент по секциям

### 1. Hero
- **Заголовок:** Where AI analysis becomes a human decision
- **Подзаголовок:** Сравнивайте оценённые стартапы, изучайте evidence, стройте
  shortlist — и держите финальное решение за человеком. *(черновик)*
- **CTA:** Book a Demo

### 2. Зачем команде доска
После того как сгенерированы оценки, появляется операционная боль (из raw-брифа):
- много отчётов трудно сравнивать вручную;
- баллам нужен контекст;
- ревьюерам нужен один общий вид;
- финальные решения нужно фиксировать и уметь объяснить позже.

### 3. Что на доске
Review Board сводит участников проекта в один вид (из `user-flow.md` §10,
`scope.md` §6/§8), bento:
- **Startup list** со статусами (`AI Report Ready` / `In Review` / `Scored` /
  `Not Scored` / `Error`);
- **AI Total Score** (advisory) и judge summaries;
- **comparison view** и **leaderboard**;
- **shortlist state** и **final decision state**.

### 4. Human-in-the-loop
EvalLense **не финализирует результат автоматически** (из `human-in-the-loop.md`,
`governance-framework.md`), узлы загораются по скроллу:
1. Организатор открывает **Participant Report** и изучает AI-анализ.
2. Использует **Questions for Participants** в live Q&A.
3. Выставляет **Jury Score** по P1–P6 (шкала **0.0–10.0**), видит **Δ** между AI
   и human score.
4. Генерирует **Leaderboard** — ранжирование по human `Final Score`.
AI готовит — **человек финализирует**.

### 5. Сравнение и leaderboard
От отдельных отчётов к batch-level решению (из raw-брифа, `scope.md` §8):
- сравнить стартапы **side by side**;
- отсортировать по score или измерению;
- выделить сильнейших кандидатов;
- заметить нестабильные / borderline кейсы (через spread судей);
- собрать **shortlist**.
**Leaderboard** ранжирует по `Final Score` (веса критериев применены к Jury
Score); `AI Total Score` показан **справочно**, не ранжирует.

### 6. Decision trail
Один тезис на весь экран: **AI score и human score видны вместе.** Они не
затирают друг друга — `AI Total Score` остаётся advisory-baseline, `Jury Score`
становится финальным. Это сохраняет обоснование и делает выбор **объяснимым позже**.

### 7. Final CTA
- Призыв: увидеть, как доска ведёт от анализа к решению.
- Кнопка: Book a Demo.

## Числа и факты

| Факт | Значение | Источник |
|---|---|---|
| Шкала Jury Score | 0.0–10.0 per dimension | human-in-the-loop.md §9 |
| Измерений | 6 (P1–P6) | report.md §5 |
| Ранжирование | по human Final Score, не по AI | governance-framework.md / scope.md AC8.1 |
| Статусы участника | 5 (AI Report Ready / In Review / Scored / Not Scored / Error) | report.md §13.1 |
| Роль AI Total Score | advisory baseline | human-in-the-loop.md §7 |
| Audit trail | AI score + Jury score видимы вместе | governance-framework.md |
| Организаторов на проект (MVP) | 1 | scope.md §1 |
| Spread-сигнал расхождения | `<1.5` / `1.5–2.99` / `≥3.0` | reliability-framework.md |

## Изображения

| Слот | Где на странице | Что изображено | Промпт-набросок (стиль бренда) |
|---|---|---|---|
| hero | секция 1 | Доска карточек стартапов, одна поднимается в shortlist под человеческим решением | lens-градиент violet→cyan→aqua, Apple-нейтраль, calm |
| board | секция 3 | Bento: список стартапов, scores, comparison, leaderboard | реалистичные UI-тайлы, hairline-рамки, один lens-акцент |
| hitl | секция 4 | Трек: AI report → Q&A → Jury Score slider → Leaderboard; AI-green как human-approval | те же токены, узлы загораются вдоль трека |

## Внутренние ссылки

- **Header/Footer nav:** добавить пункт `Review Board` → `/product/review-board`
  (footer-секция PRODUCT, см. [[sitemap|Карта сайта]]).
- **Cross-links со страницы:**
  - [[sitemap|Evidence-Based Reports]] — что внутри отчёта, который сравнивают
  - [[sitemap|Methodology]] — human-in-the-loop и scoring model
  - [[sitemap|Consistency & Reliability]] — spread и borderline-кейсы

## SEO / meta

- **`<title>`:** EvalLense Review Board — Compare, Shortlist, Decide
- **meta description:** Review Board — decision workspace EvalLense: сравнение
  оценённых стартапов, human Jury Score, leaderboard по Final Score и decision
  trail — финальное решение за человеком. *(≤155)*
- **OG-изображение:** слот `hero`

## Источники истины

### Wiki (landing)
- [[vision|Vision]] — AI-жюри + human-in-the-loop
- [[sitemap|Карта сайта]] — Review Board (human review, comparison, leaderboard)
- [[design-system|Design System]] — bento, pinned, full-bleed-statement, HITL footer

### Application (`ai-jury-prod`)
- `wiki/product/human-in-the-loop.md` — Jury Score, Live Jury Voting, Leaderboard
- `wiki/product/user-flow.md` §10–12 — Jury Review, Leaderboard, read-only
- `wiki/product/scope.md` §6/§8 — Jury Review AC, Leaderboard AC
- `product/website/methodology/governance-framework.md` — score ownership, audit trail

## Acceptance (что считать готовым)

- [ ] страница доступна по `/product/review-board`, обёрнута в `SiteHeader` + `Footer`
- [ ] все 7 секций из «Структура секций» собраны
- [ ] есть pinned-multi-screen HITL (секция 4) и тёмный/светлый statement (секция 6)
- [ ] добавлена ссылка в footer-nav (PRODUCT)
- [ ] только токены/классы из [[design-system|Design System]]
- [ ] `cd web && pnpm build` зелёный; `prefers-reduced-motion` уважается

## Открытые вопросы

- **Multi-organizer / blind voting / deliberation mode** — post-MVP; не обещать.
- **Compare-with-#1 и WINNER/TOP-3 бейджи** — в UI MVP не выводятся (scope.md
  AC8.7); подавать сравнение без этих ярлыков.
- **Разлочка/версионирование leaderboard** — post-MVP.
- **Публичные ссылки на отчёты** для участников — post-MVP.
