import { createNoblesToFamiliesIndex } from './createNoblesToFamiliesIndex'

function createIndexes(state){
  const indexes = {
    noblesToFamilies: createNoblesToFamiliesIndex({nobles: state.nobles, families: state.families}),

  }
  return indexes
}

export { createIndexes }