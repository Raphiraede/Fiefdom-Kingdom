import { getRandomInt } from '../getRandomInt'
import { PlotOfLand } from '../../models/map/PlotOfLand'
import { mapHeight, mapWidth} from '../../models/map/mapConstants'
function generateNewMap(width, height){
  let map = [];
  for(let i=0; i<width; i++) {
      map[i] = [];
      for(let j=0; j<height; j++) {
          map[i][j] = undefined;
      }
  }

  for (let x = 0; x < mapHeight; x ++){
    for (let y = 0; y < mapWidth; y++){
      const int = getRandomInt(0, 15)
      let type
      if (int===0) type = 'mountain'
      else if (int>=1 && int<=3) type = 'farm'
      else if (int===4) type = 'hut'
      else type = 'plain'
      map[x][y] = new PlotOfLand({type, population:100})
    }
  }
  return map
}

export { generateNewMap }