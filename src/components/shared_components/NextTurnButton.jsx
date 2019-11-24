import React from 'react'
import { Button } from './Button'
import { nextTurn } from '../../redux/actions.js'
import { connect } from 'react-redux'

function NextTurnButton(props){
  console.log(props)
  return (
    <div>
      <Button text={`Next Turn`} onClick={props.nextTurn} />
      <span>Turn {props.turnNumber}</span>
    </div>
  )
}

function mapStateToProps(state){
  return{
    turnNumber: state.turnNumber
  }
}

function mapDispatchToProps(dispatch){
  return {
    nextTurn: () => dispatch(nextTurn())
  }
}

const connectedComponent = connect(mapStateToProps, mapDispatchToProps)(NextTurnButton)
export { connectedComponent as NextTurnButton }