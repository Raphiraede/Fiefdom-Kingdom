
//If there is no suitable place to spawn the army, this function returns undefined
function determineArmySpawnCoords({nobleId, gameMap, armies}){
  const occupiedTiles={}
  let armyIds
  if(armies){
    armyIds = Object.keys(armies)
    armyIds.forEach(id => {
      const army = armies[id]
      const coordinates = army.coordinates
      occupiedTiles[[coordinates.x, coordinates.y]] = true
    })
  }

  for(let x = 0; x < gameMap.length; x++){
    for(let y = 0; y < gameMap[x].length; y++){
      if(gameMap[x][y].fiefOwner === nobleId && !occupiedTiles[[x, y]]){
        return {
          x, y
        }
      }
    }
  }
  return undefined
}

export { determineArmySpawnCoords}