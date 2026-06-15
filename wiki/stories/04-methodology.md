---
status: draft
version: 0.1
updated: 2026-06-15
linear_project:
linear_parent_issue:
linear_issues:
---

# Story 04 - Methodology page (/trust/methodology)

Status: Draft
Owner:
Team:
Priority:
Linear Mapping: Project by default

> Frontmatter (используется, только если Linear подключён):
> - `linear_project:` — ID существующего Linear Project. При публикации `/linear-publish` child Issues создаются внутри него.
> - `linear_parent_issue:` — ID parent issue («зонтик» story).
> - `linear_issues:` — список ID привязанных Issues. Если заданы — `/story-draft` двигает их `Backlog → Todo`, `/implement-story` двигает по фазам. Если пусто — `/linear-publish` создаёт новые, и пользователь вписывает возвращённые ID.
> Если Linear не подключён — поля остаются пустыми, story-файл сам служит трекингом.
>
> Linear в этом проекте **не подключён** (см. `PROJECT-ENTRYPOINT.md`), поэтому Linear-поля пустые, секция «Linear Publish Plan» неактивна, трекингом служит этот файл.

## Summary

Коротко:
- что меняем — добавляем новую внутреннюю trust-страницу `/trust/methodology` из 8 секций, которая объясняет научную методологию оценки EvalLense (criteria-based evaluation, роли AI-судей, scoring model, rubric, human-in-the-loop), и правим одну footer-ссылку.
- зачем меняем — у раздела Trust в footer ссылка «Methodology» сейчас ведёт на якорь `/#trust` на главной; отдельной страницы методологии нет, хотя бриф её требует. Аудитории (инвесторы / фонды / акселераторы) важно понимать *как* получается оценка, а не только число.
- ожидаемый эффект — появляется отдельный URL `/trust/methodology` с цельным изложением методологии; footer ведёт на него; страница построена только на канонических токенах/классах дизайн-системы и собирается зелёным `pnpm build`.

## Problem

Какую проблему решает эта story:
- текущая боль — нет страницы, объясняющей методологию оценки; оценка выглядит как «чёрный ящик» для целевой аудитории.
- текущий разрыв в flow — footer-ссылка «Methodology» (колонка TRUST) ведёт на `/#trust` (якорь на главной), а не на посвящённую страницу; пользователь не получает развёрнутого объяснения.
- почему это важно сейчас — это часть batch-режима `build-pages`: страницы trust-раздела собираются по продуктовым брифам; бриф `wiki/product/methodology.md` уже зафиксирован и готов к реализации.

## Goal

Что должно стать правдой после завершения story:
- по маршруту `/trust/methodology` доступна светлая контентная страница из 8 секций, обёрнутая в `SiteHeader` + `Footer`.
- footer-ссылка «Methodology» в колонке TRUST ведёт на `/trust/methodology`.
- страница использует только канонические токены и глобальные drop-in классы дизайн-системы; не вводит новых цветов/теней/радиусов и не использует scoped-токены `--wf-*` / `--sd-*`.
- блоки, не являющиеся drop-in (pipeline, scoring+ring, human-in-the-loop), реализованы собственной методологической разметкой на канонических токенах, без копирования scoped-CSS и без правок `#workflow` / `#decisions`.
- `cd web && pnpm build` зелёный; анимации уважают `prefers-reduced-motion`.

## Scope

