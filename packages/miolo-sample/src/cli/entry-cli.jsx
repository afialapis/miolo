import React from 'react'
import { hydrateRoot } from 'react-dom/client'
import { BrowserRouter  } from 'react-router-dom'
import { AppBrowser } from 'miolo-react'
import App from './App.jsx'


import '../static/style/globals.css'

const domNode = document.getElementById('root')


hydrateRoot(domNode, 
  <AppBrowser>
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >  
      <App/>
    </BrowserRouter>
  </AppBrowser>
)
