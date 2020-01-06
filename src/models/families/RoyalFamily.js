import { Noble } from './Noble'
import uuidv1 from 'uuid/v1'

class RoyalFamily{
  constructor({nobleIds=[], headOfFamily='', id=uuidv1()}) {
    this.nobleIds = nobleIds
    this.headOfFamily = headOfFamily
    this.id = id
  }

  populateNobles(randomNameGenerator) {
    while(this.nobles.length < 10){
      const firstName = randomNameGenerator.newName()
      const familyName = this.familyName
      this.nobles.push(new Noble({firstName, familyName}))
    }
  }
  
  //currently the nobles handleNextTurn is called in nextTurn.js, but it might be useful for that to take place here
  handleNextTurn(){
  }
}

export { RoyalFamily }