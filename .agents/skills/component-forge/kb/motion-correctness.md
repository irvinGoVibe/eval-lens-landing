# Rule: motion-correctness (движение корректно, завершается во вьюпорте)

**Источник правды:** `motion-wiring` (как объявляется движение — `data-*` + единый
rAF), `a11y-baseline` (reduced-motion), `overflow-discipline` (не ломать рельс).

Эта карточка — про **корректность** движения, не про проводку. Проверяется в
Designer-брифах (4A) и вживую в Render QA (Фаза 6).

## Контракт движения (для каждого animated / scroll-driven элемента)

```yaml
motion:
  purpose:
  trigger:
  scope:
  start_state:
  mid_state:
  end_state:
  completion_required: true
  completes_before_exit: true       # анимация/scrub доходит до end_state, ПОКА
                                     # элемент ещё во вьюпорте — не после ухода вверх
  reverse_behavior:
  resize_recalculation: required
  mobile_behavior:
  reduced_motion_fallback:
  affects_layout: false
  may_expand_document_width: false
```

## Главное правило — заканчивается ДО ухода из вида

`data-scrub`/`data-pin` обязаны достигать конечного состояния (`--scrub = 1` /
последний `pin-step`) **до того**, как элемент начинает уезжать за верхнюю кромку
вьюпорта. «Докручивается», когда элемента уже не видно — **дефект**
(`MOTION-INCOMPLETE-EXIT`). Маппинг прогресса привязывать так, чтобы end_state
попадал в видимую фазу.

## Live Render QA обязан проверить состояния

```
initial state · mid-animation state · final state ·
reverse state (если применимо) · after resize · mobile state · reduced-motion state
```

Анимация **не считается** проверенной только потому, что элемент присутствует в DOM.

## Findings

- `MOTION-INCOMPLETE-EXIT` — движение не завершилось до ухода элемента из вида.
- `MOTION-OVERFLOW-REGRESSION` — page-overflow убрали, но намеренное движение
  сломалось (см. `overflow-discipline`).

Любой из них → `status: fail`, в Fix Loop тому же writer'у (без расширения scope).
