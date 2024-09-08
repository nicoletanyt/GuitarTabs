import React, { useEffect, useState } from "react";
import "./index.css"
import Homepage from "./components/Homepage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SongView from "./components/SongView";
import { Song, Tab } from "./Objects";
import CreateTab from "./components/CreateTab";

export const context = React.createContext(null);
export const searchContext = React.createContext(null);
export const tabSize = 10;

function App() {
  const defaultTab = new Tab(
    "",
    Array(6)
      .fill(["-".repeat(tabSize * 4)])
      .join("|")
  );
  // the key of the dictionary is the title + artist joined
  const [songs, setSongs] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    // get data from local storage
    let data = localStorage.getItem("guitar-tab-songs");
    if (data) {
      setSongs(JSON.parse(data));
    }
  }, [])

  return (
    <context.Provider value={{ songs, setSongs }}>
      <searchContext.Provider value={{ search, setSearch }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/guitar-tabs/:id" element={<SongView />} />
            <Route path="/create-tab" element={<CreateTab />} />
          </Routes>
        </BrowserRouter>
      </searchContext.Provider>
    </context.Provider>
  );
}

export default App;
