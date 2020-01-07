
import React from 'react'

function NobleDropdown(props){
  const {
    loyalty,
    power,
    taxLevel,
    age
  } = props
  return(
    <div className='noble-dropdown'>
      <span className='stat'>loyalty: {loyalty}</span> <br/>
      <span className='stat'>power: {power}</span> <br/>
      <span className='stat'>taxLevel: {taxLevel}</span> <br/>
      <span className='stat'>age: {age}</span>
    </div>
  )
}

export { NobleDropdown }