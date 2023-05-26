import fs from 'fs'
import { resolve } from 'path'

const indexHTMLPath=  resolve(__dirname, '../../cli/index.html')

const indexHTML = fs.readFileSync(indexHTMLPath, 'utf8')

function render_html() {
  const loading = `
    <div style="width:100%; height:auto; vertical-align: middle; text-align: center">
      Loading...
    </div>
  `

  const context= {}

  const html = indexHTML
    .replace('{context}', JSON.stringify(context, null, 2))  
    .replace('{children}', loading)

  return html
}


export {render_html}