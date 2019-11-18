import React from 'react'
import { Button } from './Button'
import { nextTurn } from '../../redux/actions.js'
import { connect } from 'react-redux'

function NextTurnButton(props){
  return (
    <div>
      <Button text='NextTurn' onClick={props.nextTurn} />
    </div>
  )
}

function mapDispatchToProps(dispatch){
  return {
    nextTurn: () => dispatch(nextTurn())
  }
}

const connectedComponent = connect(undefined, mapDispatchToProps)(NextTurnButton)
export { connectedComponent as NextTurnButton }