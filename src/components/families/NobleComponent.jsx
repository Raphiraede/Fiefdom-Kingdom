import React from 'react'
import { NobleDropdown } from './NobleDropdown'
class NobleComponent extends React.Component{
  constructor(props){
    super(props)
    this.state={
      dropDownIsOpen: false
    }
  }

  toggleDropDown = () => {
    this.setState(prevState => ({
      dropDownIsOpen: !prevState.dropDownIsOpen
    }))
  }

  render(){
    return(
      <div className='noble' onClick={this.toggleDropDown}>
        <h2>
          {this.props.firstName}
        </h2>
        {
          this.state.dropDownIsOpen ? 
          <NobleDropdown 
            loyalty={this.props.loyalty}
            power={this.props.power}
            taxLevel={this.props.taxLevel}
            age={this.props.age}
          />
          
          : null
        }
      </div>
    )
  }
}

export { NobleComponent }