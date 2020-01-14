import uuidv1 from 'uuid/v1'

class Army{
  constructor({kingdomId, nobleId, size=100, coordinates={x:0,y:0}, destination=coordinates, id=uuidv1()}){
    this.kingdomId = kingdomId
    this.nobleId = nobleId
    this.size = size
    this.coordinates = coordinates
    this.destination = destination
    this.id = id
  }


  handleNextTurn(){
    this.moveTowardDestination()
  }

  moveTowardDestination(){
    if(this.coordinates.x < this.destination.x) this.coordinates.x++
    else if (this.coordinates.x > this.destination.x) this.coordinates.x--

    if(this.coordinates.y < this.destination.y) this.coordinates.y++
    else if (this.coordinates.y > this.destination.y) this.coordinates.y--
  }
}

export { Army }