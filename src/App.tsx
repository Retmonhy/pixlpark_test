import { observer } from 'mobx-react-lite';
import React from 'react';
import { useEffect } from 'react';
import './App.css';
import { New } from './components/New';
import { NewsScreen } from './screens/NewScreen';
import store from './store';

export const App = observer(() => {
  return (
    <div>
      {
        <div className="container">
          <NewsScreen />
        </div>
      }
    </div>
  );
});
