import { FC } from 'react';

interface IButtonProps {
  title: string;
  onClick: () => void;
}
export const Button: FC<IButtonProps> = ({ title, onClick }) => {
  return (
    <button className="btn" onClick={onClick}>
      {title}
    </button>
  );
};
