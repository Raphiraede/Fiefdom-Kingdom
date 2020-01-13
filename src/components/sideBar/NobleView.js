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
    <div>
      <h3 className='NobleViewHeader'>{firstName}</h3>
      <span className='stat'>loyalty: {loyalty}</span> <br/>
      <span className='stat'>power: {power}</span> <br/>
      <span className='stat'>taxLevel: {taxLevel}</span> <br/>
      <span className='stat'>age: {age}</span> <br/>
      <button onClick={() => props.initiateGiveFiefMode(id)}>Give Fief</button>
      {
        props.givingFief.nobleId === id ? <button onClick={props.uninitiateGiveFiefMode}>Commit</button> : null
      }
      <button onClick={() => props.raiseArmy(id)}>Raise Army</button>
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