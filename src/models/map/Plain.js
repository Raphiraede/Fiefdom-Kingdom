import { PlotOfLand } from "./PlotOfLand"
import { getRandomInt } from '../../redux/getRandomInt'

class Plain extends PlotOfLand{
  constructor(){
    const population = getRandomInt(50, 100)
    const type = 'Plain'
    super({population, type})
  }
}

export { Plain }