### In scope
- Новый Server Component страницы по паттерну `web/src/app/bento/page.tsx`: `web/src/app/trust/methodology/page.tsx` с `export const metadata` (title + description из брифа §SEO/meta).
- Подключение chrome (SiteHeader + Footer) в самой странице (root layout их не содержит).
- Светлый hero: либо форсить состояние `.is-light` у прозрачного `SiteHeader` над тёмным hero, либо собрать собственный светлый hero так, чтобы шапка оставалась читаемой (выбор — Open question P-header).
- 8 секций из брифа §Структура секций: Hero, Принципы оценки, Конвейер оценки, Роли судей, Scoring model, Rubric system, Human-in-the-loop, Final CTA.
- Drop-in секции (Принципы, Роли судей, Rubric, Final CTA) — на глобальных классах: `.band`/`.band.soft`/`.band.ink`, `.wrap`, `.head`/`.title`/`.sub`, `.eyebrow`+`.dot`, `.chip`+`.tick`, `.tcard`/`.trust-grid`/`.tcard.big`, `.mini-tag`, `.btn*`, `.sect-cta`, `.grad-word`/`.grad`, `.cta-row`.
- Не-drop-in блоки (секция 3 pipeline, секция 5 scoring+confidence ring, секция 7 human-in-the-loop) — собственная разметка под обёрткой `.methodology` со своими страничными классами на канонических токенах `:root` (`--violet`, `--lens`, `--green`, `--amber`, `--hairline`).
- Аккуратные дополнения в `web/src/app/globals.css` (дерево уже modified — не клобберить существующие правки) для страничных классов `.methodology*`.
- Правка `web/src/components/Footer.tsx`: TRUST-колонка, ссылка «Methodology» — заменить `href="/#trust"` на `/trust/methodology`.
- 2 слота изображений (hero-линза, pipeline-диаграмма) — плейсхолдеры в канонических токенах + зафиксированные промпты из брифа §Изображения (генератор изображений не подключён).
- SEO/meta из брифа.

### Out of scope
- Генерация реальных ассетов изображений (нет подключённого генератора) — только плейсхолдеры + промпты.
- Изменения `SiteHeader` сверх того, что нужно для светлого состояния страницы; пункт в header-nav не добавляем (`in_header_nav: false`).
- Любые правки scoped-CSS `#workflow` / `#decisions` и их токенов `--wf-*` / `--sd-*`.
- Новые цвета / тени / радиусы / шрифты вне канонических токенов.
- Контент cross-link страниц (Consistency & Reliability, Prompt Injection Safety, Security & Privacy) — они отдельные страницы своих story; здесь только ссылки на них, если их маршруты существуют (иначе Open question).
- Заполнение незафиксированного контента (формула scoring, расшифровка P1–P6, уровни rubric, описания шагов конвейера, публичные цифры) — выносится в Open questions, не выдумывается.
- Публикация в Linear (Linear не подключён).

## Users / Actors

- primary user: инвестор / фонд / акселератор / корпоративная команда оценки — читатель, которому важно понять *как* строится оценка и почему ей можно доверять.
- system actor: Next.js App Router (Server Component рендерит страницу с `metadata`); `SiteHeader` и `Footer` как chrome-компоненты; `ScrollOrchestrator` — единый rAF-цикл, если для анимаций (зажигание узлов pipeline, confidence ring) нужна общая логика скролла.

## Source of Truth

### Wiki
- [[wiki/product/methodology.md]] — продуктовый бриф страницы: роль/аудитория, 8 секций, тексты, числа, изображения, nav, SEO, acceptance, открытые вопросы (главный источник).
- [[wiki/product/vision]] — AI-жюри + human-in-the-loop, explainable-отчёты.
- [[wiki/product/scope]] — границы первой версии сайта.
- [[wiki/product/sitemap]] — Methodology: criteria-based / judge roles / scoring / rubric, footer-секция TRUST.
- [[wiki/product/design-system]] — принципы, pipeline-status, score+confidence ring, human-in-the-loop footer, токены и блоки.

### Notes
- (не зафиксировано) — отдельной notes-записи под эту story нет.

### Chat / Working Context
- Задача поставлена в batch-режиме skill `build-pages`. Технический контекст реализации (page-паттерн, drop-in vs scoped классы, риск `--wf-*`/`--sd-*`, footer-правка, грязное дерево `globals.css`) получен от `repo-reader` и отражён в Scope / Technical Impact / Business Rules / Edge Cases.

## Main Flow

1. Пользователь открывает `/trust/methodology` (прямой переход или клик по footer-ссылке «Methodology» в колонке TRUST).
2. Server Component рендерит страницу с `metadata` (title/description из брифа) и chrome: `SiteHeader` сверху, `Footer` снизу.
3. Пользователь видит светлый hero (секция 1): заголовок «A scientific methodology for evaluating pitch decks», подзаголовок, CTA «Book a Demo», плейсхолдер hero-линзы.
4. Скролл вниз — секция 2 «Принципы оценки»: три принципа (criteria-based · evidence over opinion · AI prepares, humans decide) на drop-in trust-chips / feature-grid.
5. Секция 3 «Конвейер оценки»: горизонтальный трек узлов Decode → Judges → Summarize → Score → Report (собственная разметка, узлы зажигаются по скроллу при наличии анимации; плейсхолдер pipeline-диаграммы).
6. Секция 4 «Роли судей»: AI-жюри из нескольких судей по критериям P1–P6 (drop-in feature-grid / bento).
7. Секция 5 «Scoring model»: score, привязанный к evidence, + confidence ring (собственная разметка).
8. Секция 6 «Rubric system»: единый rubric — критерии и уровни (drop-in).
9. Секция 7 «Human-in-the-loop»: advisory от AI → финальное решение человека, audit-строка (собственная разметка).
10. Секция 8 «Final CTA»: призыв + кнопка «Book a Demo» (drop-in cta-band).

