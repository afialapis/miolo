import React from 'react'
import fs from 'fs'
import { resolve } from 'path'
import { renderToString } from 'react-dom/server'
import { AppSsr } from '../miolo-server'
import { loader } from '../ssr/loader'
import { renderer } from '../ssr/renderer'

const indexHTMLPath=  resolve(__dirname, '../../cli/index.html')

const indexHTML = fs.readFileSync(indexHTMLPath, 'utf8')

async function render_middleware(ctx) {
  
  const ssr_data = await loader(ctx)
  const ssr_comp = renderer(ctx)

  const isAuthed = ctx?.session?.authenticated === true
  const user = ctx?.session?.user

  const context= {
    user : user,
    authenticated: isAuthed,
    ssr_data: ssr_data,
    extra: ctx?.extra
  }

  const ssr_html= renderToString(
    <AppSsr url    = {ctx.url}
            context= {context}>
      {ssr_comp}
    </AppSsr>
  )

  const html = indexHTML
    .replace('{context}', JSON.stringify(context, null, 2))  
    .replace('{children}', ssr_html)

  ctx.body= html

}


export {render_middleware}