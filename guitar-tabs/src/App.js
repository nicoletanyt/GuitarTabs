import React, { useState, useEffect, useContext } from "react";
import "./index.css"
import Homepage from "./components/Homepage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TabView from "./components/TabView";
import TabList from "./components/TabList";
import { Song } from "./Objects";

export const context = React.createContext(null);

function App() {
  const [songs, setSongs] = useState([new Song("Song 1", "Arist 1", "")]);

  return (
    <context.Provider value={{ songs }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/tabview" element={<TabView />} />
        </Routes>
      </BrowserRouter>
    </context.Provider>
  );
}

export default App;
