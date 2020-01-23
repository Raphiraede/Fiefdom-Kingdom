
import { createIndexes } from '../indexes/createIndexes'
import { aiKingdomTurn } from './aiKingdomTurn'
import { disbandArmyAndReturnSoldiersToTiles } from '../disbandArmyAndReturnSoldiersToTiles/disbandArmyAndReturnSoldiersToTiles'

function handleNextTurn(state){
  let newState = {...state}
  newState.turnNumber++

  calculateTaxesAndUpdateGoldAmount(state)

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

  handleArmiesNextTurn(state)
  const winner = checkForGameEnd(state.gameMap)
  if(winner) newState.winner = winner
  newState.indexes = createIndexes(newState)

  aiKingdomTurn(newState)
  return newState
}

//The winner of the game is decided when only one person still has control of their castle
function checkForGameEnd(gameMap, mainKingdom){
  const kingdomIdsWhoStillHaveTheirCastle = []
  for(let x = 0; x < gameMap.length; x++){
    for(let y = 0; y < gameMap[x].length; y++){
      const tile = gameMap[x][y]
      if(tile.type === 'castle' && tile.originalOwner === tile.kingdomOwner){

      }
    }
  }
  if(kingdomIdsWhoStillHaveTheirCastle.length === 1){
    if(kingdomIdsWhoStillHaveTheirCastle[0] === mainKingdom.id){
      return {
        type: 'victory',
        reason: 'conquest'
      }
    }
    else{
      return{
        type: 'defeat',
        reason: 'conquest'
      }
    }
  }
  if(mainKingdom.gold < -500){
    return {
      type: 'defeat',
      reason: 'bankruptcy'
    }
  }
}

function calculateTaxesAndUpdateGoldAmount(state){
  const kingdoms = [state.mainKingdom, ...state.aiKingdoms]
  const nobles = state.nobles
  const gameMap = state.gameMap

  for(let x = 0; x < gameMap.length; x++){
    for(let y = 0; y < gameMap[0].length; y++){
      const tile = gameMap[x][y]
      const kingdomOwner = tile.kingdomOwner
      const fiefOwner = tile.fiefOwner
      if (kingdomOwner && fiefOwner){
        const taxLevel = nobles[tile.fiefOwner].taxLevel
        const pop = tile.population
        let totalTaxesForThisTile = Math.floor((taxLevel * pop + 100)/100)
        if(tile.type === 'goldOre') totalTaxesForThisTile+=100
        kingdoms.forEach(kingdom => {
          if(kingdom.id === kingdomOwner) kingdom.gold += totalTaxesForThisTile
        })
      }
    }
  }
}

function handleArmiesNextTurn(state){

  let armyArray = []
  let battlesMapping = {} //maps one armyID to antoher armyID to figure out who needs to battle who.
  for(const armyId in state.armies){
    armyArray.push(state.armies[armyId])
  }
  armyArray.forEach(army => {
    const targetSquare = calculateTargetSquare(army)
    const blockingArmyId = checkIfArmyIsBlocking(targetSquare, armyArray, army)
    const kingdomIdWhichArmyIsLoyalTo = army.calculateKingdomIdThatArmyIsLoyalTo(state)

    if(blockingArmyId){
      const blockingArmy = state.armies[blockingArmyId]
      const blockingArmyKingdomLoyalty = blockingArmy.calculateKingdomIdThatArmyIsLoyalTo(state)
      if(blockingArmyKingdomLoyalty !== kingdomIdWhichArmyIsLoyalTo){
        battlesMapping[army.id] = blockingArmyId
      }
    }
    else{
      if(army.mode === 'move'){
        moveTowardDestination(army, targetSquare)
      } 
      else if(army.mode === 'conquer'){
        const kingdomOwnerOfTile = state.gameMap[army.coordinates.x][army.coordinates.y].kingdomOwner
        if(kingdomIdWhichArmyIsLoyalTo === kingdomOwnerOfTile) moveTowardDestination(army, targetSquare)
      }
      if(army.turnsOnSameTile >= 2) conquerTerritory(state, army, kingdomIdWhichArmyIsLoyalTo)
      army.payWages(state, kingdomIdWhichArmyIsLoyalTo)
      army.turnsOnSameTile++
    }
  })
  filterBattlesMapping(battlesMapping)
  resolveBattles(battlesMapping, state.armies, state)
}

function resolveBattles(battlesMapping, armies, state){
  for (const key in battlesMapping){
    const army1 = armies[key]
    const army2 = armies[battlesMapping[key]]
    if(army1 && army2){
      const army1Strength = army1.calculateTotalSize()
      const army2Strength = army2.calculateTotalSize()
      const damageDoneToArmy1 = Math.ceil(army2Strength * 0.4)
      const damageDoneToArmy2 = Math.ceil(army1Strength * 0.4)
      army1.takeDamage(damageDoneToArmy1)
      army2.takeDamage(damageDoneToArmy2)
      if(army1.calculateTotalSize() <= 0){
        disbandArmyAndReturnSoldiersToTiles(state, army1.id)
      } 
      if(army2.calculateTotalSize() <= 0) {
        disbandArmyAndReturnSoldiersToTiles(state, army2.id)
      }
    }
  }
}

//Currently battlesMapping is bound to have mirrored battles, aka {armyId1: armyId2, armyId2: armyId1}
//This filters out the battlesMapping
function filterBattlesMapping(battlesMapping){
  for (const battleMappingKey in battlesMapping){
    const battleMappingValue = battlesMapping[battleMappingKey]
    const mirroredMappingChecker = battlesMapping[battleMappingValue]
    if(mirroredMappingChecker === battleMappingKey) delete battlesMapping[battleMappingValue]
  }
}

function moveTowardDestination(army, targetSquare){
  if(army.coordinates.x !== targetSquare.x || army.coordinates.y !== targetSquare.y) army.turnsOnSameTile = 0
  army.coordinates = targetSquare
}

function calculateTargetSquare(army){
  //important to use spread operator so that targetSquare isn't modifying army.coordinates
  let targetSquare = {...army.coordinates}
  if(army.coordinates.x < army.destination.x) targetSquare.x = army.coordinates.x + 1
  else if (army.coordinates.x > army.destination.x) targetSquare.x = army.coordinates.x - 1

  if(army.coordinates.y < army.destination.y) targetSquare.y = army.coordinates.y + 1
  else if (army.coordinates.y > army.destination.y) targetSquare.y = army.coordinates.y - 1
  return targetSquare
}

//currently the only thing which can block a path is another army
function checkIfArmyIsBlocking(targetSquare, armyArray, mainArmy){
  let blockingArmyId = null
  for (const army of armyArray){
    if(targetSquare.x === army.coordinates.x && targetSquare.y === army.coordinates.y && army.id !== mainArmy.id){
      blockingArmyId = army.id
    }
  }
  return blockingArmyId
}

function conquerTerritory(state, army, kingdomId){
  state.gameMap[army.coordinates.x][army.coordinates.y].kingdomOwner = kingdomId
}

export { handleNextTurn }