


function handleNextTurn(state){
  let newState = {...state}
  newState.turnNumber++

  const families = newState.families
  const idsOfFamilies = Object.keys(families)
  idsOfFamilies.forEach(id => {
    const family = families[id]
    family.handleNextTurn()
  })

  //currently nobles handleNextTurn is called here, but it might be useful for that to take place in families handleNextTurn
  const nobles = newState.nobles
  const idsOfNobles = Object.keys(nobles)
  idsOfNobles.forEach(id => {
    const noble = nobles[id]
    noble.handleNextTurn(state.randomNameGenerator)
  })
  return newState
}

export { handleNextTurn }