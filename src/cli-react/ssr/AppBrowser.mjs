import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import AppContext from './context/AppContext.mjs'
import { mioloCatcher } from '../../cli/catcher/index.mjs'

const AppBrowser = ({children}) => {

  mioloCatcher()
  
  return (
    <BrowserRouter>
      <AppContext context={window.__CONTEXT || {}}>
        {children}
      </AppContext>
    </BrowserRouter>
  )
}

export default AppBrowser
