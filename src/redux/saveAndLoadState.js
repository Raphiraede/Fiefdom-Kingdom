import { 
  BurnHammerFamily, 
  GoldFingerFamily, 
  GreenHeartFamily, 
  Noble,
  RoyalFamily,
} from '../models/families'
import { RandomNameGenerator } from './reducer/reducerHelpers/newGameInitialization/RandomNameGenerator'
import { Army } from '../models/army/Army'
import { Kingdom } from '../models/kingdom/Kingdom'


function loadState() {

  //wrapped in try-catch in case user disables localstorage permissions
  try{
    const serializedState=localStorage.getItem('fiefdom kingdom state')
    if(serializedState===null){
      return undefined
    }
    const parsedState = JSON.parse(serializedState)
    const revivedState = reviveState(parsedState)
    return revivedState
  }
  catch(err){
    console.log('load state failed')
    console.log(err)
    return undefined
  }
}

function saveState(state){
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem('fiefdom kingdom state', serializedState)
  } catch(err) {

  }
}

//After being JSONified, objects created from constructors such as Nobles and Families will lose their prototypes, and therefore will lose their methods.
//They mused be revived before being passed back into state so that they regain all of their functionality
function reviveState(parsedState){
  let {
    mainKingdom,
    aiKingdoms,
    randomNameGenerator,
    families,
    nobles,
    armies,
  } = parsedState
  mainKingdom = new Kingdom(mainKingdom)
  
  for(const index in aiKingdoms){
    const revivedKingdom = new Kingdom(aiKingdoms[index])
    aiKingdoms[index] = revivedKingdom
  }
  
  const nobleIds = Object.keys(nobles)
  for(let i = 0; i<nobleIds.length; i++){
    nobles[nobleIds[i]] = new Noble (nobles[nobleIds[i]])
  }

  const familyIds = Object.keys(families)
  for(let i = 0; i<familyIds.length; i++){
    let royalFamily = families[familyIds[i]]
    if (royalFamily.familyName === 'BurnHammer'){
      royalFamily =  new BurnHammerFamily(royalFamily)
    }
    else if (royalFamily.familyName === 'GreenHeart'){
      royalFamily =  new GreenHeartFamily(royalFamily)
    } 
    else if (royalFamily.familyName === 'GoldFinger'){
      royalFamily =  new GoldFingerFamily(royalFamily)
    }
    else{
      royalFamily = new RoyalFamily(royalFamily)
    }
    families[familyIds[i]] = royalFamily
  }

  const armyIds = Object.keys(armies)
  for(let i = 0; i<armyIds.length; i++){
    const id = armyIds[i]
    armies[id] = new Army(armies[id])
  }

  randomNameGenerator = new RandomNameGenerator({randomNameGenerator})

  const revivedState={
    ...parsedState,
    mainKingdom,
    aiKingdoms,
    randomNameGenerator,
    nobles,
    families
  }

  return revivedState
}

export { loadState, saveState }