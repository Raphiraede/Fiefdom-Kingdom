
import { createIndexes } from '../indexes/createIndexes'
import { aiKingdomTurn } from './aiKingdomTurn'

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
  newState.indexes = createIndexes(newState)

  aiKingdomTurn(newState)
  return newState
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
      if(army.turnsOnSameTile >= 2) army.conquerTerritory(state, kingdomIdWhichArmyIsLoyalTo)
      army.payWages(state, kingdomIdWhichArmyIsLoyalTo)
      army.turnsOnSameTile++
    }
  })
}



function moveTowardDestination(army, targetSquare){
  army.coordinates = targetSquare
  army.turnsOnSameTile = 0
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

function handleConquerMode(state, kingdomId){
  const kingdomOwnerOfTile = state.gameMap[this.coordinates.x][this.coordinates.y].kingdomOwner
  if(kingdomId === kingdomOwnerOfTile) moveTowardDestination(state.armies)
}

function conquerTerritory(state, kingdomId){
  state.gameMap[this.coordinates.x][this.coordinates.y].kingdomOwner = kingdomId
}

export { handleNextTurn }