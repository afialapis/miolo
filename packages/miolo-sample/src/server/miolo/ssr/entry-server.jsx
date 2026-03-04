import { AppServer } from "miolo-react"
import React from "react"
import { renderToString } from "react-dom/server"
import { StaticRouter } from "react-router"
import App from "../../../cli/App.jsx"

export const render = (ctx, context) =>
  renderToString(
    <AppServer context={context}>
      <StaticRouter location={ctx.url}>
        <App />
      </StaticRouter>
    </AppServer>
  )
