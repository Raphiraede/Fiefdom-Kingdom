import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { rootReducer } from './redux/reducer.js'
import { saveState, loadState } from './redux/saveAndLoadState.js'



const persistedState = loadState()
const store = createStore(
  rootReducer,
  persistedState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

store.subscribe(() => {
  saveState(store.getState())
})

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);