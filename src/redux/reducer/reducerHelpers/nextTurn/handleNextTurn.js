
import { createIndexes } from '../indexes/createIndexes'
import { aiKingdomTurn } from './aiKingdomTurn'

function handleNextTurn(state){
  let newState = {...state}
  newState.turnNumber++

  calculateTaxesAndUpdateGoldAmount(state.mainKingdom, state.nobles, state.gameMap)

  const families = newState.families
  const familyIds = Object.keys(families)
  familyIds.forEach(id => {
    const family = families[id]
    family.handleNextTurn()
  })

  const nobles = newState.nobles
  const nobleIds = Object.keys(nobles)
  nobleIds.forEach(id => {
    const noble = nobles[id]
    noble.handleNextTurn(state.randomNameGenerator)
  })

  const armies = newState.armies
  const armyIds = Object.keys(armies)
  armyIds.forEach(id => {
    const army = armies[id]
    army.handleNextTurn({state, armies})
  })
  newState.indexes = createIndexes(newState)

  aiKingdomTurn(state)
  return newState
}

function calculateTaxesAndUpdateGoldAmount(mainKingdom, nobles, gameMap){
  for(let x = 0; x < gameMap.length; x++){
    for(let y = 0; y < gameMap[0].length; y++){

      const tile = gameMap[x][y]
      if (tile.kingdomOwner && tile.fiefOwner){
        const taxLevel = nobles[tile.fiefOwner].taxLevel
        const pop = tile.population
        let totalTaxesForThisTile = Math.floor((taxLevel * pop + 100)/100)
        if(tile.type === 'goldOre') totalTaxesForThisTile+=100
        mainKingdom.gold += totalTaxesForThisTile
      }
    }
  }
}

export { handleNextTurn }