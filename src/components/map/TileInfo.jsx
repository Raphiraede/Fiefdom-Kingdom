import React from 'react'
import './TileInfo.css'
function TileInfo(props){
  const {
    x,
    y,
    type,
    population,
    kingdomOwner,
    fiefOwner,
  } = props.tileData

  const {
    mainKingdom,
    nobles,
    armies,
  } = props
  let hoveredArmy
  for (const id in armies){
    const army = armies[id]
    if (army.coordinates.x === x && army.coordinates.y === y) hoveredArmy = army
  }
  console.log(hoveredArmy)

  return (
    <div className='tile-info'>
      <span>X: {x}</span> <br />
      <span>Y: {y}</span> <br />
      <span>Type: {type}</span> <br />
      <span>Pop: {population}</span> <br />
      <span>Kingdom: {
        mainKingdom.id === kingdomOwner ?
        mainKingdom.name :
        'Unclaimed'
      }</span> <br />
      {
        fiefOwner ?
        (<span>Duke: {nobles[fiefOwner].firstName} of the {nobles[fiefOwner].familyName} family <br /></span> ):
        null
      }
      {
        hoveredArmy ?
        <span>Army Size: {hoveredArmy.calculateTotalSize()}</span>:
        null
      }
      <span></span>
    </div>
  )
}

export { TileInfo }