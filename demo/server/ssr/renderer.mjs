import React from 'react'
import { AppServer } from '../../miolo-cli-react.mjs'
import IndexGuest from '../../cli/guest/ui/Index.mjs'
import IndexBasic from '../../cli/basic/ui/Index.mjs'
import IndexPassport from '../../cli/passport/ui/Index.mjs'

const rendererGuest = (ctx, context, config) => {
  return (
    <AppServer url={ctx.url} context={context} config={config}>
      <IndexGuest/>
    </AppServer>
  )
}

const rendererBasic = (ctx, context, config) => {
  return (
    <AppServer url={ctx.url} context={context} config={config}>
      <IndexBasic/>
    </AppServer>
  )
}

const rendererPassport = (ctx, context, config) => {
  return (
    <AppServer url={ctx.url} context={context} config={config}>
      <IndexPassport/>
    </AppServer>
  )
}

export { 
  rendererGuest,
  rendererBasic,
  rendererPassport
}


