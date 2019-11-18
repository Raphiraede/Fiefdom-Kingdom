

function handleNextTurn(state){
  let newState = state
  newState.turnNumber++
  newState.families.forEach(family => {
    family.handleNextTurn()
  })

  return newState
}

export { handleNextTurn }