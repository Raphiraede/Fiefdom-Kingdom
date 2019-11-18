import React from 'react'
import { NavBar } from '../shared_components/NavBar.jsx'
import { connect } from 'react-redux'
import { FamilyComponent } from './FamilyComponent.jsx'
import { NextTurnButton } from '../shared_components/NextTurnButton.jsx'

function FamiliesComponent(props){
  return (
    <div>
      <NavBar />
      {props.families.map(royalFamily => {
        return <FamilyComponent family={royalFamily} />
      })}
      <NextTurnButton />
    </div>
  )
}

function mapStateToProps(state){
  return {
    families: [
      ...state.families
    ]
  }
}

const connectedComponent = connect(mapStateToProps)(FamiliesComponent)
export { connectedComponent as FamiliesComponent }