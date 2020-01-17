import React from 'react'
import './BottomBar.css'
import { nextTurn } from '../../redux/actions.js'
import { connect } from 'react-redux'
import { TileInfo } from '../map/TileInfo'

function BottomBar(props){
  return (
    <div className='BottomBar'>
      {/* <TileInfo 
        tileData={this.props.gameMap[this.state.tileMatrixX][this.state.tileMatrixY]}
        mainKingdom={this.props.mainKingdom}
        families={this.props.families}
        nobles={this.props.nobles}
        noblesToFamiliesIndex={this.props.noblesToFamiliesIndex}
        armies={this.props.armies}
        selected={this.props.selected}
      /> */}
      <div className='NextTurnButtonWrapper'>
        <button className='NextTurnButton' onClick={props.nextTurn}>
          Next Turn
        </button>
      </div>
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