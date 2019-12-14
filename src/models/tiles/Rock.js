import { PlotOfLand } from "./PlotOfLand"

class Rock extends PlotOfLand{
  constructor(marker){
    super({type: 'rock', population: 0, marker})
  }
}

export { Rock }