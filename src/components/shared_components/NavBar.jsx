import React from 'react'
import { Link } from 'react-router-dom'
import './NavBar.css'
function NavBar(){

  return (
    <div className='NavBar'>
      <Link to={'/'}>
        <button className='NavButton'>
          Home Page
        </button>
      </Link>

      {/* <Link to = {'/map'}>
        <button className='NavButton'>
          Map
        </button>
      </Link> */}

    </div>
  )

}

export { NavBar }