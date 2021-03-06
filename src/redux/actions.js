import types from "./types"

function newGame(payload){
  return {
    type: types.NEW_GAME,
    payload: payload,
  }
}

function updateHoveredTileCoords(payload){
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

function zoomMapIn(payload){
  return {
    type: types.ZOOM_MAP_IN,
    payload: payload,
  }
}

function zoomMapOut(payload){
  return {
    type: types.ZOOM_MAP_OUT,
    payload: payload,
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

function toggleArmyMode(payload){
  return{
    type: types.TOGGLE_ARMY_MODE,
    payload: payload
  }
}

function togglefamiliesViewVisibility(){
  return{
    type: types.TOGGLE_NOBLES_VIEW_VISIBILITY
  }
}

function toggleTutorial(){
  return{
    type: types.TOGGLE_TUTORIAL,
  }
}

export { newGame, 
  nextTurn,
  updateHoveredTileCoords,
  mapDrag,
  zoomMapIn,
  zoomMapOut, 
  initiateGiveFiefMode, 
  giveFiefToNoble, 
  uninitiateGiveFiefMode,
  raiseArmy,
  select,
  updateArmyDestination,
  disbandArmy,
  toggleArmyMode,
  togglefamiliesViewVisibility,
  toggleTutorial
}