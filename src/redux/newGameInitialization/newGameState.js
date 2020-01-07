import { 
  BurnHammerFamily, 
  GoldFingerFamily, 
  GreenHeartFamily,
} from '../../models/families'

import { Kingdom } from '../../models/kingdom/Kingdom'
import { generateNewMap } from './generateNewMap'
import { RandomNameGenerator } from './RandomNameGenerator'
import { generateNobles } from './generateNobles'
import { createIndexes } from '../indexes/createIndexes'
import { initializeKingdomTerritory } from './initializeKingdomTerritory.js'

function createNewGameState(){
  const randomNameGenerator = new RandomNameGenerator()

  const mainKingdom = new Kingdom({name:'The Main Kingdom'})

  const burnHammerFamily = new BurnHammerFamily()
  const greenHeartFamily = new GreenHeartFamily()
  const goldFingerFamily = new GoldFingerFamily()

  mainKingdom.familyIds.push(burnHammerFamily.id)
  mainKingdom.familyIds.push(greenHeartFamily.id)
  mainKingdom.familyIds.push(goldFingerFamily.id)

  const families = {}
  families[burnHammerFamily.id] = burnHammerFamily
  families[greenHeartFamily.id] = greenHeartFamily
  families[goldFingerFamily.id] = goldFingerFamily
  
  const nobles = {}
  generateNobles({randomNameGenerator, nobles, royalFamily: burnHammerFamily, familySize: 5})
  generateNobles({randomNameGenerator, nobles, royalFamily: greenHeartFamily, familySize: 5})
  generateNobles({randomNameGenerator, nobles, royalFamily: goldFingerFamily, familySize: 5})

  const gameMap = generateNewMap()

  initializeKingdomTerritory({gameMap, mainKingdom: mainKingdom})

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

  newGameState.indexes = createIndexes(newGameState)

  return newGameState
}

export { createNewGameState }