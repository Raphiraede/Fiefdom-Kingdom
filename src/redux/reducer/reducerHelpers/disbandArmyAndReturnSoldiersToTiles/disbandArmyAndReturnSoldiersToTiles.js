


function disbandArmyAndReturnSoldiersToTiles(state, armyId){
    const army = state.armies[armyId]
    returnSoldiersToTiles(army.demographics, state.gameMap)
    const nobleWhoArmyIsLoyalTo = state.nobles[state.indexes.armiesToNobles[army.id]]
    const indexOfArmy = nobleWhoArmyIsLoyalTo.armies.indexOf(armyId)
    nobleWhoArmyIsLoyalTo.armies.splice(indexOfArmy, 1)
    delete state.indexes.armiesToNobles[army.id]
    delete state.armies[armyId]
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