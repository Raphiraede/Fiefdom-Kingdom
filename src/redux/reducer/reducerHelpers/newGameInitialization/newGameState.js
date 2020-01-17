import { 
  BurnHammerFamily, 
  GoldFingerFamily, 
  GreenHeartFamily,
} from '../../../../models/families'

import { Kingdom } from '../../../../models/kingdom/Kingdom'
import { generateNewMap } from './generateNewMap'
import { RandomNameGenerator } from './RandomNameGenerator'
import { generateNobles } from './generateNobles'
import { createIndexes } from '../indexes/createIndexes'
import { initializeKingdomTerritory } from './initializeKingdomTerritory'

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

  initializeKingdomTerritory({gameMap, mainKingdom, families, nobles})

  const newGameState = {
    turnNumber: 1,
    randomNameGenerator,
    mainKingdom,
    families,
    nobles,
    gameMap,
    tileSize: 32,
    mapOffset: {
      x: 0,
      y: 0,
    },
    //This represent the coordinates of the tile relative to the gameMap matrix, NOT the pixel coordinates
    hoveredTileCoords: {
      x: 0,
      y: 0,
    },
    givingFief: {
      currentlyGivingFief: false,
      nobleId: null,
    },
    armies: {
      
    },
    selected: null
  }

  newGameState.indexes = createIndexes(newGameState)

  return newGameState
}

export { createNewGameState }