import { 
  BurnHammerFamily, 
  GoldFingerFamily, 
  GreenHeartFamily, 
  Noble, 
  RoyalFamily,
} from '../models'
import { RandomNameGenerator } from './newGameInitialization/RandomNameGenerator'


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
  } = parsedState

  //First reviving the nobles within each royal family
  families.forEach(royalFamily => {
    royalFamily.nobles = royalFamily.nobles.map(noble => {
      return new Noble(noble)
    })
  })

  families = families.map(royalFamily => {
    if (royalFamily.familyName === 'BurnHammer') return new BurnHammerFamily(royalFamily)
    if (royalFamily.familyName === 'GreenHeart') return new GreenHeartFamily(royalFamily)
    if (royalFamily.familyName === 'GoldFinger') return new GoldFingerFamily(royalFamily)
  })
  const revivedState={
    ...parsedState,
    randomNameGenerator: new RandomNameGenerator(randomNameGenerator),
    families: families
  }

  return revivedState
}

export { loadState, saveState }