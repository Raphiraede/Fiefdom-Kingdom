import { Army } from "../../../../models/army/Army"
import { createArmyDemographicsObject } from "./createArmyDemographicsObject/createArmyDemographicsObject"
import { determineArmySpawnCoords } from "./determineArmySpawnCoords/determineArmySpawnCoords"

function raiseArmy({state, nobleId}){
  const familyId = state.indexes.noblesToFamilies[nobleId]
  const kingdomId = state.indexes.familiesToKingdoms[familyId]
  const coordinates = determineArmySpawnCoords({nobleId, gameMap: state.gameMap, armies: state.armies})//returns undefined if no suitable place to spawn
  if(coordinates){
    const armyDemographicsObject = createArmyDemographicsObject({ nobleId, gameMap: state.gameMap, percentage: 10})
    const newArmy = new Army({ kingdomId, coordinates, demographics: armyDemographicsObject, nobleId })
    if(newArmy.calculateTotalSize() > 0){
      state.armies[newArmy.id] = newArmy
      state.nobles[nobleId].armies.push (newArmy.id)
      state.indexes.armiesToNobles[newArmy.id] = nobleId
      return newArmy
    }
  }
}

export { raiseArmy }