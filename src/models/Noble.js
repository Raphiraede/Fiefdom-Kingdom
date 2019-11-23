import uuidv1 from 'uuid/v1'
import { getRandomInt } from '../redux/getRandomInt'

class Noble {
  constructor({
    firstName,
    familyName,
    loyalty=getRandomInt(0, 100),
    power=getRandomInt(0, 100),
    taxLevel=getRandomInt(0, 100),
    age=getRandomInt(15, 45),
    deathAge=getRandomInt(45, 90),
    id=uuidv1(),
  }){
    this.firstName = firstName
    this.familyName = familyName
    this.loyalty = loyalty
    this.power = power
    this.taxLevel = taxLevel
    this.age = age
    this.deathAge = deathAge
    this.id = id
  }
  
  handleNextTurn(randomNameGenerator){
    this.ageOneYear()
    if(this.age >= this.deathAge)
    this.die()
  }

  ageOneYear(){
    this.age++
  }

  
}

export { Noble }