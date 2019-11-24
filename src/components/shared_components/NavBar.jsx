import React from 'react'
import { Button } from './Button'
import { Link } from 'react-router-dom'
import './NavBar.css'
function NavBar(){

  return (
    <div className='NavBar'>
      <Link to={'/'}>
        <Button
          text='Home Page'
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

      <Link to={'/map'}>
        <Button 
          text='Nobles'
        />
      </Link>
    </div>
  )

}

export { NavBar }