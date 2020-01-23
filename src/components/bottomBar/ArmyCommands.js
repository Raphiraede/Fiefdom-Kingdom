import React from 'react'
import { disbandArmy, toggleArmyMode } from '../../redux/actions'
import { connect } from 'react-redux'

class ArmyCommands extends React.Component{

  componentDidUpdate(){
    const conquerButton = this.refs.conquer
    const moveButton = this.refs.move

    if(conquerButton) conquerButton.style.boxShadow = ''
    if(moveButton) moveButton.style.boxShadow = ''

    if(this.props.selected.id){
      const selectedArmy = this.props.armies[this.props.selected.id]
      if(selectedArmy){
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
  }

  render(){
    const selectedArmy = this.props.selected.id
    return (
      <div>
        {
          selectedArmy ?
            <div className='ArmyCommandsWrapper'>
              <button className='disbandButton' ref='disband' onClick={this.props.disbandArmy} >
                X
              </button>
              <button className='ArmyCommandsButton' ref='conquer' onClick={() => this.props.toggleArmyMode('conquer')}>
                Conquer
              </button>
              <button className='ArmyCommandsButton' ref='move' onClick={() => this.props.toggleArmyMode('move')}>
                Move
              </button>
            </div>
            : null

        }
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