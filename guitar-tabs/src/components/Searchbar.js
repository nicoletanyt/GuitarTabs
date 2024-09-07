import React, { useContext } from 'react'
import { FaSearch } from "react-icons/fa";
import { searchContext } from '../App';

export default function Searchbar() {
  const {search, setSearch} = useContext(searchContext)
  return (
    <div id="searchbar">
      <input
        type="text"
        id="search-input"
        placeholder="Search... "
        onChange={(ev) => setSearch(ev.target.value)}
        value={search}
      />
      <div className="search-icon">
        <FaSearch className="icon" />
      </div>
    </div>
  );
}
