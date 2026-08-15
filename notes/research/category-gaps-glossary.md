---
title: Category gaps — определительные и терминологические запросы (glossary / AEO-слой)
status: research / на согласование
layer: site / seo / aeo
created: 2026-08-15
method: WebSearch US-выдача, 32 определительных запроса, фиксация топ-доменов + оценка качества ответа
sources:
  - wiki/product/site/pseo-opportunity-map.md (§3.3 — исходные 6 терминов)
  - notes/ai-visibility-baseline-2026-08-15.md (AI-канал, конкурентная карта, ERC)
  - notes/visibility-baseline-2026-08-15.md (классический поиск, 0/15)
  - .agents/product-marketing.md (§9 глоссарий, §11 proof, Приложение — пайплайн)
---

# Терминологический слой: где в нише нет чистого определения

## 0. Зачем это отдельно от pSEO-карты

pSEO-карта отводит глоссарию роль «дешёвого AEO-слоя» и предлагает 6 терминов. Проверка выдачи
показала, что список сильно занижен по объёму и при этом завышен по лёгкости: часть предложенных
терминов на самом деле занята сильными источниками (Wikipedia, arXiv), а самые свободные позиции
лежат в зонах, которых в карте вообще нет — **биасы AI-судей** и **регуляторика оценки**.

Ключевое наблюдение по механике канала. Baseline показал асимметрию: в классическом поиске мы 0/15,
в AI-выдаче нас уже называют и цитируют. Определительные запросы — это ровно тот класс, где
AI-движок не ранжирует десять ссылок, а **берёт одно определение и пересказывает его**. Побеждает
не домен с авторитетом, а источник, у которого определение самое операционализируемое: с порогом,
с числом, с процедурой. У нас такие числа есть (Spread ≥ 3.0, шесть линз P1–P6, 1000+ прогонов,
разделение AI Total Score / Jury Score). Это наш реальный рычаг в этой зоне, единственный.

Второе наблюдение, более неприятное. Терминология вокруг LLM-as-a-judge **уже консолидируется без
нас**: Wikipedia, Confident AI, Evidently, Langfuse, Arize, Comet держат учебный слой. Через
6–12 месяцев зайти туда будет дороже. Свободны сейчас именно **стыки**: LLM-судейство ×
человеческий отбор заявок. Ни один из dev-tooling источников про заявки не пишет, ни один из
источников про судейство конкурсов (Awardforce, Evalato, ScoreJudge, HeroX) не пишет про LLM-биасы.
Стык пуст, и он наш по факту продукта.

## 1. Что мы имеем право утверждать (инвентарь прав на слово)

Правило допуска термина в список: он получает страницу, только если в определение можно вставить
**наш непубличный факт**, а не общее место. Иначе термин уходит пунктом в хаб.

| Актив | Конкретика | Термины, которые он «оплачивает» |
|---|---|---|
| Порог Spread(d) ≥ 3.0 | численный маркер конфликта судей | score-spread, inter-rater-reliability, consensus-scoring, judge-disagreement |
| 6 линз P1–P6 с определениями и весами | Problem / Solution / Market / Pitch Quality / Team / Feasibility | rubric-anchoring, rubric-weighting, ai-judge-panel |
| Независимость судей в пайплайне | 6 судей идут параллельно и не видят друг друга | position-bias, self-preference-bias, halo-effect, llm-as-a-jury |
| Function 1 = детерминированная математика | агрегация вне LLM, не «попроси модель усреднить» | deterministic-aggregation, reproducible-scoring |
| AI Total Score = advisory, Jury Score = решение | архитектурное, а не декларативное разделение | advisory-score, human-in-the-loop-evaluation, eu-ai-act-article-86 |
| Evidence-привязка + фиксация отсутствующих доказательств | «чего в деке не было» — отдельный вывод отчёта | evidence-grounded-scoring, application-completeness, deck-completeness |
| 1000+ прогонов и вывод «больше судей ≠ лучше» | контр-тезис к рыночному консенсусу | llm-as-a-jury, ai-judge-panel, judge-calibration |
| Routing Matrix + screening-мемо | формат первого гейта | deck-triage, screening-memo, first-pass-screening |
| ERC 24.03.2026 + разбор границы | у нас есть проработанная позиция, у рынка нет | ai-in-peer-review, erc-ai-guidelines, ai-assisted-administration |
| **Отсутствует** | кейсы, клиентские метрики, бенчмарк-цифры Phase 0 | блокирует любые термины вида «accuracy of…» |

