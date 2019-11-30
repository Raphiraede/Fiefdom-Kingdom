import React from 'react'
import { HomePageComponent } from './components/home_page/HomePageComponent'
import { FamiliesComponent } from './components/families/FamiliesComponent'
import { Map } from './components/map/Map'
import { NewMap } from './components/map/NewMap'
import {
  BrowserRouter,
  Route
} from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <div>
        <Route exact path='/' component={HomePageComponent} />
        <Route path='/families' component={FamiliesComponent} />
        <Route path='/map' component={Map} />
        <Route path='/newMap' component={NewMap} />
      </div>
    </BrowserRouter>
  )
}

export default App