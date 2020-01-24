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
            conquerButton.style.boxShadow = 'inset 0px 0px 20px #020202'
            break
  
          case 'move':
            moveButton.style.boxShadow = 'inset 0px 0px 20px #020202'
            break
  
          default:
        }
      }
    }
  }

  render(){
    const selectedArmyId = this.props.selected.id
    const selectedArmy = this.props.armies[selectedArmyId]
    return (
      <div className='BottomBarSection Right'>
        {
          selectedArmy ?
            <div className='ArmyCommands'>

              <div className='Layer'> 
                <h2 className='Header'>Army</h2>
              </div>

              <div className='Layer'>
                <div className='information'>
                  <span>Size: {selectedArmy.calculateTotalSize()}</span>
                </div>
                <div className='information'>
                  <span>Loyalty: {this.props.nobles[selectedArmy.nobleLoyalty].firstName}</span>
                  
                </div>
              </div>

              <div className='Layer'>
                <button className='Button Thirds' ref='move' onClick={() => this.props.toggleArmyMode('move')}>
                  Move
                </button>
                <button className='Button Thirds' ref='conquer' onClick={() => this.props.toggleArmyMode('conquer')}>
                  Conquer
                </button>
                <button className='Button Thirds' ref='disband' onClick={this.props.disbandArmy} >
                  Disband
                </button>
              </div>

            </div>
            : null

        }
      </div>
    )
  }
}


function mapStateToProps(state){
  return{
    nobles: {...state.nobles},
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