## 2. Термины: проверка выдачи

Оценка качества топа по шкале: **пусто** (определения нет) · **академично** (есть, но
непереводимо на язык организатора) · **занято смежником** (dev-tooling или HR, не наша ниша) ·
**занято по делу** (кто-то уже дал нормальное определение для нашей аудитории).

### 2.1 Зона A — судейство людей, рубрики, надёжность

| Термин / URL | Запрос | Топ-3 сейчас | Качество топа | Наш вклад | Приоритет |
|---|---|---|---|---|---|
| **score-spread** `/glossary/score-spread` | what is score spread judging | herox.com, sports.yahoo.com, ar5iv (Judging the Judges) | **пусто.** Никто не даёт определения как метрики; HeroX сразу уходит в z-score, остальное — фигурное катание и MMA | Spread(d) как именованная величина + порог 3.0 + принцип «не усредняем, подсвечиваем» | **высокий** |
| **inter-rater-reliability** `/glossary/inter-rater-reliability` | what is inter-rater reliability | wikipedia, covidence.org, caepnet.org | **академично.** Cohen's kappa / ICC / Fleiss — корректно и бесполезно для организатора конкурса | Перевод на язык практика: как это выглядит на батче деков, почему kappa не считают на 40 заявках, что смотреть вместо | **высокий** |
| **judge-calibration** `/glossary/judge-calibration` | judge calibration competition judging | scauk.coffee, flippeddecisions.com, awardforce.com, scorejudge.com | **занято по делу, но узко.** Awardforce и ScoreJudge объясняют калибровочную сессию для людей. Про калибровку AI-панели нет ни слова | Мост: калибровка людей ↔ якорение AI-линз; почему у AI-панели калибровка это версия рубрики, а не совещание | **высокий** |
| **rubric-anchoring** `/glossary/rubric-anchoring` | rubric anchoring / behaviorally anchored rating scale | wikipedia (BARS), peoplemanagingpeople, chrmp, ERIC PDF | **занято смежником (HR).** Всё про performance appraisal сотрудников; про оценку заявок и про anchoring критериев AI-судьи — ноль | Наши P1–P6 как готовый пример якорей для батча заявок; связь якорей с воспроизводимостью | **средний** |
| **score-normalization** `/glossary/score-normalization` | score normalization judging panel | evalato.com (2 страницы), anishathalye.com, herox.com | **занято по делу.** Evalato даёт нормальное объяснение z-score | **Контр-угол, а не определение:** нормализация лечит разную строгость судей, но стирает содержательное расхождение. Наш выбор — подсветить Spread, а не сгладить. Это честная позиция против рыночного дефолта | **средний** |
| **consensus-scoring** `/glossary/consensus-scoring` | consensus scoring vs averaging judges | linkedin.com, theawardsplatform.com, hilldickinson.com, carmenscoring.com | **занято частично.** Awards-платформы объясняют; юрфирма Hill Dickinson даёт правовой угол (судебная практика по average vs consensus в тендерах) | Третий вариант, которого нет в их дихотомии: независимая оценка + явная фиксация несогласия без принуждения к консенсусу | **средний** |
| **halo-effect** (в отборе заявок) `/glossary/halo-effect-in-judging` | halo effect evaluation scoring bias | simplypsychology, scribbr, performyard, thedecisionlab | **академично + HR.** Thorndike 1920, performance reviews. Про питч-деки и заявки — ничего | Механика: почему сильный слайд «Team» тянет вверх оценку рынка; как независимость линз P1–P6 это структурно ломает | **средний** |
| **rubric-drift** `/glossary/rubric-drift` | what is rubric drift | datacamp (drift вообще), arxiv 2602.13576, citl.indiana.edu | **пусто/размыто.** Термин расщеплён: ML-дрейф метрик vs «Rubric-Induced Preference Drift» из свежего arXiv. Человеческого определения «рубрика поплыла к концу батча» нет ни у кого | Двойное определение: дрейф человека (усталость к 80-й заявке) и дрейф рубрики (версия менялась в процессе). Второе прямо цепляет тот gap про rubric versioning, который GPT назвал нашей слабостью | **высокий** |
| **blind-review** `/glossary/blind-review` | what is blind review application screening | myshyft, hackerearth, airswift, oleeo, ciivsoft | **занято плотно (HR-глоссарии).** Десяток рекрутинговых глоссариев, все одинаковые | Слабо. Наш продукт не построен на анонимизации. **Не даём страницу**, идёт пунктом в хаб | низкий |
| **rubric-weighting** `/glossary/rubric-weighting` | how to weight judging criteria | sakai/LMS-хелпы, teachervision, uic.edu | **занято смежником (edu).** Всё про выставление оценок студентам | Веса P1–P6 и почему жанр (хакатон vs pitch competition) меняет веса. Пересекается с `/resources/*-rubric` — риск каннибализации | низкий (или секция на rubric-странице) |

