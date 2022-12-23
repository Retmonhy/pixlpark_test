import { FC, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './Button';

interface ILayoutProps {
  goBack?: boolean;
  children: ReactNode;
}
export const Layout: FC<ILayoutProps> = ({ goBack, children }) => {
  const navigate = useNavigate();
  return (
    <>
      <header className="site-header">
        {goBack ? <Button title="&#129120; Назад" onClick={() => navigate('..')} /> : null}
        <p className="absolute-header site-header--header">Новостной сайт</p>
      </header>
      <div className="container">{children}</div>
    </>
  );
};
