import { Noble } from '../../models/families'
import { getRandomInt } from '../getRandomInt'


function generateNobles({randomNameGenerator, nobles, royalFamily, familySize}){

  for(let i = 0; i < familySize; i++){
    const firstName = randomNameGenerator.newName()
    const randomRgb = generateRandomRgb()
    const noble = new Noble({firstName, familyName: royalFamily.familyName, color: randomRgb})
    nobles[noble.id] = noble
    royalFamily.nobleIds.push(noble.id)
  }
}

function generateRandomRgb(){
  const randomRgb=`rgb(${getRandomInt(0, 255)}, ${getRandomInt(0, 255)}, ${getRandomInt(0, 255)}, 0.4)`
  return randomRgb
}

export { generateNobles }