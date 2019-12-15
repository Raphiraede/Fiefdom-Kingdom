import { PlotOfLand } from "./PlotOfLand"

class Rock extends PlotOfLand{
  constructor(marker, x, y){
    super({type: 'rock', population: 0, marker, x, y})
  }
}

export { Rock }