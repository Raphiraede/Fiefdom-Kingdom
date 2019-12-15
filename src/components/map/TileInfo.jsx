import React from 'react'
import './TileInfo.css'
function TileInfo(props){
  return (
    <div className='tile-info'>
      <div>X: {props.tileData.x}</div>
      <div>Y: {props.tileData.y}</div>
      <div>Type: {props.tileData.type}</div>
      <div>Pop: {props.tileData.population}</div>
    </div>
  )
}

export { TileInfo }