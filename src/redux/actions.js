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

function zoomMapIn(){
  return {
    type: types.ZOOM_MAP_IN
  }
}

function zoomMapOut(){
  return {
    type: types.ZOOM_MAP_OUT
  }
}

export { newGame, nextTurn, mapDrag, zoomMapIn, zoomMapOut }