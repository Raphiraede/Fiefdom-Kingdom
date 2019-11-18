
import types from './types'
import { createNewGameState } from './newGameState'
const initialState = {}

function rootReducer(state, action){
  switch (action.type) {

    case types.NEW_GAME:
      const newGameState = createNewGameState()
      return newGameState

    default:
      return state
  }
}

export { rootReducer }