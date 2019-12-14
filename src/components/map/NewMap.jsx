import React from 'react'
import { connect } from 'react-redux'
import './CanvasMap.css'
import { mapWidth, mapHeight, viewportWidth, viewportHeight, tileWidth, tileHeight } from '../../models/tiles/mapConstants'
import Farm from '../../images/fieldWithWheat.png'
import Rock from '../../images/bigRock.png'
import Plain from '../../images/plain1.png'
import House from '../../images/house1.png'
import Trees from '../../images/denseTrees.png'
import { NavBar } from '../shared_components/NavBar'
import { mapDrag } from '../../redux/actions'

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
    
    this.mouseOffset = {}
  }

  onMouseDown = (e, canvas) => {
    this.mouseOffset = {
      x: e.clientX - this.props.mapOffset.width,
      y: e.clientY - this.props.mapOffset.height
    }
    canvas.addEventListener('mousemove', this.onMouseMove)
    canvas.addEventListener('mouseup', () => this.onMouseUp(canvas))
  }

  onMouseMove = (e) => {
    const payload = {
      x: e.clientX - this.mouseOffset.x,
      y: e.clientY - this.mouseOffset.y
    }
    this.props.mapDrag(payload)
  }

  onMouseUp(canvas){
    canvas.removeEventListener('mousemove', this.onMouseMove)
    canvas.removeEventListener('mouseup', () => this.onMouseUp())
  }

  componentDidMount() {
    const canvas = this.refs.canvas
    const ctx = canvas.getContext('2d')

    canvas.addEventListener('mousedown', (e) => this.onMouseDown(e, canvas))
    requestAnimationFrame(() => this.drawGame(ctx))
  }

  drawGame(ctx, currentSecond = 0, framesLastSecond = 0, frameCount = 0) {
    if(ctx===null) return
    ctx.fillRect(0, 0, viewportWidth, viewportHeight)

    let sec = Math.floor(Date.now()/1000)
    if(sec !== currentSecond){
      currentSecond = sec
      framesLastSecond = frameCount
    }
    
    for(let x = 0; x < mapWidth; x++){
      for(let y = 0; y < mapHeight; y++){
        const widthOffset = this.props.mapOffset.width
        const heightOffset = this.props.mapOffset.height
        //Always draw a plain image first on every tile, as a backdrop
        ctx.drawImage(this.PlainImage, x*tileWidth + widthOffset, y*tileHeight + heightOffset, tileWidth, tileHeight)
        switch(this.props.gameMap[x][y].type){
          case 'plain': //Not necessary to draw anything here, since plain is drawn on every time anyway
            //ctx.drawImage(this.PlainImage, x*tileWidth, y*tileHeight, tileWidth, tileHeight)
          break

          case 'rock':
            ctx.drawImage(this.RockImage, x*tileWidth + widthOffset, y*tileHeight + heightOffset, tileWidth, tileHeight)
          break

          case 'farm':
            ctx.drawImage(this.FarmImage, x*tileWidth + widthOffset, y*tileHeight + heightOffset, tileWidth, tileHeight)
          break

          case 'house':
            ctx.drawImage(this.HouseImage, x*tileWidth + widthOffset, y*tileHeight + heightOffset, tileWidth, tileHeight)
          break

          case 'trees':
            ctx.drawImage(this.Trees, x*tileWidth + widthOffset, y*tileHeight + heightOffset, tileWidth, tileHeight)
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
        <canvas ref='canvas' width={viewportWidth} height={viewportHeight} />
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    gameMap: [...state.gameMap],
    mapOffset: {...state.mapOffset}
  }
}

function mapDispatchToProps(dispatch) {
  return {
    mapDrag: (payload) => dispatch(mapDrag(payload))
  }
}

const CanvasMapContainer = connect(mapStateToProps, mapDispatchToProps)(NewMap)
export { CanvasMapContainer as NewMap }