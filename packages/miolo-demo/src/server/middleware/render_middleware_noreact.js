import fs from 'fs'
import { resolve } from 'path'
import main from '../../config/main'
import { ssr_data_for_location } from '../ssr/loader'
//import { ssr_render_for_location } from '../ssr/renderer'

const indexHTMLPath=  process.env.NODE_ENV === 'production'
  ? resolve(__dirname, '../../../build/index.html')  // the one created by HtmlWebpackPlugin
  : resolve(__dirname, '../../cli/index.html')

const indexHTML = fs.readFileSync(indexHTMLPath, 'utf8')

async function render_middleware(ctx) {
  const loading = `
    <div style="width:100%; height:auto; vertical-align: middle; text-align: center">
      Loading...
    </div>
  `
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



  const html = indexHTML
    .replace('{context}', JSON.stringify(context, null, 2))  
    .replace(/{bundleURL}/g, bundleURL)
    .replace('{children}', loading)
    .replace('{styles}', cssURL)
    .replace('{bundle}', bundleURL)

  ctx.body= html
}


export {render_middleware}