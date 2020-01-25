import React from 'react'
import './VictoryScreen.css'
import victoriousArmy from '../../images/victoriousArmy.jpg'
import { Link } from 'react-router-dom'

function VictoryScreen(){
  
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
          <button className='EndscreenButton'>
            Home Page
          </button>
        </Link>
      </div>
    </div>
  )
}

export { VictoryScreen }