---
title: Footer
status: generated
version: 1.0
updated: 2026-06-16
source: фактический код — web/src/components/Footer.tsx + web/src/app/globals.css (блок «footer»)
---

# Footer

← [[index|Wiki]]

Подвал сайта — общий chrome-компонент на всех страницах. Один компонент с двумя
вариантами оформления (светлый / тёмный), переиспользуемой кнопкой и блоком
соцсетей. Этот документ — опорный референс: как устроен, какие переменные крутить,
где что лежит.

## Где лежит и где подключён

- Компонент: [web/src/components/Footer.tsx](web/src/components/Footer.tsx).
- Стили: [web/src/app/globals.css](web/src/app/globals.css), блок `/* ---------- footer ---------- */`
  (светлый) и `/* dark footer variant */` (тёмный).
- Подключён на всех страницах: `page.tsx`, `not-found.tsx`, `sitemap`, blog
  `layout.tsx`, `LegalDoc`, все `product/*`, `trust/*`, `company/*`.

## Варианты: `variant="light" | "dark"`

```tsx
<Footer />               // light — дефолт, на --bg-soft
<Footer variant="dark" /> // dark — на ink→violet, сейчас на главной (page.tsx)
```

Тёмный вешает класс `foot is-dark`. Выбор варианта — решение страницы (проп при
монтировании), а не автоопределение.

| | Светлый | Тёмный |
|---|---|---|
| Фон | `--bg-soft` | `linear-gradient(180deg,#060509,#0b0916 52%,#160d2e)` |
| Верхняя граница | hairline `--border` | нет (`border-top:0`) — втекает из блока выше |
| Текст / ссылки | `--muted` → hover `--violet` | `--muted-on-dark` → hover `--fg-on-dark` |
| Кнопки | `primary` + `ghost` | `gradient` + `glass` |
| Свечение снизу | нет | катящаяся фиолетовая подсветка (см. ниже) |

## Раскладка («right-grouped»)

Всё содержимое — внутри `.inner` (capped `--maxw`, центрировано). Сетка `.wrap`:
`minmax(280px,1fr) auto` — бренд-колонка заполняет левую часть, три
навигационные колонки сидят плотным `.nav-cluster` (`repeat(3,max-content)`,
`gap:60px`) у правого края, вровень с легал-рядом.

```
.inner (max-width --maxw)
├─ .wrap                       grid: [brand 1fr] [nav-cluster auto]
│  ├─ .col.col--brand          логотип + описание + .ctas (2 кнопки)
│  └─ .nav-cluster             Product · Trust · Company (<nav> со ссылками)
└─ .legal                      © + технические ссылки (слева) · соцсети (справа)
```

Адаптив: ≤860px — бренд сверху, кластер в 2 колонки; ≤480px — одна колонка.

### Колонки навигации

Берутся из карты сайта — только реальные (ready) страницы; см. [[sitemap|Карта сайта]].
В колонке **Product** последним пунктом — ссылка на `/sitemap` («Site map»).
Заголовки разделов (`Product` / `Trust` / `Company`) — это `Product`/`Trust`/`Company`
как **группы**, без собственной страницы (в карте сайта — заголовки, не ссылки).

## Нижний ряд (`.legal`)

- Слева: `EvalLense © 2026` + технические страницы Privacy / Terms / Security.
  Копирайт и ссылки — **один тип** (тот же размер/цвет, `13px`, `--muted`).
- Справа: иконки соцсетей.

## Соцсети

Набор и ссылки **зеркалят** `/company/contact` — X, Instagram, Telegram, Medium
(brand-глифы — inline `simple-icons` пути, тинт через `currentColor`). Иконки
рендерятся как «чипы»: квадрат `34×34`, на hover — мягкая фиолетовая заливка
(`color-mix(... --violet 9% ...)`; на тёмном — `rgba(255,255,255,.08)`).

> Данные соцсетей продублированы в `Footer.tsx` и в `company/contact/page.tsx`.
> При изменении хэндлов править оба места (кандидат на вынос в `src/lib/`).

## Кнопки

Через переиспользуемый [Button](web/src/components/ui/Button.tsx). В футере —
`size="sm"`; «Book a call» = `gradient` (dark) / `primary` (light), «Try live
demo» = `glass` (dark) / `ghost` (light). Полный набор вариантов и поведение —
в дизайн-системе ([[design-system|Design System]], секция о кнопках).

## Шрифт заголовков — переменная `--foot-head-font`

Заголовки колонок управляются CSS-переменными на `.foot`:

```css
.foot{ --foot-head-font: var(--font-text); --foot-head-tracking: .08em; }
```

По умолчанию — UI-шрифт (как сейчас). Чтобы заголовки повторяли пункты меню в
хедере (моноширинный `--font-mono`, как у `.site-header__link`), достаточно
одной строки:

```css
.foot{ --foot-head-font: var(--font-mono); --foot-head-tracking: .16em; }
```

## Тёмное свечение

Цельная фиолетовая подсветка живёт в `.foot.is-dark::before` (фон остаётся
чёрный→фиолетовый ramp). Центр прижат к нижней кромке (`at 50% 100%`, за низ не
уходит) и плавно «катится» вбок волной — `@keyframes foot-glow-roll`
(`translateX -72% ↔ -28%`, `13s ease-in-out infinite`). Контент поднят над
свечением через `.inner { z-index:1 }`. Анимация выключается при
`prefers-reduced-motion: reduce`.

## Связанное

- [[design-system|Design System]] — токены, цвет, типографика, кнопки
- [[sitemap|Карта сайта]] — источник списка страниц в колонках
- [[page-design-patterns|Page Design Patterns]] — паттерны страниц, на которых стоит футер
- [[contact|Contact]] — источник набора соцсетей
