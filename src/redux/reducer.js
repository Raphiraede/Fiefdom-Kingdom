
import types from './types'
import { createNewGameState } from './newGameState'
const initialState = {}

function rootReducer(state=initialState, action){
  switch (action.type) {

    case types.NEW_GAME:
      console.log('hey')
      const newGameState = createNewGameState()
      return newGameState

    default:
      return state
  }
}

export { rootReducer }