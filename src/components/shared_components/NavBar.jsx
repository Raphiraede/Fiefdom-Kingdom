import React from 'react'
import { Link } from 'react-router-dom'
import './NavBar.css'
import { toggleTutorial } from '../../redux/actions'
import { connect } from 'react-redux'
function NavBar(props){
  return (
    <div className='NavBar'>
      <Link to={'/'}>
        <button className='NavButton'>
          Home Page
        </button>
      </Link>

        <button onClick={props.toggleTutorial}className='NavButton'>
          How To Play
        </button>

      {/* <Link to = {'/map'}>
        <button className='NavButton'>
          Map
        </button>
      </Link> */}

    </div>
  )
}

function mapDispatchToProps(dispatch){
  return{
    toggleTutorial: () => dispatch(toggleTutorial())
  }
}

const NavBarContainer = connect(undefined, mapDispatchToProps)(NavBar)

export { NavBarContainer as NavBar }