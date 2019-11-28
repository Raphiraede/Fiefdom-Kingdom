import React from 'react'
import { NobleComponent } from './NobleComponent.jsx'

function FamilyComponent(props){
  const family = props.family
  return (
    <div className='family'>
      <h1 className='family-header'>The {family.familyName} Family</h1>
      {
        family.nobles.map(noble => {
          return <NobleComponent {...noble} />
        })
      }
    </div>
  )
}

export { FamilyComponent }