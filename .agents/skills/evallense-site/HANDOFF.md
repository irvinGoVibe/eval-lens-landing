# EvalLense — handoff (продолжение в новой сессии)

Версия: evallense-site v2.0.0 · обновлено 2026-06-16 · язык работы: русский.

## Что уже сделано
1. **Контекст-файл** `.agents/product-marketing.md` (корень репо) — полный профиль EvalLense + блок 0 «Нарратив и нейминг». Это центральный источник, его читают скиллы.
2. **Скилл** `skills/evallense-site/`:
   - `SKILL.md` — **v2.0.0:** flow редактуры продуктовых брифов (slug → читаю бриф → факты из ai-jury-prod → архетипы из живых design-доков → `<slug>_new.md`).
   - `references/copy-system.md` — войс, паттерны заголовков/CTA, термины, use/avoid, антислоп, CRO/психология (всё ещё применяется к копии внутри брифа).
   - `references/site-map.md` — устаревший landing-центричный справочник (v1); новый flow на него не опирается, оставлен как вторичная карта внутренних страниц.
   - `evals/evals.json` — 5 тест-кейсов под v2 flow (доки, факты из ai-jury-prod, запись в `_new.md`).
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

## Источники

### Единый источник правды по продукту (читаем за фактами)
- **Локально:** `/Users/yaroslavvolovoj/work/Projects portfolio/AI_JURI/AI Juri new /ai-jury-prod`
  (⚠️ в пути есть пробелы — оборачивай в кавычки). Remote: `git@github.com:irvinGoVibe/ai-jury-prod.git`.
- Вход — `PROJECT-ENTRYPOINT.md` (роутер). Канон фактов — `wiki/product/` и
  `wiki/architecture/`; `*/archive/` — исторические снимки, наружу не тащить.
- ⚠️ В корне есть `.env` с секретами — **читать доки/логику можно, `.env` — нет**.
- Есть вторая, **устаревшая** копия (`AI_JURI/Repo Prod/ai-jury-prod`, апрель) — не использовать.

### Лендинг (этот репозиторий)
- `git@github.com:irvinGoVibe/eval-lens-landing.git` (EN-копия, Next.js 16, ~80% готов).
- Целевые брифы, которые правит скилл: `eval-lens-landing/wiki/product/<slug>.md`
  (результат → `<slug>_new.md`). Design-доки секций:
  `eval-lens-landing/wiki/architecture/{page-design-patterns,section-types}.md`.

## v2.0.0 — смена назначения скилла (2026-06-16)
Скилл больше **не пишет код страниц и не правит лендинг-копию**. Теперь он правит
**продуктовую документацию** (брифы `wiki/product/*.md`): читает целевой бриф →
идёт за фактами в `ai-jury-prod` → сверяет архетипы по живым design-докам →
пишет обогащённый бриф той же структуры в `<slug>_new.md`. Вход — slug страницы.
