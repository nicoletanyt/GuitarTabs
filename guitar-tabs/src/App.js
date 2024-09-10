import React, { useEffect, useState } from "react";
import "./index.css"
import Homepage from "./components/Homepage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SongView from "./components/SongView";
import { Song, Tab } from "./Objects";
import CreateTab from "./components/CreateTab";

export const searchContext = React.createContext(null);
export const tabSize = 10;

function App() {
  // the key of the dictionary is the title + artist joined
  const [search, setSearch] = useState("");

  return (
    <div>
        <searchContext.Provider value={{ search, setSearch }}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/guitar-tabs/:id" element={<SongView />} />
              <Route path="/create-tab" element={<CreateTab />} />
            </Routes>
          </BrowserRouter>
        </searchContext.Provider>
    </div>
  );
}

export default App;
