import React from 'react'
import { HomePageComponent } from './components/home_page/HomePageComponent'
import { MapPage } from './components/map/MapPage'
import {
  BrowserRouter,
  Route
} from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <div>
        <Route exact path='/' component={HomePageComponent} />
        <Route path='/map' component={MapPage} />
      </div>
    </BrowserRouter>
  )
}

export default App