import { PlotOfLand } from './PlotOfLand'
import { getRandomInt } from '../../redux/getRandomInt';

class Trees extends PlotOfLand{
  constructor(marker){
    super({type: 'trees', population: getRandomInt(0, 5), marker})
  }
}

export { Trees }