import React from 'react'
import Index from '../../cli/ui/Index.mjs'
import { AppServer } from '../miolo-cli-react.mjs'

const renderer = (ctx, context) => {
  
  return (
    <AppServer url={ctx.url} context={context}>
      <Index/>
    </AppServer>
  )
}

export {renderer}


