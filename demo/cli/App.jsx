import React from 'react'
import { BrowserRouter  } from 'react-router-dom'
import Index from './ui/Index.jsx'


// Import styles for this application
import './assets/scss/style.scss'

const App = () => {
  return (
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >  
      <Index/>
    </BrowserRouter>  
  )
}

export default App
