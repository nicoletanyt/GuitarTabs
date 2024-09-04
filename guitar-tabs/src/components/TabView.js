import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { context } from "../App";

export default function TabView() {
  const { id } = useParams();
  const { songs } = useContext(context);
  const song = songs[id];

  return (
    <div id="tabview-wrapper">
      <h1>{song.title}</h1>
      <h2>{song.artist}</h2>
    </div>
  );
}
