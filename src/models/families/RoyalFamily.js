import { Noble } from './Noble'
import uuidv1 from 'uuid/v1'

class RoyalFamily{
  constructor({nobles=[], headOfFamily='', id=uuidv1()}) {
    this.nobles = nobles
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
  
  handleNextTurn(randomNameGenerator){
    this.nobles.forEach(noble => {
      noble.handleNextTurn(randomNameGenerator)
    })
  }
}

export { RoyalFamily }