import React from 'react'
import { NobleComponent } from './NobleComponent'

function FamilyComponent(props){
  const family = props.family
  const nobles = props.nobles
  return (
    <div className='family'>
      <h1 className='family-header'>The {family.familyName} Family</h1>
      {
        family.nobleIds.map(nobleId => {
          return <NobleComponent {...nobles[nobleId]} />
        })
      }
    </div>
  )
}

export { FamilyComponent }