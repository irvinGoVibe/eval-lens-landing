# Система копии EvalLense

Прикладные правила письма для сайта. Дополняет блок 0 контекста (`.agents/product-marketing.md`). Пояснения — рус., примеры копии — EN.

## 1. Иерархия сообщения (для секции/страницы)

1. **Eyebrow** — задаёт контекст/категорию (`Structured reports`, `Two outcomes, one batch`).
2. **Heading** — одно утверждение-суть. Statement-first, не вопрос, не «умное» в ущерб ясности.
3. **Subhead** — раскрывает «как»: 1–2 предложения, обычно три глагола действия.
4. **Body / steps / tiles** — конкретика, доказательность, параллельная структура.
5. **CTA** — следующий шаг.

Одна секция = одна работа в истории. Не повторяй сообщение соседей (см. сквозную линию в site-map).

## 2. Паттерны заголовков (что работает на этом сайте)

- **Outcome + метафора:** `Lens Your Next Unicorn`, `Find the leaders hidden in your flow.`
- **From → to:** `From messy decks to faster decisions`.
- **Двойная ценность:** `Select the best. Help every team improve.`
- **Триада-доверие:** `Trusted, Explainable, Human-Controlled`.
- **Outcome + срок:** `See your next cohort ranked in a day`.
- **«Operating layer» позиционирование:** `Not a one-off AI analysis — an operating layer…`.

Приём с градиентом: ключевое слово/фраза выделяется (`hidden in your flow.`, `entry point.`, `ranked in a day`). При вариантах заголовка указывай, какое слово под градиент.

## 3. CTA

- **Основной (весь сайт):** `Book a demo` → /#demo.
- **Вторичный:** `Try live demo` → /try-live-demo (на некоторых блоках `Book a call`).
- Контентные ghost-CTA в секциях: `View live report demo`, `View sample feedback`, `Explore methodology`, `Explore use cases`.
- Не вводи новые CTA без явной причины. Кнопка обещает ценность, а не действие («Book a demo», не «Submit»).

## 4. Голос и тон

- **Apple-минимализм:** чисто, statement-driven, минимум декоративного текста.
- **Прямой, императивный:** Launch / Find / Select / See.
- **Data-forward, но человечный:** цифры и доказательность + постоянный акцент «решает человек».
- **Сдержанно:** без гиперболы и хайпа; доверие важнее громкости.
- Личность бренда: прозрачный, методичный, быстрый, человекоцентричный, premium.

## 5. Слова: use / avoid

**Use:** lens · batch-review / batch evaluation · evidence-based · human-in-the-loop · the final call always yours · structured methodology · transparent rubric · reproducible · operating layer · decision-support · rank the strongest · evidence-linked · explainable · audit trail · unicorn (метафора).

**Avoid:**
- «AI judges / AI decides / AI verdict» в смысле «AI выносит решение» → заменяй: AI *scores / prepares the analysis / structures and ranks*, **people decide**.
- «black box», «automatic decision» как финал.
- Маркетинговая гипербола без пруфа («revolutionary», «best-in-class», «game-changing»).
- Устаревшие внутренние термины: `Mode Score`, `MS`, `master-index`, «11 C-level judges».
- Внешнее использование имени «AI Jury» вне origin-story.

## 6. Канонические термины (единообразно по сайту)

`Entry Hub` · `Review Board` · `evidence-based report` · `AI judges` (panel J-P1…J-P6) · dimensions `P1–P6` (Problem · Solution Logic · Business Value/Market · Pitch Quality · Team Readiness · Feasibility) · `AI Total Score` (advisory, не для ранга) · `Jury Score` / `Final Score` (human, идёт в лидерборд) · `human-in-the-loop` · пайплайн `Decoder → AI Judges → Summarizer → Scoring → Report` · `confidence` (low/med/high) · `deck completeness` (signal, не verdict) · `SourceRef` (evidence back to slide).

Различай строго: **AI Total Score = advisory reference**, ранжирование — по **human Jury/Final Score**.

### 6a. Терминология оценщиков по ICP-сегментам

