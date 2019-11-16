import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Button } from '../shared_components/Button.jsx'
import { newGame } from '../../redux/actions.js'

class HomePageComponent extends React.Component{

  render(){
    return(
      <div>
        <h1 className='Title'>Fiefdom Kingdom!</h1>
        <Link to={'/families'}>
          <Button 
            text={'New Game!'}
            onClick={this.props.newGame}
          />
        </Link>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch){
  return{
    newGame: () => dispatch(newGame())
  }
}

HomePageComponent.propTypes = {
  newGame: PropTypes.func
}

const connectedComponent = connect(undefined, mapDispatchToProps)(HomePageComponent)

export { connectedComponent as HomePageComponent }