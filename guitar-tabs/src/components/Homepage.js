import React, { useEffect, useState } from 'react'
import Tabbar from './Tabbar'
import TabList from './TabList'

export default function Homepage() {

  return (
    <div id='homepage'>
        <Tabbar/>
        <TabList/>
    </div>
  )
}
