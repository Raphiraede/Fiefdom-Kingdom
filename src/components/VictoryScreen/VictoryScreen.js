import React from 'react'
import './VictoryScreen.css'
import victoriousArmy from '../../images/victoriousArmy.jpg'
import { Link } from 'react-router-dom'
import { newGame } from '../../redux/actions'
import { connect } from 'react-redux'

function VictoryScreen(props){
  return(
    <div className='VictoryScreen'>
      <div className='VictoryComponent'>
        <div className='VictoryScreenHeaderWrapper'>
          <h1 className='VictoryScreenHeader'>
            Victory!
          </h1>
        </div>
        <img 
          src={victoriousArmy}
          alt='Victory' 
          className='VictoryPicture'
        />
        <Link to='/'>
          <button className='EndscreenButton' onClick={props.newGame}>
            Home Page
          </button>
        </Link>
      </div>
    </div>
  )
}

function mapDispatchToProps(dispatch){
  return{
    newGame: () => dispatch(newGame())
  }
}

const VictoryScreenContainer = connect(undefined, mapDispatchToProps)(VictoryScreen)

export { VictoryScreenContainer as VictoryScreen }