import { PlotOfLand } from "./PlotOfLand"
import { getRandomInt } from ''

class Mountain extends PlotOfLand{
  constructor(){
    this.population = getRandomInt(50, 100)
    this.type = 'Mountain'
  }
}

export { Mountain }