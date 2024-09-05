import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { context } from '../App';

export default function SongList() {
    const { songs } = useContext(context);

  return (
    <div id="tablist-wrapper">
      {Object.keys(songs).map((songTitle, id) => {
        return (
          <div key={id} className="song-display">
            <Link to={`/guitar-tabs/${songTitle}`} className="song-title">
              <h2>{songs[songTitle].title}</h2>
            </Link>
            <p>{songs[songTitle].artist}</p>
          </div>
        );
      })}
      {/* <Outlet /> */}
    </div>
  );
}
