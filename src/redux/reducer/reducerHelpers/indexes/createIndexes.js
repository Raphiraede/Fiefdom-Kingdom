import { createNoblesToFamiliesIndex } from './createNoblesToFamiliesIndex'
import { createFamiliesToKingdomsIndex } from './creatFamiliesToKingdomIndex'

function createIndexes(state){
  const indexes = {
    noblesToFamilies: createNoblesToFamiliesIndex({nobles: state.nobles, families: state.families}),
    familiesToKingdoms: createFamiliesToKingdomsIndex(state.mainKingdom)
  }
  return indexes
}

export { createIndexes }