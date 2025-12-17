import React from 'react'
import { StaticRouter } from 'react-router-dom'
import { AppServer } from 'miolo-react'
import Index from '#cli/ui/Index.jsx'
import { renderToString } from 'react-dom/server'

export const render = (ctx, context) => 
  renderToString(
    <AppServer context={context}>
      <StaticRouter
        location={ctx.url}
      >  
        <Index/>
      </StaticRouter>  
    )
    </AppServer>
  )

