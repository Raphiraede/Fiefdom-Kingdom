import React from 'react'
import { nextTurn, togglefamiliesViewVisibility } from '../../redux/actions.js'
import { connect } from 'react-redux'


function KingdomManagement(props){

  return(
    <div className='BottomBarSection Left'>
      <div className='Layer'>
        <h2 className='Header'>
          Kingdom
        </h2>
      </div>


      <div className='Layer'>
        <div className='information'>
          <span>Gold: {props.gold}</span>
        </div>
        <div className='information'>
          <span>Turn Number: {props.turnNumber}</span>
        </div>
      </div>

      <div className='Layer'>
        <button className='Button Halves' onClick={props.togglefamiliesViewVisibility}>
          Families
        </button>
        <button className='Button Halves' onClick={props.nextTurn}>
          Next Turn
        </button>
      </div>
    </div>
  )
}

function mapStateToProps(state){
  return{
    turnNumber: state.turnNumber,
    gold: state.mainKingdom.gold
  }
}

function mapDispatchToProps(dispatch){
  return{
    nextTurn: () => dispatch(nextTurn()),
    togglefamiliesViewVisibility: () => dispatch(togglefamiliesViewVisibility())
  }
}

const KingdomManagementContainer = connect(mapStateToProps, mapDispatchToProps)(KingdomManagement)

export { KingdomManagementContainer as KingdomManagement }