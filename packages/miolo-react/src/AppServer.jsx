
import React from 'react'
import MioloContextProvider from './context/MioloContextProvider.jsx'


const AppServer = ({context, children}) => {

  return (
    <MioloContextProvider 
        context= {context || {}}>
      {children}
    </MioloContextProvider>
  )
}

export default AppServer

