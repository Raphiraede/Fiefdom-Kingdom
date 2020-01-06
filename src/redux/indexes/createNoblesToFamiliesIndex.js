
function createNoblesToFamiliesIndex({families}){
  const noblesToFamiliesIndex = {}
  const familyIds = Object.keys(families)

  familyIds.forEach(familyId => {
    const family = families[familyId]
    const nobleIds = family.nobleIds

    nobleIds.forEach(nobleId => {
      noblesToFamiliesIndex[nobleId] = familyId
    })
  })
  return noblesToFamiliesIndex
}

export { createNoblesToFamiliesIndex }