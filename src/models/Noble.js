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
    if(this.age >= this.deathAge) this.die(randomNameGenerator)
  }

  ageOneYear(){
    this.age++
  }

  //Currently, if a noble dies the object stays the same but the stats are randomized again.
  //The idea is that the Nobles firstborn son takes his place.
  //The apple doesn't fall far from the tree, so the stats are loosely based on the fathers
  die(randomNameGenerator){
    console.log(`${this.firstName} has died.`)
    this.firstName = randomNameGenerator.newName()
    console.log(`${this.firstName} has replaced him`)
    this.loyalty += getRandomInt(-20, 20)
    this.power += getRandomInt(-20, 20)
    this.taxLevel += getRandomInt(-20, 20)
    this.age += getRandomInt(-50, -20)
    this.deathAge += getRandomInt(45, 90)

    //if any of the stats went too far in a direction during randomization, this will normalize it
    if(this.loyalty > 100) this.loyalty = 100
    if(this.loyalty < 0) this.loyalty = 0

    if(this.power > 100) this.power = 100
    if(this.power < 0) this.power = 0

    if(this.taxLevel > 100) this.taxLevel = 100
    if(this.taxLevel < 0) this.taxLevel = 0

    if(this.age < 15) this.age = 15
    if(this.age > 50) this.age = 50

    if(this.deathAge < this.age + 5) this.deathAge = this.age + 5 //You should get at least 5 years with a noble before he dies of old age
  }

  
}

export { Noble }