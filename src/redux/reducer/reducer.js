
import types from '../types'
import { createNewGameState } from './reducerHelpers/newGameInitialization/newGameState'
import { handleNextTurn } from './reducerHelpers/nextTurn/handleNextTurn'
import { Army } from '../../models/army/Army'
import { determineArmySpawnCoords } from './reducerHelpers/determineArmySpawnCoords/determineArmySpawnCoords'
import { handleSelection } from './reducerHelpers/handleSelection/handleSelection'
import { createArmyDemographicsObject } from './reducerHelpers/createArmyDemographicsObject/createArmyDemographicsObject'

function rootReducer(state, action){
  let newState
  switch (action.type) {
    case types.NEW_GAME:
      const newGameState = createNewGameState()
      return newGameState

    case types.NEXT_TURN:
      newState = {...state}
      const nextTurnState = handleNextTurn(newState)
      return nextTurnState
    
    case types.MAP_DRAG:
      newState = {...state}
      newState.mapOffset.x = action.payload.x
      newState.mapOffset.y = action.payload.y
      return newState
    
    case types.ZOOM_MAP_IN:
      newState = {...state}

      if(state.tileSize < 128 && state.tileSize < 128){
        newState.tileSize += 4
      }
      return newState

    case types.ZOOM_MAP_OUT:
      newState = {...state}

      if(state.tileSize > 8 && state.tileSize> 8){
        newState.tileSize -= 4
      }
      return newState

    case types.INITIATE_GIVE_FIEF_MODE:
      newState = {...state}
      newState.givingFief = {
        currentlyGivingFief: true,
        nobleId: action.payload
      }
      return newState
    
    case types.GIVE_FIEF_TO_NOBLE:
      newState = {...state}
      const { tileMatrixX, tileMatrixY } = action.payload
      if(newState.gameMap[tileMatrixX] && 
        newState.gameMap[tileMatrixX][tileMatrixY] && 
        newState.gameMap[tileMatrixX][tileMatrixY].kingdomOwner === newState.mainKingdom.id) newState.gameMap[tileMatrixX][tileMatrixY].fiefOwner = newState.givingFief.nobleId
      return newState

    case types.UNINITIATE_GIVE_FIEF_MODE:
      newState = {...state}
      newState.givingFief = {
        currentlyGivingFief: false,
        nobleId: null
      }
      return newState

    case types.RAISE_ARMY:
      newState = {...state}
      const nobleId = action.payload
      const coordinates = determineArmySpawnCoords({nobleId, gameMap: newState.gameMap, armies: newState.armies})//returns undefined if no suitable place to spawn
      if(coordinates){
        const armyDemographicsObject = createArmyDemographicsObject({nobleId, gameMap: newState.gameMap, percentage: 10})
        const newArmy = new Army({ kingdomId: newState.mainKingdom.id, coordinates, demographics: armyDemographicsObject, nobleId })
        newState.armies[newArmy.id] = newArmy
      }
      return newState
    
    case types.SELECT:
      newState = {...state}
      const coords = action.payload
      newState.selected = handleSelection({coords, armies: newState.armies })
    return newState

    case types.UPDATE_ARMY_DESTINATION:
      newState = {...state}
      const destinationCoords = action.payload
      if(newState.selected && newState.selected.type === 'army'){
        const id = newState.selected.id
        const army = newState.armies[id]
        army.destination = destinationCoords
      }
      return newState

    default:
      return state
  }
}

export { rootReducer }