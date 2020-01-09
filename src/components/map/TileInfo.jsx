import React from 'react'
import './TileInfo.css'
function TileInfo(props){
  const {
    x,
    y,
    type,
    population,
    kingdomOwner,
    fiefOwner
  } = props.tileData

  const {
    mainKingdom,
    families,
    nobles,
    noblesToFamiliesIndex
  } = props
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
        <span>Duke: {nobles[fiefOwner].firstName} of the {nobles[fiefOwner].familyName} family </span>:
        null
      }
    </div>
  )
}

export { TileInfo }