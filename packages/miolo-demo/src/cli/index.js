import React from 'react'
import { hydrate } from 'react-dom'
import App from 'cli/App'

// Import styles for this application
import 'cli/static/scss/style.scss'

// Catch window errors
import {miolo_catcher_init} from 'miolo-tools'
miolo_catcher_init()

hydrate(<App/>, 
        document.getElementById('root'))

if (module.hot) {
  module.hot.accept();
}
