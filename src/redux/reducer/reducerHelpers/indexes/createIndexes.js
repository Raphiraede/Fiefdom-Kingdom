import { createNoblesToFamiliesIndex } from './createNoblesToFamiliesIndex'
import { createFamiliesToKingdomsIndex } from './creatFamiliesToKingdomIndex'
import { createArmiesToNoblesIndex } from './createArmiesToNoblesIndex'

function createIndexes(state){
  const indexes = {
    noblesToFamilies: createNoblesToFamiliesIndex({nobles: state.nobles, families: state.families}),
    familiesToKingdoms: createFamiliesToKingdomsIndex({mainKingdom: state.mainKingdom}),
    armiesToNobles: createArmiesToNoblesIndex({nobles: state.nobles})
  }
  return indexes
}

export { createIndexes }