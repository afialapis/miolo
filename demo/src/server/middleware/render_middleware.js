import React from 'react'
import fs from 'fs'
import { resolve } from 'path'
import main from '../config/main'
import { renderToString } from 'react-dom/server'
import { AppSsr } from '../../../../dist/server/miolo.server.cjs'
import { loader } from '../ssr/loader'
import { renderer } from '../ssr/renderer'

const indexHTMLPath=  resolve(__dirname, '../../cli/index.html')

const indexHTML = fs.readFileSync(indexHTMLPath, 'utf8')

async function render_middleware(ctx) {
  const bundleURL = `<script src="//localhost:${main.port}/build/bundle.js" async></script>` 
  
  const cssURL= '' //`<link href="//localhost:${main.port}/build/bundle.css" rel="stylesheet" media="all"></link>`
  
  const ssr_data = await loader(ctx)
  const ssr_comp = renderer(ctx)

  let isAuthed = false
  try {
    isAuthed = ctx?.isAuthenticated() === true
  } catch(e) {}
  try {
    if (! isAuthed) {
      isAuthed = (ctx.user.name==='guest') && (ctx.user.token != undefined)
    }
  } catch(e) {}    

  let user = undefined
  try {
    if (ctx.state.user != undefined) {
      user= ctx.state.user
    }
  } catch(_) {}

  try {
    if (ctx.user != undefined) {
      user= ctx.user
    }
  } catch(_) {}     

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
    .replace(/{bundleURL}/g, bundleURL)
    .replace('{children}', ssr_html)
    .replace('{styles}', cssURL)
    .replace('{bundle}', bundleURL)

  ctx.body= html

}


export {render_middleware}