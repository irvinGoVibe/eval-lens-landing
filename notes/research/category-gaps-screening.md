---
title: Незанятые категории поиска, зона «приём и скрининг заявок»
status: research / на согласование
layer: site / seo
created: 2026-08-15
method: 20 запросов проверены живым веб-поиском 15.08.2026
scope: application screening · intake · dealflow triage · cohort selection · grant review workflow
sources:
  - wiki/product/site/keyword-map.md (§5 каннибализация, §6 незанятые запросы)
  - wiki/product/site/pseo-opportunity-map.md (плейбуки, стоп-лист)
  - notes/ai-visibility-baseline-2026-08-15.md (конкурентная карта, ERC-факт)
---

# Категорийные гэпы: приём и скрининг заявок

Зона ресёрча узкая и намеренно не пересекается с уже описанным в keyword-map §6 и в
pseo-opportunity-map: там сидят judging/rubric/hackathon/comparison-запросы. Здесь только
операционный слой приёма заявок, объём, воркфлоу ревьюеров и связки с существующими
интейк-платформами.

## 0. Три вывода, которые меняют картину

**Вывод 1. Sopact занял операционный словарь целиком.** Из 20 проверенных запросов Sopact
вылезает в топе по семи: `/use-case/application-management-software`, `/use-case/application-review`,
`/use-case/grant-application-review`, `/use-case/surveymonkey-apply-alternative`,
`/use-case/submission-software`, `/use-case/application-scoring-rubric`,
`/solutions/application-review-software`. Это тот же приём, который мы у себя называем
Personas-плейбуком, только развёрнутый не на сегменты, а на **операции**. Наши девять
`/trust/use-cases/*` нарезаны по «кто заказчик», у Sopact нарезано по «что за операция»
(intake, review, scoring rubric, submission, alternative-to-X). Второй тип нарезки у нас
пустой полностью.

**Вывод 2. Формулировки про объём заняты HR-рекрутингом и не наши.** «Screen 500 applications»,
«bulk application review», «shortlist tool» дают выдачу из Greenhouse, Gem, Recruitee, cvshelf,
FirstPass AI и десятка resume-screening-блогов. Интент однозначно «резюме кандидатов на работу».
Заходить туда с pitch-deck-скринингом бессмысленно: SERP нас отфильтрует, а если пропустит,
приведёт нецелевой трафик. **Объёмные запросы надо брать не через слово «bulk», а через
доменный контекст** («500 grant applications», «hundreds of startup applications»), где HR
не конкурирует.

**Вывод 3. Интеграционный спрос есть, но это не «X + AI screening», а «X does AI badly».**
Проверка показала: Submittable (Smart Summary, Smart Reviewer, Automated Review), OpenWater
(OpenWater AI с декабря 2025, кастомные промпты по сабмишенам, токенная тарификация), Fluxx
(ассистент Finn, AI-саммари, Fluxx MCP) уже отгрузили собственный AI. То есть **страница
«Submittable + AI screening» будет драться с самим Submittable на его брендовом запросе и
проиграет.** Живой гэп в другом: их AI это саммари и single-pass скоринг по промпту, у нас
панель независимых оценщиков, evidence-привязка и Spread. Правильная формулировка запроса не
интеграционная, а сравнительно-оценочная («is Submittable AI review reliable», «AI scoring in
grant management software»). Плюс отдельно: **pseo-opportunity-map §5 держит Integrations
в стоп-листе** («экосистемы нет»), и этот ресёрч причину подтверждает, но добавляет вторую:
даже была бы экосистема, запрос занят вендором.

## 1. Таблица: 20 запросов, проверено вебом 15.08.2026

Колонка «вердикт»: **пусто** (нет ни одного профильного SaaS в топе) · **слабо** (топ держат
блоги, форумы, PDF, агрегаторы) · **сильный SaaS** (профильный вендор на первых позициях).

