import types from "./types";

function newGame(payload){
  return {
    type: types.NEW_GAME,
    payload: payload,
  }
}

export { newGame }