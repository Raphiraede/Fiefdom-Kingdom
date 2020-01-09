import React from 'react'
import { connect } from 'react-redux'
import { FamiliesDropdown } from './FamiliesDropdown'
import { NoblesView } from './NoblesView'
import './FamiliesView.css'

class FamiliesView extends React.Component{
  constructor(){
    super()

    this.state={
      selectedFamilyId: undefined // for keeping track of which family to is selected in dropwdown menu
    }
  }

  componentDidMount(){
    const familyIds = this.props.mainKingdom.familyIds
    const families = familyIds.map(id => this.props.families[id])
    this.setState({
      selectedFamilyId: families[0].id
    })
  }

  handleChange = (event) => {
    this.setState({selectedFamilyId: event.target.value})
  }

  render(){
    const mainKingdomFamilyIds = this.props.mainKingdom.familyIds
    const mainKingdomFamilies = mainKingdomFamilyIds.map(id => this.props.families[id])

    let nobleIds
    if (this.state.selectedFamilyId) nobleIds = this.props.families[this.state.selectedFamilyId].nobleIds
    
    let nobles
    if (nobleIds) nobles = nobleIds.map(id => this.props.nobles[id])

    return (
      <div className='FamiliesView'>
        <FamiliesDropdown families={mainKingdomFamilies} selectedFamilyId={this.state.selectedFamilyId} onChange={this.handleChange}/>
        <NoblesView nobles={nobles}/>
      </div>
    )
  }
}

function mapStateToProps(state){
  return{
    mainKingdom: { ...state.mainKingdom },
    families: { ...state.families },
    nobles: { ...state.nobles },
  }
}

const FamiliesViewContainer = connect(mapStateToProps)(FamiliesView)

export { FamiliesViewContainer as FamiliesView }