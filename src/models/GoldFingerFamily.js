import { RoyalFamily } from './RoyalFamily.js'

class GoldFingerFamily extends RoyalFamily{
  constructor({nobles, headOfFamily, id}={}){
    super({nobles, headOfFamily, id})
    this.familyName='GoldFinger'
  }
}

export { GoldFingerFamily }