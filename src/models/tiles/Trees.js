import { PlotOfLand } from './PlotOfLand'
import { getRandomInt } from '../../redux/getRandomInt';

class Trees extends PlotOfLand{
  constructor(marker, x, y){
    super({type: 'trees', population: getRandomInt(10, 20), marker, x, y})
  }
}

export { Trees }