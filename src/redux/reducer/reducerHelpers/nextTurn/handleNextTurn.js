
import { createIndexes } from '../indexes/createIndexes'

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

  //currently nobles handleNextTurn is called here, but it might be useful for that to take place in families handleNextTurn
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
    army.handleNextTurn(armies)
    payWages({army, kingdom: state.mainKingdom})
    if(army.turnsOnSameTile >= 2) conquerTerritory({army, state})
  })



  newState.indexes = createIndexes(newState)
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

function payWages({army, kingdom}){
  kingdom.gold -= army.wageOwed
  army.wageOwed = 0
}

function conquerTerritory({army, state}){

  const nobleWhichArmyIsLoyalTo = state.indexes.armiesToNobles[army.id]
  const familyWhichNobleBelongsTo = state.indexes.noblesToFamilies[nobleWhichArmyIsLoyalTo]
  const kingdomWhichFamilyBelongsTo = state.indexes.familiesToKingdoms[familyWhichNobleBelongsTo]
  const coords = army.coordinates
  state.gameMap[coords.x][coords.y].kingdomOwner = kingdomWhichFamilyBelongsTo

}

export { handleNextTurn }