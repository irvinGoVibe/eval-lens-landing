# EvalLense — handoff (продолжение в новой сессии)

Версия: evallense-site v1.0.0 · собрано 2026-06-16 · язык работы: русский.

## Что уже сделано
1. **Контекст-файл** `.agents/product-marketing.md` (корень репо) — полный профиль EvalLense + блок 0 «Нарратив и нейминг». Это центральный источник, его читают скиллы.
2. **Скилл** `skills/evallense-site/`:
   - `SKILL.md` — рабочий процесс продакшен-копии сайта (секция → копия + imagery brief + выбор секции + сверка нарратива).
   - `references/site-map.md` — карта всех секций лендинга + страниц Product/Trust/Company с verbatim-копией, do/don't, imagery.
   - `references/copy-system.md` — войс, паттерны заголовков/CTA, термины, use/avoid, антислоп, CRO/психология.
   - `evals/evals.json` — 5 тест-кейсов.
3. Память сессии записана: `evallense-product`, `evallense-conventions` (подхватятся в новом чате).

## Нарративные инварианты (не нарушать)
- Имя продукта — **EvalLense** (не «AI Jury» — это origin-story, только на /company/about).
- Ядро: **AI готовит доказательный анализ — решает человек** (human-in-the-loop; «the final call always yours»). Никаких «AI judges/decides/verdict».
- CTA: основной «Book a demo», вторичный «Try live demo».
- Термины: Entry Hub · evidence-based report · Review Board · AI judges P1–P6 · AI Total Score (advisory) vs Jury Score / Final Score (human).
- Диалог — рус., продакшен-копия — англ. Tone: Apple-минимализм, statement-first, без гиперболы.

## Как продолжить в новой сессии
Открой этот репозиторий и скажи, например: «продолжаем EvalLense, давай перепишем Hero» или «/evallense-site текст для секции Trust». Скилл сам подтянет `.agents/product-marketing.md`.

## Открытые вопросы (для фаундера)
- Ссылка на статью про AI Jury (origin).
- Тестимониалы / логотипы клиентов / кейсы.
- Текущие метрики лендинга (трафик, конверсия).
- Корректные лейблы хедера (`Block`/`Pricing` выглядят как placeholder).
- Финальный фон CtaBand (видео vs aurora).
- Подтвердить email/docs (часть — placeholder).

## Источники (при необходимости переснять)
- Продукт: `git@github.com:irvinGoVibe/ai-jury-prod.git` (внутреннее имя AI Jury, RU-доки; ⚠️ есть `.env` с секретами — не коммитить/не читать).
- Лендинг: `git@github.com:irvinGoVibe/eval-lens-landing.git` (EN-копия, Next.js 16, ~80% готов).
