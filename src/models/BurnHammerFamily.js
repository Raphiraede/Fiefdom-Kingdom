import { RoyalFamily } from './RoyalFamily.js'

class BurnHammerFamily extends RoyalFamily{
  constructor({nobles, headOfFamily, id}={}){
    super({nobles, headOfFamily, id})
    this.familyName='BurnHammer'
  }
}

export { BurnHammerFamily }