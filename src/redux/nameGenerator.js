

const firstNames = ['Joe', 'Bob', 'Harry', 'Hagrid', 'Farquad', 'Flint', 'Shrek', 'Fiona', 'Fieri', 'Raphi', 'Madison', 'Gabriel', 'Damien', 'Bradley', 'Peter', 'Henry', 'George', 'Ham', 'Bond', 'James', 'John', 'Caesar', 'Octavian', 'Antony', 'Mark']


const middleNames = ['The Wise', 'The Brave', 'The Hairy', 'The Coward', 'The Fat', 'The Flossy', 'The Skinny', 'The Short', 'The Tall', 'The Strong', 'The Swampy', 'The Sweaty', 'The Crazy', 'The Insane', 'The Quick', 'The Mean', 'The Ruthless', 'The Harmless', 'The Swag', 'The Dapper', 'The Baby', 'The Happy']

class RandomNameGenerator{
  constructor(){
    this.randomNames = generateRandomNames()
    this.counter = -1 //first time newName is called, counter will be 0
  }

  newName(){
    this.counter++
    if(this.counter===this.randomNames.length) this.counter = 0
    return this.randomNames[this.counter]
  }
}

function nameCombiner(){
  let nameList = []
  firstNames.forEach(firstName => {
    middleNames.forEach(middleName => {
      const newName = `${firstName} ${middleName}`
      nameList.push(newName)
    })
  })
  return nameList
}

function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function shuffleNames(arrayOfNames){
  let shuffleArray = arrayOfNames
  for (let i = 0; i <= 10000; i++){
    const x = getRandomInt(0, shuffleArray.length)
    const y = getRandomInt(0, shuffleArray.length)
    let temp = shuffleArray[x]
    shuffleArray[x] = shuffleArray[y]
    shuffleArray[y] = temp
  }
  return shuffleArray
}

function generateRandomNames(){
  const names = nameCombiner()
  const shuffledNames = shuffleNames(names)
  return shuffledNames
}



export { RandomNameGenerator }