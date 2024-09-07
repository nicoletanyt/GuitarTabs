import React from 'react'
import Searchbar from './Searchbar'
import { FaPlus } from "react-icons/fa";
import { Link } from 'react-router-dom';

export default function Tabbar() {
  return (
    <div id="tab-bar">
      <h1>Guitar Tabs</h1>
      <Searchbar />
      <Link to="/create-tab" id="create-tab-btn" className='button'>
        <FaPlus className="icon" />
        <p>Create tabs</p>
      </Link>
    </div>
  );
}
