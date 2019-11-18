import { FamiliesComponent } from "../components/families/FamiliesComponent"

function endTurn(state){
  let newState = {...state}
  newState.turnNumber++
}