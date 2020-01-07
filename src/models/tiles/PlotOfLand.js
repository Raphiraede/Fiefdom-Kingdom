

class PlotOfLand{
  constructor({type, population, marker, x, y, fiefOwner = null, kingdomOwner = null}){
    this.type = type
    this.marker = marker
    this.population = population
    this.x = x
    this.y = y
    this.fiefOwner = fiefOwner
    this.kingdomOwner = kingdomOwner
  }
}

export { PlotOfLand }