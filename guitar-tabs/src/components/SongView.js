import React, { useContext, useEffect, useState } from "react";
import { useParams, Link, useSearchParams } from "react-router-dom";
import { context } from "../App";
import { FaArrowLeft, FaPlay, FaPause } from "react-icons/fa6";
import { MdRestartAlt } from "react-icons/md";
import TabView from "./TabView";

export default function SongView() {
  const { id } = useParams();
  const { songs } = useContext(context);
  const song = songs[id];

  // for playing of song
  const [current, setCurrent] = useState(-1);
  const [playing, setPlaying] = useState(false);

  const tick = () => {
    setCurrent((c) => c + 1);
      // at the end of the tab, scroll down by one tab height 
    console.log()
  };

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
    if (current % 39 == 0) {
      window.scroll({
        top: document.querySelector(".tab-component").clientHeight,
        behavior: "instant"
      });
    }
  }, [current])

  return (
    <div id="tabview-wrapper">
      <div className="top-bar-left">
        <Link to="/" className="button back-btn">
          <FaArrowLeft className="icon" />
        </Link>
        <h1>{song.title}</h1>
      </div>
      <p>{song.artist}</p>
      <p>Beats per minute (BPM): {song.bpm}</p>
      <p>Duration of song: {Math.floor(song.duration/60) > 0 && Math.floor(song.duration/60) + " minutes"} {song.duration % 60 > 0 && song.duration % 60 + "seconds"}</p>
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
            <TabView key={id} line={item} currentBeat={current} tabNum={id} />
          );
        })}
      </div>
    </div>
  );
}
