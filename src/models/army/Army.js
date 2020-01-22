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

  calculateKingdomIdThatArmyIsLoyalTo(state){
    const nobleWhichArmyIsLoyalTo = state.indexes.armiesToNobles[this.id]
    const familyWhichNobleBelongsTo = state.indexes.noblesToFamilies[nobleWhichArmyIsLoyalTo]
    const kingdomWhichFamilyBelongsTo = state.indexes.familiesToKingdoms[familyWhichNobleBelongsTo]
    return kingdomWhichFamilyBelongsTo
  }
}



export { Army }