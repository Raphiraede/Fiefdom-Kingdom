
function createArmiesToNoblesIndex({nobles}){
  const armiesToNoblesIndex = {}
  for(const nobleId in nobles){
    const noble = nobles[nobleId]
    for (const index in noble.armies){
      const armyId = noble.armies[index]
      armiesToNoblesIndex[armyId] = noble.id
    }
  }
  return armiesToNoblesIndex
}

export { createArmiesToNoblesIndex }