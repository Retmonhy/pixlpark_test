import { observer } from "mobx-react-lite";
import { FC, useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import { New } from "../components/New";
import store from "../store";
import { CurrentNewScreen } from "./CurrentNewScreen";

export const NewsScreen = observer(() => {
  const { news, fetchNews, isLoading } = store.app;
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
    fetchNews();
  }, []);

  return (
    <div>
      {isLoading ? (
        <p>Загрузка...</p>
      ) : (
        <>
          <h1 className='news__header'>Новости</h1>
          {/* <RefreshControls time={time} callback={fetchNews} /> */}
          <div className='news-wrapper'>
            {news.map((item) => {
              return (
                <Link to={`/${item.id}`} relative='path' replace={true}>
                  <New item={item} key={item.time} />
                </Link>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
});

interface IRefreshControls {
  time: number;
  callback: () => void;
}
const RefreshControls: FC<IRefreshControls> = ({ time, callback }) => {
  return (
    <div className='refresh-controls'>
      <div>
        <div className=''>
          <p>{`Обновление через: ${time}`}</p>
        </div>
      </div>
      <div>
        <button onClick={callback}>Обновить</button>
      </div>
    </div>
  );
};
