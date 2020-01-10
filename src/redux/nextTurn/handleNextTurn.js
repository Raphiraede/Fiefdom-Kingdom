
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
  
  calculateTaxesAndUpdateGoldAmount(state.mainKingdom, state.nobles, state.gameMap)

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
        const totalTaxesForThisTile = Math.floor((taxLevel * pop + 100)/100)
        console.log(`x: ${tile.x}`)
        console.log(`y: ${tile.y}`)
        console.log(`Noble:, ${nobles[tile.fiefOwner].firstName} of the ${nobles[tile.fiefOwner].familyName} family`)
        console.log(`tax level: ${taxLevel}`)
        console.log(`pop: ${pop}`)
        console.log(`total taxes: ${totalTaxesForThisTile}`)
        mainKingdom.gold += totalTaxesForThisTile
      }
    }
  }
}


export { handleNextTurn }