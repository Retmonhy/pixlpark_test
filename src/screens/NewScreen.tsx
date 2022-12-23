import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import { Button, Layout, Loader, New } from '../components';
import store from '../store';

const timerValue = 60;

export const NewsScreen = observer(() => {
  const { news, fetchNews, isLoading } = store.app;
  const [time, setTime] = useState<number>(timerValue);

  useEffect(() => {
    fetchNews().then(() => {
      setTime(timerValue);
    });
  }, []);
  useEffect(() => {
    if (time === 0 && !isLoading) {
      (async () => {
        await fetchNews();
        setTime(timerValue);
      })();
    }
    const timeInterval = setInterval(() => {
      setTime((prev) => (prev > 0 ? prev - 1 : prev));
    }, 1000);
    return () => {
      clearInterval(timeInterval);
    };
  }, [time]);
  const refreshControlCb = async () => {
    await fetchNews();
    setTime(timerValue);
  };
  console.log(
    'news = ',
    toJS(news).filter((i) => i.kids?.length! > 3)
  );
  return (
    <Layout>
      <h1 className="news__header">Новости</h1>
      <RefreshControls time={time} callback={refreshControlCb} />
      <div className="news-wrapper">
        {isLoading ? (
          <Loader />
        ) : (
          news.map((item) => {
            return (
              <Link to={`/${item.id}`} relative="path" replace={true} key={toJS(item).url}>
                <New item={item} />
              </Link>
            );
          })
        )}
      </div>
    </Layout>
  );
});

interface IRefreshControls {
  time: number;
  callback: () => void;
}
const RefreshControls: FC<IRefreshControls> = ({ time, callback }) => {
  return (
    <div className="refresh-controls">
      <div>
        <div className="">
          <p>{`Обновление через: ${time}`}</p>
        </div>
      </div>
      <div>
        <Button onClick={callback} title="Обновить" />
      </div>
    </div>
  );
};
