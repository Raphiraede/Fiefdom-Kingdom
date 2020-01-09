import React from 'react'
import { initiateGiveFiefMode } from '../../redux/actions'
import { connect } from 'react-redux'

function NobleView(props){
  function handleClick(){
    props.initiateGiveFiefMode(props.noble.id)
  }

  return (
    <div>
      <h3 className='NobleViewHeader'>{props.noble.firstName}</h3>
      <span className='stat'>loyalty: {props.noble.loyalty}</span> <br/>
      <span className='stat'>power: {props.noble.power}</span> <br/>
      <span className='stat'>taxLevel: {props.noble.taxLevel}</span> <br/>
      <span className='stat'>age: {props.noble.age}</span> <br/>
      <button onClick={handleClick}>Give Fief</button>
      {
        props.givingFief.nobleId === props.noble.id ? <button>Commit</button> : null
      }
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
    initiateGiveFiefMode: (payload) => dispatch(initiateGiveFiefMode(payload))
  }
}

const NobleViewContainer = connect(mapStateToProps, mapDispatchToProps)(NobleView)

export { NobleViewContainer as NobleView }