import fs from 'fs'
import { resolve } from 'path'
import { ssr_data_for_location } from '../ssr/loader'
//import { ssr_render_for_location } from '../ssr/renderer'

const indexHTMLPath=  resolve(__dirname, '../../cli/index.html')

const indexHTML = fs.readFileSync(indexHTMLPath, 'utf8')

async function render_middleware(ctx) {
  const loading = `
    <div style="width:100%; height:auto; vertical-align: middle; text-align: center">
      Loading...
    </div>
  `

  const isAuthed = ctx?.session?.authenticated === true
  const user = ctx?.session?.user

  const ssr_data = await ssr_data_for_location(ctx.url, user, isAuthed)
  
  const context= {
    user : user,
    authenticated: isAuthed,    
    ssr_data: ssr_data,
    extra: ctx?.extra
  }

  const html = indexHTML
    .replace('{context}', JSON.stringify(context, null, 2))  
    .replace('{children}', loading)

  ctx.body= html
}


export {render_middleware}