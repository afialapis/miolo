import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import Index from 'cli/ui/Index'

const App = () => {
  return (
    <BrowserRouter>
      <Index state={window.__STATE}/>
    </BrowserRouter>
  )
}

export default App

