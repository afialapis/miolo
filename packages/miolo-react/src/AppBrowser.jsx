import React from 'react'
import MioloContextProvider from './context/MioloContextProvider.jsx'

const AppBrowser = ({ children }) => {
  const context = typeof window !== 'undefined' && window.__CONTEXT ? window.__CONTEXT : {};

  return (
    <MioloContextProvider context={context}>
      {children}
    </MioloContextProvider>
  )  
}

export default AppBrowser
