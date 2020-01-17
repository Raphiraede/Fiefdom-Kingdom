import React from 'react'
import { Button } from '../shared_components/Button'
import { nextTurn } from '../../redux/actions.js'
import { connect } from 'react-redux'
import './NextTurnButton.css'

function NextTurnButton(props){
  return (
    <div className='NextTurnButton'>
      <Button text={`Next Turn`} onClick={props.nextTurn} />
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