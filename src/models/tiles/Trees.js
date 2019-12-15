import { PlotOfLand } from './PlotOfLand'
import { getRandomInt } from '../../redux/getRandomInt';

class Trees extends PlotOfLand{
  constructor(marker, x, y){
    super({type: 'trees', population: getRandomInt(0, 5), marker, x, y})
  }
}

export { Trees }