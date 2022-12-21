import { observer } from "mobx-react-lite";
import { FC } from "react";
import { formateTime } from "../shared/functions";
import { INew } from "../types";
interface NewProps {
  item: INew;
}
export const New: FC<NewProps> = observer(({ item }) => {
  //что то даты каке-то старые
  return (
    <div className='new--padding'>
      <div className='new--wrapper'>
        <div className='new--header'>
          <h3 className='new--title'>{item.title}</h3>
          <span className='new--score'>Рейтинг: {item.score}</span>
        </div>
        <div className='new--info'>
          <span>
            {item.by} | {formateTime(item.time)}
          </span>
        </div>
      </div>
    </div>
  );
});
