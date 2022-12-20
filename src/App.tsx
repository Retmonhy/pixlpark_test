import { observer } from "mobx-react-lite";
import React from "react";
import { useEffect } from "react";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import "./App.css";
import { New } from "./components/New";
import { CurrentNewScreen } from "./screens/CurrentNewScreen";
import { NewsScreen } from "./screens/NewScreen";
import store from "./store";

export const App = observer(() => {
  return (
    <div>
      <div className='container'>
        <Routes>
          <Route path='/' element={<NewsScreen />}></Route>
          <Route path='/:id' element={<CurrentNewScreen />} />
        </Routes>
      </div>
    </div>
  );
});
