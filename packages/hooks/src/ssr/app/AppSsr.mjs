
import React from 'react'
import { StaticRouter } from 'react-router-dom/server'
import AppContext from './AppContext.mjs'

const AppSsr = ({url, context, children}) => {
  
  return (
    <StaticRouter location={url}>
      <AppContext context={context}>
        {children}
      </AppContext>
    </StaticRouter>
  )
}

export default AppSsr

