import React from 'react'
import '../VictoryScreen/VictoryScreen.css'
import { Link } from 'react-router-dom'
import kingWatchingBurningCastle from '../../images/KingWatchingBurningCastle.jpg'

function DefeatScreen(){

  
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
          <button className='EndscreenButton'>
            Home Page
          </button>
        </Link>
      </div>
    </div>
  )
}

export { DefeatScreen }