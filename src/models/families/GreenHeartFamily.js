import { RoyalFamily } from './RoyalFamily.js'

class GreenHeartFamily extends RoyalFamily{
  constructor({idsOfNobles, headOfFamily, id}={}){
    super({idsOfNobles, headOfFamily, id})
    this.familyName='GreenHeart'
    this.attributes={
      Text: "Green Heart: The Greenheart family are nonviolent and pious."
    }
  }
}

export { GreenHeartFamily }