


function disbandArmyAndReturnSoldiersToTiles(state){
  const selected = state.selected
  if(selected && selected.type==='army'){
    const army = state.armies[selected.id]
    returnSoldiersToTiles(army.demographics, state.gameMap)
    delete state.armies[selected.id]
  }
}

//Returns the soldiers back home from the tiles which they were raised from
function returnSoldiersToTiles(demographics, gameMap){
  for (const stringifiedCoords in demographics){
    const soldiers = demographics[stringifiedCoords]
    const coords = JSON.parse(stringifiedCoords)
    gameMap[coords.x][coords.y].population += soldiers
  }
}

export{ disbandArmyAndReturnSoldiersToTiles }