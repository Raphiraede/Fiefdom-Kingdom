import { PlotOfLand } from "./PlotOfLand"

class Plain extends PlotOfLand{
  constructor(marker){
    super({type:'plain', population:0, marker})
  }
}

export { Plain }