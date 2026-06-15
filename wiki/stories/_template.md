---
status: draft
updated: YYYY-MM-DD
linear_project:
linear_parent_issue:
linear_issues:
---

# Story {{NN}} - {{Short Name}}

Status: Draft
Owner:
Team:
Priority:
Linear Mapping: Project by default

> Frontmatter (используется, только если Linear подключён):
> - `linear_project:` — ID существующего Linear Project. При публикации `/linear-publish` child Issues создаются внутри него.
> - `linear_parent_issue:` — ID parent issue («зонтик» story).
> - `linear_issues:` — список ID привязанных Issues. Если заданы — `/story-draft` двигает их `Backlog → Todo`, `/implement-story` двигает по фазам. Если пусто — `/linear-publish` создаёт новые, и пользователь вписывает возвращённые ID.
> Если Linear не подключён — поля остаются пустыми, story-файл сам служит трекингом.

## Summary

Коротко:
- что меняем
- зачем меняем
- какой ожидаемый эффект

## Problem

Какую проблему решает эта story:
- текущая боль
- текущий разрыв в flow
- почему это важно сейчас

## Goal

Что должно стать правдой после завершения story.

## Scope

### In scope
-

### Out of scope
-

## Users / Actors

- primary user:
- system actor:

## Source of Truth

### Wiki
- [[wiki/...]]

### Notes
- [[notes/...]]

### Chat / Working Context
- краткое описание источника контекста, если story родилась из рабочего диалога

## Main Flow

1.
2.
3.

## Business Rules

-

## Edge Cases

-

## Technical Impact

Какие зоны затрагиваются:
- frontend:
- backend:
- database:
- infrastructure:

## Dependencies

### Depends on
-

### Blocks
-

## Deliverables

-

## Acceptance Criteria

- [ ]
- [ ]
- [ ]

## Linear Publish Plan

(заполняется, только если Linear подключён)

### Publish Mode
- [ ] Project + child issues
- [ ] Issues only

### Issues
- [ ]

## Definition of Done

- [ ] source logic зафиксирована в wiki
- [ ] реализация завершена
- [ ] acceptance criteria подтверждены
- [ ] изменения отражены в relevant docs

## Change Log

- YYYY-MM-DD - created
