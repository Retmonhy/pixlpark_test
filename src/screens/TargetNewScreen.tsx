import { toJS } from "mobx";
import { observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ErrorBoundary, Layout, Loader } from "../components";
import { formateTime } from "../shared/functions";
import store from "../store";

export const TargetNewScreen = observer(() => {
  const { targetNew, setTargetNew, fetchOneNew, fetchComment } = store.app;

  const { id } = useParams();
  const [isLoading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    (async () => {
      if (!id || id === targetNew?.item.id) return;
      setLoading((prev) => !prev);
      const data = await fetchOneNew(id);
      data?.kids.forEach((item) => {
        fetchComment(item);
      });

      setLoading((prev) => !prev);
      if (data) {
        setTargetNew(data);
      }
    })();
  }, []);
  console.log("targetNew = ", toJS(targetNew));
  return (
    <Layout goBack={true}>
      <div className='targetNew--header'>
        <ErrorBoundary>
          {isLoading ? (
            <Loader />
          ) : (
            <div className='targetNew--content'>
              <div className='new--info'>
                <span>
                  {targetNew?.item.by} | {targetNew && formateTime(targetNew?.item.time)}
                </span>
              </div>
              <h1 className='targetNew--title'>{targetNew?.item.title}</h1>
              <div>
                <a href={targetNew?.item.url}>Перейти к оригиналу &#129122;</a>
                <div className='targetNew--mainText'>
                  <p>
                    МОСКВА, 20 дек — РИА Новости. Украина должна получать все больше и больше военной помощи от западных
                    стран, заявил премьер-министр Великобритании Риши Сунак, выступая на саммите лидеров стран Северной
                    Европы. Его слова приводит Washington Examiner. Политик также призвал сконцентрироваться на лишении
                    России способности к перегруппировке и дальнейшей возможности пополнять запасы вооружений. "Это
                    означает необходимость преследовать российские цепочки поставок вооружений и пресечение
                    международной поддержки", — подчеркнул он. Ранее Сунак назвал переговоры о прекращении огня на
                    Украине бессмысленными до тех пор, пока "российские военные находятся на территории республики".
                    Россия начала военную операцию на Украине 24 февраля. Президент Владимир Путин назвал ее целью
                    "защиту людей, которые на протяжении восьми лет подвергаются издевательствам, геноциду со стороны
                    киевского режима". Для этого, по его словам, планируется провести "демилитаризацию и денацификацию
                    Украины", предать суду всех ответственных за "кровавые преступления против мирных жителей" Донбасса.
                    При этом Путин заявлял, что Россия открыта к переговорам по Украине, и если Киев созреет, тогда
                    будут востребованы посреднические усилия тех, кто их предлагает. При этом западные страны все чаще
                    говорят о необходимости продолжения Киевом боевых действий, а также поставляют ему вооружения и
                    готовят украинских военных на своей территории. Украинские военные ведут огонь из американской
                    гаубицы М777 в Донецкой области - РИА Новости, 1920, 20.12.2022 08:00 "Это бездонная яма". С какой
                    проблемой столкнулись в НАТО 181 2770 39 15 1229 479 В миреРиши СунакВладимир ПутинРоссияУкраинаКиев
                    Популярные комментарии Да что же такое, Наполеоны последнее время плодятся как кролики. Или они как
                    амёбы размножаются делением? 20 декабря, 11:29 164 Евгений Кириллов Евгений Кириллов Танцор Диско ))
                    Всё как в фильме: 1 удар - пятеро падают... 20 декабря, 11:24 158 Oleg Zhavoronkov Oleg Zhavoronkov
                    Все комментарии Яндекс Игры РЕКЛАМА • 0+ Сыграйте в бесплатную игру «Угадай предметы из СССР»
                    smenastation.com РЕКЛАМА Лагерь для взрослых в
                  </p>
                </div>
                <div className='targetNew--commentBlock'>
                  <div className='targetNew--commentBlock-comment'>
                    <span className='comment-span comment-svg'>
                      <svg height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'>
                        <g fill='none' fillRule='evenodd'>
                          <path d='M0 0h24v24H0z'></path>
                          <path
                            d='M16.9 4H7.1c-1.15 0-1.73.11-2.35.44-.56.3-1 .75-1.31 1.31C3.11 6.37 3 6.95 3 8.1v5.8c0 1.15.11 1.73.44 2.35.3.56.75 1 1.31 1.31l.15.07c.51.25 1.04.35 1.95.37h.25v2.21c0 .44.17.85.47 1.16l.12.1c.64.55 1.6.52 2.21-.08L13.37 18h3.53c1.15 0 1.73-.11 2.35-.44.56-.3 1-.75 1.31-1.31.33-.62.44-1.2.44-2.35V8.1c0-1.15-.11-1.73-.44-2.35a3.17 3.17 0 0 0-1.31-1.31A4.51 4.51 0 0 0 16.9 4zM6.9 5.8h9.99c.88 0 1.18.06 1.5.23.25.13.44.32.57.57.17.32.23.62.23 1.5v6.16c-.02.61-.09.87-.23 1.14-.13.25-.32.44-.57.57-.32.17-.62.23-1.5.23h-4.02a.9.9 0 0 0-.51.26l-3.47 3.4V17.1c0-.5-.4-.9-.9-.9H6.74a2.3 2.3 0 0 1-1.14-.23 1.37 1.37 0 0 1-.57-.57c-.17-.32-.23-.62-.23-1.5V7.74c.02-.61.09-.87.23-1.14.13-.25.32-.44.57-.57.3-.16.58-.22 1.31-.23z'
                            fill='#777'
                            fillRule='nonzero'></path>
                        </g>
                      </svg>
                    </span>
                    <span className='comment-span comment-text'>{targetNew?.item.descendants}</span>
                  </div>
                </div>
                <section></section>
              </div>
            </div>
          )}
        </ErrorBoundary>
      </div>
    </Layout>
  );
});
