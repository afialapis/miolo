import React from 'react'
import { renderToString } from 'react-dom/server'
import ErrMessage from './fallbacks/ErrMessage.mjs'
import {html as f_html} from './fallbacks/index.html.mjs'

function init_render_middleware(loader, renderer, options) {

  // parse options
  let html = f_html
  try {
    if (options?.html != undefined) {
      html= options.html
    }
  } catch(_) {}
  
  const def_loader = async (ctx) => {
    let res= {}
    try {
      res= await loader(ctx)
    } catch(e) {
      ctx.miolo.logger.error('Error produced by loader in the render middleware')
      ctx.miolo.logger.error(e)
    }
    return res  
  }

  async function render_middleware(ctx) {
    /*
      
    */
    const ssr_data = await def_loader(ctx)

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

    let ssr_html=''

    try {
      ssr_html= renderToString(
        renderer(ctx, context)
      )
    } catch(error) {
      ctx.miolo.logger.error('Missing renderer in the render middleware')
      ctx.miolo.logger.error(error)

      ssr_html= renderToString(
        <ErrMessage ctx={ctx} error={error}/>
      )
    }
    
    const parsed_html = html
      .replace('{context}', JSON.stringify(context, null, 2))  
      .replace('{children}', ssr_html)

    
    ctx.miolo.logger.debug(`render_middleware() rendered HTML (${Buffer.byteLength(ssr_html, 'utf8')} bytes of SSR content, ${Buffer.byteLength(parsed_html, 'utf8')} bytes total) `)

    ctx.body= parsed_html
  }

  return render_middleware
}

export {init_render_middleware}