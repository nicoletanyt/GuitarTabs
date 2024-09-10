import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { searchContext } from "../App";
import { FaTrash } from "react-icons/fa";

export default function SongList() {
  const songs = JSON.parse(localStorage.getItem("guitar-tab-songs"));
  const { search } = useContext(searchContext);

  const [songsShown, setSongsShown] = useState(Object.keys(songs));

  useEffect(() => {
    // whenever search changes, filter the songs available
    if (search != "") {
      setSongsShown(
      Object.keys(songs).filter((element) => {
        return element
          .toLowerCase()
          .includes(search.toLowerCase().split(" ").join("-"));
      })
      )
    } else {
      setSongsShown(Object.keys(songs));
    }
  }, [search]);

  // useEffect(() => {
  //   console.log(songsShown)
  // }, [songsShown])

  return (
    <ol id="tablist-wrapper">
      {songsShown.length > 0 ?
        songsShown.map((songTitle, id) => {
          if (songs[songTitle])
          return (
            <div key={id} className="song-display">
              <div>
                <Link to={`/guitar-tabs/${songTitle}`} className="song-title">
                  <p><span className="number">{id + 1}.</span> {songs[songTitle].title}</p>
                </Link>
                <p className="song-artist">{songs[songTitle].artist}</p>
                <br/>
              </div>
            </div>
          );
        }) : <p>No songs match your search.</p>
      }
    </ol>
  );
}
