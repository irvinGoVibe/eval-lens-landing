# Rule: copy-voice (голос EvalLense, human-in-the-loop, antislop)

**Источник правды:** `evallense-site` (copy-system / product-marketing),
`.claude/designs/evallense/readme.md` (бренд-голос).

## Правило

UI-копия — на английском (язык сайта), в голосе EvalLense. Контент — **инвариант**:
текст/слоты из брифа не выдумываем и не теряем. Этот rule про **тон и формулировки**,
когда копия уже есть или её надо причесать.

## Human-in-the-loop (нерушимо)

В любом оценочном утверждении: **AI готовит анализ / считает score — решает
человек.** Никогда «AI judges / decides / verdict». Формулировки: *prepares
analysis*, *scores*, *surfaces evidence* — а финальное решение за человеком.

## Голос

- Statement-first заголовок: несёт смысл сам, без зависимости от подзаголовка.
- Иерархия: eyebrow → heading → subhead → body.
- Apple-minimal: императив, data-forward, без воды.
- Канонические термины проекта; ≤1 lens-акцент на блок (`.grad-word` на одном слове).

## CTA-канон

Только **Book a Demo** / **Try live demo**. Других CTA-формулировок не вводим.

## Antislop (выкинуть)

`leverage, seamless, robust, unlock, elevate, supercharge, revolutionary`,
конструкция «not just X but Y», пустые усилители, тройные прилагательные.

## Проверка

Нет antislop-слов; каждое оценочное утверждение оставляет решение человеку;
CTA — из канона; число всегда с источником/подписью (не голый декоративный стат).
