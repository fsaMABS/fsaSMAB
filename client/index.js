import {Provider} from 'react-redux'
import store from './store'
import React from 'react';
import ReactDOM from 'react-dom';
import Board from './components/board';

const rootEl = document.getElementById('root');

ReactDOM.render(
  <Provider store={store}>
   <Board />
  </Provider>,
  rootEl
)
