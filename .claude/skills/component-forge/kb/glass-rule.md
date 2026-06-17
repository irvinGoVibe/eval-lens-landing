# Rule: glass-rule (liquid-glass — только общая группа)

**Источник правды:** `CLAUDE.md` (раздел про glass), `web/src/app/globals.css`
(поиск `liquid glass` / `.btn-glass`).

## Правило

`<Button variant="glass">` / `.btn-glass` **всегда** рендерит общий «liquid glass»
материал — точный вид из Hero CTA и тёмного футера, не плоский базовый `.btn-glass`.

Это **одна multi-selector группа** в `globals.css` (Hero, header, footer, bento
horse, CTA band). Когда новой поверхности нужен glass-материал — **добавь её
селектор в эту группу**, а не пиши локальный glass-look.

## Запрещено

- Изобретать одноразовый glass (свой backdrop-blur/border/тени) в стилях блока.
- Переопределять `.btn-glass` локально под конкретную секцию.

## Как правильно

1. Нужен glass на новой поверхности (напр. `.lab-<archetype> .btn-glass`).
2. Открой группу `liquid glass` в `globals.css`.
3. Допиши свой селектор в перечисление этой группы — материал наследуется единый.

## Проверка

В диффе нет нового блока с `backdrop-filter`/`blur` под glass; единственное
изменение — добавленный селектор в общую группу.
