import uuidv1 from 'uuid/v1'

class Army{
  constructor({coordinates={x:0,y:0}, destination=coordinates, demographics, turnsOnSameTile=0, mode='move', id=uuidv1()}){
    this.coordinates = coordinates
    this.destination = destination
    this.demographics = demographics
    this.turnsOnSameTile = turnsOnSameTile
    this.mode = mode
    this.id = id
  }


  handleNextTurn({state, armies}){
    const kingdomId = this.calculateKingdomIdThatArmyIsLoyalTo(state)
    if(this.mode === 'move') this.moveTowardDestination(state.armies)
    else if(this.mode === 'conquer') this.handleConquerMode(state, kingdomId)
    if(this.turnsOnSameTile >= 2) this.conquerTerritory(state, kingdomId)
    this.payWages(state, kingdomId)
    this.turnsOnSameTile++
  }

  payWages(state, kingdomId){
    const wageOwed = this.calculateTotalSize() * 10
    if(state.mainKingdom.id === kingdomId){
      state.mainKingdom.gold -= wageOwed
    }
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
      this.turnsOnSameTile = 0
    }
  }

  handleConquerMode(state, kingdomId){
    const kingdomOwnerOfTile = state.gameMap[this.coordinates.x][this.coordinates.y].kingdomOwner
    if(kingdomId === kingdomOwnerOfTile) this.moveTowardDestination()
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

  conquerTerritory(state, kingdomId){
    state.gameMap[this.coordinates.x][this.coordinates.y].kingdomOwner = kingdomId
  }

  calculateKingdomIdThatArmyIsLoyalTo(state){
    const nobleWhichArmyIsLoyalTo = state.indexes.armiesToNobles[this.id]
    const familyWhichNobleBelongsTo = state.indexes.noblesToFamilies[nobleWhichArmyIsLoyalTo]
    const kingdomWhichFamilyBelongsTo = state.indexes.familiesToKingdoms[familyWhichNobleBelongsTo]
    return kingdomWhichFamilyBelongsTo
  }
}



export { Army }