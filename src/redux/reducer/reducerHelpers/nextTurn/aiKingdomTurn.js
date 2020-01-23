import { raiseArmy } from "../raiseArmy/raiseArmy"
import { getRandomInt } from "../../../getRandomInt"


function aiKingdomTurn(state){
  state.aiKingdoms.forEach(aiKingdom => {
    decisionMaker(state, aiKingdom)
  })
}

function giveFiefsToNobles(gameMap, aiKingdomId, nobleIds){
  for(let x = 0; x < gameMap.length; x++){
    for(let y = 0; y < gameMap[x].length; y++){
      const tile = gameMap[x][y]
      if(tile.kingdomOwner === aiKingdomId){
        tile.fiefOwner = nobleIds[0]
      }
    }
  }
}

function decisionMaker(state, aiKingdom){
  const nobleIds = loyalNobles(state, aiKingdom)
  giveFiefsToNobles(state.gameMap, aiKingdom.id, nobleIds)
  const shouldRaiseArmy = decideWhetherToRaiseArmy(state, aiKingdom)
  if(shouldRaiseArmy) {
    raiseArmy({state, nobleId: nobleIds[0]})
  }
  if(state.turnNumber < 40){
    randomlyAssignArmyTasks(state, aiKingdom, 11)
  }
  else if(state.turnNumber < 100){
    randomlyAssignArmyTasks(state, aiKingdom, 9)
  }
  else if(state.turnNumber < 150){
    randomlyAssignArmyTasks(state, aiKingdom, 5)
  }
  else{
    randomlyAssignArmyTasks(state, aiKingdom, 3)
  }
}

//probabilityModifier control the probability that an army will be sent to conquer village tiles, or to attack the castle
function randomlyAssignArmyTasks(state, aiKingdom, probabilityModifier){
  const armies = aiKingdom.armiesLoyalToThisKingdom(state.families, state.nobles, state.armies)
  
  const villageTiles = findVillageTilesNotAlreadyOwnedByThisKingdom(state.gameMap, aiKingdom)
  const mainKingdomCastleCoords = findKingdomCastleCoords(state.gameMap, state.mainKingdom)
  armies.forEach(army => {
    const currentTile = state.gameMap[army.coordinates.x][army.coordinates.y]
    
    if(army.destination.x === army.coordinates.x && army.destination.y === army.coordinates.y && currentTile.kingdomOwner === aiKingdom.id){
      const conquerOrMove = getRandomInt(0, 1)
      if(conquerOrMove) army.mode = 'move'
      else army.mode = 'conquer'
      const randomDecision = getRandomInt(0, 10)
      if(randomDecision < probabilityModifier){
        const randomIndex = getRandomInt(0, villageTiles.length - 1)
        const randomTile = villageTiles[randomIndex]
        army.destination.x = randomTile.x
        army.destination.y = randomTile.y
      }
      else{
        army.destination = {...mainKingdomCastleCoords}
      }
    }
  })
}

function findVillageTilesNotAlreadyOwnedByThisKingdom(gameMap, aiKingdom){
  const villageTiles = []
  for(let x = 0; x < gameMap.length; x++){
    for(let y = 0; y < gameMap[x].length; y++){
      const tile = gameMap[x][y]
      if((tile.marker === 'VILLAGE' || tile.marker === 'VILLAGE_CENTER') && tile.kingdomOwner !== aiKingdom.id){
        villageTiles.push(tile)
      }
    }
  }
  return villageTiles
}

function findKingdomCastleCoords(gameMap, kingdom){
  for(let x = 0; x < gameMap.length; x++){
    for(let y = 0; y < gameMap[x].length; y++){
      if(gameMap[x][y].type === 'castle' && gameMap[x][y].originalOwner === kingdom.id){
        return {
          x, y
        }
      }
    }
  }
}

function decideWhetherToRaiseArmy(state, aiKingdom){
  const armies = aiKingdom.armiesLoyalToThisKingdom(state.families, state.nobles, state.armies)
  let totalMilitaryPower = 0
  for(const army of armies){
    totalMilitaryPower += army.calculateTotalSize()
  }
  const expectedMilitaryPower = state.turnNumber * 5 + 20
  if(expectedMilitaryPower > totalMilitaryPower){
    return true
  }
  return false
}

function findMainKingdomCastle(state){
  const mainKingdomId = state.mainKingdom.id
  const gameMap = state.gameMap
  for(let x = 0; x < gameMap.length; x++){
    for (let y = 0; y < gameMap.length; y++){
      const tile = gameMap[x][y]
      if(tile.type === 'castle' && tile.kingdomOwner === mainKingdomId) return {x, y}
    }
  }
}

function loyalNobles(state, aiKingdom){
  const familyIds = aiKingdom.familyIds
  let loyalFamilies = []
  familyIds.forEach(familyId => {
    loyalFamilies.push(state.families[familyId])
  })
  let nobleIds = []
  loyalFamilies.forEach(family => {
    family.nobleIds.forEach(nobleId => {
      nobleIds.push(nobleId)
    })
  })
  return nobleIds
}

export { aiKingdomTurn }