---
title: About EvalLense
status: draft
version: 0.1
updated: 2026-06-16
route: /company/about
section: company
nav_label: About
in_header_nav: false
in_footer_nav: true
cta: Book a Demo
---

# About EvalLense

← [[index|Wiki]] · [[sitemap|Карта сайта]]

Company-страница: кто стоит за EvalLense, зачем мы это строим, наши принципы и
команда. Контент предоставлен user'ом; story о пути от AI Jury согласуется с
homepage-structure / продуктовой историей.

> Продуктовый бриф страницы для skill `build-pages`. Тексты — авторские (от
> user'а), не выдумывать сверх них. Центр страницы — **креативный team-блок**
> (полноростовые портреты с именем-подложкой, заезжают/выезжают по скроллу,
> текст сбоку — референс assudamal.com/about), реализуется нашим движком
> (`<ScrollFX/>` + `data-pin`/`data-scrub`), без сторонних библиотек. Реальных
> фото команды нет → портреты как `.media-ph` (см. «Открытые вопросы»).

## Роль и аудитория

- **Роль страницы:** показать людей, миссию и принципы за продуктом — снять
  «безличность» AI-инструмента и усилить доверие через историю и команду.
- **Для кого:** организаторы (фонды, акселераторы, конкурсы), партнёры,
  потенциальные сотрудники — те, кому важно понять, кто и зачем строит EvalLense.
- **Ключевое сообщение:** «We are not building an artificial jury. We are
  building a better lens for human judgment.» AI готовит анализ — решение за
  человеком.
- **Целевое действие:** Book a Demo → `/company/contact`.

## Структура секций

| # | Секция | Архетип | Движение | Поверхность | Что показываем |
|---|---|---|---|---|---|
| 1 | Hero / миссия | statement-hero | reveal | light | «We built EvalLense to help people make better decisions» + CTA |
| 2 | Проблема | editorial-split | reveal | light | Слишком много заявок, мало времени; AI анализирует, человек решает |
| 3 | From AI Jury to EvalLense | pinned-multi-screen | pin | ink | История + конвейер deck→…→final decision; «designed to help people see more clearly» |
| 4 | Наши принципы | bento / feature-grid | reveal | light | 4 принципа (AI supports · explainable · disagreement useful · methodology > model) |
| 5 | Команда (креативный блок) | pinned team-reveal | pin + scrub | ink | Полноростовые портреты, имя-подложка, заезд/выезд, био сбоку — 3 человека |
| 6 | Для кого мы строим | horizontal-gallery | scrub | light | 7 сегментов + «a better lens for human judgment» |
| 7 | Final CTA | quiet-cta | reveal | ink | Призыв + Book a Demo |

## Контент по секциям

### 1. Hero / миссия
- **Заголовок:** We built EvalLense to help people make better decisions
- **Подзаголовок (из абзаца ниже):** EvalLense was created to make startup
  evaluation more structured, consistent and transparent. AI analyzes the
  applications, surfaces evidence and highlights risks. People make the final
  decision.
- **CTA:** Book a Demo

### 2. Проблема
Editorial-split, авторский текст:
> Every accelerator, fund, competition and innovation program faces the same
> problem: too many applications and too little time to review them properly.
>
> Strong projects get lost in the queue. Reviewers use different criteria.
> Scores are difficult to explain. Important signals are missed.

Акцент справа/визуал: поток заявок → потерянные сильные проекты.

### 3. From AI Jury to EvalLense
Pinned-multi-screen (тёмный), история по шагам:
- The first version was built as **AI Jury** during the **Amazon Nova
  hackathon**. The idea: several specialized AI judges instead of one generic
  model opinion.
- After **hundreds of internal evaluation runs**, more judges did not
  automatically produce better results — scores changed between runs, judges
  repeated each other, long reports created noise over clarity.
- That changed the direction: from a collection of AI agents → a **controlled
  evaluation system**. Конвейер (узлы загораются по скроллу):

```text
Pitch deck
→ structured analysis
→ specialized evaluation lenses
→ fixed criteria and rubrics
→ evidence-based report
→ human review
→ final decision
```

Финальный тезис секции (full-bleed акцент):
> AI Jury was designed to judge. EvalLense is designed to help people see more
> clearly.

### 4. Наши принципы
Bento / feature-grid, 4 принципа (заголовок + текст):
- **AI supports decisions. It does not own them.** EvalLense prepares the
  analysis, but the final score and ranking remain under human control.
- **Every score should be explainable.** Reviewers should understand what
  influenced the result, which evidence was used and what information was missing.
- **Disagreement is useful.** When different evaluation lenses produce different
  conclusions, the system highlights the conflict instead of hiding it inside an
  average score.
- **Methodology matters more than the model.** Reliable evaluation requires
  clear criteria, controlled roles, structured outputs and consistent scoring
  logic.

### 5. Команда — креативный блок (центр страницы)
**Дизайн (референс assudamal.com/about):** тёмная (`.ink`) pinned-секция на
несколько экранов. Sticky-сцена держит три слоя на каждого участника:
1. **Имя-подложка** — крупная типографика фамилии за спиной человека
   (`clamp(80px,16vw,220px)`, приглушённая, lens-акцент по желанию), как фон.
2. **Полноростовой портрет** — cut-out фото человека «в рост» по центру/сбоку;
   **заезжает по скроллу с одной стороны и выезжает в другую** (горизонтальный
   сдвиг через `--scrub`/`--pin-step`).
3. **Текст сбоку** — имя, роль, короткое био.

Переключение участников — по `data-pin-step` (3 шага). Реализация: `data-pin`
+ `data-pin-stage` + `data-pin-step` (как в methodology pipeline), горизонтальный
параллакс портрета — через `data-scrub`/`--pin`. **Reduced-motion:** показываем
троих как обычные editorial-блоки (портрет + имя + био), без заездов.

Участники (порядок и тексты — авторские):

**1. Yaroslav Volovoj — Product, Strategy and Methodology.**
Yaroslav leads product vision, evaluation methodology, positioning and
go-to-market. More than fourteen years of experience with startups, digital
products, business development and market-entry strategy. Focus: ensuring
EvalLense solves a real decision-making problem instead of simply generating AI
reports.

**2. Vladislav Starodubov — Engineering and Architecture.**
Vladislav leads system architecture, engineering delivery and the AI evaluation
pipeline. Background in software engineering, fintech, payment infrastructure and
complex operational systems. Focus: making EvalLense reliable, secure and ready
for repeated use at scale.

**3. Arseniy — Product Experience.**
Arseniy works on product experience and interface structure. Focus: turning
complex evaluation workflows, reports and decision signals into a clear and
understandable product for organizers and reviewers.

### 6. Для кого мы строим
Horizontal-gallery / feature-grid сегментов (из авторского списка):
accelerators · VC funds · startup competitions · hackathons · grant programs ·
corporate innovation teams · universities.

Сопроводительный текст:
> They do not need AI to choose the winner. They need a faster and more
> consistent way to understand each application, compare participants and focus
> human attention on the decisions that matter.

Финальный statement (можно тёмный full-bleed перед CTA):
> **We are not building an artificial jury. We are building a better lens for
> human judgment.**

### 7. Final CTA
- Призыв: познакомиться с продуктом и командой ближе.
- Кнопка: Book a Demo → `/company/contact`.

## Числа и факты

| Факт | Значение | Источник |
|---|---|---|
| Членов команды | 3 (Yaroslav · Vladislav · Arseniy) | About copy (provided) |
| Опыт Yaroslav | 14+ лет | About copy (provided) |
| Происхождение продукта | AI Jury · Amazon Nova hackathon | About copy / homepage-structure.md |
| Внутренних прогонов | hundreds (≈400+ в homepage-нарративе) | About copy / homepage-structure.md |
| Сегментов аудитории | 7 | About copy (provided) |
| Этапов конвейера (story) | deck → … → final decision | About copy (provided) |

## Изображения

| Слот | Где на странице | Что изображено | Промпт-набросок (стиль бренда) |
|---|---|---|---|
| hero | секция 1 | Линза, фокусирующая поток заявок в ясный сигнал | lens-градиент violet→cyan→aqua, Apple-нейтраль, calm |
| story | секция 3 | Цепочка AI Jury → Testing → Pipeline → EvalLense / конвейер | ink-поверхность, узлы вдоль lens-трека |
| portrait-yaroslav | секция 5 | Полноростовой cut-out портрет, нейтральный фон | портрет 3:4, мягкий фиолетовый rim-light, calm; имя-подложка за спиной |
| portrait-vladislav | секция 5 | Полноростовой cut-out портрет | то же, ratio 3:4 |
| portrait-arseniy | секция 5 | Полноростовой cut-out портрет | то же, ratio 3:4 |
| segments | секция 6 | Иконки-сигналы сегментов в галерее | hairline-карточки, один lens-акцент |

Портреты — `.media-ph` (ratio `3/4`) до реальных фото; полные промпты в шапке
`page.tsx`.

## Внутренние ссылки

- **Header/Footer nav:** добавить пункт `About` → `/company/about` (footer-секция
  COMPANY, см. [[sitemap|Карта сайта]]).
- **Cross-links со страницы:**
  - [[sitemap|Methodology]] — научная методология оценки
  - [[sitemap|Product Overview]] — что делает продукт
  - блог-статья «From AI Jury to EvalLense» (`/blog`) — расширенная история

## SEO / meta

- **`<title>`:** About EvalLense — A Better Lens for Human Judgment
- **meta description:** Кто и зачем строит EvalLense: путь от AI Jury к
  controlled evaluation system, наши принципы и команда. AI готовит анализ —
  решение принимает человек. *(≤155)*
- **OG-изображение:** слот `hero`

## Источники истины

### Wiki (landing)
- [[vision|Vision]] — зачем продукт и в чём ценность
- [[sitemap|Карта сайта]] — Company → About
- [[design-system|Design System]] — pinned, editorial-split, bento, horizontal-gallery
- [[page-design-patterns|Page Design Patterns]] — pinned multi-screen, scrub, ритм

### Notes / Chat
- Контент About (миссия, story, принципы, био команды, сегменты) и идея
  креативного team-блока (assudamal.com/about) — предоставлены user'ом в диалоге.

### Application (`ai-jury-prod`)
- `wiki/product/site/homepage-structure.md` — продуктовая история, 400+ прогонов,
  Amazon Nova

## Acceptance (что считать готовым)

- [ ] страница доступна по `/company/about`, обёрнута в `SiteHeader` + `Footer`
- [ ] все 7 секций из «Структура секций» собраны
- [ ] **креативный team-блок** (секция 5): pinned-сцена, 3 участника, портреты
      заезжают/выезжают по скроллу, имя-подложка, био сбоку; reduced-motion —
      статичные editorial-блоки, контент виден
- [ ] есть pinned-multi-screen (секции 3 и 5) + горизонтальная галерея (секция 6)
- [ ] портреты команды — `.media-ph` 3:4 с промптами; добавлена ссылка в footer-nav (COMPANY)
- [ ] только токены/классы из [[design-system|Design System]]; движение через
      data-атрибуты + `<ScrollFX/>`, без useEffect
- [ ] `cd web && pnpm build` зелёный; `prefers-reduced-motion` уважается

## Открытые вопросы

- **Фото команды** — нужны реальные полноростовые cut-out портреты (3:4) для
  креативного блока; пока `.media-ph`.
- **Фамилия Arseniy** — в тексте только имя; уточнить, показывать ли фамилию.
- **«hundreds» vs «400+»** — в About-копии «hundreds of runs», в homepage-нарративе
  «400+»; выбрать единую формулировку (по умолчанию оставляю авторское «hundreds»).
- **Контакт CTA** — Book a Demo ведёт на `/company/contact` (страница ещё не
  собрана); до неё — временно `/#demo` или якорь.
- **Соцсети / careers-ссылки** на About — нужны ли (есть `@evallense` в TikTok/YouTube).
