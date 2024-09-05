import React from 'react'
import { FaSearch } from "react-icons/fa";

export default function Searchbar() {
  return (
    <div id="searchbar">
      <input type="text" id="search-input" placeholder='Search... '/>
      <div className="search-icon">
        <FaSearch className="icon" />
      </div>
    </div>
  );
}
