import React from 'react'
import './CanvasMap.css'
import { NavBar } from '../shared_components/NavBar'
import { NextTurnButton } from '../shared_components/NextTurnButton'
import { FamiliesView } from '../sideBar/FamiliesView'
import { Map } from './Map'

function MapPage(){
  return (
    <div>
      <NavBar />
      <Map />
      <NextTurnButton />
      <FamiliesView />
    </div>
  )
}

export { MapPage }