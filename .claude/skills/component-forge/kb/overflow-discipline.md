# Rule: overflow-discipline (случайный page-overflow vs намеренные рельсы)

**Источник правды:** `wiki/architecture/page-design-patterns.md` (§Горизонтальный
скролл), `web/src/app/globals.css` (per-wrapper `overflow-x:clip`), компоненты
`LabGallery`/`.seg-lane` (scroll-snap рельсы).

## НЕ «замазывать» overflow

Запрещено лечить overflow универсальным правилом:

```css
html, body { overflow-x: hidden; }
```

Скрытый overflow ≠ исправленный. Надо найти **виновника** и устранить причину.

## Случайный page-level overflow — ЗАПРЕЩЁН

На `html`, `body`, корне страницы, корне `section-lab`, page shell. Критерий:

```
document.documentElement.scrollWidth <= document.documentElement.clientWidth
```

Типовые виновники (blocker): document шире viewport · абсолютный фон расширяет
страницу · transform выносит элемент за document · `100vw` + padding · media шире
контейнера · длинное слово не переносится · декоративная линия расширяет
scrollWidth · hidden offscreen animation-target остаётся в scrollable geometry.

## Намеренный локальный горизонтальный скролл — РАЗРЕШЁН

Только для явных рельсов: carousel · card rail · logo rail · comparison row ·
timeline · horizontal data track · intentional animated line.

**Маркер — существующая конвенция проекта, новый НЕ вводим:** intentional rail =
scroll-snap-лента в своём контейнере (`LabGallery` `<ol>`, `.seg-lane`,
`overflow-x:auto`/`clip` + `scroll-snap-type`). Валидатор исключает такие контейнеры
(и их поддерево) из проверки на page-overflow.

Рельс обязан: не расширять document · быть ограничен своим контейнером · работать
touch · работать touchpad · иметь достижимый контент · не скрывать последний элемент
· сохранять keyboard accessibility (если interactive) · не ломаться после resize ·
иметь mobile behavior.

## Чинить overflow НЕЛЬЗЯ через

global `overflow-x:hidden` · удаление horizontal transform · удаление scroll-driven
движения · клиппинг всей секции без проверки контента · отключение анимации ·
слепой `width:100%` · удаление движущегося элемента.

Фикс валиден, только если **одновременно**: page-overflow убран **И** намеренное
локальное движение сохранено (start/mid/end/reverse/resize/mobile/reduced-motion
работают — см. `motion-correctness`). Overflow исчез, но движение сломалось →
`status: fail`, finding `MOTION-OVERFLOW-REGRESSION`.

## Диагностика (пример, не production-код)

```js
const root = document.documentElement;
const pageHasHorizontalOverflow = root.scrollWidth > root.clientWidth + 1;
const viewportWidth = root.clientWidth;
const overflowCandidates = [...document.querySelectorAll("*")]
  .filter((el) => {
    if (el.closest('[data-allow-horizontal-scroll="true"]')) return false; // + project rails
    const r = el.getBoundingClientRect();
    return r.left < -1 || r.right > viewportWidth + 1;
  })
  .map((el) => ({ tag: el.tagName, className: el.className,
    left: el.getBoundingClientRect().left, right: el.getBoundingClientRect().right }));
```

(В проекте intentional rails помечены не data-маркером, а scroll-snap-контейнером —
исключать по факту существующего паттерна.)

## Результат проверки (forge-validate отдаёт)

```
page overflow: pass | fail
intentional rails found:
intentional rails functional:
overflow candidates:
```