| # | запрос | intent | топ-3 домена сейчас | тип контента | вердикт | чем наполняем (наши факты) | каннибализация с живыми |
|---|---|---|---|---|---|---|---|
| 1 | how to review 500 applications | I | hirezapp.com · cvshelf.com · recruitee.com | блоги HR | **интент не наш** | нечем: SERP про резюме | нет (и не надо) |
| 2 | bulk application review software | C | greenhouse.io · gem.com · sopact.com | SaaS (ATS) | **сильный SaaS, чужой рынок** | нечем | нет |
| 3 | application review process best practices | I | foundant (Compass-форум) · NCBI/PMC · adaface | форум + академ.статья + HR-блог | **слабо** | батч-пайплайн как процесс: приём → нормализация → панель → Spread-флаг → человек; 1000+ прогонов как основание для шагов | мягкая с `/product/overview`, разводится тем что overview держит «batch pitch deck evaluation», а эта держит «process» |
| 4 | application management software | C | sopact.com · submittable · surveymonkey apply | SaaS | **сильный SaaS** | Entry Hub этого не покрывает (интейк без коммуникаций/менторов/отчётности) | подтверждает стоп-лист pseo §5 |
| 5 | grant application review workflow | C | sopact.com · goodgrants · reviewr + fluxx-блог | SaaS + вендорские гайды | **сильный SaaS** | заходить только через compliance-угол (см. #16), лобовой заход проигран | `/trust/use-cases/grants-prizes` |
| 6 | accelerator cohort selection process | I | acceleratorapp.co · failory · fi.co + researchgate | блоги + PDF-исследование | **слабо, самый чистый гэп** | три стадии отбора против нашего «первый гейт»: screening-мемо (НЕ IC-мемо), criteria weights видны на лидерборде, AI Total Score advisory vs Jury Score в рейтинг | средняя с `/trust/use-cases/accelerators`: та держит «software», эта «process». Развести обязательно |
| 7 | google forms application review scoring | C/I | zapier · viasocket · formfacade | интеграционные каталоги + аддоны | **пусто (SaaS нет)** | что ломается на самодельном скоринге: нет весов критериев, нет фиксации расхождений, нет evidence. У нас веса на лидерборде и Spread-порог 3.0 | нет |
| 8 | typeform application screening | C | typeform templates · hireserve · teamengine | вендорские шаблоны + HR SaaS | **слабо, но интент дрейфует в HR** | Entry Hub принимает то, что уже собрано формой | `/product/entry-hub` частично |
| 9 | surveymonkey apply alternative | T | sopact.com · capterra · g2 + submittable | Persona-страница конкурента + агрегаторы + вендор | **сильный SaaS (Sopact занял первым)** | мы не замена интейка, мы слой поверх. Формулировка «alternative» врёт про продукт | нет, но риск обещать лишнее |
| 10 | fluxx ai grant review | N/C | fluxx.io (свои страницы) · aws marketplace · capterra | вендор + маркетплейсы | **занято вендором** | не заходим | нет |
| 11 | openwater ai judging | N/C | getopenwater.com · openwater.com · sopact | вендор + Persona-страница конкурента | **занято вендором** | не заходим | нет |
| 12 | devpost hackathon judging ai | I/C | devpost.com (проекты + блог) · devfolio | UGC-проекты + вендорский блог | **слабо** | сюда идёт запланированная `/trust/use-cases/hackathons`, отдельной страницы не надо | дубль с плановой hackathons |
| 13 | f6s application review | N | f6s.com · trustpilot · gartner peer insights | вендор + отзывы | **занято вендором** | не заходим | нет |
| 14 | ai first pass review of applications | C | sopact.com · gem.com · whippy.ai | SaaS | **сильный SaaS, но термин «first read» свободен** | «first read» это наш канонический термин из глоссария; занимать через него, не через «first pass» | `/product/overview` |
| 15 | reviewer calibration score normalization | I | hub.evalato.com · patents (USPTO) · arxiv | вендорская справка + патенты + препринты | **пусто** | **лучший гэп ресёрча.** Spread(d) с порогом 3.0 как альтернатива нормализации: мы не выравниваем судей, мы показываем расхождение. 1000+ прогонов и вывод «больше судей не улучшает надёжность» | низкая, `/trust/consistency-reliability` держит «is scoring reliable», эта держит «что делать с разными шкалами судей» |
| 16 | can reviewers use AI to review grant applications | I | erc.europa.eu · grants.nih.gov · thesify.ai | регуляторы + блог | **пусто на стороне вендоров** | ERC (24.03.2026) и NIH прямо запрещают AI-суммаризацию и оценку рецензентом. Наша линия: AI-assisted administration (полнота, извлечение данных, маршрутизация, audit trail) отдельно от AI evaluation. Сегодня grants-страница этой границы не проводит | `/trust/use-cases/grants-prizes` **должна получить этот блок**, отдельная страница опциональна |
| 17 | startup application scoring rubric weights | I/C | sopact.com · acceleratorapp.co · delaware.gov PDF | SaaS + вендорский блог + PDF | **сильный SaaS частично** | конкуренты дают дефолтную сетку 35/25/25/15; у нас P1–P6 с определениями и **видимыми весами на лидерборде** | пересекается с плановой `/resources/pitch-competition-judging-rubric` |
| 18 | deal flow triage inbound decks first screen | C | v7labs · dealsflow.co.uk · summitpoint | SaaS + блоги | **слабо, но заселяется быстро** | keyword-map уже отдал triage расширению vc-open-calls; ресёрч подтверждает: слово перестаёт быть свободным, тянуть нельзя | `/trust/use-cases/vc-open-calls` |
| 19 | blind review anonymized application scoring | C/I | sopact.com · pinpointhq · arxiv/PNAS | SaaS + HR + академ. | **сильный SaaS + HR-дрейф** | честная позиция: маскировка не убирает предвзятость рубрики, убирает её якорение критериев + расхождение видно, а не усредняется | `/trust/consistency-reliability` |
| 20 | reviewer disagreement escalation second reader | I | casrai.org · USPTO-патенты · researchgold | гайды + патенты | **пусто** | буквально наша механика: Spread выше порога → второй читатель / человек. Ни один вендор так не спозиционирован | блог disagreement-is-useful держит «why judges disagree», эта держит «что делать дальше» |

## 2. Что ресёрч отменяет

- **«X + AI screening» как формат страниц: не делаем.** Submittable, OpenWater и Fluxx уже
  имеют собственный AI, брендовые запросы держат их же домены. Подтверждает стоп-лист
  pseo-opportunity-map §5 по Integrations, добавляя вторую причину.
- **Любые «bulk / high volume» формулировки без доменного слова: не делаем.** Интент HR.
- **`/surveymonkey-apply-alternative`, `/submittable-alternative`: не делаем.** Sopact уже
  занял первым, а главное, слово «alternative» описывает нас неверно: мы слой поверх интейка,
  а не его замена. Это же подтверждает и AI-baseline («EvalLens layered on top of any intake
  platform»).

## 3. Топ-5 к захвату

Критерий отбора: свободный SERP × реальный ICP × наполняется фактом, которого нет ни у кого.

**1. `/resources/reviewer-disagreement-what-to-do` (запрос: reviewer disagreement escalation, вердикт: пусто).**
Топ держат casrai-гайд и патенты USPTO, ни одного продукта. Наполнение целиком наше: Spread(d),
порог 3.0, правило «расхождение показываем, не усредняем», второй читатель как следствие.
Каннибализация низкая: блог disagreement-is-useful держит вопрос «почему», страница держит «что делать».

**2. `/resources/reviewer-calibration` или секция там же (запрос: score normalization between reviewers, вердикт: пусто).**
Единственный вендор в выдаче это справка Evalato, остальное патенты и препринты. Наш угол
контринтуитивен и потому цитируем в AI-ответах: нормализация прячет проблему, Spread её
показывает. Подпирается 1000+ прогонов.

**3. Блок «AI-assisted administration vs AI evaluation» на `/trust/use-cases/grants-prizes` (запрос: can reviewers use AI to review grant applications, вердикт: пусто со стороны вендоров).**
Выдачу держат ERC и NIH напрямую. Ни один вендор не отвечает на вопрос честно. Для нас это
одновременно AEO-цитируемость и закрытие риска доверия: compliance-специалист задаст этот
вопрос первым. Отдельный URL не нужен, нужен блок с FAQPage-разметкой.

**4. `/product/overview` или новая `/resources/application-review-process` (запрос: application review process, вердикт: слабо).**
Топ это форум Foundant, статья PMC и HR-блог. Наполнение: батч-пайплайн по шагам, где каждый шаг
привязан к продуктовому факту (Entry Hub на приёме, criteria weights на лидерборде, evidence
под каждым скором, Spread-флаг перед человеком). Развести с overview по формулировке: overview
остаётся primary по «batch pitch deck evaluation».

**5. Секция `#cohort-selection` на `/trust/use-cases/accelerators` (запрос: accelerator cohort selection process, вердикт: слабо).**
Топ держат блоги AcceleratorApp и Failory плюс PDF-исследование, продукта нет. Наш угол: три
стадии отбора у всех описаны одинаково, а наш вклад в первую стадию конкретен, screening-мемо
как первый гейт (не IC-мемо), AI Total Score advisory против Jury Score в лидерборд. Отдельного
URL не даём: у accelerators по keyword-map §5 и так самый горячий узел каннибализации.

## 4. Открытые вопросы

1. Папка под пункты 1, 2, 4: `/resources/` (уже обсуждается в pseo-opportunity-map §8) или
   новая `/how-it-works/`. Три операционные страницы это уже раздел, имя надо зафиксировать до первого URL.
2. Стоит ли вообще брать `application review process`: запрос широкий, слабый SERP, но и
   покупательский интент размытый. Возможно, дешевле блоком на overview, чем отдельной страницей.
3. Пункт 3 (ERC/NIH) требует продуктового решения раньше копирайтинга: заявляем ли мы
   rubric versioning и immutable decision log, о нехватке которых прямо сказал внешний источник
   в AI-baseline. Без этого блок про compliance будет наполовину пустым.
