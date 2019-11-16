import Noble from './Noble'

//UUID's might be unnecessary in this case, since Royal Family Name
const uuidv1 = require('uuid/v1')

class RoyalFamily{
  constructor({nobles=[], familyName, headOfFamily}) {
    this.nobles = nobles
    this.familyName = familyName
    this.headOfFamily = headOfFamily
    this.id = uuidv1()
  }

  populateNobles(randomNameGenerator) {
    while(this.nobles.length <= 10){
      const firstName = randomNameGenerator.newName()
      const familyName = this.familyName
      const loyalty = 10
      this.nobles.push(new Noble({firstName, familyName, loyalty}))
    }
  }
}

export { RoyalFamily }