import React from 'react'
import uuidv1 from 'uuid/v1'
import { NobleView } from './NobleView'

function NoblesView(props){

  return(
    <ul className='NoblesView'>
    { props.nobles ? 
        props.nobles.map(noble => {
          return (
            <li key={uuidv1()} className='noble'>
              <NobleView noble={noble}></NobleView>
            </li>
          )
        }) :
        null
    }
    </ul>
  )
}

export { NoblesView }