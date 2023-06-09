
import React from 'react'
import { StaticRouter } from 'react-router-dom/server.js'
import AppContext from './context/AppContext.mjs'


const AppServer = ({url, context, config, children}) => {
  
  return (
    <StaticRouter location={url}>
      <AppContext 
          context= {context || {}}
          config = {config}>
        {children}
      </AppContext>
    </StaticRouter>
  )
}

export default AppServer

