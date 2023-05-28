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

  const html = indexHTML
    .replace('{context}', JSON.stringify(context, null, 2))  
    .replace('{children}', loading)

  ctx.body= html
}


export {render_middleware}