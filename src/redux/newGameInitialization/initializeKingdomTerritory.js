import { getRandomInt } from '../getRandomInt'

function initializeKingdomTerritory({gameMap, mainKingdom}){
  const mapWidth = gameMap.length
  const mapHeight = gameMap[0].length

  //kingdomX and kingdomY is the random starting point, and the kingdom should randomly grow outwards from there.
  const kingdomX = getRandomInt(0, mapWidth-1)
  const kingdomY = getRandomInt(0, mapHeight-1)

  gameMap[kingdomX][kingdomY].kingdomOwner = mainKingdom.id
  let sizeOfStartingKingdom = 30


  //When determining a new tile to give to the kingdom, this algorithm starts at kingdomX and kingdomY, aka the "center" of the new kingdom
  //Then the algorithm goes to a random tile next to it, and tries to give that tile to the kingdom.
  //If the tile is already assigned to a kingdom, then another random surrounding tile is picked, and the algorithm tries to give that tile to the kingdom, etc.
  //When an available tile is found, it is assigned to the kingdom, and the process starts over again from kingdomX and kingdomY
  for(let i = 0; i <= sizeOfStartingKingdom; i++){
    let x = kingdomX
    let y = kingdomY

    let jenkInfiniteLoopPrevention = 0

    let newTileAssigned = false
    while(!newTileAssigned){
      x += getRandomInt(-1, 1)
      y += getRandomInt(-1, 1)

      if(x<0 || y<0 || x>gameMap.length-1 || y>gameMap.length-1){//This prevents x and y from going outside of the game map
        x = kingdomX
        y = kingdomY
      }

      if(!gameMap[x][y].kingdomOwner){
        gameMap[x][y].kingdomOwner = mainKingdom.id
        newTileAssigned = true
      }

      //this is only here on the off chance the map is too small to accommodate the generation of all the necessary kingdoms
      if(jenkInfiniteLoopPrevention === 1000){ 
        console.log('infinite loop in initializeKingdomTerrtitory')
        alert('sup')
        break
      }
    }
  }
}

export { initializeKingdomTerritory }