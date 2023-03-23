import React from 'react'
import fs from 'fs'
import { resolve } from 'path'
import main from '../config/main'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import { ssr_data_for_location } from '../ssr/loader'
import { ssr_render_for_location } from '../ssr/renderer'

const indexHTMLPath=  resolve(__dirname, '../../cli/index.html')

const indexHTML = fs.readFileSync(indexHTMLPath, 'utf8')

async function render_middleware(ctx) {
  const bundleURL = `<script src="//localhost:${main.port}/build/bundle.js" async></script>` 
  
  const cssURL= '' //`<link href="//localhost:${main.port}/build/bundle.css" rel="stylesheet" media="all"></link>`
  
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

  const ssr_data = await ssr_data_for_location(ctx.url, user, isAuthed)

  const context= {
    user : user,
    authenticated: isAuthed,
    ssr_data: ssr_data,
    extra: ctx?.extra
  }

  const ssr_comp = ssr_render_for_location(ctx.url, context)

  const ssr_html= renderToString(
    <StaticRouter location={ctx.url}>
      {ssr_comp}
    </StaticRouter> 
  )

  const win_context = {
    ...context,
    ssr_data: ssr_data
  }

  const html = indexHTML
    .replace('{context}', JSON.stringify(win_context, null, 2))  
    .replace(/{bundleURL}/g, bundleURL)
    .replace('{children}', ssr_html)
    .replace('{styles}', cssURL)
    .replace('{bundle}', bundleURL)
  
  ctx.ssr_data= ssr_data
  ctx.body= html
}


export {render_middleware}