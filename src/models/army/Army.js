import uuidv1 from 'uuid/v1'

class Army{
  constructor({kingdomId, nobleId, coordinates={x:0,y:0}, destination=coordinates, demographics, id=uuidv1()}){
    this.kingdomId = kingdomId
    this.nobleId = nobleId
    this.coordinates = coordinates
    this.destination = destination
    this.demographics = demographics
    this.id = id
  }


  handleNextTurn(armies){
    this.moveTowardDestination(armies)
  }

  calculateTotalSize(){
    let totalPop = 0
    for (const key in this.demographics){
      totalPop += this.demographics[key]
    }
    return totalPop
  }

  moveTowardDestination(armies){
    let targetSquare = {...this.coordinates}
    if(this.coordinates.x < this.destination.x) targetSquare.x = this.coordinates.x + 1
    else if (this.coordinates.x > this.destination.x) targetSquare.x = this.coordinates.x - 1

    if(this.coordinates.y < this.destination.y) targetSquare.y = this.coordinates.y + 1
    else if (this.coordinates.y > this.destination.y) targetSquare.y = this.coordinates.y - 1

    const pathIsClear = this.checkIfPathIsClear(targetSquare, armies)
    if(pathIsClear){
      this.coordinates = targetSquare
    }
  }

  //currently the only thing which can block a path is another army
  checkIfPathIsClear(targetSquare, armies){
    let pathIsClear = true
    for (const id in armies){
      const army = armies[id]
      if(targetSquare.x === army.coordinates.x && targetSquare.y === army.coordinates.y){
        pathIsClear = false
      }
    }
    return pathIsClear
  }
}

export { Army }