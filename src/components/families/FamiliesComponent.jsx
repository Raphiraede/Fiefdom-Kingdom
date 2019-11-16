import React from 'react'
import { NavBar } from '../shared_components/NavBar.jsx'
import { connect } from 'react-redux'
import { FamilyComponent } from './FamilyComponent.jsx'

class FamiliesComponent extends React.Component{

  render(){
    return (
      <div>
        <NavBar />
        <FamilyComponent family={this.props.BurnHammerFamily} />
        <FamilyComponent family={this.props.GreenHeartFamily} />
        <FamilyComponent family={this.props.GoldFingerFamily} />
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    ...state.families
  }
}

const connectedComponent = connect(mapStateToProps)(FamiliesComponent)
export { connectedComponent as FamiliesComponent }