import uuidv1 from 'uuid/v1'

class Kingdom{
  constructor({name='default name', familyIds=[], gold=0, color='black', id=uuidv1()}){
    this.name = name
    this.familyIds = familyIds
    this.gold = gold
    this.color = color
    this.id = id
  }

  armiesLoyalToThisKingdom(families, nobles, armies){
    let armiesLoyalToThisKingdom = []
    for (const familyId of this.familyIds){
      const family = families[familyId]
      for(const nobleId of family.nobleIds){
        const noble = nobles[nobleId]
        for (const armyId of noble.armies){
          armiesLoyalToThisKingdom.push(armies[armyId])
        }
      }
    }
    return armiesLoyalToThisKingdom
  }
}

export { Kingdom }