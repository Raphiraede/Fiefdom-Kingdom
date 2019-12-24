import { RoyalFamily } from './RoyalFamily.js'

class GoldFingerFamily extends RoyalFamily{
  constructor({idsOfNobles, headOfFamily, id}={}){
    super({idsOfNobles, headOfFamily, id})
    this.familyName='GoldFinger'
    this.attributes={
      Text: "Golden Finger: It is said that the GoldFinger family can make gold out of thin air."
    }
  }
}

export { GoldFingerFamily }