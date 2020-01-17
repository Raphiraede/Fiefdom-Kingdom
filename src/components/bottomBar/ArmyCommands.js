import React from 'react'
import { disbandArmy } from '../../redux/actions'
import { connect } from 'react-redux'

function ArmyCommands(props){

  return (
    <div className='ArmyCommandsWrapper'>
      <button className='ArmyCommandsButton' onClick={props.disbandArmy}>
        Disband
      </button>
      <button className='ArmyCommandsButton'>
        Conquer
      </button>
      <button className='ArmyCommandsButton'>
        Attack
      </button>
      <button className='ArmyCommandsButton'>
        Move
      </button>
    </div>
  )
}

function mapDispatchToProps(dispatch){
  return{
    disbandArmy: () => dispatch(disbandArmy())
  }
}

const ArmyCommandsContainer = connect(undefined, mapDispatchToProps)(ArmyCommands)

export { ArmyCommandsContainer as ArmyCommands }