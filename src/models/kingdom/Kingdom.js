import uuidv1 from 'uuid/v1'

class Kingdom{
  constructor({name='default name', familyIds=[], gold=0, color='black', id=uuidv1()}){
    this.name = name
    this.familyIds = familyIds
    this.gold = gold
    this.color = color
    this.id = id
  }
}

export { Kingdom }