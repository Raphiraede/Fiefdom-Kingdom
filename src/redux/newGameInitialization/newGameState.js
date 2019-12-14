import { 
  BurnHammerFamily, 
  GoldFingerFamily, 
  GreenHeartFamily, 
} from '../../models/families'

import { generateNewMap } from './generateNewMap'
import { RandomNameGenerator } from './RandomNameGenerator'

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

  const newGameState = {
    turnNumber: 1,
    randomNameGenerator,
    families,
    gameMap,
    mapOffset: {
      width: 0,
      height: 0,
    }
  }

  return newGameState
}

export { createNewGameState }