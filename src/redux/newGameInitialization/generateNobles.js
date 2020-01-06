import { Noble } from '../../models/families'


function generateNobles({randomNameGenerator, nobles, royalFamily, familySize}){

  for(let i = 0; i <= familySize; i++){
    const firstName = randomNameGenerator.newName()
    const noble = new Noble({firstName, familyName: royalFamily.familyName})
    nobles[noble.id] = noble
    royalFamily.nobleIds.push(noble.id)
  }
}

export { generateNobles }