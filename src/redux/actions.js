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

function mapClick(){
  return{
    type: types.mapClick
  }
}

export { newGame, nextTurn, mapClick }