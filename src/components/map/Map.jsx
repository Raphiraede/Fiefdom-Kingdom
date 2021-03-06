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
import RedSpearman from '../../images/units/red-spearman-bigger.png'
import CastleBot from '../../images/tiles/CastleBot.png'
import CastleTop from '../../images/tiles/CastleTop.png'
import { 
  updateHoveredTileCoords,
  mapDrag, 
  zoomMapIn, 
  zoomMapOut, 
  giveFiefToNoble, 
  select, 
  updateArmyDestination,
} from '../../redux/actions'
import { Kingdom } from '../../models/kingdom/Kingdom'

class Map extends React.Component{
  constructor(){
    super()
    this.FieldImage = new Image()
    this.RockImage = new Image()
    this.PlainImage = new Image()
    this.HouseImage = new Image()
    this.Trees = new Image()
    this.GoldOre = new Image()
    this.ChurchBot = new Image()
    this.ChurchTop = new Image()
    this.BlueSpearman = new Image()
    this.RedSpearman = new Image()
    this.CastleBot = new Image()
    this.CastleTop = new Image()

    this.FieldImage.src = Field
    this.RockImage.src = Rock
    this.PlainImage.src = Plain
    this.HouseImage.src = House
    this.Trees.src = Trees
    this.GoldOre.src = GoldOre
    this.ChurchBot.src = ChurchBot
    this.ChurchTop.src = ChurchTop
    this.BlueSpearman.src = BlueSpearman
    this.RedSpearman.src = RedSpearman
    this.CastleBot.src = CastleBot
    this.CastleTop.src = CastleTop

    //mapOffset is in the redux store so that it persists when the user navigates away and navigates back
    this.state = {
      
      //MouseOffset is the mouseX and mouseY based on the actual game map, not the canvas(since the gamemap can dragged and cause it to be offset)
      mouseOffset: {
        x: 0,
        y: 0,
      },

      //This is the same as mouseOffset, except that it is calculated only when the user clicks to assist in the calculation of the mouse drag
      mouseOffsetAtBeginningOfMapDrag: {
        x: 0,
        y: 0,
      },

      mouseX: 0,
      mouseY: 0,
      //This is simply keeping track of the coordinates so that they can update the state store only when the hovered tile changes
      //This is so that the state store isn't being updated every animation frame, which would be a nightmare for performance
      hoveredTileCoordsTracker: {
        x: 0,
        y: 0,
      },
      pixelsMovedAfterMouseDown: 0, //this variable will help distinguish between a drag and an ordinary click.
    }
  }

  trackMouseMovement = (e) => {
    const rect = e.target.getBoundingClientRect()
    const mouseX = e.pageX - rect.left
    const mouseY = e.pageY - rect.top
    const mouseOffset = {
      x: mouseX - this.props.mapOffset.x,
      y: mouseY - this.props.mapOffset.y
    }
    const hoveredTileCoords = this.findHoveredTileCoords()

    //This check is done so that the state store is only updated when the hoveredTileCoords change
    //This prevents the state from having to update every time the mouse moved, which would dramatically decrease performance
    if(hoveredTileCoords.x === this.state.hoveredTileCoordsTracker.x &&
       hoveredTileCoords.y === this.state.hoveredTileCoordsTracker.y
      ){
      this.props.updateHoveredTileCoords(hoveredTileCoords)
    }

    this.setState({
      mouseOffset,
      mouseX,
      mouseY,
      hoveredTileCoordsTracker: hoveredTileCoords
    })
  }

  componentDidMount() {
    const canvas = this.refs.canvas
    const ctx = canvas.getContext('2d', { alpha: false })

    canvas.oncontextmenu = (e) => { // this disables opening the context menu with right click, since right click is used for other thing on the minimap
      return false
    }
    //tracks mouseX and mouseY to help calculate which tile to highlite
    canvas.addEventListener('mousemove', this.trackMouseMovement)
    canvas.addEventListener('mousedown', (e) => this.onMouseDown(e, canvas))
    canvas.addEventListener('wheel', (e) => {
      const mouseOffset = this.state.mouseOffset
      if(e.deltaY > 0){
        this.props.zoomMapOut(mouseOffset)
        this.trackMouseMovement(e)
      } 
      else if (e.deltaY < 0){
        this.props.zoomMapIn(mouseOffset)
        this.trackMouseMovement(e)
      }
    })
    requestAnimationFrame(() => this.drawGame(ctx))
  }