## Business Rules

- Страница — Server Component с `export const metadata`; chrome (SiteHeader/Footer) подключается в самой странице, root layout их не содержит (паттерн `bento/page.tsx`).
- Footer-ссылка «Methodology» в колонке TRUST ведёт на `/trust/methodology` (это единственная разрешённая правка nav; header не трогаем — `in_header_nav: false`).
- Только канонические токены `:root` (`--violet`, `--lens`, `--green`, `--amber`, `--hairline` и прочие существующие) и существующие глобальные классы. Запрещено вводить новые цвета/тени/радиусы и использовать scoped-токены `--wf-*` / `--sd-*` в новом коде.
- Drop-in глобальные классы используются как есть; не-drop-in блоки (pipeline, scoring+ring, human-in-the-loop) реализуются СВОИМИ страничными классами под обёрткой `.methodology` — без копирования scoped-CSS `#workflow`/`#decisions` и без правок этих секций.
- Незафиксированный контент (формула scoring/confidence, расшифровка P1–P6, уровни rubric, описания шагов конвейера, публичные цифры, hero tagline) не выдумывается — на странице используются черновые формулировки из брифа с пометкой и переносом в Open questions; числовые слоты остаются «—», пока не утверждены.
- Изображения — плейсхолдеры в канонических токенах; промпты фиксируются в коде/доке, но реальные ассеты не генерируются.

## Edge Cases

- `globals.css` уже в статусе modified (грязное дерево) — новые `.methodology*` правила добавлять аккуратно в конец/соответствующую секцию, не затирая текущие незакоммиченные изменения.
- Светлый hero под прозрачным `SiteHeader`: если состояние `.is-light` не форсится корректно, светлый текст шапки сольётся со светлым hero и станет нечитаемым — нужно явно решить (форс `.is-light` либо собственный светлый hero).
- `prefers-reduced-motion: reduce` — анимации зажигания узлов pipeline и confidence ring должны отключаться/быть статичными; узлы и ring отображаются в финальном (полном) состоянии без движения.
- Если cross-link маршруты (Consistency & Reliability, Prompt Injection Safety, Security & Privacy) ещё не существуют — ссылки либо ведут на существующий якорь/заглушку, либо помечаются как Open question, чтобы не плодить битые ссылки.
- Числовые слоты («Критериев оценки», «AI-судей») без утверждённых значений — на странице не показывать выдуманные числа; либо скрыть метрику, либо показать «—» (выбор — Open question).
- Узлы pipeline / score / ring не должны наследовать scoped-стили `#workflow`/`#decisions`: проверить, что собственные классы изолированы и не пересекаются по селекторам.

## Technical Impact

Какие зоны затрагиваются:
- frontend:
  - новый файл `web/src/app/trust/methodology/page.tsx` (Server Component, `metadata`, chrome SiteHeader+Footer, 8 секций; обёртка `.methodology`).
  - правка `web/src/components/Footer.tsx` — href ссылки «Methodology» в колонке TRUST.
  - дополнения в `web/src/app/globals.css` — страничные классы `.methodology*` для не-drop-in блоков (pipeline, scoring+ring, human-in-the-loop) на канонических токенах.
  - возможное переиспользование/доработка `SiteHeader` для светлого состояния (форс `.is-light`) — без расширения функциональности.
  - если для зажигания узлов/ring нужна общая scroll-логика — расширить `web/src/components/ScrollOrchestrator.tsx` (единый rAF-цикл), не вводя per-section `useEffect`.
- backend: нет (сайт — статика, БД/API не задействованы).
- database: нет.
- infrastructure: нет (целевая платформа Vercel; новый статический маршрут).

## Dependencies

