import React from 'react'
import Index from '../../cli/ui/Index.mjs'
import { AppServer } from '../miolo-cli-react.mjs'

const renderer = (ctx, context, config) => {
  
  return (
    <AppServer url={ctx.url} context={context} config={config}>
      <Index/>
    </AppServer>
  )
}

export {renderer}