  componentWillUnmount() {
    const canvas = this.refs.canvas
    canvas.removeEventListener('mousemove', this.trackMouseMovement)
  }

  adjustCanvasDimensions(){
    const canvas = this.refs.canvas
    if(canvas){
      canvas.height = Math.floor(window.innerHeight )
      canvas.width = Math.floor(window.innerWidth)
    }
  }

  drawGame(ctx, currentSecond = 0, framesLastSecond = 0, frameCount = 0) {
    this.adjustCanvasDimensions()
    if(ctx===null) return
    ctx.fillStyle = 'black'
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

          case 'gold ore':
            ctx.drawImage(this.GoldOre, tileTopLeftPixelX, tileTopLeftPixelY, tileSize, tileSize)
          break

          case 'church':
            ctx.drawImage(this.ChurchBot, tileTopLeftPixelX, tileTopLeftPixelY, tileSize, tileSize) //bottom of church
          break

          case 'castle':
            ctx.drawImage(this.CastleBot, tileTopLeftPixelX, tileTopLeftPixelY, tileSize, tileSize) //bottom of castle
          break

          default:
        }
        
        if(this.props.gameMap[x][y + 1] && this.props.gameMap[x][y+1].type === 'church'){
          ctx.drawImage(this.ChurchTop, tileTopLeftPixelX, tileTopLeftPixelY, tileSize, tileSize) // top of church
        } 
        else if (this.props.gameMap[x][y + 1] && this.props.gameMap[x][y+1].type === 'castle'){
          ctx.drawImage(this.CastleTop, tileTopLeftPixelX, tileTopLeftPixelY, tileSize, tileSize) // top of castle
        }
        
