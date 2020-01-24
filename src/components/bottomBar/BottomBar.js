import React from 'react'
import './BottomBar.css'
import { connect } from 'react-redux'
import { TileInfo } from './TileInfo'
import { ArmyCommands } from './ArmyCommands'
import { KingdomManagement } from './KingdomManagement'

function BottomBar(props){
  return (
    <div className='BottomBar'>
      <KingdomManagement />
      <TileInfo />
      <ArmyCommands />
    </div>
  )
}


function mapStateToProps(state){
  return{
    turnNumber: state.turnNumber,
  }
}

const BottomBarContainer = connect(mapStateToProps)(BottomBar)

export { BottomBarContainer as BottomBar }