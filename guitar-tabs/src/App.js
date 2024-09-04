import React, { useState } from "react";
import "./index.css"
import Homepage from "./components/Homepage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TabView from "./components/TabView";
import { Song } from "./Objects";

export const context = React.createContext(null);

function App() {

  // the key of the dictionary is the title + artist joined
  const [songs, setSongs] = useState({
    "song-1-artist-1": new Song("Song 1", "Artist 1", ""),
    "song-2-artist-1": new Song("Song 2", "Artist 1", ""),
});

  return (
    <context.Provider value={{ songs }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/guitar-tabs/:id" element={<TabView />} />
        </Routes>
      </BrowserRouter>
    </context.Provider>
  );
}

export default App;
