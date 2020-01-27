import React from 'react'
import '../VictoryScreen/VictoryScreen.css'
import { Link } from 'react-router-dom'
import kingWatchingBurningCastle from '../../images/KingWatchingBurningCastle.jpg'
import { newGame } from '../../redux/actions'
import { connect } from 'react-redux'

function DefeatScreen(props){  
  return(
    <div className='VictoryScreen'>
      <div className='VictoryComponent'>
        <div className='VictoryScreenHeaderWrapper'>
          <h1 className='VictoryScreenHeader'>
            Defeat
          </h1>
        </div>
        <img 
          src={kingWatchingBurningCastle}
          alt='Defeat' 
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

const DefeatScreenContainer = connect(undefined, mapDispatchToProps)(DefeatScreen)
export { DefeatScreenContainer as DefeatScreen }