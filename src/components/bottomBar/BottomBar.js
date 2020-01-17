import React from 'react'
import './BottomBar.css'
import { nextTurn } from '../../redux/actions.js'
import { connect } from 'react-redux'
import { TileInfo } from './TileInfo'
import { ArmyCommands } from './ArmyCommands'

function BottomBar(props){
  return (
    <div className='BottomBar'>
      <div className='leftSection'>
        <TileInfo />
        <button className='NextTurnButton' onClick={props.nextTurn}>
          Next Turn
        </button>
      </div>

      <div className='middleSection'>
        <h1>
          Fiefdom Kingdom
        </h1>
      </div>
      
        <ArmyCommands />
    </div>
  )
}


function mapStateToProps(state){
  return{
    turnNumber: state.turnNumber,
  }
}

function mapDispatchToProps(dispatch){
  return {
    nextTurn: () => dispatch(nextTurn())
  }
}

const BottomBarContainer = connect(mapStateToProps, mapDispatchToProps)(BottomBar)

export { BottomBarContainer as BottomBar }