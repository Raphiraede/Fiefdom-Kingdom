
//Armies pull their manpower from the tiles which the noble owns
//This object is to track how many people came from each tile so that when the army disbands, the people can return home to their respective tiles
//When an army battles, and people die, this object will keep track of which people die from each tile.
function createArmyDemographicsObject({nobleId, gameMap, percentage}){
  const armyDemographicsObject = {}
  for(let x = 0; x < gameMap.length; x++){
    for(let y = 0; y < gameMap[x].length; y++){
      const tile = gameMap[x][y]
      const coordinates = {x: tile.x, y: tile.y}
      if(tile.fiefOwner===nobleId){
        const coordinateKey = JSON.stringify(coordinates)
        const numberOfSoldiersDrawn = Math.floor(tile.population * (percentage/100))
        tile.population -= numberOfSoldiersDrawn
        armyDemographicsObject[coordinateKey] = numberOfSoldiersDrawn
      }
    }
  }
  return armyDemographicsObject
}

export { createArmyDemographicsObject }