import React from 'react'
import { FaSearch } from "react-icons/fa";

export default function Searchbar() {
  return (
    <div id="searchbar">
      <input type="text" id="search-input" />
      <div className="search-icon">
        <FaSearch className="icon" />
      </div>
    </div>
  );
}
