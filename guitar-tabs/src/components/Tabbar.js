import React from 'react'
import Searchbar from './Searchbar'
import { FaPlus } from "react-icons/fa";

export default function Tabbar() {
  return (
    <div id='tab-bar'>
        <h1>Guitar Tabs</h1>
        <Searchbar/>
        <button id='create-tab-btn'>
            <FaPlus className='icon'/>
            <p>Create tabs</p>
        </button>
    </div>
  )
}
