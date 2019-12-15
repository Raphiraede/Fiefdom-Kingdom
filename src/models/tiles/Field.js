import { PlotOfLand } from './PlotOfLand'

class Field extends PlotOfLand{
  constructor(marker, x, y){
    super({type: 'field', population: 0, marker, x, y})
  }
}

export { Field }