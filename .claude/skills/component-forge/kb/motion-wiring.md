# Rule: motion-wiring (движение через data-*, единый rAF)

**Источник правды:** `CLAUDE.md` (ScrollOrchestrator), `web/src/components/ScrollFX.tsx`,
`web/src/components/ScrollOrchestrator.tsx`.

## Правило

Движение объявляется **только через `data-*` атрибуты**, исполняется **единым
rAF-циклом**. Никаких per-section `useEffect` для скролла/параллакса/scrub.

- **`data-reveal="up|left|right|scale"`** + `--reveal-delay` — появление.
- **`data-scrub`** → `--scrub` (0→1) — заполнение по мере прохождения вьюпорта (ring, bars, parallax).
- **`data-pin` / `data-pin-steps=N` / `data-pin-step`** — пиннинг multi-screen.

## Куда монтируется rAF

- **Внутренние страницы и стенд `section-lab`:** `<ScrollFX/>` монтируется **один
  раз** внизу страницы (после `<Footer/>` / в конце стенда). Lab-компоненты
  опираются на него.
- **Хоумпейдж:** `ScrollOrchestrator.tsx` (отдельный единый rAF, вербатим-порт
  оригинального `<script>`). Не дублировать его логику в компонентах.

## Запрещено

- `useEffect` со scroll-listener / IntersectionObserver внутри секции-компонента.
- Анимировать что-либо кроме `transform`/`opacity` (иначе лаги, CLS).
- Превращать Server-секцию в `"use client"` ради анимации — движение и так через `data-*`.

## Проверка

- Новый эффект = новый `data-*` + обработка в `ScrollFX`/`ScrollOrchestrator`, не локальный хук.
- На странице/стенде смонтирован ровно один `<ScrollFX/>`; иначе reveal-блоки «залипают» скрытыми.
- easing — `--ease`.
