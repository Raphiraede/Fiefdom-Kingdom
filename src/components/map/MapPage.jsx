import React from 'react'
import './CanvasMap.css'
import { NavBar } from '../shared_components/NavBar'
import { FamiliesView } from '../sideBar/FamiliesView'
import { Map } from './Map'
import { BottomBar } from '../bottomBar/BottomBar'
import { connect } from 'react-redux'

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

      
    </div>
  )
}

function mapStateToProps(state){
  return{
    familiesViewVisible: state.familiesViewVisible
  }
}

const MapPageContainer = connect(mapStateToProps)(MapPage)
export { MapPageContainer as MapPage }