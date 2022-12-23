import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ErrorBoundary, Layout, Loader } from '../components';
import { CommentsTree } from '../components/CommentsTree';
import { formateTime } from '../shared/functions';
import { CommentSvg } from '../shared/ui/assets/CommnetSvg';
import store from '../store';
import { Comment } from '../types';

export const TargetNewScreen = observer(() => {
  const { targetNew, setTargetNew, fetchOneNew, fetchComments } = store.app;

  const { id } = useParams();
  const [isLoading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    (async () => {
      if (!id || id === targetNew?.item.id) return;
      setLoading((prev) => !prev);
      const data = await fetchOneNew(id);

      if (data) {
        setTargetNew(data);
        data.kids && fetchComments(data.kids);
      }
      setLoading((prev) => !prev);
    })();
  }, []);
  return (
    <Layout goBack={true}>
      <div className="targetNew--header">
        <ErrorBoundary>
          {isLoading ? (
            <Loader />
          ) : (
            <div className="targetNew--content">
              <div className="new--info">
                <span>
                  {targetNew?.item.by} | {targetNew && formateTime(targetNew?.item.time)}
                </span>
              </div>
              <h1 className="targetNew--title">{targetNew?.item.title}</h1>
              <div>
                <a href={targetNew?.item.url}>Перейти к оригиналу &#129122;</a>
                <div className="targetNew--mainText">
                  <p>
                    МОСКВА, 20 дек — РИА Новости. Украина должна получать все больше и больше военной помощи от западных стран, заявил премьер-министр Великобритании Риши Сунак, выступая на саммите
                    лидеров стран Северной Европы. Его слова приводит Washington Examiner. Политик также призвал сконцентрироваться на лишении России способности к перегруппировке и дальнейшей
                    возможности пополнять запасы вооружений. "Это означает необходимость преследовать российские цепочки поставок вооружений и пресечение международной поддержки", — подчеркнул он.
                    Ранее Сунак назвал переговоры о прекращении огня на Украине бессмысленными до тех пор, пока "российские военные находятся на территории республики". Россия начала военную операцию
                    на Украине 24 февраля. Президент Владимир Путин назвал ее целью "защиту людей, которые на протяжении восьми лет подвергаются издевательствам, геноциду со стороны киевского режима".
                    Для этого, по его словам, планируется провести "демилитаризацию и денацификацию Украины", предать суду всех ответственных за "кровавые преступления против мирных жителей" Донбасса.
                    При этом Путин заявлял, что Россия открыта к переговорам по Украине, и если Киев созреет, тогда будут востребованы посреднические усилия тех, кто их предлагает. При этом западные
                    страны все чаще говорят о необходимости продолжения Киевом боевых действий, а также поставляют ему вооружения и готовят украинских военных на своей территории. Украинские военные
                    ведут огонь из американской гаубицы М777 в Донецкой области - РИА Новости, 1920, 20.12.2022 08:00 "Это бездонная яма". С какой проблемой столкнулись в НАТО 181 2770 39 15 1229 479
                    В миреРиши СунакВладимир ПутинРоссияУкраинаКиев Популярные комментарии Да что же такое, Наполеоны последнее время плодятся как кролики. Или они как амёбы размножаются делением? 20
                    декабря, 11:29 164 Евгений Кириллов Евгений Кириллов Танцор Диско )) Всё как в фильме: 1 удар - пятеро падают... 20 декабря, 11:24 158 Oleg Zhavoronkov Oleg Zhavoronkov Все
                    комментарии Яндекс Игры РЕКЛАМА • 0+ Сыграйте в бесплатную игру «Угадай предметы из СССР» smenastation.com РЕКЛАМА Лагерь для взрослых в
                  </p>
                </div>
                <div className="targetNew--commentBlock">
                  <div className="targetNew--commentBlock-comment">
                    <span className="comment-span comment-svg">
                      <CommentSvg />
                    </span>
                    <span className="comment-span comment-text">{targetNew?.item.descendants}</span>
                  </div>
                </div>
                <section>{targetNew?.kids && !isLoading && <CommentsTree comments={targetNew?.kids} />}</section>
              </div>
            </div>
          )}
        </ErrorBoundary>
      </div>
    </Layout>
  );
});
