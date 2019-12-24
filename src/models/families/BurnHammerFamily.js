import { RoyalFamily } from './RoyalFamily.js'

class BurnHammerFamily extends RoyalFamily{
  constructor({idsOfNobles, headOfFamily, id}={}){
    super({idsOfNobles, headOfFamily, id})
    this.familyName='BurnHammer'
    this.attributes={
      BurningHammer: {
        Text: "Burning Hammer: The Burnhammer family traces it's ancestry back to King Arthur himself."
      }
    }
  }
}

export { BurnHammerFamily }