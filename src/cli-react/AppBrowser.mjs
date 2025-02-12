import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import AppContext from './context/AppContext.mjs'

const AppBrowser = ({children}) => {
  
  return (
    <BrowserRouter
      future={{
        v7_startTransition: true,
      }}    
    >
      <AppContext context={window.__CONTEXT || {}}>
        {children}
      </AppContext>
    </BrowserRouter>
  )
}

export default AppBrowser
