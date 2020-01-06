
import { createIndexes } from '../indexes/createIndexes'

function handleNextTurn(state){
  let newState = {...state}
  newState.turnNumber++

  const families = newState.families
  const familyIds = Object.keys(families)
  familyIds.forEach(id => {
    const family = families[id]
    family.handleNextTurn()
  })

  //currently nobles handleNextTurn is called here, but it might be useful for that to take place in families handleNextTurn
  const nobles = newState.nobles
  const nobleIds = Object.keys(nobles)
  nobleIds.forEach(id => {
    const noble = nobles[id]
    noble.handleNextTurn(state.randomNameGenerator)
  })
  return newState
}

export { handleNextTurn }