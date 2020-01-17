

function createFamiliesToKingdomsIndex({mainKingdom}){
  const familiesToKingdomsIndex = {}
  mainKingdom.familyIds.forEach(familyId => {
    familiesToKingdomsIndex[familyId] = mainKingdom.id
  })
  
  return familiesToKingdomsIndex
}

export { createFamiliesToKingdomsIndex }