### 2.2 Зона B — AI-оценка и биасы судей

| Термин / URL | Запрос | Топ-3 сейчас | Качество топа | Наш вклад | Приоритет |
|---|---|---|---|---|---|
| **llm-as-a-judge** `/glossary/llm-as-a-judge` | what is llm as a judge | wikipedia, confident-ai, evidentlyai, langfuse, mlflow | **занято по делу, но чужой нишей.** Определение хорошее и целиком про оценку выходов LLM-приложений. Применение к оценке человеческих документов не рассматривается никем | Второе значение термина: судья оценивает не выход модели, а заявку человека. Разбор, что при этом меняется (нет ground truth, есть последствия для заявителя, нужен audit trail) | **высокий** |
| **llm-as-a-jury / ai-judge-panel** `/glossary/ai-judge-panel` | what is llm as a jury / AI jury | arize.com, comet.com, langwatch.ai, evidentlyai | **занято, и занято тезисом, с которым мы спорим.** Рынок повторяет Cohere PoLL: «панель из 5–10 моделей лучше одного судьи». Свежий arXiv 2605.29800 («Nine Judges, Two Effective Votes: Correlated Errors Undermine LLM Evaluation Panels») говорит обратное | **Сильнейшая позиция в списке.** У нас 1000+ прогонов и собственный вывод «больше судей ≠ лучше, решает методология». Внешняя работа его подтверждает. Определение + контр-тезис + наш ответ (6 ролевых линз, а не 9 копий одной модели) | **высокий** |
| **position-bias** (LLM-судьи) `/glossary/position-bias` | what is position bias llm as a judge | arxiv 2406.07791, huggingface, openreview, aclanthology | **чисто академично.** Только препринты и OpenReview. Ноль объяснений для не-ML-читателя, ноль привязки к практическим последствиям | Перевод на язык организатора: «порядок дек в очереди не должен влиять на рейтинг». Плюс наша механика независимого прогона каждой заявки | **высокий** |
| **self-preference-bias** `/glossary/self-preference-bias` | self-preference bias llm judge | arxiv 2410.21819, openreview, researchgate | **чисто академично.** То же: только препринты | Практический вывод: почему AI-сгенерированный дек не должен получать бонус от AI-судьи. Прямо отвечает на растущий страх организаторов (заявки пишут через LLM) | **высокий** |
| **evidence-grounded-scoring** `/glossary/evidence-grounded-scoring` | evidence grounding AI scoring | futureagi.com/glossary, deepmind (FACTS), microsoft learn, arxiv | **занято смежником.** Groundedness определён для RAG-ответов. Для оценочного балла — не определён | «Балл без цитаты не балл»: привязка каждого утверждения к слайду + отдельная фиксация отсутствующего доказательства. Это буквально наш differentiator, который GPT воспроизводит дословно | **высокий** |
| **deterministic-aggregation** `/glossary/deterministic-aggregation` | deterministic scoring aggregation AI | hebbia.com, arxiv 2604.05083, sitepoint | **пусто как термин.** Идея гуляет в блогах вендоров, устойчивого определения нет | Наша Function 1: математика агрегации вынесена из LLM. Ровно тот механизм, который делает результат воспроизводимым | **высокий** |
| **reproducible-scoring** `/glossary/reproducible-scoring` | reproducible AI scoring / same input same score | kenmuse.com, canditech, torsor.com, variably.tech | **пусто → занимается прямо сейчас.** Определение «same input, same score» уже произносят, но держат его мелкие продукты без методологии. Окно закрывается | 1000+ прогонов, temperature-дисциплина, версионирование рубрики. Каннибализация с `/trust/consistency-reliability` — глоссарий даёт определение и ссылается вверх | **высокий** |
| **advisory-score** `/glossary/advisory-score` | what is an advisory score AI | Azure Advisor, PDPC guidelines, modeldiplomat, genezio | **пусто.** Выдача расползается по несвязанным значениям (Azure, комплаенс-гайдлайны, AI-visibility-метрика). Ниши нет вообще | **Термин практически наш.** AI Total Score как advisory reference, не идущий в лидерборд, — архитектурное разделение, которого нет ни у одного конкурента в описании | **высокий** |
| **human-in-the-loop-evaluation** `/glossary/human-in-the-loop-evaluation` | what is human-in-the-loop evaluation | ibm.com, databricks, ai21, labelstud.io, producttalk | **занято плотно и качественно.** Крупные вендоры, хорошие определения | Отличие: у них HITL = человек чинит выход модели при низкой уверенности. У нас человек **владеет решением по определению**, а не по порогу уверенности. Это разные архитектуры, и различие защитимо | **средний** |
| **explainable-scoring** `/glossary/explainable-scoring` | what is explainable scoring | fico.com, equifax, arxiv 2012.03749, goperfect | **занято смежником (кредитный скоринг).** SHAP / LIME, финансовая ниша | Объяснимость через цитату из документа, а не через веса фич. Для language-based оценки SHAP неприменим — это содержательное различие | **средний** |
| **judge-disagreement** | why do judges disagree | — | пересекается со score-spread | **Не отдельная страница.** H2 внутри score-spread; вопросная формулировка держится блогом `disagreement-is-useful` | низкий |

