import React, { useState } from "react";
import "./index.css"
import Homepage from "./components/Homepage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SongView from "./components/SongView";
import { Song, Tab } from "./Objects";
import CreateTab from "./components/CreateTab";

export const context = React.createContext(null);
export const tabSize = 10;

function App() {
  const defaultTab = new Tab(
    "",
    Array(6)
      .fill(["-".repeat(tabSize * 4)])
      .join("|")
  );
  // the key of the dictionary is the title + artist joined
  const [songs, setSongs] = useState({
    "song-1-artist-1": new Song("Song 1", "Artist 1", [defaultTab], 70, 180),
    "song-2-artist-1": new Song("Song 2", "Artist 1", [defaultTab], 70, 180),
  });

  return (
    <context.Provider value={{ songs, setSongs }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/guitar-tabs/:id" element={<SongView />} />
          <Route path="/create-tab" element={<CreateTab />} />
        </Routes>
      </BrowserRouter>
    </context.Provider>
  );
}

export default App;
