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
  if(state.turnNumber < 25){
    sendArmiesToConquerVillages(state, aiKingdom)
  }
}

function sendArmiesToConquerVillages(state, aiKingdom){
  const armies = aiKingdom.armiesLoyalToThisKingdom(state.families, state.nobles, state.armies)
  
  const villageTiles = findVillageTilesNotAlreadyOwned(state.gameMap, aiKingdom)
  armies.forEach(army => {
    const currentTile = state.gameMap[army.coordinates.x][army.coordinates.y]
    console.log(currentTile)
    console.log(currentTile.kingdomOwner === aiKingdom.id)
    const conquerOrMove = getRandomInt(0, 1)
    if(army.destination.x === army.coordinates.x && army.destination.y === army.coordinates.y && currentTile.kingdomOwner === aiKingdom.id){
      if(conquerOrMove) army.mode = 'move'
      else army.mode = 'conquer'
      const randomIndex = getRandomInt(0, villageTiles.length - 1)
      const randomTile = villageTiles[randomIndex]
      army.destination.x = randomTile.x
      army.destination.y = randomTile.y
    }
  })
}

function findVillageTilesNotAlreadyOwned(gameMap, aiKingdom){
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