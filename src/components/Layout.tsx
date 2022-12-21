import { FC, ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface ILayoutProps {
  goBack?: boolean;
  children: ReactNode;
}
export const Layout: FC<ILayoutProps> = ({ goBack, children }) => {
  const navigate = useNavigate();
  return (
    <>
      <header className='site-header'>
        {goBack ? (
          <button className='btn' onClick={() => navigate("..")}>
            &#129120; Назад
          </button>
        ) : null}
        <p className='absolute-header site-header--header'>Новостной сайт</p>
      </header>
      <div className='container'>{children}</div>
    </>
  );
};
