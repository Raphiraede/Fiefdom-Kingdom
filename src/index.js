import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { rootReducer } from './redux/reducer.js'



const Store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())


ReactDOM.render(
  <Provider store={Store}>
    <App />
  </Provider>,
  document.getElementById('root')
);