### 2.3 Зона C — процесс отбора

| Термин / URL | Запрос | Топ-3 сейчас | Качество топа | Наш вклад | Приоритет |
|---|---|---|---|---|---|
| **deck-triage / deal-flow-triage** `/glossary/deck-triage` | what is deal flow triage | intralinks, dealroom, carta, wikipedia; продуктово — v7labs, dealsflow.co.uk | **занято наполовину.** «Deal flow» определён везде, «triage» — нигде как самостоятельное понятие. V7 и DealsFlow уже продают «triage agent», но определения не дают | Triage как отдельный гейт с явным выходом (pass / hold / reject + причина), Routing Matrix. Плюс метафора триажа корректна: сортировка по излечимости, а не по качеству | **высокий** |
| **screening-memo** `/glossary/screening-memo` | what is a screening memo | goingvc, qubit.capital, vcbeast, govclab, vcosai | **занято частично и путано.** Часть источников смешивает screening memo и IC memo; определение «1–3 страницы до партнёрской встречи» есть у GoingVC | Разграничение screening ≠ IC (наш канон!), и наш формат: что обязано быть в мемо, чтобы решение было защитимым. **Красная линия: не заявлять IC-готовность** | **высокий** |
| **first-pass-screening** `/glossary/first-pass-screening` | what is first-pass screening | HR-глоссарии (hipeople, sloneek, applicantstack), sciencedirect, arxiv | **занято смежником (HR + систематические обзоры).** Для конкурсов и питч-деков определения нет | Первый проход как отдельный продуктовый объект: что он обязан вернуть, чего не имеет права решать | **средний** |
| **application-completeness** `/glossary/application-completeness` | application completeness check | grants.nih.gov, herondata, osp.utah.edu | **занято по делу, но только как чек-лист документов.** Полнота *содержания* (а не наличия файлов) не определена нигде | Deck completeness: не «приложены ли файлы», а «есть ли в деке доказательство по каждому критерию». Плюс наш вывод про отсутствующие доказательства как первоклассный сигнал | **высокий** |
| **eligibility-screening** `/glossary/eligibility-screening` | what is eligibility screening grants | goodgrants.com, grants.gov, blackbaud | **занято по делу.** Good Grants даёт хорошее определение, у них это фича | Слабо: у нас это не отдельная фича. **Не даём страницу**, пункт в хаб + ссылка на grants-prizes | низкий |
| **shortlist-defensibility** `/glossary/defensible-shortlist` | defensible selection / decision audit trail | facctum, warden-ai, fitgap, nhimg.org | **пусто в нашей нише.** Термин живёт в комплаенсе и HR-tech; для конкурсов/грантов не сформулирован | **Сильный кандидат.** Определение «решение защитимо, если его можно воспроизвести перед спорящим заявителем». Честно включает наш известный gap (rubric versioning + immutable history) как критерий, а не как обещание | **высокий** |
| **batch-evaluation** `/glossary/batch-evaluation` | what is batch evaluation | servicenow, openai batch API, medrxiv | **занято чужим значением.** Batch = батч-API у LLM-вендоров; наш смысл (пакет заявок) в топе отсутствует | Термин из нашего же hero-копия («Batch-review pitch decks»). Нужен ради согласованности словаря, а не ради трафика | **средний** |

