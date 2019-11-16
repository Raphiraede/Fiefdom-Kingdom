const uuidv1 = require('uuid/v1')

class Noble {
  constructor({firstName, familyName, loyalty}){
    this.firstName = firstName
    this.familyName = familyName
    this.loyalty = loyalty
    this.id = uuidv1()
  }
}

export default Noble