import { PlotOfLand } from "./PlotOfLand"
import { getRandomInt } from "../../redux/getRandomInt"

class Rock extends PlotOfLand{
  constructor(marker, x, y){
    super({type: 'rock', population: getRandomInt(5, 10), marker, x, y})
  }
}

export { Rock }