import { RoyalFamily } from '../models/RoyalFamily'
import { RandomNameGenerator } from './nameGenerator.js'

function createNewGameState(){
  const randomNameGenerator = new RandomNameGenerator()

  const BurnHammerFamily = new RoyalFamily({familyName: 'BurnHammer'})
  const GreenHeartFamily = new RoyalFamily({familyName: 'GreenHeart'})
  const GoldFingerFamily = new RoyalFamily({familyName: 'GoldFinger'})

  BurnHammerFamily.populateNobles(randomNameGenerator)
  GreenHeartFamily.populateNobles(randomNameGenerator)
  GoldFingerFamily.populateNobles(randomNameGenerator)

  const families = {
    BurnHammerFamily,
    GreenHeartFamily,
    GoldFingerFamily,
  }

  const newGameState = {
    randomNameGenerator,
    families
  }

  return newGameState
}

export { createNewGameState }