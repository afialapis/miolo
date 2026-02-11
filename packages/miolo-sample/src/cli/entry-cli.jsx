import React from 'react'
import { hydrateRoot } from 'react-dom/client'
import { BrowserRouter  } from 'react-router'
import { AppBrowser } from 'miolo-react'
import App from './App.jsx'


import '../static/style/globals.css'

const domNode = document.getElementById('root')


hydrateRoot(domNode, 
  <AppBrowser>
    <BrowserRouter>  
      <App/>
    </BrowserRouter>
  </AppBrowser>
)
