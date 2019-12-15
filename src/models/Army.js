class Army{
  constructor({size, coordinates, destination}){
    this.size = size
    this.coordinates = coordinates
    this.destination = destination
  }

  moveTowardDestination(){
    if(this.coordinates.x < this.destination.x) this.coordinates.x++
    else if (this.coordinates.x > this.destination.x) this.coordinates.x--

    if(this.coordinates.y < this.destination.y) this.coordinates.y++
    else if (this.coordinates.y > this.destination.y) this.coordinates.y--
  }
}

export { Army }