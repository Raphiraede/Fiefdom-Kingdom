import { PlotOfLand } from "./PlotOfLand"

class Plain extends PlotOfLand{
  constructor(marker, x, y){
    super({type:'plain', population:0, marker, x, y})
  }
}

export { Plain }