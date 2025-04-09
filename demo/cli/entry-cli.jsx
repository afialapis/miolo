import React from 'react'
import { hydrateRoot } from 'react-dom/client'
import { BrowserRouter  } from 'react-router-dom'
import { AppBrowser } from 'miolo/cli-react'
import Index from './ui/Index.jsx'


// Import styles for this application
import './assets/scss/style.scss'

const domNode = document.getElementById('root')

hydrateRoot(domNode, 
  <AppBrowser>
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >  
      <Index/>
    </BrowserRouter>
  </AppBrowser>
)
