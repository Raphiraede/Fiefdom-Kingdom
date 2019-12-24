import uuidv1 from 'uuid/v1'
class Kingdom{
  constructor({name='default name', idsOfFamilies=[], id=uuidv1()}){
    this.name = name
    this.idsOfFamilies = idsOfFamilies
    this.id = id
  }
}

export { Kingdom }