# Rule: process-states (состояния процесса + дисциплина переходов)

**Источник правды:** оркестратор `component-forge/SKILL.md`.

Оркестратор хранит **одно** текущее состояние архетипа. Следующая стадия **не
стартует автоматически**, если перед ней стоит user-gate.

## Состояния

```
discovered          — Фаза 0 done
contract-locked     — Фаза 1 done
microstructure-mapped — Фаза 2 done
ds-constrained      — Фаза 3 done (матрица + ограничения)
designing           — Фаза 4A.1 черновики V1/V2/V3
design-review-revision — Фаза 4A.2↔4A.3 петля advisory-ревью (ui-ux-pro-max), ≤2 цикла
media-curating      — Фаза 4B в работе
design-review       — собран Gate A, ждём user
design-approved     — Gate A: approve (user)   ← ГЕЙТ
implementing        — Фаза 5 в работе
validating          — Фаза 6 Render QA
fixing              — Fix loop (≤3)
final-approved      — Gate B: approve (user)    ← ГЕЙТ
integrating         — Фаза 7
completed           — Фаза 8 done + Final Report
blocked             — design-conflict / asset-gap / blocked-design-review /
                      blocked-after-three-fix-cycles
```

`blocked-design-review` — за 2 цикла advisory-ревью (4A.2↔4A.3) дизайн не сошёлся;
**Gate A не показывается**, выход — отдельным решением (вернуть в Art Direction).

## Правила

- Один архетип за раз — **без параллельной** переработки нескольких.
- Гейты `design-review→design-approved` и `validating→final-approved` проходит
  **только пользователь**; оркестратор останавливается и ждёт.
- `blocked` фиксирует причину; выход из него — отдельным решением (напр.
  `design-conflict` возвращает в Art Direction).
- Состояние и причина блока показываются в отчётах фаз и в Final Report.
