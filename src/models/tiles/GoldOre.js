import { PlotOfLand } from './PlotOfLand'

class GoldOre extends PlotOfLand{
  constructor(marker, x, y){
    super({type:'goldOre', population: 0, marker, x, y})
  }
}

export { GoldOre }