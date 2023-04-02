import React from 'react'
import { renderToString } from 'react-dom/server'
import AppSsr from '../app/AppSsr.mjs'
import ErrMessage from './fallbacks/ErrMessage.mjs'
import {html as f_html} from './fallbacks/index.html.mjs'

function init_render_middleware(loader, renderer, options) {

  // parse options
  let html = f_html, port= 8000, use_css= true
  try {
    if (options?.html != undefined) {
      html= options.html
    }
  } catch(_) {}

  try {
    if (options?.port != undefined) {
      if (! isNaN(parseInt(options.port))) {
        port= parseInt(options.port)
      }
    }
  } catch(_) {}
  
  try {
    use_css= options?.css !== false
  } catch(_) {}

  const bundleURL = process.env.NODE_ENV === 'development' 
    ? `<script src="//localhost:${port}/build/bundle.js" async></script>` 
    : ''

  const cssURL= use_css
    ? process.env.NODE_ENV === 'development' 
      ? `<link href="//localhost:${port}/build/bundle.css" rel="stylesheet" media="all"></link>`
      : ''
    : ''
  
  const def_renderer = (ctx) => {
    try {
      return renderer(ctx)
    } catch(error) {
      ctx.miolo.logger.error('Missing renderer in the render middleware')
      return ErrMessage({ctx, error})
    }
  }

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
    //const ssr_comp = def_renderer(ctx)

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
        {() => def_renderer(ctx)}
      </AppSsr>
    )

    const parsed_html = html
      .replace('{context}', JSON.stringify(context, null, 2))  
      .replace(/{bundleURL}/g, bundleURL)
      .replace('{children}', ssr_html)
      .replace('{styles}', cssURL)
      .replace('{bundle}', bundleURL)

    ctx.body= parsed_html
  }

  return render_middleware
}

export {init_render_middleware}