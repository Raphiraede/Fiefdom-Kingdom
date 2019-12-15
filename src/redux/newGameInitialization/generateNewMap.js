import { getRandomInt } from '../getRandomInt'
import { mapHeight, mapWidth} from '../../models/tiles/mapConstants'
import { House, Plain, Rock, Trees, Field, GoldOre, Church } from '../../models/tiles'

function generateNewMap(){
  let map = [];
  for(let i=0; i<mapWidth; i++) {
      map[i] = [];
      for(let j=0; j<mapHeight; j++) {
          map[i][j] = undefined;
      }
  }

  //This is the first generation phase, generating sparse landmarks and also creating MARKERS.
  //Markers define clustering, such as villages (clusters of houses) or forests(clusters of trees)
  for (let x = 0; x < mapWidth; x ++){
    for (let y = 0; y < mapHeight; y++){
      const randomInt = getRandomInt(0, 1000)

      if (randomInt > 50 && randomInt < 60) map[x][y] = new Rock(undefined, x, y)
      else if (randomInt>=1 && randomInt<=3) map[x][y] = new Field(undefined, x, y)
      else if (randomInt>5 && randomInt<9) map[x][y] = new Church('VILLAGE_CENTER', x, y)
      else if (randomInt>10 && randomInt<13) map[x][y] = new Trees('FOREST', x, y)
      else if (randomInt > 500 && randomInt < 580) map[x][y] = new Trees(undefined, x, y)
      else if (randomInt > 700 && randomInt < 710) map[x][y] = new House(undefined, x, y)
      else if (randomInt > 800 && randomInt < 805) map[x][y] = new GoldOre(undefined, x, y)
      else{
        map[x][y] = new Plain(undefined, x, y)
      }
    }
  }

  //Forest generated first so that villages aren't wiped out by forest generation
  for (let x = 0; x < mapWidth; x ++){
    for (let y = 0; y < mapHeight; y++){
      if(map[x][y].marker === 'FOREST'){
        const radius = getRandomInt(2, 8)
        fillMarker(x, y, map, radius, map[x][y].marker)
      }
    }
  }
  
  for (let x = 0; x < mapWidth; x ++){
    for (let y = 0; y < mapHeight; y++){
      if(map[x][y].marker === 'VILLAGE_CENTER'){
        const radius = getRandomInt(0, 3)
        fillMarker(x, y, map, radius, map[x][y].marker)
        surroundVillageWithFields(x, y, radius, radius - 1, map)
      }
    }
  }
  return map
}

function surroundVillageWithFields(x, y, radiusOfVillage, radiusOfField, map){
  const leftVillageBoundary = x - radiusOfVillage
  const topVillageBoundary = y - radiusOfVillage
  const rightVillageBoundary = x + radiusOfVillage
  const botVillageBoundary = y + radiusOfVillage

  for(let i = leftVillageBoundary - radiusOfField; i < rightVillageBoundary + radiusOfField; i++){
    for(let j = topVillageBoundary - radiusOfField; j < botVillageBoundary + radiusOfField; j++){
      if(i < 0) i = 0
      if(j < 0) j = 0

      if(i < mapWidth && j < mapHeight && !(i > leftVillageBoundary && i < rightVillageBoundary && j > topVillageBoundary && j < botVillageBoundary)){
        const fieldRandomizer = getRandomInt(0, 1)
        if(fieldRandomizer === 0) map[i][j] = new Field(undefined, i, j)
      }
    }
  }
}

//Markers determine the center of things like village and forests.
//Basically, if a tile is a village marker, the tiles around it are much more likely to spawn houses. Same for forests.
function fillMarker(x, y, map, radius, marker){

  for(let i = x - radius; i < x + radius; i++){
    for(let j = y - radius; j < y + radius; j++){
      if(i < 0) i = 0
      if(j < 0) j = 0

      if(i < mapWidth && j < mapHeight){

        switch(marker){

          case 'VILLAGE_CENTER':
            const houseRandomizer = getRandomInt(0, 2)
            if(houseRandomizer === 0 && map[i][j].type != 'church') map[i][j] = new House(undefined, i, j)
            break

          case 'FOREST':
            const treesRandomizer = getRandomInt(0, 3)
            if(treesRandomizer !== 0) map[i][j] = new Trees(undefined, i, j)
            break
          
          default:
            break

        }
      }
    }
  }
}

export { generateNewMap }