import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { newGame } from '../../redux/actions.js'
import './HomePageComponent.css'


class HomePageComponent extends React.Component{
  
  render(){
    return(
      <div className='HomePageMenuWrapper'>
        <div className='HomePageMenu'>
          <h1 className='Title'>Fiefdom Kingdom</h1>
          <Link to={'/map'}>
            <button className='HomePageButton' onClick={this.props.newGame}>New Game</button>
          </Link>

          <Link to={'/map'}>
            <button className='HomePageButton'>Load Game</button>
          </Link>
        </div>
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

const HomePageContainer = connect(undefined, mapDispatchToProps)(HomePageComponent)

export { HomePageContainer as HomePageComponent }