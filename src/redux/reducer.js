
import types from './types'
import { createNewGameState } from './newGameInitialization/newGameState'
import { handleNextTurn } from './nextTurn.js'

function rootReducer(state, action){
  let newState = {...state}
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

    default:
      return state
  }
}

export { rootReducer }