
import types from './types'
import { createNewGameState } from './newGameInitialization/newGameState.js'
import { handleNextTurn } from './nextTurn.js'

function rootReducer(state, action){
  switch (action.type) {

    case types.NEW_GAME:
      const newGameState = createNewGameState()
      return newGameState

    case types.NEXT_TURN:
      const nextTurnState = handleNextTurn(state)
      return nextTurnState
    
    case types.MAP_DRAG:
      const newState = {...state}
      newState.mapOffset.x = action.payload.x
      newState.mapOffset.y = action.payload.y
      return newState
    
    default:
      return state
  }
}

export { rootReducer }