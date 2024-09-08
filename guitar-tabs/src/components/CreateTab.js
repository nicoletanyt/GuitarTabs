import React, { useEffect, useState, useContext } from 'react'
import TabView from './TabView';
import { Song, Tab } from '../Objects';
import { FaPlus, FaCheck, FaArrowLeft } from "react-icons/fa6";
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

  const handleEditedSong = (data) => {
    const updatedTab = tabs.map((t, id) =>
      id == data.id ? new Tab(data.lyrics, data.tabs) : t
    );
    setTabs(updatedTab)
  }

  const saveSong = () => {
    let dictKey =
      title.toLowerCase().split(" ").join("-") + "-" + artist.toLowerCase().split(" ").join("-");
    console.log(new Song(title, artist, tabs, beats, duration));
    setSongs((prev) => ({ ...prev, [dictKey]: new Song(title, artist, tabs, beats, duration) }));
    // save to local storage 
    localStorage.setItem("guitar-tab-songs", JSON.stringify(songs))
  }

  return (
    <div id="create-view">
      <div className="create-top-bar">
        <div className="top-bar-left">
          <Link to="/" className="back-btn button">
            <FaArrowLeft className="icon" />
          </Link>
          <h1>Create Guitar Tab</h1>
        </div>
        <Link to="/" id="done-btn" className="button" onClick={saveSong}>
          <FaCheck className="icon" />
          <p>Save Tabs</p>
        </Link>
      </div>
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
      <br />
      <hr />
      <div id="tab-editor">
        {tabs.map((item, id) => {
          return (
            <TabView
              key={id}
              line={item}
              tabNum={id}
              editable={true}
              handleEditedSong={handleEditedSong}
            />
          );
        })}
      </div>
      <br />
      <button id="add-tabs-btn" className="button" onClick={addTab}>
        <FaPlus className="icon" />
        <p>Add more tabs</p>
      </button>
    </div>
  );
}
