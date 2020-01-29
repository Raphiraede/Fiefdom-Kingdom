import React from 'react'
import { HomePageComponent } from './components/home_page/HomePageComponent'
import { MapPage } from './components/map/MapPage'
import {
  Route,
  withRouter
} from 'react-router-dom'
import { VictoryScreen } from './components/VictoryScreen/VictoryScreen.js'
import { DefeatScreen } from './components/defeatScreen/DefeatScreen.js'
import { connect } from 'react-redux'


class App extends React.Component {
  componentDidUpdate(){
    if(this.props && this.props.gameEnd && this.props.gameEnd.type === 'victory' && window.location.pathname !== '/victory')this.props.history.push('/victory')
    if(this.props && this.props.gameEnd && this.props.gameEnd.type === 'defeat' && window.location.pathname !== '/defeat') this.props.history.push('/defeat')
  }
  render(){
    return (
        <div>
          <Route exact path='/' component={HomePageComponent} />
          <Route path='/map' component={MapPage} />
          <Route path='/victory' component={VictoryScreen} />
          <Route path='/defeat' component={DefeatScreen} />
        </div>
    )
  }
}

function mapStateToProps(state){
  if(state && state.gameEnd){
    return{
      gameEnd: {...state.gameEnd}
    }
  }
  else{
    return {}
  }

}

const AppContainer = connect(mapStateToProps)(App)

export default withRouter(AppContainer)