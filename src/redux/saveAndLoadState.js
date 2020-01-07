import { 
  BurnHammerFamily, 
  GoldFingerFamily, 
  GreenHeartFamily, 
  Noble,
} from '../models/families'
import { RandomNameGenerator } from './newGameInitialization/RandomNameGenerator'
import { FamiliesComponent } from '../components/familiesPage/FamiliesComponent'


function loadState() {

  //wrapped in try-catch in case user disables localstorage permissions
  try{
    const serializedState=localStorage.getItem('state')
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
    localStorage.setItem('state', serializedState)
  } catch(err) {

  }
}

//After being JSONified, objects created from constructors such as Nobles and Families will lose their prototypes, and therefore will lose their methods.
//They mused be revived before being passed back into state so that they regain all of their functionality
function reviveState(parsedState){
  let {
    randomNameGenerator,
    families,
    nobles,
  } = parsedState

  const nobleIds = Object.keys(nobles)
  for(let i = 0; i<nobleIds.length; i++){
    nobles[nobleIds[i]] = new Noble (nobles[nobleIds[i]])
  }

  const familyIds = Object.keys(families)
  for(let i = 0; i<familyIds.length; i++){
    let royalFamily = families[familyIds[i]]
    if (royalFamily.familyName === 'BurnHammer') royalFamily =  new BurnHammerFamily(royalFamily)
    if (royalFamily.familyName === 'GreenHeart') royalFamily =  new GreenHeartFamily(royalFamily)
    if (royalFamily.familyName === 'GoldFinger') royalFamily =  new GoldFingerFamily(royalFamily)
  }

  const revivedState={
    ...parsedState,
    randomNameGenerator: new RandomNameGenerator(randomNameGenerator),
    families: families
  }

  return revivedState
}

export { loadState, saveState }