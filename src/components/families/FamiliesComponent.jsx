import React from 'react'
import { NavBar } from '../shared_components/NavBar.jsx'
import { connect } from 'react-redux'
import { FamilyComponent } from './FamilyComponent.jsx'
import { NextTurnButton } from '../shared_components/NextTurnButton.jsx'
import './FamiliesComponent.css'

function FamiliesComponent(props){
  return (
    <div className='families-page'>
      <NavBar />
      <div className='families'>
        {props.families.map(royalFamily => {
          return <FamilyComponent family={royalFamily} />
        })}
      </div>
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

const FamiliesContainer = connect(mapStateToProps)(FamiliesComponent)
export { FamiliesContainer as FamiliesComponent }