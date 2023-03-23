import fs from 'fs'
import { resolve } from 'path'
import main from '../../config/main'

const indexHTMLPath=  resolve(__dirname, '../../cli/index.html')

const indexHTML = fs.readFileSync(indexHTMLPath, 'utf8')

function render_html() {
  const loading = `
    <div style="width:100%; height:auto; vertical-align: middle; text-align: center">
      Loading...
    </div>
  `
  const bundleURL = `<script src="//localhost:${main.dev_port}/build/bundle.js" async></script>` 
  
  const cssURL= `<link href="//localhost:${main.dev_port}/build/bundle.css" rel="stylesheet" media="all"></link>`

  const context= {}

  const html = indexHTML
    .replace('{context}', JSON.stringify(context, null, 2))  
    .replace(/{bundleURL}/g, bundleURL)
    .replace('{children}', loading)
    .replace('{styles}', cssURL)
    .replace('{bundle}', bundleURL)

  return html
}


export {render_html}