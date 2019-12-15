import React from 'react'
import { connect } from 'react-redux'
import './CanvasMap.css'
import { mapWidth, mapHeight, viewportWidth, viewportHeight, tileWidth, tileHeight } from '../../models/tiles/mapConstants'
import Field from '../../images/tiles/fieldWithWheat.png'
import Rock from '../../images/tiles/bigRock.png'
import Plain from '../../images/tiles/plain1.png'
import House from '../../images/tiles/house1.png'
import Trees from '../../images/tiles/denseTrees.png'
import GoldOre from '../../images/tiles/goldOre.png'
import ChurchBot from '../../images/tiles/ChurchBot.png'
import ChurchTop from '../../images/tiles/ChurchTop.png'
import { NavBar } from '../shared_components/NavBar'
import { mapDrag } from '../../redux/actions'
import { TileInfo } from './TileInfo'

class MapPage extends React.Component{
  constructor(props){
    super(props)
    this.FieldImage = new Image()
    this.RockImage = new Image()
    this.PlainImage = new Image()
    this.HouseImage = new Image()
    this.Trees = new Image()
    this.GoldOre = new Image()
    this.ChurchBot = new Image()
    this.ChurchTop = new Image()

    this.FieldImage.src = Field
    this.RockImage.src = Rock
    this.PlainImage.src = Plain
    this.HouseImage.src = House
    this.Trees.src = Trees
    this.GoldOre.src = GoldOre
    this.ChurchBot.src = ChurchBot
    this.ChurchTop.src = ChurchTop

    //mapOffset is in the redux store so that it persists when the user navigates away and navigates back
    this.state = {
      tileInfoIsVisible: true,
      mouseOffset: {},
      mouseX: 0,
      mouseY: 0,
      tileX: 0,
      tileY: 0,
    }
  }

  trackMouseMovement = (e) => {
    const rect = e.target.getBoundingClientRect()
    const mouseX = e.pageX - rect.left
    const mouseY = e.pageY - rect.top
    const { tileX, tileY } = this.findHoveredTileCoords()
    this.setState({
      mouseX,
      mouseY,
      tileX,
      tileY
    })
  }

  componentDidMount() {
    const canvas = this.refs.canvas
    const ctx = canvas.getContext('2d')

    //tracks mouseX and mouseY to help calculate which tile to highlite
    canvas.addEventListener('mousemove', this.trackMouseMovement)

    canvas.addEventListener('mousedown', (e) => this.onMouseDown(e, canvas))
    requestAnimationFrame(() => this.drawGame(ctx))
  }

  componentWillUnmount() {
    const canvas = this.refs.canvas
    canvas.removeEventListener('mousemove', this.trackMouseMovement)
  }

  drawGame(ctx, currentSecond = 0, framesLastSecond = 0, frameCount = 0) {
    if(ctx===null) return
    ctx.fillRect(0, 0, viewportWidth, viewportHeight) //creates a black background

    let sec = Math.floor(Date.now()/1000)
    if(sec !== currentSecond){
      currentSecond = sec
      framesLastSecond = frameCount
    }
    
    for(let x = 0; x < mapWidth; x++){
      for(let y = 0; y < mapHeight; y++){
        const xOffset = this.props.mapOffset.x
        const yOffset = this.props.mapOffset.y
        //Always draw a plain image first on every tile, as a backdrop
        ctx.drawImage(this.PlainImage, x*tileWidth + xOffset, y*tileHeight + yOffset, tileWidth, tileHeight)
        switch(this.props.gameMap[x][y].type){
          case 'plain': //Not necessary to draw anything here, since plain is drawn on every time anyway
            //ctx.drawImage(this.PlainImage, x*tileWidth, y*tileHeight, tileWidth, tileHeight)
          break

          case 'rock':
            ctx.drawImage(this.RockImage, x*tileWidth + xOffset, y*tileHeight + yOffset, tileWidth, tileHeight)
          break

          case 'field':
            ctx.drawImage(this.FieldImage, x*tileWidth + xOffset, y*tileHeight + yOffset, tileWidth, tileHeight)
          break

          case 'house':
            ctx.drawImage(this.HouseImage, x*tileWidth + xOffset, y*tileHeight + yOffset, tileWidth, tileHeight)
          break

          case 'trees':
            ctx.drawImage(this.Trees, x*tileWidth + xOffset, y*tileHeight + yOffset, tileWidth, tileHeight)
          break

          case 'goldOre':
            ctx.drawImage(this.GoldOre, x*tileWidth + xOffset, y*tileHeight + yOffset, tileWidth, tileHeight)
          break

          case 'church':
            ctx.drawImage(this.ChurchBot, x*tileWidth + xOffset, y*tileHeight + yOffset, tileWidth, tileHeight)
            ctx.drawImage(this.ChurchTop, x*tileWidth + xOffset, y*tileHeight + yOffset - tileHeight, tileWidth, tileHeight)
          break

          default:

        }
      }
    }
    this.drawHoveredTileOutline(ctx)
    this.handleTileInfoCoordinates()
    if(window.location.pathname==='/newMap'){
      requestAnimationFrame(() => {this.drawGame(ctx)})
    }
  }

  render(){
    return (
      <div>
        <NavBar />
        <canvas ref='canvas' width={viewportWidth} height={viewportHeight} />
        {this.state.tileInfoIsVisible ? 
          <TileInfo 
            tileData={this.props.gameMap[this.state.tileX][this.state.tileY]}
          />
          : null
        
      }
      </div>
    )
  }

  //This makes the tileInfo window hover next to the cursor
  //More css rules defined in TileInfo.css
  handleTileInfoCoordinates(){
    const tileInfo = document.querySelector('.tile-info')

    if(tileInfo){
      tileInfo.style.top = `${this.state.mouseY + 50}px`
      tileInfo.style.left = `${this.state.mouseX + 25}px`
    }
  }

  //draws a black box around the tile currently being hovered over
  drawHoveredTileOutline(ctx){
    const x = this.state.tileX
    const y = this.state.tileY
    ctx.strokeRect(x*tileWidth + this.props.mapOffset.x, y*tileHeight + this.props.mapOffset.y, tileWidth, tileHeight)
  }

  findHoveredTileCoords(){
    const tileX = Math.floor((this.state.mouseX - this.props.mapOffset.x)/tileWidth)
    const tileY = Math.floor((this.state.mouseY - this.props.mapOffset.y)/tileHeight)
    return {
      tileX,
      tileY
    }
  }

  onMouseDown = (e, canvas) => {
    this.setState({
      mouseOffset: {
        x: e.clientX - this.props.mapOffset.x,
        y: e.clientY - this.props.mapOffset.y
      }
    })
    canvas.addEventListener('mousemove', this.onMouseMove)
    canvas.addEventListener('mouseup', () => this.onMouseUp(canvas))
  }

  onMouseMove = (e) => {
    const payload = {
      x: e.clientX - this.state.mouseOffset.x,
      y: e.clientY - this.state.mouseOffset.y
    }
    this.props.mapDrag(payload)
  }

  onMouseUp(canvas){
    canvas.removeEventListener('mousemove', this.onMouseMove)
    canvas.removeEventListener('mouseup', () => this.onMouseUp())
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

const CanvasMapContainer = connect(mapStateToProps, mapDispatchToProps)(MapPage)
export { CanvasMapContainer as MapPage }