### 2.4 Зона D — регуляторика и правила

Самая недооценённая зона. Здесь запрос не «что такое», а «можно ли нам», и это запрос
покупателя с бюджетом и юристом. Конкурентов, отвечающих на него, нет вообще.

| Термин / URL | Запрос | Топ-3 сейчас | Качество топа | Наш вклад | Приоритет |
|---|---|---|---|---|---|
| **erc-ai-guidelines** `/glossary/erc-ai-guidelines` | ERC AI guidelines grant evaluation | erc.europa.eu, euraxess, researchprofessionalnews, thesciencetalk | **занято первоисточником, но не переведено в решение.** Все пересказывают запрет; никто не отвечает «что тогда вообще можно автоматизировать» | Разбор границы **AI-assisted administration vs AI evaluation** с конкретным списком разрешённого. Мы единственные, кому эта граница выгодна в честной формулировке. Прямо чинит риск на `/trust/use-cases/grants-prizes` | **высокий** |
| **ai-in-peer-review** `/glossary/ai-in-peer-review` | AI in peer review policy 2026 | wiley (Learned Publishing), prophy.ai, thesify.ai, neurips.cc | **занято, но фрагментировано.** Отдельно NeurIPS 2026, CVPR 2026, ICML 2026, ERC, APS. Сводной карты «кто что запретил» нет | Сводная таблица политик + вывод, какая часть работы остаётся легальной. Это цитируемый объект, а не текст | **средний** (высокий как контент-магнит) |
| **eu-ai-act-article-86** `/glossary/right-to-explanation` | EU AI Act Article 86 right to explanation | artificialintelligenceact.eu, activemind.legal, rgpd.com | **занято юристами, корректно.** Текст статьи и комментарии есть | **Не пересказ закона, а операционализация:** что «clear and meaningful explanation» означает для отбора заявок. Плюс честная оговорка про Annex III scope (наш кейс не всегда high-risk — это надо сказать прямо, иначе страница врёт). Проверить у юриста до публикации | **средний** |
| ai-assisted-administration | AI assisted administration vs AI evaluation | — | пусто | H2 внутри erc-ai-guidelines | низкий |

## 3. Что проверено и отброшено

| Отброшено | Причина |
|---|---|
| `blind-review` | Десяток одинаковых HR-глоссариев уже держат выдачу, а продукт на анонимизации не построен. Пункт в хаб |
| `eligibility-screening` | Good Grants даёт хорошее определение и продаёт это как фичу; у нас фичи нет. Пункт в хаб |
| `rubric-weighting` отдельной страницей | Каннибализация с `/resources/*-judging-rubric`. Секция там же |
| `judge-disagreement` отдельной страницей | Дубль score-spread. H2 внутри |
| `cohen's kappa`, `intraclass correlation` | Wikipedia + учебники. Права говорить у нас нет: мы kappa не считаем |
| `data drift`, `model drift` | Чужая ниша (MLOps), к отбору заявок не относится |
| любые термины вида «AI screening accuracy» | Нет бенчмарк-цифр Phase 0. Определить можно, подтвердить нечем |

## 4. Структура хаба: сеть, а не список

Проблема стандартного глоссария в том, что он ссылается только вверх (термин → хаб) и потому не
работает: ни один термин не объясняет соседа, и AI-движок не видит, что источник владеет темой
целиком. Предлагаемое устройство — **четыре кластера + три обязательных типа связи**.

### 4.1 Хаб `/glossary/` — не алфавит, а карта решения

Хаб организован по стадии работы организатора, а не по буквам. Алфавитный указатель существует
как вторичный блок внизу.

