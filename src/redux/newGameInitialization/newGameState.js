import { 
  BurnHammerFamily, 
  GoldFingerFamily, 
  GreenHeartFamily,
} from '../../models/families'

import { Kingdom } from '../../models/kingdom/Kingdom'
import { generateNewMap } from './generateNewMap'
import { RandomNameGenerator } from './RandomNameGenerator'
import { Army } from '../../models/Army'
import { generateNobles } from './generateNobles'

function createNewGameState(){
  const randomNameGenerator = new RandomNameGenerator()

  const mainKingdom = new Kingdom({name:'The Main Kingdom'})

  const burnHammerFamily = new BurnHammerFamily()
  const greenHeartFamily = new GreenHeartFamily()
  const goldFingerFamily = new GoldFingerFamily()

  mainKingdom.idsOfFamilies.push(burnHammerFamily.id)
  mainKingdom.idsOfFamilies.push(greenHeartFamily.id)
  mainKingdom.idsOfFamilies.push(goldFingerFamily.id)

  const families = {}
  families[burnHammerFamily.id] = burnHammerFamily
  families[greenHeartFamily.id] = greenHeartFamily
  families[goldFingerFamily.id] = goldFingerFamily

  
  const nobles = {}
  generateNobles({randomNameGenerator, nobles, royalFamily: burnHammerFamily, familySize: 10})
  generateNobles({randomNameGenerator, nobles, royalFamily: greenHeartFamily, familySize: 10})
  generateNobles({randomNameGenerator, nobles, royalFamily: goldFingerFamily, familySize: 10})

  const gameMap = generateNewMap()

  const newGameState = {
    turnNumber: 1,
    randomNameGenerator,
    mainKingdom,
    families,
    nobles,
    gameMap,
    mapOffset: {
      x: 0,
      y: 0,
    },
    tileSize: 32,
  }

  return newGameState
}

export { createNewGameState }