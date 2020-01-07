import React from 'react'
import { HomePageComponent } from './components/home_page/HomePageComponent'
import { FamiliesComponent } from './components/familiesPage/FamiliesComponent'
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
        <Route path='/families' component={FamiliesComponent} />
        <Route path='/map' component={MapPage} />
      </div>
    </BrowserRouter>
  )
}

export default App