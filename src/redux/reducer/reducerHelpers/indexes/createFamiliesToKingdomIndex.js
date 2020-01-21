

function createFamiliesToKingdomsIndex({mainKingdom, aiKingdoms}){
  const familiesToKingdomsIndex = {}
  const kingdoms = [mainKingdom, ...aiKingdoms]
  kingdoms.forEach(kingdom => {
    kingdom.familyIds.forEach(familyId => {
      familiesToKingdomsIndex[familyId] = kingdom.id
    })
  })
  
  return familiesToKingdomsIndex
}

export { createFamiliesToKingdomsIndex }