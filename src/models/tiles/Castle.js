import { PlotOfLand } from './PlotOfLand'

class Castle extends PlotOfLand{
  constructor(marker, x, y, originalOwner){
    super({type: 'castle', population: 500, marker, x, y})
    this.originalOwner = originalOwner
  }
}

export { Castle }