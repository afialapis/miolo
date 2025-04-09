import React from 'react'
import MioloContextProvider from './context/MioloContextProvider.mjs'

const AppBrowser = ({ children }) => {
  const context = typeof window !== 'undefined' && window.__CONTEXT ? window.__CONTEXT : {};

  return React.createElement(
    MioloContextProvider,
    { context },
    children
  )
}

export default AppBrowser