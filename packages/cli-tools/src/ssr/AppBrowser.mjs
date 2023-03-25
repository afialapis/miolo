import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import {AppContext} from 'miolo-commons'

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
