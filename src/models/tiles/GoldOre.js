import { PlotOfLand } from './PlotOfLand'
import { getRandomInt } from '../../redux/getRandomInt'

class GoldOre extends PlotOfLand{
  constructor(marker, x, y){
    super({type:'gold ore', population: getRandomInt(5, 10), marker, x, y})
  }
}

export { GoldOre }