import fs from 'fs'
import { resolve } from 'path'
import main from '../../config/main'

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
  
  const context= {
    user : ctx?.state?.user,
    authenticated: isAuthed
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