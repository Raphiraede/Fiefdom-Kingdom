import { PlotOfLand } from './PlotOfLand'
import { getRandomInt } from '../../redux/getRandomInt'

class House extends PlotOfLand{
  constructor(marker){
    super({type:'house', population: getRandomInt(50, 100), marker})
  }
}

export { House }