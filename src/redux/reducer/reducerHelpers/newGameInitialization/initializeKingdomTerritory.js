import { getRandomInt } from '../../../getRandomInt'
import { Castle } from '../../../../models/tiles/Castle'

function initializeKingdomTerritory({gameMap, mainKingdom, aiKingdoms}){

  const kingdoms = [mainKingdom, ...aiKingdoms]
  const mapWidth = gameMap.length
  const mapHeight = gameMap[0].length

  const kingdomCastleLocations = []
  kingdoms.forEach(kingdom => {
    //castleX and castleY is the random starting point, and the kingdom will randomly grow outwards from there.
    let castlesProperlySpaced = false
    let castleX
    let castleY
    while (!castlesProperlySpaced){
      castleX = getRandomInt(0, mapWidth-1)
      castleY = getRandomInt(0, mapHeight-1)
      castlesProperlySpaced = checkIfCastlesAreProperlySpaced(castleX, castleY, kingdomCastleLocations)
    }
    
    
    const castle = new Castle (undefined, castleX, castleY)
    gameMap[castleX][castleY] = castle
    let sizeOfStartingKingdom = 30

    //When determining a new tile to give to the kingdom, this algorithm starts at castleX and castleY, aka the "center" of the new kingdom
    //Then the algorithm goes to a random tile next to it, and tries to give that tile to the kingdom.
    //If the tile is already assigned to a kingdom, then another random surrounding tile is picked, and the algorithm tries to give that tile to the kingdom, etc.
    //When an available tile is found, it is assigned to the kingdom, and the process starts over again from castleX and castleY
    outerLoop:
    for(let i = 0; i < sizeOfStartingKingdom; i++){
      let x = castleX
      let y = castleY

      let jankInfiniteLoopPrevention = 0

      let newTileAssigned = false
      while(!newTileAssigned){
        x += getRandomInt(-1, 1)
        y += getRandomInt(-1, 1)

        if(x<0 || y<0 || x>gameMap.length-1 || y>gameMap.length-1){//This prevents x and y from going outside of the game map
          x = castleX
          y = castleY
        }

        if(!gameMap[x][y].kingdomOwner){
          gameMap[x][y].kingdomOwner = kingdom.id
          newTileAssigned = true
        }

        //this is only here on the off chance the map is too small to accommodate the generation of all the necessary kingdoms
        if(jankInfiniteLoopPrevention === 5000){ 
          console.log('infinite loop in initializeKingdomTerritory')
          alert('Infinite loop while initializing kingdom territory, the map is probably too small to accommodate all the kingdoms')
          break outerLoop
        }
      }
    }
  })
}

function checkIfCastlesAreProperlySpaced(x, y, kingdomCastleLocations){
  const minimumDistance = 20
  for (const location of kingdomCastleLocations){
    const otherX = location.x
    const otherY = location.y
    let totalDistanceApart = 0
    totalDistanceApart += Math.abs(x - otherX)
    totalDistanceApart += Math.abs(y - otherY)

    if(totalDistanceApart < minimumDistance) return false
  }
  const newCastleLocation = { x, y }
  kingdomCastleLocations.push(newCastleLocation)
  return true
}

export { initializeKingdomTerritory }