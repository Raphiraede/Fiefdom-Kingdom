

function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max + 1)//Adding one to make sure the maximum is inclusive
  return Math.floor(Math.random() * (max - min)) + min
}

export { getRandomInt }