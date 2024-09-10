import React, { useContext, useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaPlay, FaPause, FaPen, FaCheck, FaTrash } from "react-icons/fa6";
import { MdRestartAlt } from "react-icons/md";
import TabView from "./TabView";
import { Tab } from "../Objects";

export default function SongView() {
  const { id } = useParams();
  const songs = JSON.parse(localStorage.getItem("guitar-tab-songs"));
  const navigate = useNavigate();
  let song = songs[id]

  const [editable, setEditable] = useState(false)
  const [editedSong, setEditedSong] = useState(song);

  // for playing of song
  const [current, setCurrent] = useState(-1);
  const [playing, setPlaying] = useState(false);

  const tick = () => {
    setCurrent((c) => c + 1);
  };

  const saveChanges = () => {
    setEditable(false);
    songs[id] = editedSong
    // save to local storage
    localStorage.setItem("guitar-tab-songs", JSON.stringify(songs));
  }
  const handleEditedSong = (data) => {
    song.tabs[data.id] = new Tab(data.lyrics, data.tabs);
    setEditedSong(song);
  };

  const deleteSong = () => {
    let response = window.confirm("Delete this song?")
    if (response) {
      // delete song from local storage
      delete songs[id]
      localStorage.setItem("guitar-tab-songs", JSON.stringify(songs));
      // redirect to home page
      navigate("/")
    }
  }

  useEffect(() => {
    if (playing) {
      let beatInterval = setInterval(tick, (60 * 1000) / song.bpm);

      // cleanup function to clear the interval when playing is false or component unmounts
      return () => {
        clearInterval(beatInterval);
      };
    }
  }, [playing]);
  
  useEffect(() => {
    // at the end of the tab, scroll down by one tab height
    if (current % 39 == 0) {
      window.scroll({
        top: document.querySelector(".tab-component").clientHeight,
        behavior: "instant",
      });
    }
  }, [current])

  return (
    <div id="tabview-wrapper">
      { song != undefined ?
        <>
          <div className="create-top-bar">
            <div className="title-wrapper">
              <Link to="/" className="button back-btn">
                <FaArrowLeft className="icon" />
              </Link>
              <h1>{song.title}</h1>
            </div>
            <div className="buttons-wrapper">
              {editable ? (
                <div className="edit-btn" onClick={saveChanges}>
                  <FaCheck className="icon" />
                  <p>Done</p>
                </div>
              ) : (
                <div className="edit-btn" onClick={() => setEditable(true)}>
                  <FaPen className="icon" />
                  <p>Edit</p>
                </div>
              )}
              <div className="delete-btn" onClick={deleteSong}>
                <FaTrash className="icon" />
                <p>Delete</p>
              </div>
            </div>
          </div>
          <p>{song.artist}</p>
          <p>Beats per minute (BPM): {song.bpm}</p>
          <p>
            Duration of song:{" "}
            {Math.floor(song.duration / 60) > 0 &&
              Math.floor(song.duration / 60) + " minutes"}{" "}
            {song.duration % 60 > 0 && (song.duration % 60) + "seconds"}
          </p>
          <div className="player-btn-wrapper">
            {playing ? (
              <button className="button" onClick={() => setPlaying(false)}>
                <FaPause className="icon" />
                <p>Pause</p>
              </button>
            ) : (
              <button className="button" onClick={() => setPlaying(true)}>
                <FaPlay className="icon" />
                <p>Play</p>
              </button>
            )}
            <button
              onClick={() => {
                setCurrent(-1);
                setPlaying(false);
              }}
              className="button"
            >
              <MdRestartAlt className="icon" />
              <p>Restart</p>
            </button>
          </div>
          <div>
            {song.tabs.map((item, id) => {
              return (
                <TabView
                  key={id}
                  line={item}
                  currentBeat={current}
                  tabNum={id}
                  editable={editable}
                  handleEditedSong={handleEditedSong}
                />
              );
            })}
          </div>
        </> : <p>Loading song...</p>
      }
    </div>
  );}
