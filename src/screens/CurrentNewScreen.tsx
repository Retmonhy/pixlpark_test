import React from "react";
import { useParams } from "react-router-dom";

export const CurrentNewScreen = () => {
  const { id } = useParams();
  return <h1>новость {id}</h1>;
};
