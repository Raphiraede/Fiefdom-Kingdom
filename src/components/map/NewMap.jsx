import React from 'react'
import { connect } from 'react-redux'
import './CanvasMap.css'
import { mapWidth, mapHeight, tileWidth, tileHeight } from '../../models/map/mapConstants'
import Farm from '../../images/Farm.png'
import Mountain from '../../images/Mountain.png'
import Plain from '../../images/Plain.png'
import Hut from '../../images/Hut.png'

class NewMap extends React.Component{
  constructor(props){
    super(props)
    this.FarmImage = new Image()
    this.MountainImage = new Image()
    this.PlainImage = new Image()
    this.HutImage = new Image()
    this.FarmImage.src = Farm
    this.MountainImage.src = Mountain
    this.PlainImage.src = Plain
    this.HutImage.src = Hut
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

    for(let x = 0; x < mapHeight; x++){
      for(let y = 0; y < mapWidth; y++){
        switch(this.props.gameMap[x][y].type){
          case 'plain': 
            ctx.drawImage(this.PlainImage, x*tileWidth, y*tileHeight, tileWidth, tileHeight)
          break

          case 'mountain':
              ctx.drawImage(this.MountainImage, x*tileWidth, y*tileHeight, tileWidth, tileHeight)
          break

          case 'farm':
              ctx.drawImage(this.FarmImage, x*tileWidth, y*tileHeight, tileWidth, tileHeight)

          break

          case 'hut':
              ctx.drawImage(this.HutImage, x*tileWidth, y*tileHeight, tileWidth, tileHeight)
          break
        }
      }
    }
  }

  render(){
    return (
      <canvas ref='canvas' width={mapWidth * tileWidth} height={mapHeight*tileHeight} />
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