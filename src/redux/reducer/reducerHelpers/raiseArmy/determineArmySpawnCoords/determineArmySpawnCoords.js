
//If there is no suitable place to spawn the army, this function returns undefined
//Currently the only suitable place to spawn an army is next to the castle, but NOT on the castle
function determineArmySpawnCoords({kingdomId, gameMap, armies}){
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

  let castleCoords
  for(let x = 0; x < gameMap.length; x++){
    for(let y = 0; y < gameMap[x].length; y++){
      if(gameMap[x][y].type === 'castle' && gameMap[x][y].kingdomOwner === kingdomId && gameMap[x][y].originalOwner){
        castleCoords = { x, y }
      }
    }
  }

  if(castleCoords){
    const belowCastle = { x: castleCoords.x, y: castleCoords.y + 1 }
    const leftOfCastle = { x: castleCoords.x - 1, y: castleCoords.y }
    const aboveCastle = { x: castleCoords.x, y: castleCoords.y -1 }
    const rightOfCastle = { x: castleCoords.x + 1, y: castleCoords.y }
    if(belowCastle.y < gameMap[0].length && !occupiedTiles[[belowCastle.x, belowCastle.y]]) return belowCastle
    if(leftOfCastle.x > 0 && !occupiedTiles[[leftOfCastle.x, leftOfCastle.y]]) return leftOfCastle
    if(aboveCastle.y > 0 && !occupiedTiles[[aboveCastle.x, aboveCastle.y]]) return aboveCastle
    if(rightOfCastle.x < gameMap.length && !occupiedTiles[[rightOfCastle.x, rightOfCastle.y]]) return rightOfCastle
  }
  return undefined
}

export { determineArmySpawnCoords}