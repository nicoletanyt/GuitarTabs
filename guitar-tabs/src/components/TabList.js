import { useContext } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { context } from '../App';

export default function TabList() {
    const { songs } = useContext(context);

  return (
    <div id="tablist-wrapper">
      {songs.map((song, id) => {
        return (
          <Link to="/tabview" key={id} className="song-display">
            <h3>{song.title}</h3>
            <p>{song.artist}</p>
          </Link>
        );
      })}
      {/* <Outlet /> */}
    </div>
  );
}
