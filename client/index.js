// import './index.scss'
// import React from 'react'
// import ReactDOM from 'react-dom'
// import {Provider} from 'react-redux'
// import store from './store'
// import Routes from './routes'

// // establishes socket connection
// import './socket'

// observe(ReactDOM.render(
//   <Provider store={store}>
//     <Routes />
//   </Provider>,
//   document.getElementById('app')
// ))



import React from 'react';
import ReactDOM from 'react-dom';
import board from './components/board';
import { observe } from './game';

const rootEl = document.getElementById('root');

observe((knightPosition, obamaPosition, allobamapositions,allknightpositions) => {
  ReactDOM.render(
    <Board knightPosition={knightPosition} 
           obamaPosition={obamaPosition} 
           allobamapositions={allobamapositions}
           allknightpositions={allknightpositions}  />,
    rootEl
  )
})
