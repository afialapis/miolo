import React from 'react'
import { renderToString } from 'react-dom/server'
import AppSsr from '../app/AppSsr'
import ErrMessage from './fallbacks/ErrMessage'
import {html as f_html} from './fallbacks/index.html'

function init_render_middleware(html, port, loader, renderer) {

  const the_html = html || f_html

  const bundleURL = process.env.NODE_ENV === 'development' 
    ? `<script src="//localhost:${port}/build/bundle.js" async></script>` 
    : ''

  const cssURL= process.env.NODE_ENV === 'development' 
    ? `<link href="//localhost:${port}/build/bundle.css" rel="stylesheet" media="all"></link>`
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
      ctx.miolo.logger.error('Missing loader in the render middleware')
    }
    return res  
  }

  async function render_middleware(ctx) {
    /*
     ctx.url, ctx.state.user, ctx.isAuthenticated()
    */
    const ssr_data = await def_loader(ctx)
    const ssr_comp = def_renderer(ctx)

    const context= {
      user : ctx.state.user,
      authenticated: ctx.isAuthenticated(),
      ssr_data: ssr_data
    }

    const ssr_html= renderToString(
      <AppSsr url    = {ctx.url}
              context= {context}>
        {ssr_comp}
      </AppSsr>
    )

    const html = the_html
      .replace('{context}', JSON.stringify(context, null, 2))  
      .replace(/{bundleURL}/g, bundleURL)
      .replace('{children}', ssr_html)
      .replace('{styles}', cssURL)
      .replace('{bundle}', bundleURL)

    ctx.body= html
  }

  return render_middleware
}

export {init_render_middleware}