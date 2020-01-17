import types from "./types";

function newGame(payload){
  return {
    type: types.NEW_GAME,
    payload: payload,
  }
}

function updateHoveredTileCoordinates(payload){
  return {
    type: types.UPDATE_HOVERED_TILE_COORDINATES,
    payload: payload
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

function initiateGiveFiefMode(payload){
  return {
    type: types.INITIATE_GIVE_FIEF_MODE,
    payload: payload //should be the ID of the noble being awarded the fief
  }
}

function giveFiefToNoble(){
  return {
    type: types.GIVE_FIEF_TO_NOBLE,
  }
}

function uninitiateGiveFiefMode(){
  return {
    type: types.UNINITIATE_GIVE_FIEF_MODE
  }
}

function raiseArmy(payload){
  return {
    type: types.RAISE_ARMY,
    payload: payload
  }
}

function select(){
  return {
    type: types.SELECT,
  }
}

function updateArmyDestination(){
  return {
    type: types.UPDATE_ARMY_DESTINATION,
  }
}

function disbandArmy(){
  return{
    type: types.DISBAND_ARMY,
  }
}

export { newGame, 
  nextTurn,
  updateHoveredTileCoordinates,
  mapDrag,
  zoomMapIn,
  zoomMapOut, 
  initiateGiveFiefMode, 
  giveFiefToNoble, 
  uninitiateGiveFiefMode,
  raiseArmy,
  select,
  updateArmyDestination,
  disbandArmy
}