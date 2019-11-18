import { RoyalFamily } from './RoyalFamily.js'

class GreenHeartFamily extends RoyalFamily{
  constructor({nobles, headOfFamily, id}={}){
    super({nobles, headOfFamily, id})
    this.familyName='GreenHeart'
  }
}

export { GreenHeartFamily }