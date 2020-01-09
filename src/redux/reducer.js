
import types from './types'
import { createNewGameState } from './newGameInitialization/newGameState'
import { handleNextTurn } from './nextTurn/handleNextTurn'

function rootReducer(state, action){
  let newState
  switch (action.type) {
    case types.NEW_GAME:
      const newGameState = createNewGameState()
      return newGameState

    case types.NEXT_TURN:
      const nextTurnState = handleNextTurn(state)
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
      console.log('hey man')
      newState = {...state}
      newState.givingFief = {
        currentlyGivingFief: false,
        nobleId: null
      }
      return newState

    default:
      return state
  }
}

export { rootReducer }