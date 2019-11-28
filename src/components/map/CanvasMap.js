import React from 'react'
import { connect } from 'react-redux'
import './CanvasMap.css'
import Farm from '../../images/Farm.png'
import Mountain from '../../images/Mountain.png'
import Plain from '../../images/Plain.png'
import Hut from '../../images/Hut.png'
class CanvasMap extends React.Component{
  constructor(){
    super()
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
    const tileSize = 30
    const map = this.props.map
    let canvas = this.refs.canvas
    const context = canvas.getContext('2d')

    for(let i = 0; i < map.length; i++){
      for(let j = 0; j < map[i].length; j++){
        const x=i*tileSize
        const y=j*tileSize
        if(map[i][j].type==='plain'){
          context.drawImage(this.PlainImage, x, y, tileSize, tileSize)
        }
        else if(map[i][j].type==='mountain'){
          context.drawImage(this.MountainImage, x, y, tileSize, tileSize)
        } 
        else if(map[i][j].type==='farm') {
          context.drawImage(this.FarmImage, x, y, tileSize, tileSize)
        }
        else if (map[i][j].type==='hut'){
          context.drawImage(this.HutImage, x, y, tileSize, tileSize)
        }
      }
    }


    function handleClick(e){
      //This will return the coordinate of the click in relation to the element, regaurdless of where the element is on the page
      const rect = e.target.getBoundingClientRect()
      const x = e.pageX - rect.left
      const y = e.pageY - rect.top
    }
    canvas.addEventListener('click', handleClick)
  }

  render(){
    return (
        <div>
          <canvas ref='canvas' width={1000} height={1000} />
        </div>
    )
  }
}

function mapStateToProps(state){
  return {
    map: [...state.map]
  }
}

const CanvasMapContainer = connect(mapStateToProps)(CanvasMap)
export { CanvasMapContainer as CanvasMap }