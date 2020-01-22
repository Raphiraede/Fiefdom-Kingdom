
function handleSelection({state, coords, armies}){
  const { x, y } = coords
  const armyIds = Object.keys(armies)
  for(const index in armyIds){
    const id = armyIds[index]
    const army = armies[id]
    if (army.coordinates.x === x && army.coordinates.y === y && army.calculateKingdomIdThatArmyIsLoyalTo(state) === state.mainKingdom.id){
      return {
        type: 'army',
        id: id
      }
    }
  }
  return null
}

export { handleSelection }