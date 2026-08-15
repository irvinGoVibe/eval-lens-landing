# EvalLens (evallens.io): baseline поисковой видимости

Дата замера: 2026-08-15
Метод: WebSearch (US-выдача), 15 EN-запросов, фиксация присутствия evallens.io + топ-3 доменов на запрос. Ничего не правилось, только замер.

## Таблица: запрос → мы → кто в топе

| # | Запрос | evallens.io в выдаче | Топ-3 домена в выдаче |
|---|--------|----------------------|------------------------|
| 1 | pitch deck evaluation software | Нет | v7labs.com, saastr.ai, seedangels.ai (далее: seedblink.com, evalyze.ai, slidebean.com) |
| 2 | AI pitch deck analyzer for investors | Нет | v7labs.com, seedblink.com, saastr.ai (далее: seedangels.ai, evalyze.ai, pitchgrade.com) |
| 3 | how to screen hundreds of pitch decks | Нет | morsebrige.substack.com, medium.com, linkedin.com (контент, не продукты) |
| 4 | accelerator application screening software | Нет | gitnux.org (листикл), submit.com, acceleratorapp.co (далее: awardsflow.com, sopact.com) |
| 5 | pitch competition judging software | Нет | launchpad6.com, keepthescore.com, sopact.com (далее: scorejudge.com, judgescoring.com, gitnux.org) |
| 6 | hackathon judging software | Нет | github.com (hackutd/jury, gavel), ideawake.com, guide.mlh.io (далее: hackscore.ae, scorejudge.com) |
| 7 | grant application review software AI | Нет | sopact.com, foundant.com, submittable.com (далее: smartsimple.com) |
| 8 | deal flow triage tool | Нет | worldmetrics.org (листикл), stackby.com, monday.com (далее: dealroom.net, v7labs.com, affinity.co) |
| 9 | AI judge for startup competitions | Нет | offers.hubspot.com, sopact.com, worldsummit.ai (далее: arxiv.org, raisesummit.com) |
| 10 | angel network deck screening | Нет | alejandrocremades.com, elev-x.com, storydoc.com. Выдача замусорена MTG-колодами «Angel deck» (tappedout.net, archidekt.com и т.п.) |
| 11 | evallens | Нет | kelpietriss.wordpress.com, facebook.com, working-dog.com. Брендовый SERP целиком у шведского питомника келпи Evallens Kennel (evallens.se) |
| 12 | EvalLens pitch deck | Нет | evalyze.ai, visme.co, bestpitchdeck.com. Поиск «поглощает» бренд и подставляет Evalyze |
| 13 | dealum alternative | Нет | g2.com, cbinsights.com, vcstack.io (далее: tracxn.com, blog.dealum.com, alternativeto.net) |
| 14 | reproducible AI pitch deck scoring | Нет | evalyze.ai, creworklabs.com, pitchgrade.com (далее: seedblink.com, pitchleague.ai, inodash.com, deckvue.ai) |
| 15 | LLM as a judge pitch decks | Нет | speakerdeck.com, evidentlyai.com, patronus.ai (далее: confident-ai.com, langfuse.com, wikipedia.org). Только dev-tooling-контент про LLM-евалы, ноль про скрининг дек |

Итог по присутствию: 0 из 15 запросов показывают evallens.io.

## Выводы

### 1. Брендовый SERP не наш, и это срочнее всего
По запросу «evallens» выдачу целиком держит шведский питомник австралийских келпи (evallens.se, WordPress-блоги, Facebook-группы, working-dog.com). По «EvalLens pitch deck» поиск вообще подменяет бренд на Evalyze (evalyze.ai) и отдаёт им два первых результата. То есть даже человек, которому нас порекомендовали по имени, до сайта через поиск не дойдёт. Минимальный набор: индексация evallens.io, брендовые упоминания на сторонних площадках (каталоги, соцпрофили, пресс-упоминания), чтобы вытеснить питомник хотя бы из топ-3, и различимость от Evalyze в копии (у них founder-facing анализ, у нас investor/organizer-side screening).

### 2. Где реально конкурировать: organizer-side screening интенты, где всё держит один Sopact
Sopact встречается в выдаче 4 запросов из 15 (pitch competition judging, competition judging software, grant application review AI, AI judge for startup competitions) за счёт программатик-страниц /use-case/<интент>. Это ровно наши ICP-интенты (жюри, скрининг заявок, рубрики, AI-first-pass + человек решает), и конкурент там один, остальное — листиклы (gitnux, worldmetrics) и генерик-скоринг (scorejudge, keepthescore). Паттерн «страница под интент» у нас воспроизводим: pitch competition judging, accelerator application screening, grant review, hackathon judging.

### 3. Где пусто: наши «родные» формулировки никем не заняты
- «reproducible AI pitch deck scoring»: никто не владеет словом reproducible, выдача — founder-facing анализаторы (Evalyze, PitchGrade, PitchLeague). Наш differentiator (воспроизводимость, консистентная рубрика, 1000+ прогонов) свободен.
- «LLM as a judge pitch decks»: выдача только про евалы LLM-приложений (Evidently, Patronus, Confident AI, Langfuse). Никто не соединил LLM-as-a-judge с deck screening — чистая тема для блога/Newsroom, способная собрать и AEO-цитируемость.
- «deal flow triage tool»: нет ни одного продукта, спозиционированного как triage, только генерик deal-flow CRM (Affinity, DealRoom, monday). Слово triage свободно.
- «angel network deck screening»: выдача частично замусорена карточной игрой Magic: The Gathering, осмысленного продуктового контента почти нет.
- «how to screen hundreds of pitch decks»: в топе одиночный Substack-пост и generic-советы LinkedIn. How-to контент с реальной методологией (наша Routing Matrix, screening-мемо) может забрать интент.

### 4. Кого чаще всего цитируют: кандидаты на off-site площадки
По частоте появления в 15 выдачах:
- Sopact (4 запроса), Evalyze (4), V7 Labs (3), SeedBlink (3) — конкуренты/соседи, у которых учиться, а не размещаться.
- Площадки-агрегаторы, куда можно встать: G2 и CB Insights + VC Stack + Tracxn + AlternativeTo (весь интент «dealum alternative» состоит из них; профиль EvalLens в каждом = попадание в сравнительные выдачи), листиклы gitnux.org / worldmetrics.org («Top 10 … software 2026» — они ранжируются по 2+ нашим запросам), guide.mlh.io (organizer-гайд по hackathon-судейству), GitHub (open-source judging-тулзы hackutd/jury и gavel ранжируются сами по себе).
- Контентные площадки, которые поиск любит в этой нише: Substack и Medium (оба в топе по how-to интентам), LinkedIn-статьи, arxiv (для research-угла про judge assignment).

### Приоритет действий (без правок, только вывод замера)
1. Брендовая гигиена: индексация + сторонние брендовые упоминания (пункт 1).
2. Программатик use-case-страницы под organizer-интенты против Sopact (пункт 2).
3. Контент под пустые формулировки: reproducible scoring, LLM-as-a-judge для дек, deck triage, how-to screening (пункт 3).
4. Профили на G2 / CB Insights / VC Stack / Tracxn / AlternativeTo + аутрич в листиклы gitnux/worldmetrics (пункт 4).
