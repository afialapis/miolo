import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import AppContext from '../../../commons/src/context/AppContext.mjs'

const AppBrowser = ({children}) => {
  return (
    <BrowserRouter>
      <AppContext context={window.__CONTEXT}>
        {children}
      </AppContext>
    </BrowserRouter>
  )
}

export default AppBrowser
