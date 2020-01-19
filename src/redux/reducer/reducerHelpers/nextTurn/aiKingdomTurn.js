
function aiKingdomTurn(state){
  state.aiKingdoms.forEach(aiKingdom => {
    giveFiefsToNobles(state, aiKingdom)
  })
}

function giveFiefsToNobles(state, aiKingdom){
  const familyIds = aiKingdom.familyIds
  let loyalFamilies = []
  familyIds.forEach(familyId => {
    console.log(familyId)
    loyalFamilies.push(state.families[familyId])
  })
  let nobleIds = []
  loyalFamilies.forEach(family => {
    family.nobleIds.forEach(nobleId => {
      nobleIds.push(nobleId)
    })
  })

  const gameMap = state.gameMap
  for(const x in gameMap){
    for(const y in gameMap[x]){
      if(gameMap[x][y].kingdomOwner === aiKingdom.id){
        gameMap[x][y].fiefOwner = nobleIds[0]//currently one noble gets all the fiefs
      }
    }
  }
}

export { aiKingdomTurn }