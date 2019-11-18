import uuidv1 from 'uuid/v1'
import { getRandomInt } from '../redux/RandomNameGenerator.js'

class Noble {
  constructor({
    firstName,
    familyName,
    loyalty,
    age=getRandomInt(10, 45),
    deathAge=getRandomInt(45, 90),
    id=uuidv1(),
  }){
    this.firstName = firstName
    this.familyName = familyName
    this.loyalty = loyalty

    this.age = age
    this.deathAge = deathAge
    this.id = id
  }

  ageOneYear(){
    this.age++
  }
}

export { Noble }