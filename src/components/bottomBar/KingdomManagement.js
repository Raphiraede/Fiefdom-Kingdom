import React from 'react'
import { nextTurn, togglefamiliesViewVisibility } from '../../redux/actions.js'
import { connect } from 'react-redux'


class KingdomManagement extends React.Component{

  componentDidUpdate(){
    const FamiliesButton = this.refs.families
    FamiliesButton.style.boxShadow = ''

    if(this.props.familiesViewVisible) FamiliesButton.style.boxShadow = 'inset 0px 0px 20px #020202'
  }

  render(){
    return(
      <div className='BottomBarSection Left'>
        <div className='Layer'>
          <h2 className='Header'>
            Kingdom
          </h2>
        </div>
  
  
        <div className='Layer'>
          <div className='information'>
            <span>Gold: {this.props.gold}</span>
          </div>
          <div className='information'>
            <span>Turn Number: {this.props.turnNumber}</span>
          </div>
        </div>
  
        <div className='Layer'>
          <button className='Button Halves' ref='families' onClick={this.props.togglefamiliesViewVisibility}>
            Families
          </button>
          <button className='Button Halves' onClick={this.props.nextTurn}>
            Next Turn
          </button>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state){
  return{
    turnNumber: state.turnNumber,
    gold: state.mainKingdom.gold,
    familiesViewVisible: state.familiesViewVisible
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