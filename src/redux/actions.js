import types from "./types";

function newGame(payload){
  return {
    type: types.NEW_GAME,
    payload: payload,
  }
}

function nextTurn(){
  return {
    type: types.NEXT_TURN,
  }
}

function mapDrag(payload){
  return{
    type: types.MAP_DRAG,
    payload: payload
  }
}

export { newGame, nextTurn, mapDrag }