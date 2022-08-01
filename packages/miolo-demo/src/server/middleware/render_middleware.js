import React from 'react'
import fs from 'fs'
import { resolve } from 'path'
import main from '../../config/main'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import { ssr_data_for_location } from '../ssr/loader'
import { ssr_render_for_location } from '../ssr/renderer'

const indexHTMLPath=  process.env.NODE_ENV === 'production'
  ? resolve(__dirname, '../../../build/index.html')  // the one created by HtmlWebpackPlugin
  : resolve(__dirname, '../../cli/index.html')

const indexHTML = fs.readFileSync(indexHTMLPath, 'utf8')

async function render_middleware(ctx) {
  const bundleURL = process.env.NODE_ENV === 'development' 
    ? `<script src="//localhost:${main.dev_port}/build/bundle.js" async></script>` 
    : ''
  
    const cssURL= process.env.NODE_ENV === 'development' 
    ? `<link href="//localhost:${main.dev_port}/build/bundle.css" rel="stylesheet" media="all"></link>`
    : ''
  
  let isAuthed = false
  try {
    isAuthed = ctx?.isAuthenticated() === true
  } catch(e) {}
  
  const ssr_data = await ssr_data_for_location(ctx.url, ctx.state.user, isAuthed)

  const context= {
    user : ctx?.state?.user,
    authenticated: isAuthed,
    ssr_data: ssr_data
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

  ctx.body= html
}


export {render_middleware}