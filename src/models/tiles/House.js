import { PlotOfLand } from './PlotOfLand'
import { getRandomInt } from '../../redux/getRandomInt'

class House extends PlotOfLand{
  constructor(marker, x, y){
    super({type:'house', population: getRandomInt(50, 100), marker, x, y})
  }
}

export { House }