import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ErrorBoundary } from '../components/ErrorBoundary';
import store from '../store';
import { INew } from '../types';

export const CurrentNewScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [targetNew, setTargetNew] = useState<INew | undefined>(undefined);
  if (!id) {
    return <div>Что-то пошло не так</div>;
  }
  // useEffect(() => {
  //   setTargetNew(store.app.fetchOneNew(+id));
  // });
  return (
    <div className="targetNew--header">
      <ErrorBoundary>
        <button
          className="btn"
          onClick={() => {
            navigate('..');
            console.log('</div> = ');
          }}
        >
          К списку новостей
        </button>
        <h1 className="targetNew--title">
          {targetNew?.by} новость {id}
        </h1>
      </ErrorBoundary>
    </div>
  );
};
