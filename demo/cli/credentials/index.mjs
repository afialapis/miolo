import React from 'react'
import { hydrateRoot } from 'react-dom/client'
import App from './App.mjs'

// Import styles for this application
import './assets/scss/style.scss'


// Catch window errors ==> will be done by AppBrowser
// import {miolo_catcher_init} from 'miolo-cli-tools'
// miolo_catcher_init('sys/jserror')

const domNode = document.getElementById('root')
const _root = hydrateRoot(domNode, <App/>)
