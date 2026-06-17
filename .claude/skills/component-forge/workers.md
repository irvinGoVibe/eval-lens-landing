# Component Forge — ростер работников и шаблон task packet

**Работники** = vendor-агенты wshobson (`.claude/agents/wshobson/`, **не менять**,
не переименовывать, не дублировать) + проектный `media-curator`. Проектный контекст
они получают **только через task packet** (rule-cards из [kb/](kb/00-index.md) +
задача). **`ui-reviewer` и story/flow-агенты в форже не используются.**

## Ростер (фаза → работник → `name:`)

| Фаза | Скилл/роль | Работник (`name:`) |
|---|---|---|
| 2 · Microstructure Map | [forge-primitives](../forge-primitives/SKILL.md) | `multi-platform-apps-frontend-developer` |
| 3 · Design-System Guard | DS Guard + surface-to-action | `design-system-architect` |
| 4A.1 · Art Direction draft | [forge-craft](../forge-craft/SKILL.md) | `ui-ux-designer` (ритм/рекомпозиция) + `ui-designer` (визуал) |
| 4A.2 · Advisory design-review | [forge-craft](../forge-craft/SKILL.md) | **Skill** `ui-ux-pro-max` — вызывает **оркестратор сам**, НЕ subagent |
| 4A.3 · Designer revision | [forge-craft](../forge-craft/SKILL.md) | `ui-ux-designer` / `ui-designer` (по `return_to`) |
| 4B · Demo Media | media production | `media-curator` (проектный) |
| Gate A · DS Review | ревью дизайна+медиа | `design-system-architect` |
| 5 · Frontend Implementation | [forge-extract](../forge-extract/SKILL.md) | `multi-platform-apps-frontend-developer` — **ОДИН writer на архетип** |
| 6 · Render QA (параллельно, read-only) | [forge-validate](../forge-validate/SKILL.md) | `ui-visual-validator`, `design-system-architect`, `accessibility-expert`, `comprehensive-review-code-reviewer` |

- **Один frontend writer** на архетип (и реализация, и весь fix loop — он же).
- Render QA reviewers — **только read-only**, запускаются **параллельно**.
- `media-curator` арт-дирекшн не решает — исполняет media-brief дизайнера.
- **`ui-ux-pro-max` (Фаза 4A.2) — advisory reviewer, не дизайнер.** Это Skill
  (плагин `ui-ux-pro-max@ui-ux-pro-max-skill`), оркестратор вызывает его инструментом
  Skill (имя `ui-ux-pro-max`), **в `subagent_type` не подставлять**. Он **не**
  заменяет `ui-ux-designer`/`ui-designer`/`design-system-architect` и **не** создаёт
  DS/палитру/токены (deny-list, в т.ч. `--design-system`/`MASTER.md` — см.
  [kb/ui-ux-pro-max-review.md](kb/ui-ux-pro-max-review.md)). Не установлен →
  prerequisite, шаг 4A.2 пропускается с пометкой, без заглушки.

## Task packet (оркестратор → работник)

Через инструмент **Agent** (`subagent_type` = `name:` из ростера). **Не весь чат** —
только пакет (см. [kb/task-packets.md](kb/task-packets.md)):

```
- archetype ID + current phase + состояние (kb/process-states.md)
- exact role (что делает этот агент в этой фазе)
- approved inputs (контракт / карта / DS-ограничения+матрица / брифы / media-package)
- relevant files (конкретные пути)
- design-system constraints (+ surface-to-action)
- media brief (для фаз про медиа)
- allowed files / forbidden actions (рейлы оркестратора)
- ВСТАВЛЕННЫЕ ДОСЛОВНО rule-cards из kb/ для этой фазы (kb/00-index.md → «когда инжектить»)
- expected output (формат) + stop condition
```

Оркестратор собирает результат агента и передаёт дальше **только необходимое**,
а не сырой вывод целиком.

## Поток медиа (через оркестратора)
`ui-designer` → media-brief → **оркестратор** → `media-curator` → media-package →
**оркестратор** → `ui-designer` (approval). Фронт получает медиа только при `media-approved`.
