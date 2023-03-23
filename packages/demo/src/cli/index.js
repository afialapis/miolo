import React from 'react'
import { hydrate } from 'react-dom'
import App from './App'

// Import styles for this application
import './static/scss/style.scss'

// Catch window errors
import {miolo_catcher_init} from 'miolo-cli-tools'
miolo_catcher_init('sys/jserror')

hydrate(<App/>, 
        document.getElementById('root'))

if (module.hot) {
  module.hot.accept()
}
