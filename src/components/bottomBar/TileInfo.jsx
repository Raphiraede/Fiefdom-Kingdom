import React from 'react'
import { connect } from 'react-redux'
function TileInfo(props){

  const {
    gameMap,
    hoveredTileCoords,
    mainKingdom,
    aiKingdoms,
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

  const mainKingdomId = mainKingdom.id
  const allKingdoms = {}
  allKingdoms[mainKingdomId] = mainKingdom
  for (const aiKingdom of aiKingdoms){
    allKingdoms[aiKingdom.id] = {
      ...aiKingdom
    }
  }

  let hoveredArmy

  for (const id in armies){
    const army = armies[id]
    if (army.coordinates.x === x && army.coordinates.y === y) hoveredArmy = army
  }
  
  return (
    <div className='BottomBarSection Middle'>
      
      <div className='Layer'>
        <div className='information'><span>Type: {type}</span></div>
        <div className='information'><span>Pop: {population}</span></div>
      </div>

      <div className='Layer'>
        <div className='information'>
          <span>
            Kingdom: {
              kingdomOwner ?
              allKingdoms[kingdomOwner].name :
              'Unclaimed'
            }
          </span>
        </div>

        <div className='information'>
          <span>
            Duke: {
              nobles[fiefOwner] ? 
              nobles[fiefOwner].firstName:
              'None'
            } 
          </span>
        </div>
      </div>

      <div className='Layer'>
        <div className='information'>
          <span>
            X: {x}, Y: {y}
          </span>
        </div>
        <div className='information'>Army Size: <span>
            {
              hoveredArmy ?
              hoveredArmy.calculateTotalSize() :
              null
            }
          </span>
        </div>
      </div>

    </div>
  )
}

function mapStateToProps(state){
  return{
    gameMap: {...state.gameMap},
    hoveredTileCoords: {...state.hoveredTileCoords},
    mainKingdom: {...state.mainKingdom},
    aiKingdoms: [...state.aiKingdoms],
    families: {...state.families},
    nobles: {...state.nobles},
    armies: {...state.armies},
  }
}

const TileInfoContainer = connect(mapStateToProps)(TileInfo)

export { TileInfoContainer as TileInfo }