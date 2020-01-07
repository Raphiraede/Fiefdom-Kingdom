import React from 'react'
import uuidv1 from 'uuid/v1'

function NoblesView(props){

  return(
    <ul className='NoblesView'>
    { props.nobles ? 
        props.nobles.map(noble => {
          return (
            <li key={uuidv1()} className='noble'>
              <h3>{noble.firstName}</h3>
              <span className='stat'>loyalty: {noble.loyalty}</span> <br/>
              <span className='stat'>power: {noble.power}</span> <br/>
              <span className='stat'>taxLevel: {noble.taxLevel}</span> <br/>
              <span className='stat'>age: {noble.age}</span> <br/>
              <button>Give Fief</button>
            </li>
          )
        }) :
        null
    }
    </ul>
  )
}

export { NoblesView }