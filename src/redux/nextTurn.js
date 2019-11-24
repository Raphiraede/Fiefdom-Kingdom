

function handleNextTurn(state){
  let newState = {...state}
  newState.turnNumber++
  newState.families.forEach(family => {
    family.handleNextTurn(newState.randomNameGenerator)
  })

  return newState
}

export { handleNextTurn }