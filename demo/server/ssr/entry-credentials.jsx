import React from 'react'
import { renderToString } from 'react-dom/server'
import { AppServer } from '../../miolo-cli-react.mjs'
import IndexPassport from '../../cli/credentials/ui/Index.jsx'

export const render = (ctx, context) => {
  const html = renderToString(
    <AppServer url={ctx.url} context={context}>
      <IndexPassport/>
    </AppServer>
  )
  return html 
}
