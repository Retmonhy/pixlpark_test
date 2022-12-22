import { observer } from 'mobx-react-lite';
import { FC, memo, useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import { Layout } from '../components/Layout';
import { Loader } from '../components/Loader';
import { New } from '../components/New';
import store from '../store';
import { TargetNewScreen } from './TargetNewScreen';

export const NewsScreen = observer(() => {
  const { news, fetchNews1, isLoading } = store.app;
  const [time, setTime] = useState<number>(60);
  // setInterval(() => {
  //   setTime((prev) => prev - 1);
  //   if (time === 0) {
  //     (async () => {
  //       await fetchNews();
  //       setTime(60);
  //     })();
  //   }
  // }, 1000);

  useEffect(() => {
    !isLoading && fetchNews1();
  }, []);
  console.log('isLoading = ', isLoading);
  return (
    <Layout>
      <h1 className="news__header">Новости</h1>
      {/* <RefreshControls time={time} callback={fetchNews} /> */}
      <div className="news-wrapper">
        {isLoading ? (
          <Loader />
        ) : (
          news.map((item) => {
            return (
              <Link to={`/${item.id}`} relative="path" replace={true} key={item.time}>
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
        <button onClick={callback}>Обновить</button>
      </div>
    </div>
  );
};
