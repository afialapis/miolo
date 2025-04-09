import React from 'react'
import MioloContextProvider from './context/MioloContextProvider.mjs'

const AppServer = ({ context, children }) => {

  console.log('AppServerAppServerAppServerAppServerAppServerAppServer')
  console.log(context)
  
  return React.createElement(
    MioloContextProvider,
    { context: context || {} },
    children
  )
}

export default AppServer