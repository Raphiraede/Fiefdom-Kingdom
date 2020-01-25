import React from 'react'
import { NobleView } from './NobleView'
import uuidv1 from 'uuid/v1'

function NoblesView(props){

  return(
    <div className='NoblesView'>
    { props.nobles ? 
        props.nobles.map(noble => {
          return (
              <NobleView key={uuidv1()} noble={noble}></NobleView>
          )
        }) :
        null
    }
    </div>
  )
}

export { NoblesView }