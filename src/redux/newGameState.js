import { 
  BurnHammerFamily, 
  GoldFingerFamily, 
  GreenHeartFamily, 
} from '../models'

import { RandomNameGenerator } from './RandomNameGenerator.js'

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

  const newGameState = {
    turnNumber: 1,
    randomNameGenerator,
    families,
  }

  return newGameState
}

export { createNewGameState }