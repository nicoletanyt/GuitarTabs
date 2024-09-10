import React, { useContext } from 'react'
import Tabbar from './Tabbar'
import SongList from './SongList'

export default function Homepage() {
  const songs = JSON.parse(localStorage.getItem("guitar-tab-songs"));

  return (
    <div id="homepage">
      <Tabbar />
      {songs != null ? <SongList /> : <p>No songs added.</p>}
    </div>
  );
}
