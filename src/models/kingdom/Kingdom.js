import uuidv1 from 'uuid/v1'
class Kingdom{
  constructor({name='default name', familyIds=[], id=uuidv1()}){
    this.name = name
    this.familyIds = familyIds
    this.id = id
  }
}

export { Kingdom }