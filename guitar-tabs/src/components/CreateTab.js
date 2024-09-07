import React, { useEffect, useState, useContext } from 'react'
import TabView from './TabView';
import { Song, Tab } from '../Objects';
import { FaLessThan, FaCheck, FaPlus } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { context } from '../App';
import { tabSize } from '../App';

export default function CreateTab() {
    const { songs, setSongs } = useContext(context);
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [beats, setBeats] = useState(0)
  const [duration, setDuration] = useState(0)

  // e.g. 4/4 beats
  // notes are stored as 1--0|----|----|----|----|----. the | indicates a new string, - indicates no note is played. numbers correspond to the fret number
  // the dash used is — (the 1 em dash)
  const defaultTab = new Tab(
        "",
        Array(6)
          .fill(["-".repeat(tabSize * 4)])
          .join("|")
      )
  const [tabs, setTabs] = useState([defaultTab]);
  // 1--0|1---|1---|--3-|-2--|--1-

  const addTab = () => {
    setTabs((t) => [
      ...t,
      defaultTab
    ]);
  };

  const saveSong = () => {
    console.log(setSongs)
    let dictKey =
      title.toLowerCase().split(" ").join("-") + "-" + artist.toLowerCase().split(" ").join("-");
    setSongs((prev) => ({ ...prev, [dictKey]: new Song(title, artist, tabs, beats, duration) }));
  }

  return (
    <div id="create-view">
      <div id="create-top-bar">
        <Link to="/" id="back-btn" className="button">
          <FaLessThan />
          <p>Back</p>
        </Link>
        <Link to="/" id="done-btn" className="button" onClick={saveSong}>
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
        <div>
          <label htmlFor="artist-input">Beats per minute: </label>
          <input
            type="text"
            id="beats-input"
            value={beats}
            onChange={(ev) => setBeats(ev.target.value)}
            placeholder="Enter BPM of song (optional)..."
          />
        </div>
        <div>
          <label htmlFor="artist-input">Duration of song: </label>
          <input
            type="text"
            id="duration-input"
            value={duration}
            onChange={(ev) => setDuration(ev.target.value)}
            placeholder="Enter duration of song (optional)..."
          />
        </div>
      </div>
      <p>Time Signature: 4/4</p>
      <p>Number of bars per row: 10</p>
      <br />
      <hr />
      <div id="tab-editor">
        {tabs.map((item, id) => {
          return <TabView key={id} line={item} />;
        })}
      </div>
      <br />
      <button id="add-tabs-btn" className="button" onClick={addTab}>
        <FaPlus />
        <p>Add more tabs</p>
      </button>
    </div>
  );
}
