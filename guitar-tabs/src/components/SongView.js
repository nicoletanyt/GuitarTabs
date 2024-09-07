import React, { useContext, useEffect, useState } from "react";
import { useParams, Link, useSearchParams } from "react-router-dom";
import { context } from "../App";
import { FaLessThan } from "react-icons/fa6"
import TabView from "./TabView";

export default function SongView() {
  const { id } = useParams();
  const { songs } = useContext(context);
  const song = songs[id];

  // for playing of song
  const [current, setCurrent] = useState(-1)
  const [playing, setPlaying] = useState(false)
  let beatInterval;

  const tick = () => {
    setCurrent((c) => c + 1);
  }

  useEffect(() => {
    console.log(current)
  }, [current])

  useEffect(() => {
    if (playing) {
      let beatInterval = setInterval(tick, (60 * 1000) / song.bpm); 

      // cleanup function to clear the interval when playing is false or component unmounts
      return () => {
        clearInterval(beatInterval);
      };
    }

  }, [playing])

  return (
    <div id="tabview-wrapper">
      <Link to="/" id="back-btn" className="button">
        <FaLessThan />
        <p>Back</p>
      </Link>
      <h1>{song.title}</h1>
      <p>{song.artist}</p>
      <p>Beats per minute (BPM): {song.bpm}</p>
      <button onClick={() => setPlaying(true)}>Play</button>
      <button onClick={() => setPlaying(false)}>Pause</button>
      <button onClick={() => {setCurrent(-1); setPlaying(false)}}>Restart</button>
      <div>
        {song.tabs.map((item, id) => {
          return <TabView key={id} line={item} currentBeat={current} />;
        })}
      </div>
    </div>
  );
}
