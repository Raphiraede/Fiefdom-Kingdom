import React from 'react'
import { Button } from './Button'
import { Link } from 'react-router-dom'
import './NavBar.css'
function NavBar(){

  return (
    <div className='NavBar'>
      <Link to={'/'}>
        <Button
          text='home page'
        />
      </Link>

      <Link to={'/families'}>
        <Button
          text='Families'
        />
      </Link>

      <Link to={'/map'}>
        <Button 
          text='Map'
        />
      </Link>
    </div>
  )

}

export { NavBar }