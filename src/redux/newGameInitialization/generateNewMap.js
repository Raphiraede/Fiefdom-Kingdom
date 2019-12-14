import { getRandomInt } from '../getRandomInt'
import { PlotOfLand } from '../../models/tiles/PlotOfLand'
import { mapHeight, mapWidth} from '../../models/tiles/mapConstants'
import { House, Plain, Rock, Trees, Field } from '../../models/tiles'

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

      if (randomInt===0) map[x][y] = new Rock()
      else if (randomInt>=1 && randomInt<=3) map[x][y] = new Field()
      else if (randomInt>5 && randomInt<9){
        map[x][y] = new House('VILLAGE_CENTER')
      }
      else if (randomInt>10 && randomInt<14){
        map[x][y] = new Trees('FOREST')
      }
      else{
        map[x][y] = new Plain()
      }
    }
  }

  //Forest generated first so that villages aren't wiped out by forest generation
  for (let x = 0; x < mapWidth; x ++){
    for (let y = 0; y < mapHeight; y++){
      if(map[x][y].marker === 'FOREST'){
        fillMarkers(x, y, map, 5, map[x][y].marker)
      }
    }
  }
  
  for (let x = 0; x < mapWidth; x ++){
    for (let y = 0; y < mapHeight; y++){
      if(map[x][y].marker === 'VILLAGE_CENTER'){
        fillMarkers(x, y, map, 2, map[x][y].marker)
      }
    }
  }


  return map
}

//Markers determine the center of things like village and forests.
//Basically, if a tile is a village marker, the tiles around it are much more likely to spawn houses. Same for forests.
function fillMarkers(x, y, map, radius, marker){

  for(let i = x - radius; i < x + radius; i++){
    for(let j = y - radius; j < y + radius; j++){
      if(i < 0) i = 0
      if(j < 0) j = 0

      if(i < mapWidth && j < mapHeight){

        switch(marker){

          case 'VILLAGE_CENTER':
            const houseRandomizer = getRandomInt(0, 1)
            if(houseRandomizer === 0) map[i][j] = new House()
            break

          case 'FOREST':
            const treesRandomizer = getRandomInt(0, 3)
            if(treesRandomizer !== 0) map[i][j] = new Trees()
            break
          
          default:
            break

        }
      }
    }
  }
}

export { generateNewMap }