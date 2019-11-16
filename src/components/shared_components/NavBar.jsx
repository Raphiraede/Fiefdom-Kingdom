import React from 'react'
import { Button } from './Button'
import { Link } from 'react-router-dom'
function NavBar(){

  return (
    <div>
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
    </div>
  )

}

export { NavBar }