```
/glossary/
├─ Кластер 1. Что приходит и как отсеять   → deck-triage · first-pass-screening ·
│                                              application-completeness · screening-memo · batch-evaluation
├─ Кластер 2. Как устроена оценка          → rubric-anchoring · rubric-weighting · judge-calibration ·
│                                              rubric-drift · consensus-scoring · score-normalization
├─ Кластер 3. Что ломается                 → score-spread · inter-rater-reliability · halo-effect ·
│                                              position-bias · self-preference-bias
├─ Кластер 4. Чем это чинится              → llm-as-a-judge · ai-judge-panel · evidence-grounded-scoring ·
│                                              deterministic-aggregation · reproducible-scoring ·
│                                              advisory-score · explainable-scoring · human-in-the-loop-evaluation
└─ Кластер 5. Что разрешено                → erc-ai-guidelines · ai-in-peer-review · right-to-explanation ·
                                               defensible-shortlist
```

Кластеры 3 и 4 связаны попарно и это несущая конструкция всей сети: **каждая поломка имеет
названный ответ**. halo-effect → независимые линзы. position-bias → независимый прогон.
inter-rater-reliability → Spread. rubric-drift → версионирование рубрики. Читатель, попавший на
любую страницу «поломки», обязан за один клик оказаться на «починке», и наоборот. Это же даёт
AI-движку связный граф: он видит не 26 определений, а модель предметной области.

### 4.2 Три обязательные связи на каждой странице термина

Ни одного термина без всех трёх. Страница, у которой не набирается три, не публикуется.

1. **Горизонталь — сосед по механике** (2–4 ссылки). Не «похожие термины», а именно пара
   поломка ↔ починка или гейт ↔ следующий гейт. Формулируется предложением, не списком тегов:
   «Расхождение судей измеряется через → *score spread*; когда оно устойчиво высокое, причина
   обычно в → *rubric drift*».
2. **Вертикаль вверх — trust-страница как доказательство.** Термин определяет, trust-страница
   доказывает. score-spread → `/trust/consistency-reliability`. evidence-grounded-scoring →
   `/product/evidence-based-reports`. advisory-score + human-in-the-loop → `/trust/methodology`.
   erc-ai-guidelines → `/trust/use-cases/grants-prizes`. Обратная ссылка обязательна: на
   trust-странице первое вхождение термина линкуется в глоссарий.
3. **Вертикаль вбок — статья блога как история.** Определение отвечает «что это», статья —
   «что мы с этим пережили». Готовые пары из существующего блога:

| Термин | Статья |
|---|---|
| ai-judge-panel, llm-as-a-judge | `the-bias-in-a-single-ai-judge` |
| score-spread, inter-rater-reliability | `when-every-deck-scores-a-five` |
| reproducible-scoring, deterministic-aggregation | `same-deck-same-score` |
| deck-triage, batch-evaluation | `hundreds-of-decks-one-shortlist` |
| rubric-anchoring, judge-calibration | `what-judges-look-for-in-a-pitch-deck`, `how-evallense-evaluates-pitch-decks` |
| defensible-shortlist, advisory-score | `judging-at-demo-day-scale` |
| explainable-scoring | `how-to-evaluate-an-ai-evaluation-tool` |

Пять терминов пока без статьи: position-bias, self-preference-bias, rubric-drift, screening-memo,
erc-ai-guidelines. Это готовый контент-план: **термин без истории — это заявка в блог**, и такая
заявка сильнее, чем тема, придуманная с нуля.

### 4.3 Анатомия страницы термина

Порядок блоков подчинён извлекаемости, а не читаемости — в этом слое цитируют первый абзац.

1. **Определение одним абзацем, 40–60 слов, без бренда.** Первое предложение обязано быть
   вырезаемым целиком и оставаться верным вне контекста. Упоминание EvalLens в первом абзаце
   снижает шанс цитирования — бренд появляется в блоке 4.
2. **«Почему это важно при отборе заявок»** — перевод на язык организатора, 2–3 предложения.
3. **Как это ломается на практике** — конкретика с числом.
4. **Как это устроено у нас** — вот здесь бренд, наш порог/механизм. Один абзац, без продажи.
5. **Связанные термины** — горизонталь предложением.
6. **FAQ, 2–3 вопроса** в естественных формулировках (`FAQPage` schema).
7. **Куда дальше** — trust-страница + статья.

Разметка: `DefinedTerm` внутри `DefinedTermSet` на хабе (это точнее, чем произвольный
`DefinitionalContent`), `FAQPage` на блоке 6, `BreadcrumbList` везде. Хаб перечисляет все термины
как `hasDefinedTerm` — именно это даёт AI-движку «этот источник владеет словарём», а не
«у этого источника есть страница про слово».

