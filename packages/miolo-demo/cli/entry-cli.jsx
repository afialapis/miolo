import React from 'react'
import { hydrateRoot } from 'react-dom/client'
import { BrowserRouter  } from 'react-router'
import { AppBrowser } from 'miolo-react'
import Index from '#cli/ui/Index.jsx'


// Import styles for this application
// import './assets/scss/style.scss'
import './styles/globals.css'

const domNode = document.getElementById('root')

hydrateRoot(domNode, 
  <AppBrowser>
    <BrowserRouter>  
      <Index/>
    </BrowserRouter>
  </AppBrowser>
)
