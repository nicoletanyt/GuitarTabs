import React, { useEffect, useState } from 'react'
import Tabbar from './Tabbar'
import SongList from './SongList'

export default function Homepage() {

  return (
    <div id='homepage'>
        <Tabbar/>
        <SongList/>
    </div>
  )
}
