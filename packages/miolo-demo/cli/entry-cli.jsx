import React from 'react'
import { hydrateRoot } from 'react-dom/client'
import { BrowserRouter  } from 'react-router-dom'
import { AppBrowser } from 'miolo-react'
import Index from '#cli/ui/Index.jsx'


// Import styles for this application
// import './assets/scss/style.scss'
import './styles/globals.css'

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
