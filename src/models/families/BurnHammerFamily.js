import { RoyalFamily } from './RoyalFamily.js'

class BurnHammerFamily extends RoyalFamily{
  constructor({nobles, headOfFamily, id}={}){
    super({nobles, headOfFamily, id})
    this.familyName='BurnHammer'
    this.attributes={
      BurningHammer: {
        Text: "Burning Hammer: The Burnhammer family traces it's ancestry back to King Arthur himself."
      }
    }
  }
}

export { BurnHammerFamily }