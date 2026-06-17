# Rule: ui-ux-pro-max review (advisory design-review — Фаза 4A.2)

**Источник правды:** скилл `ui-ux-pro-max` (плагин
`ui-ux-pro-max@ui-ux-pro-max-skill`, v2.5.0, маркетплейс
`nextlevelbuilder/ui-ux-pro-max-skill`) + оркестратор `forge-craft`/`component-forge`.

## Prerequisite (иначе петля не запускается)

Скилл должен быть установлен и enabled:

```
claude plugin marketplace add nextlevelbuilder/ui-ux-pro-max-skill
claude plugin install ui-ux-pro-max@ui-ux-pro-max-skill
```

Не установлен → зафиксировать prerequisite, **не выдумывать заглушку**; шаг 4A.2
пропускается с явной пометкой «advisory review unavailable», дизайн идёт на Gate A
без него (и это отмечается в отчёте).

## Кто это и как вызывается

`ui-ux-pro-max` — **Skill, не агент**. Оркестратор вызывает его **сам** (инструмент
Skill, имя `ui-ux-pro-max`) на шаге 4A.2 и передаёт ему черновик V1/V2/V3 + Contract
Lock + DS-ограничения. **В `subagent_type` его НЕ подставлять** — это не работник из
ростера. Доменный advisory-поиск: `scripts/search.py "<kw>" --domain
typography|style|color|ux|chart|landing`. Для типографики — `--domain typography`.

## Это ADVISORY reviewer, НЕ дизайнер

Он **не** заменяет `ui-ux-designer` / `ui-designer` / `design-system-architect` и
**не** создаёт дизайн. **EvalLense DS остаётся единственным source of truth.**

### Разрешено использовать его для
typography review · layout/composition review · responsive review · media-placement
review · background-strategy review · anti-pattern detection · visual-hierarchy
review · pre-delivery quality review.

### Запрещено использовать его для
new brand/design-system generation · new font-family selection · new color palette ·
new spacing scale · new radius system · new button variants · new component library ·
new motion architecture · замена EvalLense-токенов · **`--design-system` /
`--persist` / создание `design-system/MASTER.md` / page-override design systems**.

## Обязательный формат findings (reviewer → оркестратор)

```yaml
reviewer: ui-ux-pro-max
review_scope:
  - typography
  - composition
  - responsive
  - media-placement
  - background-strategy
  - anti-patterns
status: approved | needs-revision | blocked
version_status:
  V1: approved | needs-revision | blocked
  V2: approved | needs-revision | blocked
  V3: approved | needs-revision | blocked
findings:
  - finding_id: TYPO-01
    severity: blocker | major | advisory
    version: V1 | V2 | V3 | all
    area: typography | composition | responsive | media | background | theme
    issue:
    evidence:
    required_fix:
    return_to: ui-designer | ui-ux-designer
```

## Запрещённые формулировки

«make it better», «improve spacing», «looks unbalanced», «make it more modern» и
любые общие. **Каждое finding обязано указывать:** конкретную версию + конкретный
viewport/состояние + конкретный элемент + конкретный required_fix + return_to.

## Дисциплина петли (оркестратор)

Findings → убрать дубли → разделить **blocker / major / advisory** → вернуть
дизайнеру (`return_to`). Дизайнер чинит **только найденное**, не меняет semantic
payload, **не плодит новые версии V1/V2/V3**. **Максимум 2 цикла** ревью; не сошлось
→ `blocked-design-review`, **Gate A не показывать** (см. `process-states`). Финальные
брифы и Designer Self-Check — только после `approved`.
