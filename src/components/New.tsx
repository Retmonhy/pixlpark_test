import { observer } from 'mobx-react-lite';
import { FC } from 'react';
import { INew } from '../types';
interface NewProps {
  item: INew;
}
export const New: FC<NewProps> = observer(({ item }) => {
  return <div>{item.title}</div>;
});
