import { 
  BurnHammerFamily, 
  GoldFingerFamily, 
  GreenHeartFamily, 
} from '../../models/families'

import { generateNewMap } from './generateNewMap'
import { RandomNameGenerator } from './RandomNameGenerator'
import { Army } from '../../models/Army'
import { tileHeight } from '../../models/tiles/mapConstants'

function createNewGameState(){
  const randomNameGenerator = new RandomNameGenerator()

  const burnHammerFamily = new BurnHammerFamily()
  const greenHeartFamily = new GreenHeartFamily()
  const goldFingerFamily = new GoldFingerFamily()

  burnHammerFamily.populateNobles(randomNameGenerator)
  greenHeartFamily.populateNobles(randomNameGenerator)
  goldFingerFamily.populateNobles(randomNameGenerator)

  const families = [
    burnHammerFamily,
    greenHeartFamily,
    goldFingerFamily,
  ]

  const gameMap = generateNewMap()

  const testArmy = new Army({
    size: 10,
    coordinates:{x: 10, y: 10}, 
    destination:{x: 25, y: 15},
  })

  const newGameState = {
    turnNumber: 1,
    randomNameGenerator,
    families,
    gameMap,
    mapOffset: {
      x: 0,
      y: 0,
    },
    testArmy,
    tileWidth: 32,
    tileHeight: 32,
  }

  return newGameState
}

export { createNewGameState }