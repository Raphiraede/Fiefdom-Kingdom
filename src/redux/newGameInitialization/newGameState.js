import { 
  BurnHammerFamily, 
  GoldFingerFamily, 
  GreenHeartFamily, 
} from '../../models'

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

  const gameMap = generateNewMap(200, 200)

  const newGameState = {
    turnNumber: 1,
    randomNameGenerator,
    families,
    gameMap
  }

  return newGameState
}

export { createNewGameState }