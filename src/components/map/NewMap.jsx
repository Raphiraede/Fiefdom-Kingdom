import React from 'react'
import { connect } from 'react-redux'
import './CanvasMap.css'
import { mapWidth, mapHeight, tileWidth, tileHeight } from '../../models/tiles/mapConstants'
import Farm from '../../images/fieldWithWheat.png'
import Rock from '../../images/bigRock.png'
import Plain from '../../images/plain1.png'
import House from '../../images/house1.png'
import Trees from '../../images/denseTrees.png'
import { NavBar } from '../shared_components/NavBar'

class NewMap extends React.Component{
  constructor(props){
    super(props)
    this.FarmImage = new Image()
    this.RockImage = new Image()
    this.PlainImage = new Image()
    this.HouseImage = new Image()
    this.Trees = new Image()
    this.FarmImage.src = Farm
    this.RockImage.src = Rock
    this.PlainImage.src = Plain
    this.HouseImage.src = House
    this.Trees.src = Trees
  }
  
  componentDidMount() {
    const canvas = this.refs.canvas
    const ctx = canvas.getContext('2d')
    requestAnimationFrame(() => this.drawGame(ctx))
  }

  drawGame(ctx, currentSecond = 0, framesLastSecond = 0, frameCount = 0) {
    if(ctx===null) return

    let sec = Math.floor(Date.now()/1000)
    if(sec !== currentSecond){
      currentSecond = sec
      framesLastSecond = frameCount
    }

    for(let x = 0; x < mapWidth; x++){
      for(let y = 0; y < mapHeight; y++){

        //Always draw a plain first, as a backdrop
        ctx.drawImage(this.PlainImage, x*tileWidth, y*tileHeight, tileWidth, tileHeight)
        switch(this.props.gameMap[x][y].type){
          case 'plain': //Not necessary to draw anything here, since plain is drawn on every time anyway
            //ctx.drawImage(this.PlainImage, x*tileWidth, y*tileHeight, tileWidth, tileHeight)
          break

          case 'rock':
            ctx.drawImage(this.RockImage, x*tileWidth, y*tileHeight, tileWidth, tileHeight)
          break

          case 'farm':
            ctx.drawImage(this.FarmImage, x*tileWidth, y*tileHeight, tileWidth, tileHeight)
          break

          case 'house':
            ctx.drawImage(this.HouseImage, x*tileWidth, y*tileHeight, tileWidth, tileHeight)
          break

          case 'trees':
            ctx.drawImage(this.Trees, x*tileWidth, y*tileHeight, tileWidth, tileHeight)
          default:
        }
      }
    }
    requestAnimationFrame(() => {this.drawGame(ctx)})
  }

  render(){
    return (
      <div>
        <NavBar />
        <canvas ref='canvas' width={mapWidth * tileWidth} height={mapHeight*tileHeight} />
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    gameMap: [...state.gameMap]
  }
}

const CanvasMapContainer = connect(mapStateToProps)(NewMap)
export { CanvasMapContainer as NewMap }