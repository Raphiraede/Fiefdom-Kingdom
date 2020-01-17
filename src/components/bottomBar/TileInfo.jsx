import React from 'react'
import { connect } from 'react-redux'
function TileInfo(props){

  const {
    gameMap,
    hoveredTileCoords,
    mainKingdom,
    nobles,
    armies,
  } = props

  const { x, y } = hoveredTileCoords
  const tile = gameMap[x][y]
  const {
    type,
    population,
    fiefOwner,
    kingdomOwner,
  } = tile

  let hoveredArmy

  for (const id in armies){
    const army = armies[id]
    if (army.coordinates.x === x && army.coordinates.y === y) hoveredArmy = army
  }
  
  return (
    <div className='TileInfo'>
      <span className='information'>X: {x}</span> <br />
      <span className='information'>Y: {y}</span> <br />
      <span className='information'>Type: {type}</span> <br />
      <span className='information'>Pop: {population}</span> <br />
      <span className='information'>Kingdom: {
        mainKingdom.id === kingdomOwner ?
        mainKingdom.name :
        'Unclaimed'
      }</span> <br />
      {
        tile.fiefOwner ?
        (<span className='information'>Duke: {nobles[fiefOwner].firstName} of the {nobles[fiefOwner].familyName} family <br /></span> ):
        null
      }
      {
        hoveredArmy ?
        <span className='information'>Army Size: {hoveredArmy.calculateTotalSize()}</span>:
        null
      }
    </div>
  )
}

function mapStateToProps(state){
  return{
    gameMap: {...state.gameMap},
    hoveredTileCoords: {...state.hoveredTileCoords},
    mainKingdom: {...state.mainKingdom},
    families: {...state.families},
    nobles: {...state.nobles},
    armies: {...state.armies},
  }
}

const TileInfoContainer = connect(mapStateToProps)(TileInfo)

export { TileInfoContainer as TileInfo }