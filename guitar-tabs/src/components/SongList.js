import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { context, searchContext } from "../App";

export default function SongList() {
  const { songs } = useContext(context);
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
    <div id="tablist-wrapper">
      {songsShown.length > 0 ?
        songsShown.map((songTitle, id) => {
          return (
            <div key={id} className="song-display">
              <Link to={`/guitar-tabs/${songTitle}`} className="song-title">
                <h2>{songs[songTitle].title}</h2>
              </Link>
              <p>{songs[songTitle].artist}</p>
            </div>
          );
        }) : <p>No songs match your search.</p>
      }
    </div>
  );
}
