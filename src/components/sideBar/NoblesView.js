import React from 'react'
import { NobleView } from './NobleView'

function NoblesView(props){

  return(
    <div className='NoblesView'>
    { props.nobles ? 
        props.nobles.map(noble => {
          return (
              <NobleView noble={noble}></NobleView>
          )
        }) :
        null
    }
    </div>
  )
}

export { NoblesView }