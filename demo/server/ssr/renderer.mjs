import React from 'react'
import { AppServer } from '../../miolo-cli-react.mjs'
import IndexGuest from '../../cli/guest/ui/Index.jsx'
import IndexBasic from '../../cli/basic/ui/Index.jsx'
import IndexPassport from '../../cli/credentials/ui/Index.jsx'

const rendererGuest = (ctx, context) => {
  return (
    <AppServer url={ctx.url} context={context}>
      <IndexGuest/>
    </AppServer>
  )
}

const rendererBasic = (ctx, context) => {
  return (
    <AppServer url={ctx.url} context={context}>
      <IndexBasic/>
    </AppServer>
  )
}

const rendererPassport = (ctx, context) => {
  return (
    <AppServer url={ctx.url} context={context}>
      <IndexPassport/>
    </AppServer>
  )
}

export { 
  rendererGuest,
  rendererBasic,
  rendererPassport
}