### 4.4 Правила против превращения хаба в свалку

- **Порог 300 слов уникального содержания** (правило pSEO-карты) ужесточается: не 300 слов
  вообще, а **300 слов, из которых блоки 3–4 непустые**. Нет нашего числа или механизма — нет
  страницы, термин живёт строкой на хабе с определением в одно предложение прямо там.
- **Один термин — один URL.** Синонимы (deal-flow-triage / deck-triage, llm-as-a-jury /
  ai-judge-panel) сводятся к одному каноническому, второй упоминается в тексте как синоним.
- **Глоссарий никогда не primary по коммерческому запросу.** Правило §5 keyword-map сохраняется:
  reproducible-scoring определяет, `/trust/consistency-reliability` продаёт. В title
  глоссарной страницы формула «X: определение» или «What is X», без слов software / tool / platform.
- **Ни одной страницы-сироты**: попадание в кластер хаба + минимум две входящие горизонтальные.
- **Регуляторные страницы (Кластер 5) проходят юридическую вычитку** перед публикацией и несут
  дату + ссылку на первоисточник. Это единственный кластер, где ошибка стоит доверия, а не позиций.

## 5. Что запускать первым: 8 терминов

Критерий отбора: свободная или неверно занятая выдача × наш непубличный факт в определении ×
попадание в реальный вопрос покупателя. Первые четыре образуют самодостаточную мини-сеть
(поломка → починка), поэтому запускаются одной пачкой.

1. **`/glossary/score-spread`** — выдачи нет вообще, термин наш, порог 3.0 — самое цитируемое
   число, которое у нас есть. Якорь всего кластера «что ломается».
2. **`/glossary/ai-judge-panel`** (llm-as-a-jury) — рынок хором утверждает «больше судей лучше»,
   у нас 1000+ прогонов против, и свежая внешняя работа подтверждает нас. Самая сильная позиция
   в списке: мы не добавляем определение, мы поправляем консенсус.
3. **`/glossary/advisory-score`** — выдача пустая и бессвязная, а разделение AI Total Score /
   Jury Score архитектурно наше. Термин можно занять целиком.
4. **`/glossary/deterministic-aggregation`** — устойчивого определения нет, а Function 1 —
   готовый механизм. Пара к reproducible-scoring.
5. **`/glossary/llm-as-a-judge`** — самый объёмный спрос в списке. Топ занят dev-tooling и
   к заявкам не относится; окно на второе значение термина закрывается в течение года.
6. **`/glossary/deck-triage`** — слово triage свободно (подтверждено дважды), интент коммерческий,
   кормит `/trust/use-cases/vc-open-calls`.
7. **`/glossary/erc-ai-guidelines`** — единственный термин, который снимает конкретный риск
   доверия на живой странице `/trust/use-cases/grants-prizes`, и единственный, где мы отвечаем
   на вопрос, который никто не отвечает («что тогда можно»).
8. **`/glossary/evidence-grounded-scoring`** — наш differentiator, который AI-движки уже
   воспроизводят дословно; определение закрепляет за нами формулировку.

Ближайший резерв, идёт девятым-двенадцатым: position-bias, self-preference-bias, rubric-drift,
defensible-shortlist. Все четыре сильны, но требуют по 300+ слов оригинального разбора, поэтому
не в первую пачку.

Вход в работу по правилу pSEO-карты: **Фаза 2 не стартует, пока страницы Фазы 1 не в индексе.**
Исключение имеет смысл обсудить ровно для одного пункта — `erc-ai-guidelines`: он чинит
существующий риск на живой странице, а не добывает трафик, и потому не зависит от индексации.

## 6. Открытые вопросы

1. Публикуем ли `right-to-explanation` (Art. 86) до юридической вычитки. Мнение: нет — Annex III
   scope требует аккуратной оговорки, ошибка здесь дороже позиции.
2. `defensible-shortlist` честно включает наш gap (rubric versioning, immutable history).
   Сначала решаем продуктово, идём ли туда, потом пишем страницу. Иначе определение работает
   против нас.
3. Число прогонов на всех новых страницах — 1000+ (не 400+). В `.agents/product-marketing.md` §11
   всё ещё 400+, синхронизировать до запуска.
4. Канонический домен по-прежнему не зафиксирован (открытый вопрос №1 pSEO-карты) — блокирует
   создание раздела `/glossary/`.
