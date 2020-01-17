import { PlotOfLand } from './PlotOfLand'

class Castle extends PlotOfLand{
  constructor(marker, x, y){
    super({type: 'castle', population: 500, marker, x, y})
  }
}

export { Castle }