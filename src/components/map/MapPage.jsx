import React from 'react'
import './CanvasMap.css'
import { NavBar } from '../shared_components/NavBar'
import { FamiliesView } from '../sideBar/FamiliesView'
import { Map } from './Map'
import { BottomBar } from '../bottomBar/BottomBar'

function MapPage(){
  return (
    <div>
      <NavBar />
      <Map />
      <BottomBar />
    </div>
  )
}

export { MapPage }