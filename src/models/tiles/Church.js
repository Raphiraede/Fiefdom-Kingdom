import { PlotOfLand } from './PlotOfLand'
import { getRandomInt } from '../../redux/getRandomInt'

class Church extends PlotOfLand{
  constructor(marker, x, y){
    super({type: 'church', population: getRandomInt(50, 100), marker, x, y})
  }
}

export { Church }