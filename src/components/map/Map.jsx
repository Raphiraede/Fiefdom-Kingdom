import React from 'react'
import { NavBar } from '../shared_components/NavBar'
import Draggable from 'react-draggable'
import { CanvasMap } from './CanvasMap'

function Map(props){
  return(
    <div className='MapView'>
      <NavBar />
      <Draggable>
        <div>
          <CanvasMap />
        </div>
      </Draggable>
    </div>
  )
}

export {Map}