### Depends on
- Бриф [[wiki/product/methodology.md]] — источник контента и acceptance.
- Существующие глобальные drop-in классы и канонические токены в `globals.css` ([[wiki/product/design-system]]).
- Паттерн страницы `web/src/app/bento/page.tsx` и компоненты `SiteHeader` / `Footer`.

### Blocks
- Финальная заливка контента блокируется Open questions (формула scoring, P1–P6, уровни rubric, описания шагов конвейера, публичные цифры, hero tagline) — реализация может идти с черновыми формулировками, но «полная» приёмка контента ждёт утверждённых данных.

## Deliverables

- `web/src/app/trust/methodology/page.tsx` — страница из 8 секций с `metadata`, обёрнутая в SiteHeader + Footer.
- Дополнения `.methodology*` в `web/src/app/globals.css` для не-drop-in блоков на канонических токенах.
- Правка `web/src/components/Footer.tsx` — ссылка «Methodology» → `/trust/methodology`.
- Плейсхолдеры 2 изображений + зафиксированные промпты (в коде/комментариях по брифу §Изображения).
- Зелёный `cd web && pnpm build`.

## Acceptance Criteria

- [ ] Страница открывается по маршруту `/trust/methodology` и рендерится без ошибок.
- [ ] Реализованы все 8 секций из брифа §Структура секций: Hero, Принципы оценки, Конвейер оценки, Роли судей, Scoring model, Rubric system, Human-in-the-loop, Final CTA — в этом порядке.
- [ ] Страница обёрнута в `SiteHeader` (сверху) и `Footer` (снизу); шапка читаема над светлым hero (состояние `.is-light` или собственный светлый hero).
- [ ] В `web/src/components/Footer.tsx` ссылка «Methodology» (колонка TRUST) ведёт на `/trust/methodology` (а не на `/#trust`).
- [ ] В новом коде страницы и в добавленных CSS-правилах нет новых цветов / теней / радиусов и нет использования токенов `--wf-*` / `--sd-*` — только канонические токены `:root` (`--violet`, `--lens`, `--green`, `--amber`, `--hairline` и существующие) и существующие глобальные классы.
- [ ] Не-drop-in блоки (секция 3 pipeline, секция 5 scoring+ring, секция 7 human-in-the-loop) реализованы СВОИМИ страничными классами под обёрткой `.methodology`; scoped-CSS `#workflow`/`#decisions` не копировался и эти секции не правились (diff не затрагивает селекторы `#workflow`/`#decisions`).
- [ ] Drop-in секции используют существующие глобальные классы (`.band`/`.wrap`/`.head`/`.title`/`.sub`/`.eyebrow`/`.chip`/`.tcard`/`.trust-grid`/`.mini-tag`/`.btn*`/`.sect-cta`/`.grad-word`/`.cta-row`) без дублирования их CSS.
- [ ] Оба слота изображений (hero-линза, pipeline-диаграмма) реализованы как плейсхолдер в канонических токенах; промпты из брифа §Изображения зафиксированы рядом (комментарий/доступное место).
- [ ] `export const metadata` содержит `title` = «EvalLense Methodology — How AI Jury Evaluates Pitch Decks» и `description` из брифа (≤155 символов).
- [ ] При `prefers-reduced-motion: reduce` анимации (зажигание узлов pipeline, confidence ring) отключены/статичны; контент отображается в финальном состоянии.
- [ ] `cd web && pnpm build` завершается без ошибок (зелёный).
- [ ] Незафиксированный контент (формула scoring, расшифровка P1–P6, уровни rubric, описания шагов конвейера, публичные цифры, hero tagline) не выдуман: использованы черновые формулировки брифа, числовые слоты не содержат вымышленных значений.

## Linear Publish Plan

(заполняется, только если Linear подключён)

Linear в проекте **не подключён** — секция неактивна, публикация не выполняется, трекинг живёт в этом story-файле.

### Publish Mode
- [ ] Project + child issues
- [ ] Issues only

### Issues
- [ ] (n/a — Linear не подключён)

## Definition of Done

- [ ] source logic зафиксирована в wiki (бриф [[wiki/product/methodology.md]] + эта story)
- [ ] реализация завершена
- [ ] acceptance criteria подтверждены
- [ ] изменения отражены в relevant docs

## Change Log

- 2026-06-15 - created
