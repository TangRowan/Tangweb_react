//引入react核心库
import React from 'react'
//引入ReactDOM
import ReactDOM from 'react-dom'

import './App.css'

//import {BrowserRouter as Router} from 'react-router-dom'
import {HashRouter as Router} from 'react-router-dom'
//引入App
import App from './App'

import store ,{persistor}  from './redux/store'
import {Provider} from 'react-redux'


import { PersistGate } from 'redux-persist/integration/react'
ReactDOM.render(
    <Router>
        <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <App/>
        </PersistGate>
        </Provider>
    </Router>,
document.getElementById('root'))

/*
ReactDOM.render(
    <Router>
            <App/>
    </Router>,
document.getElementById('root'))*/