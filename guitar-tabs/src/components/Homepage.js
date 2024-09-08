import React, { useContext } from 'react'
import Tabbar from './Tabbar'
import SongList from './SongList'
import { context } from '../App';

export default function Homepage() {
  const { songs } = useContext(context);
  return (
    <div id="homepage">
      <Tabbar />
      {songs ? <SongList /> : <p>Loading</p>}
    </div>
  );
}
