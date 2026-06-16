---
title: CTA Band
status: generated
version: 1.0
updated: 2026-06-16
source: фактический код — web/src/components/sections/CtaBand.tsx + web/src/app/globals.css (блок «reusable CTA band»)
---

# CTA Band

← [[index|Wiki]]

Переиспользуемый call-to-action блок — финальный «закрывающий» экран. Один
компонент и для главной (тёмный, с видеофоном), и для внутренних страниц
(светлый/тёмный, с CSS-анимацией). Заголовок + подзаголовок + одна или две
кнопки поверх «живого» фона, который опционально может заходить на футер снизу.
Этот документ — опорный референс: какие пропы передавать и как переиспользовать.

## Где лежит и где подключён

- Компонент: [web/src/components/sections/CtaBand.tsx](web/src/components/sections/CtaBand.tsx)
  (Server Component, без `"use client"` — фон чисто на CSS/`<video>`).
- Стили: [web/src/app/globals.css](web/src/app/globals.css), блок
  `/* ---------- reusable CTA band (CtaBand.tsx) ---------- */`.
- Видеоассеты: `web/public/assets/cta/`.
- Подключён: на главной ([web/src/app/page.tsx](web/src/app/page.tsx)) последним
  блоком перед `<Footer variant="dark" />`. Готов к переиспользованию на
  внутренних страницах.

## Пропы

```tsx
<CtaBand
  title="See your next cohort"
  titleAccent="ranked in a day"          // хвост заголовка в фирменном градиенте
  sub="Batch-review every pitch deck…"   // ReactNode
  primary={{ label: "Book a demo", href: "/#demo" }}
  secondary={{ label: "Try live demo", href: "/try-live-demo" }}
  theme="dark"                            // "dark" | "light" (дефолт light)
  bleed                                   // фон заходит на футер снизу
  videoSrc="/assets/cta/cta-bg.mp4"       // фон-видео; без него играет CSS-анора
  videoPoster="/assets/cta/cta-bg.jpg"    // постер до загрузки видео
/>
```

| Проп | Тип | По умолчанию | Назначение |
|---|---|---|---|
| `title` | `string` | — (обязательный) | Простая часть заголовка |
| `titleAccent` | `string` | — | Хвост заголовка, рендерится в градиенте `--lens` |
| `sub` | `ReactNode` | — | Абзац-подзаголовок под заголовком |
| `eyebrow` | `string` | — | Моно-надпись над заголовком (с точкой-дотом) |
| `primary` | `CtaLink` | — (обязательный) | Главная (filled) кнопка, всегда со стрелкой |
| `secondary` | `CtaLink` | — | Вторая (outline/glass) кнопка — опционально |
| `theme` | `"dark" \| "light"` | `"light"` | Поверхность: `--bg-ink` / `--bg-soft` |
| `bleed` | `boolean` | `false` | Фон выходит за низ секции и накладывается на футер |
| `videoSrc` | `string` | — | Если задан — видеофон вместо CSS-аноры |
| `videoPoster` | `string` | — | Постер для `<video>` |

`CtaLink = { label: string; href: string; variant?: ButtonVariant }`.

### Кнопки — одна или две, тип по теме

Кнопки рендерятся через переиспользуемый
[Button](web/src/components/ui/Button.tsx). Вариант подбирается **по теме**, но
его можно переопределить через `variant` в самом `CtaLink`:

| | `primary` | `secondary` |
|---|---|---|
| `theme="dark"` | `gradient` | `glass` |
| `theme="light"` | `primary` | `ghost` |

- **Одна кнопка** — просто не передавать `secondary`.
- **Стекло** (`glass`) рендерит общий «liquid glass» материал (как в Hero и
  футере) — это требование дизайн-системы, см. [[design-system|Design System]] и
  правило в `CLAUDE.md`. Селектор `.cta-band .btn-glass` входит в общую
  multi-selector группу в `globals.css` — не стилизовать стекло локально.
- Размер: `primary`/`secondary` приведены к «hero-размеру» (`min-height:56px`,
  `17px`) через `.cta-band__actions .btn-gradient` и базовую glass-группу, чтобы
  обе кнопки были одной высоты.

## Фон: CSS-анимация **или** видео

Один слой `.cta-band__aurora` (`position:absolute; inset:0`), который держит оба
режима. Выбор — наличие `videoSrc`:

- **Нет `videoSrc` → CSS-анора.** Три радиальных «огня» (`--bloom--core` violet,
  `--left` cyan, `--right` lavender), `mix-blend:screen` на тёмной. Каждый
  блуждает своей петлёй (`@keyframes cta-bloom-*`, рассинхрон 9 / 8 / 11с —
  темп подогнан под оранжевую анимацию OrangeGlow между 2-м и 3-м экранами),
  плюс общий «вдох» поля (`cta-aurora-breathe`, 7.5с).
- **Есть `videoSrc` → `<video autoplay muted loop playsInline>`** с тем же
  `opacity:.5`/`mix-blend:screen`. CSS-огни не рендерятся.

### Feather по краям (маска)

`.cta-band__aurora` несёт `mask-image` (два linear-gradient + `mask-composite`),
который растворяет фон **до границ секции** — чтобы радиальные градиенты/видео не
обрезались жёсткой полоской. Низ замаскирован мягче всех, поэтому на `bleed` фон
плавно втекает в футер. Маска работает и для аноры, и для видео.

### Затемняющий скрим (только видео)

При видео включается `.cta-band__aurora:has(.cta-band__video)::after` —
вертикальный градиент: сильное затемнение у **верхней** кромки (`rgba(0,0,0,.88)`,
видео растворяется в тёмной секции выше) → светлее к середине → снова темнее к
низу (для слияния с футером). Для CSS-аноры скрим не нужен (огни читаются сами).

## Заход на футер — `bleed`

При `bleed` вся секция композитится с `z-index:1`, поверх позиционированного
футера (`z-index:auto`), а `.cta-band__aurora` опускает низ на `--cta-bleed`
(дефолт `96px`) ниже секции. Так свечение накрывает верхнюю кромку футера, но сам
футер остаётся кликабельным (анора — `pointer-events:none`). Глубину крутить одной
переменной `--cta-bleed`. Использовать только когда CTA — последний блок перед
тёмным футером (как на главной); оба чёрные (`--bg-ink`) → шва не видно.

## Доступность и движение

- Вся анимация (огни + «вдох») выключается при `prefers-reduced-motion: reduce`.
- Фон целиком `aria-hidden`; видео `muted`/`playsInline` (автоплей без звука).
- Текст поднят над фоном через `.cta-band__inner { z-index:1 }`.

## Как переиспользовать дальше

1. Импортировать `CtaBand` на нужной странице.
2. Светлая внутренняя страница: `theme` опустить (дефолт light), `bleed` не
   ставить (если под ней светлый футер). Тёмная — `theme="dark"`.
3. Дать `title` (+ `titleAccent`), `sub`, `primary` и при необходимости
   `secondary`.
4. Фон: оставить пустым (CSS-анора) либо дать `videoSrc` (+ `videoPoster`).
5. Заход на футер включать только если CTA реально стоит вплотную над футером.

## Связанное

- [[design-system|Design System]] — токены, кнопки, общий «liquid glass»
- [[footer|Footer]] — блок под CTA; `bleed` рассчитан на тёмный футер
- [[page-design-patterns|Page Design Patterns]] — паттерны страниц
- [[system|System]] — общая архитектура
