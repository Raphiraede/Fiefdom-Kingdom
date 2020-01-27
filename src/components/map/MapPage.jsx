import React from 'react'
import './CanvasMap.css'
import { NavBar } from '../shared_components/NavBar'
import { FamiliesView } from '../sideBar/FamiliesView'
import { Map } from './Map'
import { BottomBar } from '../bottomBar/BottomBar'
import { connect } from 'react-redux'
import { Tutorial } from '../Tutorial/Tutorial'

function MapPage(props){
  return (
    <div>
      <NavBar />
      <Map />
      {
        props.familiesViewVisible ? 
        <FamiliesView /> :
        null
      }
      <BottomBar />
      {
        props.tutorialOpen ? 
        <Tutorial /> :
        null
      }

      
    </div>
  )
}

function mapStateToProps(state){
  return{
    tutorialOpen: state.tutorialOpen,
    familiesViewVisible: state.familiesViewVisible,
  }
}

const MapPageContainer = connect(mapStateToProps)(MapPage)
export { MapPageContainer as MapPage }