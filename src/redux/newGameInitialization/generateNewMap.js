import { getRandomInt } from '../getRandomInt'
import { PlotOfLand } from '../../models/map/PlotOfLand'

function generateNewMap(width, height){
  let map = [];
  for(let i=0; i<width; i++) {
      map[i] = [];
      for(let j=0; j<height; j++) {
          map[i][j] = undefined;
      }
  }

  for (let i = 0; i < width; i ++){
    for (let j = 0; j < height; j++){
      const int = getRandomInt(0, 15)
      let type
      if (int===0) type = 'mountain'
      else if (int>=1 && int<=3) type = 'farm'
      else if (int===4) type = 'hut'
      else type = 'plain'
      map[i][j] = new PlotOfLand({type, population:100})
    }
  }
  return map
}

export { generateNewMap }