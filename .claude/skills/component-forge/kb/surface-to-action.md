# Rule: surface-to-action (матрица «поверхность → действие» — Фаза 3)

**Источник правды:** `web/src/app/globals.css` (кнопки + liquid-glass группа),
`CLAUDE.md` (glass-правило), `wiki/architecture/design-system.md`.
Матрица не вводит новых вариантов — она **записывает** то, что уже в коде.

## Что это

Таблица «какое действие/кнопку можно ставить на какой поверхности», чтобы
дизайнер/фронт не поставил неверную кнопку на light/dark. Заполняется
`design-system-architect` из **реальных** значений globals.css (подтвердить, не
выдумывать).

## Матрица (подтвердить в Фазе 3 по globals.css)

```
## Surface-to-action matrix
### Light surface (.band.soft)
- Primary action:   заливная градиентная кнопка (.btn-gradient)
- Secondary action: ghost / pill
- Text:             --fg
- Border:           --border
- Glass:            по необходимости — ТОЛЬКО из общей liquid-glass группы
### Dark surface (.band.ink)
- Primary action:   liquid-glass (.btn-glass, общая группа)
- Secondary action: ghost-on-dark
- Text:             on-dark токены
- Border:           --border-on-dark
- Glass:            общая liquid-glass группа
### Gradient / colour surface
- Primary action:   по контрасту, без нового варианта
- Secondary action: ghost
- Contrast:         ≥ AA
```

## Правила

- **Не придумывать новый button variant**, если его нет в коде.
- glass — только через общую группу (см. [glass-rule](glass-rule.md)), не локально.
- Если docs (`design-system.md`) и код (`globals.css`) противоречат — зафиксировать
  конфликт явно, не «сглаживать».

## Проверка

Каждое действие в V1/V2/V3 берётся из матрицы под свою поверхность; нет кнопок/glass
мимо неё.
