import { PlotOfLand } from './PlotOfLand'
import { getRandomInt } from '../../redux/getRandomInt'

class Field extends PlotOfLand{
  constructor(marker){
    super({type: 'field', population: 0, marker})
  }
}

export { Field }