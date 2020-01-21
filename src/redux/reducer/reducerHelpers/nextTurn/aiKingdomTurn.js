import { createArmyDemographicsObject } from "../raiseArmy/createArmyDemographicsObject/createArmyDemographicsObject"
import { raiseArmy } from "../raiseArmy/raiseArmy"


function aiKingdomTurn(state){
  state.aiKingdoms.forEach(aiKingdom => {
    //decisionMaker(state, aiKingdom)
    giveFiefsToNoblesAndRaiseArmy(state, aiKingdom)
  })
}

function testFunction(state, nobleId){
  if(state.turnNumber === 2){
    const army = raiseArmy({state, nobleId})
    const mainKingdomCastleCoords = findMainKingdomCastle(state)
    army.destination = mainKingdomCastleCoords  
  }
}

function giveFiefsToNoblesAndRaiseArmy(state, aiKingdom){
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

  const gameMap = state.gameMap
  for(const x in gameMap){
    for(const y in gameMap[x]){
      if(gameMap[x][y].kingdomOwner === aiKingdom.id){
        gameMap[x][y].fiefOwner = nobleIds[0]//currently one noble gets all the fiefs
        
      }
    }
  }
  testFunction(state, nobleIds[0])
  //raiseArmy({state, nobleId: nobleIds[0]})
}

function decisionMaker(state, aiKingdom){
  decideWhetherToRaiseArmy(state, aiKingdom)
  if(state.turnNumber < 25){

  }
}

function sendArmyToConquerVillage(){

}

function calculateArmiesOwnedByKingdom(state){

}

function decideWhetherToRaiseArmy(state, aiKingdom){
  const armies = aiKingdom.armiesLoyalToThisKingdom(state)
  let totalMilitaryPower = 0
  for(const army of armies){
    totalMilitaryPower += army.calculateTotalSize()
  }
  const expectedMilitaryPower = (state.turnNumber * 20)
  if(expectedMilitaryPower < totalMilitaryPower){
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


export { aiKingdomTurn }