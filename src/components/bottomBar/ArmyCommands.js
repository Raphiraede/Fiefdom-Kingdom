import React from 'react'
import { disbandArmy, toggleArmyMode } from '../../redux/actions'
import { connect } from 'react-redux'

class ArmyCommands extends React.Component{

  componentDidUpdate(){
    const conquerButton = this.refs.conquer
    const moveButton = this.refs.move
    conquerButton.style.boxShadow = ''
    moveButton.style.boxShadow = ''



    if(this.props.selected.id){
      const selectedArmy = this.props.armies[this.props.selected.id]
      switch (selectedArmy.mode){
        case 'conquer':
          conquerButton.style.boxShadow = 'inset 0px 0px 20px #8b90b5'
          break

        case 'move':
          moveButton.style.boxShadow = 'inset 0px 0px 20px #8b90b5'
          break

        default:
      }
    }
  }

  render(){
    return (
      <div className='ArmyCommandsWrapper'>
        <button className='ArmyCommandsButton' ref='disband' onClick={this.props.disbandArmy}>
          Disband
        </button>
        <button className='ArmyCommandsButton' ref='conquer' onClick={() => this.props.toggleArmyMode('conquer')}>
          Conquer
        </button>
        <button className='ArmyCommandsButton'>
          Attack
        </button>
        <button className='ArmyCommandsButton' ref='move' onClick={() => this.props.toggleArmyMode('move')}>
          Move
        </button>
      </div>
    )
  }
}


function mapStateToProps(state){
  return{
    armies: {...state.armies},
    selected: {...state.selected}
  }
}

function mapDispatchToProps(dispatch){
  return{
    disbandArmy: () => dispatch(disbandArmy()),
    toggleArmyMode: (payload) => dispatch(toggleArmyMode(payload))
  }
}

const ArmyCommandsContainer = connect(mapStateToProps, mapDispatchToProps)(ArmyCommands)

export { ArmyCommandsContainer as ArmyCommands }