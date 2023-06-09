import React from 'react'
import { hydrate } from 'react-dom'
import App from './App.mjs'

// Import styles for this application
import './static/scss/style.scss'


// Catch window errors ==> will be done by AppBrowser
// import {miolo_catcher_init} from 'miolo-cli-tools'
// miolo_catcher_init('sys/jserror')

hydrate(<App/>, 
        document.getElementById('root'))