        if(this.props.gameMap[x][y].fiefOwner){
          const color = this.props.nobles[this.props.gameMap[x][y].fiefOwner].color
          this.drawFief({x, y, ctx, tileTopLeftPixelX, tileTopLeftPixelY, color})
        }
        const mainKingdom = this.props.mainKingdom
        const aiKingdoms = this.props.aiKingdoms
        if(this.props.gameMap[x][y].kingdomOwner) this.drawKingdomsBorders({x, y, mainKingdom, aiKingdoms, ctx, tileTopLeftPixelX, tileTopLeftPixelY})
      }
    }
    this.drawArmiesAndArmyPaths(ctx)
    this.drawHoveredTileOutline(ctx)
    ctx.font = '40px serif'
    ctx.fillStyle = 'red'
    if(window.location.pathname==='/map'){ // this is to stop the animation loop when the user navigates away from the page
      requestAnimationFrame(() => {this.drawGame(ctx, currentSecond, framesLastSecond, frameCount)})
    }
  }

  drawKingdomsBorders({x, y, mainKingdom, aiKingdoms, ctx, tileTopLeftPixelX, tileTopLeftPixelY}){

    const kingdoms = [mainKingdom, ...aiKingdoms]
    let kingdomWhichOwnsThisTile
    kingdoms.forEach(kingdom => {
      if(this.props.gameMap[x][y].kingdomOwner === kingdom.id) kingdomWhichOwnsThisTile = kingdom
    })

    const tileSize = this.props.tileSize
    const tileBottomRightPixelX = tileTopLeftPixelX + tileSize
    const tileBottomRightPixelY = tileTopLeftPixelY + tileSize

    let borderLineColor
    let slightlyTransparentBorderLineColor
    const totallyTransparent = 'rgb(0, 0, 0, 0)'
    if(kingdomWhichOwnsThisTile.id === mainKingdom.id){
      borderLineColor = 'rgb(0, 0, 255)'
      slightlyTransparentBorderLineColor = 'rgb(0, 0, 255, 0.3)'
    }
    else{
      borderLineColor = 'rgb(255, 0, 0)'
      slightlyTransparentBorderLineColor = 'rgb(255, 0, 0, 0.3)'
    }
    

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

    if (x===0 || this.props.gameMap[x-1][y].kingdomOwner !== kingdomWhichOwnsThisTile.id){
      //first draw the hard border line
      ctx.fillStyle = borderLineColor
      ctx.fillRect(tileTopLeftPixelX, tileTopLeftPixelY, 2, tileSize)//although i'm using fillRect, its actually drawing a line

      //then the soft gradient, in order to prevent any confusion as to which side of the border your kingdom lies on
      ctx.fillStyle = leftRightGradient
      ctx.fillRect(tileTopLeftPixelX, tileTopLeftPixelY, tileSize, tileSize)
    }

    if (y===0 || this.props.gameMap[x][y-1].kingdomOwner !== kingdomWhichOwnsThisTile.id){
      ctx.fillStyle = borderLineColor
      ctx.fillRect(tileTopLeftPixelX, tileTopLeftPixelY, tileSize, 2)

      ctx.fillStyle = topDownGradient
      ctx.fillRect(tileTopLeftPixelX, tileTopLeftPixelY, tileSize, tileSize)
    }

    if(x===this.props.gameMap.length - 1 || this.props.gameMap[x + 1][y].kingdomOwner !== kingdomWhichOwnsThisTile.id){
      ctx.fillStyle = borderLineColor
      //subtracting 2 from x coord so that the border draws inside the tile, and doesn't overlap into the next tile over
      ctx.fillRect(tileBottomRightPixelX - 2, tileTopLeftPixelY, 2, tileSize)

      ctx.fillStyle = rightLeftGradient
      ctx.fillRect(tileTopLeftPixelX, tileTopLeftPixelY, tileSize, tileSize)
    }

    if(y===this.props.gameMap[0].length - 1 || this.props.gameMap[x][y+1].kingdomOwner !== kingdomWhichOwnsThisTile.id){
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

  //draws a black box around the tile currently being hovered over
  drawHoveredTileOutline(ctx){
    ctx.strokeStyle = 'black'
    const x = this.props.hoveredTileCoords.x
    const y = this.props.hoveredTileCoords.y
    ctx.strokeRect(x*this.props.tileSize + this.props.mapOffset.x, y*this.props.tileSize + this.props.mapOffset.y, this.props.tileSize, this.props.tileSize)
  }

  findHoveredTileCoords(){
    const x = Math.floor((this.state.mouseX - this.props.mapOffset.x)/this.props.tileSize)
    const y = Math.floor((this.state.mouseY - this.props.mapOffset.y)/this.props.tileSize)
    const hoveredTileCoords = {x, y}
    return hoveredTileCoords
  }

  drawArmiesAndArmyPaths(ctx){
    const armies = this.props.armies
    const tileSize = this.props.tileSize
    const mainKingdom = new Kingdom(this.props.mainKingdom)
    const armiesLoyalToMainKingdom = mainKingdom.armiesLoyalToThisKingdom(this.props.families, this.props.nobles, this.props.armies)
    const mapOffsetX = this.props.mapOffset.x
    const mapOffsetY = this.props.mapOffset.y

    for (const id in armies){ //This draws the armies
      const army = armies[id]
      const tileTopLeftPixelX = army.coordinates.x * tileSize + mapOffsetX
      const tileTopLeftPixelY = army.coordinates.y * tileSize + mapOffsetY
      let loyalToMainKingdom = false
      armiesLoyalToMainKingdom.forEach(loyalArmy => {
        if(army.id === loyalArmy.id) loyalToMainKingdom = true
      })
      if(loyalToMainKingdom) ctx.drawImage(this.BlueSpearman, tileTopLeftPixelX, tileTopLeftPixelY, tileSize, tileSize)
      else ctx.drawImage(this.RedSpearman, tileTopLeftPixelX, tileTopLeftPixelY, tileSize, tileSize)
      
    }

    for (const id in armies){ //This draws their paths
      const army = armies[id]
      const coordinates = {...army.coordinates}
      const destination = army.destination
      const lineTracer = coordinates //This keeps track of the current tile that the path is being drawn through

      ctx.beginPath()
      ctx.strokeStyle='blue'
      while (lineTracer.x !== destination.x || lineTracer.y !== destination.y){
        const tileCenterX = tileSize * lineTracer.x + mapOffsetX + (tileSize/2)
        const tileCenterY = tileSize * lineTracer.y + mapOffsetY + (tileSize/2)
        
        //Diagonal line going down and right
        if(lineTracer.x < destination.x && lineTracer.y < destination.y){
          ctx.moveTo(tileCenterX, tileCenterY)
          ctx.lineTo(tileCenterX + tileSize, tileCenterY + tileSize)
          lineTracer.x += 1
          lineTracer.y += 1
        }

        //Diagonal line going up and left
        else if(lineTracer.x > destination.x && lineTracer.y > destination.y){
          ctx.moveTo(tileCenterX, tileCenterY)
          ctx.lineTo(tileCenterX - tileSize, tileCenterY - tileSize)
          lineTracer.x -= 1
          lineTracer.y -= 1
        }

        //Diagonal line going down and left
        else if(lineTracer.x > destination.x && lineTracer.y < destination.y){
          ctx.moveTo(tileCenterX, tileCenterY)
          ctx.lineTo(tileCenterX - tileSize, tileCenterY + tileSize)
          lineTracer.x -= 1
          lineTracer.y += 1
        }

        //Diagnoal line going up and right
        else if (lineTracer.x < destination.x && lineTracer.y > destination.y){
          ctx.moveTo(tileCenterX, tileCenterY)
          ctx.lineTo(tileCenterX + tileSize, tileCenterY - tileSize)
          lineTracer.x += 1
          lineTracer.y -= 1
        }

        //Horizontal line left to right
        else if (lineTracer.x < destination.x && lineTracer.y === destination.y){
          ctx.moveTo(tileCenterX, tileCenterY)
          ctx.lineTo(tileCenterX + tileSize, tileCenterY)
          lineTracer.x += 1
        }

        //Horizontal line right to left
        else if (lineTracer.x > destination.x && lineTracer.y === destination.y){
          ctx.moveTo(tileCenterX, tileCenterY)
          ctx.lineTo(tileCenterX - tileSize, tileCenterY)
          lineTracer.x -= 1
        }

        //vertical line top to bottom
        else if (lineTracer.x === destination.x && lineTracer.y < destination.y){
          ctx.moveTo(tileCenterX, tileCenterY)
          ctx.lineTo(tileCenterX, tileCenterY + tileSize)
          lineTracer.y += 1
        }

        //vertical line bottom to top
        else if (lineTracer.x === destination.x && lineTracer.y > destination.y){
          ctx.moveTo(tileCenterX, tileCenterY)
          ctx.lineTo(tileCenterX, tileCenterY - tileSize)
          lineTracer.y -= 1
        }
      }
      ctx.stroke()
      ctx.beginPath()
    }
  }

  onMouseDown = (e, canvas) => {
    this.setState({
      mouseOffsetAtBeginningOfMapDrag: {
        x: e.clientX - this.props.mapOffset.x,
        y: e.clientY - this.props.mapOffset.y
      }
    })

    if(e.which === 1){ // left click
      canvas.addEventListener('mousemove', this.onMouseMove)
      canvas.addEventListener('mouseup', this.onMouseUp)
    }
    else if(e.which===3){// right click
      this.props.updateArmyDestination()
    }
  }

  onMouseMove = (e) => {
    const payload = {
      x: e.clientX - this.state.mouseOffsetAtBeginningOfMapDrag.x,
      y: e.clientY - this.state.mouseOffsetAtBeginningOfMapDrag.y,
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
        this.props.giveFiefToNoble()
      }
      else{
        this.props.select()
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
        <div className='MapWrapper'>
          <canvas ref='canvas' width={viewportWidth} height={viewportHeight} />
        </div>
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    mainKingdom: {...state.mainKingdom},
    aiKingdoms: [...state.aiKingdoms],
    families: {...state.families},
    nobles: {...state.nobles},
    gameMap: [...state.gameMap],
    mapOffset: {...state.mapOffset},
    tileSize: state.tileSize,
    givingFief: {...state.givingFief},
    armies: {...state.armies},
    hoveredTileCoords: {...state.hoveredTileCoords}
  }
}

function mapDispatchToProps(dispatch) {
  return {
    mapDrag: (payload) => dispatch(mapDrag(payload)),
    zoomMapIn: (payload) => dispatch(zoomMapIn(payload)),
    zoomMapOut: (payload) => dispatch(zoomMapOut(payload)),
    giveFiefToNoble: () => dispatch(giveFiefToNoble()),
    select: () => dispatch(select()),
    updateArmyDestination: () => dispatch(updateArmyDestination()),
    updateHoveredTileCoords: (payload) => dispatch(updateHoveredTileCoords(payload)),
  }
}

const CanvasMapContainer = connect(mapStateToProps, mapDispatchToProps)(Map)
export { CanvasMapContainer as Map }