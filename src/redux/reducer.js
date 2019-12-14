
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
    
    case types.MAP_CLICK:
      console.log('map click')
      return state
      
    default:
      return state
  }
}

export { rootReducer }