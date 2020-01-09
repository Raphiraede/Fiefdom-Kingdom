import React from 'react'
import { connect } from 'react-redux'
import './CanvasMap.css'
import { mapWidth, mapHeight, viewportWidth, viewportHeight } from '../../models/tiles/mapConstants'
import Field from '../../images/tiles/fieldWithWheat.png'
import Rock from '../../images/tiles/bigRock.png'
import Plain from '../../images/tiles/plain1.png'
import House from '../../images/tiles/house1.png'
import Trees from '../../images/tiles/denseTrees.png'
import GoldOre from '../../images/tiles/goldOre.png'
import ChurchBot from '../../images/tiles/ChurchBot.png'
import ChurchTop from '../../images/tiles/ChurchTop.png'
import BlueSpearman from '../../images/units/blue-spearman-bigger.png'
import { mapDrag, zoomMapIn, zoomMapOut, giveFiefToNoble } from '../../redux/actions'
import { TileInfo } from './TileInfo'

class Map extends React.Component{
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
    this.BlueSpearman = new Image()

    this.FieldImage.src = Field
    this.RockImage.src = Rock
    this.PlainImage.src = Plain
    this.HouseImage.src = House
    this.Trees.src = Trees
    this.GoldOre.src = GoldOre
    this.ChurchBot.src = ChurchBot
    this.ChurchTop.src = ChurchTop
    this.BlueSpearman.src = BlueSpearman

