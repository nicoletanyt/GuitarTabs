import React, { useState } from 'react'
import TabView from './TabView';
import { Tab } from '../Objects';
import { FaLessThan, FaCheck } from "react-icons/fa6";
import { Link } from 'react-router-dom';

export default function CreateTab() {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");

  // e.g. 4/4 beats
  // notes are stored as 1--0|----|----|----|----|----. the | indicates a new string, - indicates no note is played. numbers correspond to the fret number
  // the dash used is — (the 1 em dash)
  const [tabs, setTabs] = useState([
    new Tab("Lyric 1", "1--0|1---|1---|--3-|-2--|--1-"),
  ]);

  return (
    <div id="create-view">
      <div id='create-top-bar'>
        <Link to="/" id="back-btn" className='button'>
          <FaLessThan />
          <p>Back</p>
        </Link>
        <Link to="/" id="done-btn" className='button'>
          <FaCheck />
          <p>Done</p>
        </Link>
      </div>
      <h1>Create Guitar Tab</h1>
      <br />
      {/* Input song details */}
      <div id="song-detail-input">
        <div>
          <label htmlFor="title-input">Song Title: </label>
          <input
            type="text"
            id="title-input"
            value={title}
            onChange={(ev) => setTitle(ev.target.value)}
            placeholder="Enter song title..."
          />
        </div>
        <div>
          <label htmlFor="artist-input">Artist: </label>
          <input
            type="text"
            id="artist-input"
            value={artist}
            onChange={(ev) => setArtist(ev.target.value)}
            placeholder="Enter artist name..."
          />
        </div>
      </div>
      <br />
      <hr />
      <div id="tab-editor">
        {tabs.map((item, id) => {
          return <TabView key={id} line={item} />;
        })}
      </div>
    </div>
  );
}
