import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import AppContext from './context/AppContext.mjs'

const AppBrowser = ({children, config}) => {
  return (
    <BrowserRouter>
      <AppContext context={window.__CONTEXT || {}}
                  config = {config}>
        {children}
      </AppContext>
    </BrowserRouter>
  )
}

export default AppBrowser