    //mapOffset is in the redux store so that it persists when the user navigates away and navigates back
    this.state = {
      tileInfoIsVisible: true, //Currently this is always true, might change later
      mouseOffset: {}, //MouseOffset is the mouseX and mouseY based on the actual game map, not the canvas(since the gamemap can be offset as well)
      mouseX: 0,
      mouseY: 0,
      //tileMatrixX and tileMatrixY is the coordinate of the current hovered tile in the map matrix, not their pixel coords.
      tileMatrixX: 0, 
      tileMatrixY: 0,
      pixelsMovedAfterMouseDown: 0, //this variable will help distinguish between a drag and an ordinary click.
    }
  }

  trackMouseMovement = (e) => {
    const rect = e.target.getBoundingClientRect()
    const mouseX = e.pageX - rect.left
    const mouseY = e.pageY - rect.top
    const { tileMatrixX, tileMatrixY } = this.findHoveredTileCoords()
    this.setState({
      mouseX,
      mouseY,
      tileMatrixX,
      tileMatrixY
    })
  }

  componentDidMount() {
    const canvas = this.refs.canvas
    const ctx = canvas.getContext('2d')

    //tracks mouseX and mouseY to help calculate which tile to highlite
    canvas.addEventListener('mousemove', this.trackMouseMovement)
    canvas.addEventListener('mousedown', (e) => this.onMouseDown(e, canvas))
    canvas.addEventListener('wheel', (e) => {
      if(e.deltaY > 0) this.props.zoomMapOut()
      else if (e.deltaY < 0) this.props.zoomMapIn()
    })
    requestAnimationFrame(() => this.drawGame(ctx))
  }

  componentWillUnmount() {
    const canvas = this.refs.canvas
    canvas.removeEventListener('mousemove', this.trackMouseMovement)
  }

  drawGame(ctx, currentSecond = 0, framesLastSecond = 0, frameCount = 0) {
    if(ctx===null) return

    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, viewportWidth, viewportHeight) //creates a black background

    frameCount += 1
    let sec = Math.floor(Date.now()/1000)
    if(sec !== currentSecond){
      currentSecond = sec
      framesLastSecond = frameCount
      frameCount = 0
    }

    const xOffset = this.props.mapOffset.x
    const yOffset = this.props.mapOffset.y
    const tileSize = this.props.tileSize
    
    for(let x = 0; x < mapWidth; x++){
      for(let y = 0; y < mapHeight; y++){

        //tileTopLeftPixelX and tileTopLeftPixelY represent the coordinates of the pixel in the canvas that the top left of the tile is on.
        //These are not to be confused with tileMatrixX and tileMatrixY
        const tileTopLeftPixelX = x*tileSize + xOffset
        const tileTopLeftPixelY = y*tileSize + yOffset

        //Always draw a plain image first on every tile, as a backdrop
        ctx.drawImage(this.PlainImage, tileTopLeftPixelX, tileTopLeftPixelY, tileSize, tileSize)
        switch(this.props.gameMap[x][y].type){
          case 'plain': //Not necessary to draw anything here, since plain is drawn on every time anyway
          break

          case 'rock':
            ctx.drawImage(this.RockImage, tileTopLeftPixelX, tileTopLeftPixelY, tileSize, tileSize)
          break

          case 'field':
            ctx.drawImage(this.FieldImage, tileTopLeftPixelX, tileTopLeftPixelY, tileSize, tileSize)
          break

          case 'house':
            ctx.drawImage(this.HouseImage, tileTopLeftPixelX, tileTopLeftPixelY, tileSize, tileSize)
          break

          case 'trees':
            ctx.drawImage(this.Trees, tileTopLeftPixelX, tileTopLeftPixelY, tileSize, tileSize)
          break

          case 'goldOre':
            ctx.drawImage(this.GoldOre, tileTopLeftPixelX, tileTopLeftPixelY, tileSize, tileSize)
          break

          case 'church':
            ctx.drawImage(this.ChurchBot, tileTopLeftPixelX, tileTopLeftPixelY, tileSize, tileSize) //bottom of church
            ctx.drawImage(this.ChurchTop, tileTopLeftPixelX, tileTopLeftPixelY - tileSize, tileSize, tileSize) // top of church
          break

          default:
        }

        const kingdom = this.props.mainKingdom
        if(this.props.gameMap[x][y].fiefOwner){
          const color = this.props.nobles[this.props.gameMap[x][y].fiefOwner].color
          this.drawFief({x, y, ctx, tileTopLeftPixelX, tileTopLeftPixelY, color})
        }
        if(this.props.gameMap[x][y].kingdomOwner) this.drawKingdomBorder({x, y, kingdom, ctx, tileTopLeftPixelX, tileTopLeftPixelY})
      }
    }

    this.drawHoveredTileOutline(ctx)
    this.handleTileInfoCoordinates()
    ctx.font = '40px serif'
    ctx.fillStyle = 'red'
    ctx.fillText("fps:" + framesLastSecond, 50, 150)
    if(window.location.pathname==='/map'){ // this is to stop the animation loop when the user navigates away from the page
      requestAnimationFrame(() => {this.drawGame(ctx, currentSecond, framesLastSecond, frameCount)})
    }
  }

  drawKingdomBorder({x, y, kingdom, ctx, tileTopLeftPixelX, tileTopLeftPixelY}){

    const tileSize = this.props.tileSize
    const tileBottomRightPixelX = tileTopLeftPixelX + tileSize
    const tileBottomRightPixelY = tileTopLeftPixelY + tileSize

    const borderLineColor = 'rgb(0, 0, 255)'
    const slightlyTransparentBorderLineColor = 'rgb(0, 0, 255, 0.3)'
    const totallyTransparent = 'rgb(0, 0, 0, 0)'

    const gradientStart = 0
    const gradientEnd = 0.3

    const leftRightGradient = ctx.createLinearGradient(tileTopLeftPixelX, tileTopLeftPixelY, tileBottomRightPixelX, tileTopLeftPixelY)
    leftRightGradient.addColorStop(gradientStart, slightlyTransparentBorderLineColor)
    leftRightGradient.addColorStop(gradientEnd, totallyTransparent)

    const rightLeftGradient = ctx.createLinearGradient(tileBottomRightPixelX, tileTopLeftPixelY, tileTopLeftPixelX, tileTopLeftPixelY)
    rightLeftGradient.addColorStop(gradientStart, slightlyTransparentBorderLineColor)
    rightLeftGradient.addColorStop(gradientEnd, totallyTransparent)

    const topDownGradient = ctx.createLinearGradient(tileTopLeftPixelX, tileTopLeftPixelY, tileTopLeftPixelX, tileBottomRightPixelY)
    topDownGradient.addColorStop(gradientStart, slightlyTransparentBorderLineColor)
    topDownGradient.addColorStop(gradientEnd, totallyTransparent)

    const bottomUpGradient = ctx.createLinearGradient(tileTopLeftPixelX, tileBottomRightPixelY, tileTopLeftPixelX, tileTopLeftPixelY)
    bottomUpGradient.addColorStop(gradientStart, slightlyTransparentBorderLineColor)
    bottomUpGradient.addColorStop(gradientEnd, totallyTransparent)


    if (x===0 || this.props.gameMap[x-1][y].kingdomOwner !== kingdom.id){
      //first draw the hard border line
      ctx.fillStyle = borderLineColor
      ctx.fillRect(tileTopLeftPixelX, tileTopLeftPixelY, 2, tileSize)//although i'm using fillRect, its actually drawing a line

      //then the soft gradient, in order to prevent any confusion as to which side of the border your kingdom lies on
      ctx.fillStyle = leftRightGradient
      ctx.fillRect(tileTopLeftPixelX, tileTopLeftPixelY, tileSize, tileSize)
    }

    if (y===0 || this.props.gameMap[x][y-1].kingdomOwner !== kingdom.id){
      ctx.fillStyle = borderLineColor
      ctx.fillRect(tileTopLeftPixelX, tileTopLeftPixelY, tileSize, 2)

      ctx.fillStyle = topDownGradient
      ctx.fillRect(tileTopLeftPixelX, tileTopLeftPixelY, tileSize, tileSize)
    }

    if(x===this.props.gameMap.length - 1 || this.props.gameMap[x + 1][y].kingdomOwner !== kingdom.id){
      ctx.fillStyle = borderLineColor
      //subtracting 2 from x coord so that the border draws inside the tile, and doesn't overlap into the next tile over
      ctx.fillRect(tileBottomRightPixelX - 2, tileTopLeftPixelY, 2, tileSize)

      ctx.fillStyle = rightLeftGradient
      ctx.fillRect(tileTopLeftPixelX, tileTopLeftPixelY, tileSize, tileSize)
    }

    if(y===this.props.gameMap[0].length - 1 || this.props.gameMap[x][y+1].kingdomOwner !== kingdom.id){
      ctx.fillStyle = borderLineColor
      //subtracting 2 from x coord so that the border draws inside the tile, and doesn't overlap into the next tile over
      ctx.fillRect(tileTopLeftPixelX, tileBottomRightPixelY - 2, tileSize, 2)

      ctx.fillStyle = bottomUpGradient
      ctx.fillRect(tileTopLeftPixelX, tileTopLeftPixelY, tileSize, tileSize)
    }
  }

  drawFief({x, y, ctx, tileTopLeftPixelX, tileTopLeftPixelY, color}){
    const tileSize = this.props.tileSize
    ctx.fillStyle = color
    if(this.props.gameMap[x][y].fiefOwner){
      ctx.fillRect(tileTopLeftPixelX, tileTopLeftPixelY, tileSize, tileSize)
    }
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
    const x = this.state.tileMatrixX
    const y = this.state.tileMatrixY
    ctx.strokeRect(x*this.props.tileSize + this.props.mapOffset.x, y*this.props.tileSize + this.props.mapOffset.y, this.props.tileSize, this.props.tileSize)
  }

  findHoveredTileCoords(){
    const tileMatrixX = Math.floor((this.state.mouseX - this.props.mapOffset.x)/this.props.tileSize)
    const tileMatrixY = Math.floor((this.state.mouseY - this.props.mapOffset.y)/this.props.tileSize)
    return {
      tileMatrixX,
      tileMatrixY
    }
  }

  onMouseDown = (e, canvas) => {
    
    this.setState({
      mouseOffset: {
        x: e.clientX - this.props.mapOffset.x,
        y: e.clientY - this.props.mapOffset.y
      },
    })
    canvas.addEventListener('mousemove', this.onMouseMove)
    canvas.addEventListener('mouseup', this.onMouseUp)
  }

  onMouseMove = (e) => {
    
    const payload = {
      x: e.clientX - this.state.mouseOffset.x,
      y: e.clientY - this.state.mouseOffset.y,
    }

    const absoluteMouseMovement = Math.abs(e.movementX) + Math.abs(e.movementY)
    this.setState({
      pixelsMovedAfterMouseDown: this.state.pixelsMovedAfterMouseDown + absoluteMouseMovement
    })
    this.props.mapDrag(payload)
  }

  onMouseUp = () => {
    const canvas = this.refs.canvas
    
    if(this.state.pixelsMovedAfterMouseDown < 10){//This case is a click
      if(this.props.givingFief.currentlyGivingFief === true){
        const payload = {
          tileMatrixX: this.state.tileMatrixX,
          tileMatrixY: this.state.tileMatrixY,
        }
        this.props.giveFiefToNoble(payload)
      } 
    }
    else{//this case is a drag.

    }
    this.setState({
      pixelsMovedAfterMouseDown: 0
    })
    canvas.removeEventListener('mousemove', this.onMouseMove)
    canvas.removeEventListener('mouseup', this.onMouseUp)
  }

  render(){
    return (
      <div>
        <canvas ref='canvas' width={viewportWidth} height={viewportHeight} />
        {this.state.tileInfoIsVisible && this.props.gameMap[this.state.tileMatrixX] && this.props.gameMap[this.state.tileMatrixX][this.state.tileMatrixY]? 
          <TileInfo 
            tileData={this.props.gameMap[this.state.tileMatrixX][this.state.tileMatrixY]}
            mainKingdom={this.props.mainKingdom}
            families={this.props.families}
            nobles={this.props.nobles}
            noblesToFamiliesIndex={this.props.noblesToFamiliesIndex}
          />
          : null
        }
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    mainKingdom: {...state.mainKingdom},
    nobles: {...state.nobles},
    gameMap: [...state.gameMap],
    mapOffset: {...state.mapOffset},
    tileSize: state.tileSize,
    givingFief: {...state.givingFief},
  }
}

function mapDispatchToProps(dispatch) {
  return {
    mapDrag: (payload) => dispatch(mapDrag(payload)),
    zoomMapIn: () => dispatch(zoomMapIn()),
    zoomMapOut: () => dispatch(zoomMapOut()),
    giveFiefToNoble: (payload) => dispatch(giveFiefToNoble(payload))
  }
}

const CanvasMapContainer = connect(mapStateToProps, mapDispatchToProps)(Map)
export { CanvasMapContainer as Map }