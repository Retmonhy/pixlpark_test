import { observer } from "mobx-react-lite";
import React from "react";
import { useEffect } from "react";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import "./App.css";
import { New } from "./components/New";
import { TargetNewScreen } from "./screens/TargetNewScreen";
import { NewsScreen } from "./screens/NewScreen";
import store from "./store";

export const App = observer(() => {
  return (
    <Routes>
      <Route path='/' element={<NewsScreen />}></Route>
      <Route path='/:id' element={<TargetNewScreen />} />
    </Routes>
  );
});
