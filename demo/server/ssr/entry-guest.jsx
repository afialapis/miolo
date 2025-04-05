import React from 'react'
import { renderToString } from 'react-dom/server'
import { AppServer } from '../../miolo-cli-react.mjs'
import IndexGuest from '../../cli/guest/ui/Index.mjs'

export const render = (ctx, context) => {
  const html = renderToString(
    <AppServer url={ctx.url} context={context}>
      <IndexGuest/>
    </AppServer>
  )
  return html
}
