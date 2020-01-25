import React from 'react'
import { initiateGiveFiefMode, uninitiateGiveFiefMode, raiseArmy } from '../../redux/actions'
import { connect } from 'react-redux'

function NobleView(props){
  const {
    firstName,
    loyalty,
    power,
    taxLevel,
    age,
    id,
  } = props.noble

  return (
    <div className='NobleView'>
      <div className='Layer'>
        <h3 className='Header'>{firstName}</h3>
      </div>


      <div className='Layer'>
        <div className='information'>
          <span className='stat'>Tax Level: {taxLevel}</span>
        </div>
        <div className='information'>
          <span className='stat'>Age: {age}</span>
        </div>
      </div>
      
      <div className='Layer'>
          {
            props.givingFief.nobleId === id ? 
            <button className='NobleButton' onClick={props.uninitiateGiveFiefMode}>Commit</button> : 
            <button className='NobleButton' onClick={() => props.initiateGiveFiefMode(id)}>Give Fief</button>
          }
        <button className='NobleButton' onClick={() => props.raiseArmy(id)}>Raise Army</button>
      </div>
        
    </div>
  )
}

function mapStateToProps(state){
  return{
    givingFief: {...state.givingFief}
  }
}

function mapDispatchToProps(dispatch){
  return{
    initiateGiveFiefMode: (payload) => dispatch(initiateGiveFiefMode(payload)),
    uninitiateGiveFiefMode: () => dispatch(uninitiateGiveFiefMode()),
    raiseArmy: (id) => dispatch(raiseArmy(id)),
  }
}

const NobleViewContainer = connect(mapStateToProps, mapDispatchToProps)(NobleView)

export { NobleViewContainer as NobleView }