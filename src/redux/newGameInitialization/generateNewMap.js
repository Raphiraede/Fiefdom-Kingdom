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
      const int = getRandomInt(0, 2)
      let type
      if(int === 0) type = 'plain'
      else if (int===1) type = 'mountain'
      else if (int===2) type = 'farm'
      map[i][j] = new PlotOfLand({type, population:100})
    }
  }
  return map
}

export { generateNewMap }