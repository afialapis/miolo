import React from 'react'
import Index from '../../cli/ui/Index'
import { AppServer } from '../../../../dist/cli-react/miolo.cli-react.umd.js'

const renderer = (ctx, context) => {
  
  return (
    <AppServer url={ctx.url} context={context}>
      <Index/>
    </AppServer>
  )
}

export {renderer}