**Проблема:** слово «jury» понятно только pitch competitions и частично hackathons. Для остальных 6 ICP это чужой язык — они не имеют жюри.

**Универсальный термин в общем copy страницы:** `your team`
Работает для всех 8 ICP без исключения. Примеры: «before your team meets», «your team walks in ready», «your team keeps the final call».

**Сегментные термины** — использовать только внутри карточки/панели конкретного ICP:

| ICP | Канонический термин | Избегать |
|---|---|---|
| Pitch Competitions | `judging panel` / `judges` | «jury» (европеизм, не US-стандарт) |
| Hackathons | `judging panel` / `judges` | «jury» |
| VC Funds | `partners` / `investment committee (IC)` | «jury», «judges» |
| Accelerators | `selection committee` | «jury», «judges» |
| Angel Investors | `your team` | «jury», «judges» |
| Corporate Innovation | `committee` / `stakeholders` | «jury», «judges» |
| Grant Programs | `review committee` | «jury», «judges» |
| Universities | `review panel` / `selection committee` | «jury», «judges» |

**Региональный контекст (ресёрч-находка):**
- США: доминирует `judges` / `panel of judges` (TechCrunch Disrupt, SXSW, Y Combinator)
- Европа/UK: используют и `jury`, и `judges`; `jury` — кальки с фр./нем., не универсально
- Вывод: **не писать «jury» в общем copy сайта** — это competition-speak, отчуждающий VC/Accelerator/Grant/University ICP

**Исключение — product proper nouns:** `Jury Score` и `Final Score` — названия продуктовых фич, оставлять как есть. В общем copy вокруг них писать `human-owned ranking` или `final ranking`.

## 7. Антислоп (убрать AI-штампы)

Вычищай: «In today's fast-paced world», «unlock/unleash the power», «seamless», «robust», «leverage», «delve», «elevate», «supercharge», «revolutionize», парные «not only… but also», «it's not just X, it's Y» как штамп, пустые усилители (very, truly, really), тройки прилагательных ради ритма.

Замена: конкретный глагол + конкретный объект + доказуемое следствие. Если предложение нельзя проверить или оно подходит любому SaaS — переписать или удалить. (Глубже — скилл `copy-editing` / `stop-slop`.)

## 8. Чек-лист конверсии (мини-CRO)

- Ценность ясна за 5 секунд (heading + sub).
- Один основной CTA на экран, виден без скролла.
- Каждое утверждение подкреплено (цифра, evidence, механика), а не декларацией.
- Trust-сигналы рядом с CTA (human-in-the-loop, 1,000+ runs, evidence-based).
- Нет фрикшена в тексте (жаргон, длинные абзацы, неясный следующий шаг).
- Соответствие источнику трафика, если секция под конкретную кампанию.

## 9. Чек-лист психологии / доверия

- **Снятие тревоги «AI решит за меня»:** явный human-in-the-loop в любой секции про оценку.
- **Прозрачность как доверие:** «explainable», «back to the deck», «not a black box».
- **Социальное доказательство:** 1,000+ evaluation runs (текущий live-счётчик; «400+ runs» = origin-story веха, не трогаем — см. blog «What 400+ Runs Taught Us»); сегменты (VC, accelerators…); кейсы (когда появятся).
- **Конкретность > обобщения:** реальные категории (Problem, Market, Team, Traction, Missing evidence), confidence-уровни.
- **Возражения** (см. контекст, секция 7) закрывай в тексте секции, а не игнорируй.

## 10. Imagery brief — как описывать «что изобразить»

Для визуальной секции давай бриф: **сюжет** (что в кадре), **данные/подписи на мокапе** (реальные термины и правдоподобные числа), **тип** (видео-фон / 3D / UI-мокап / иллюстрация), **палитра** (lens violet-cyan / orange bridge / dark trust), **alt-текст**. Пример формата alt уже есть на сайте: «A lens splitting a pitch deck into a judge-by-criterion scoring matrix». Числа на мокапах — правдоподобные и согласованные с продуктом (шкала 0–10, confidence high/med/low).
