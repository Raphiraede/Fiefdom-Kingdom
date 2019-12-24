import React from 'react'
import { NobleComponent } from './NobleComponent.jsx'

function FamilyComponent(props){
  const family = props.family
  const nobles = props.nobles
  return (
    <div className='family'>
      <h1 className='family-header'>The {family.familyName} Family</h1>
      {
        family.idsOfNobles.map(nobleId => {
          return <NobleComponent {...nobles[nobleId]} />
        })
      }
    </div>
  )
}

export { FamilyComponent }