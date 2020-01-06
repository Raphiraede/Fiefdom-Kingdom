import { RoyalFamily } from './RoyalFamily.js'

class GreenHeartFamily extends RoyalFamily{
  constructor({nobleIds, headOfFamily, id}={}){
    super({nobleIds, headOfFamily, id})
    this.familyName='GreenHeart'
    this.attributes={
      Text: "Green Heart: The Greenheart family are nonviolent and pious."
    }
  }
}

export { GreenHeartFamily }