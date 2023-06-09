import { renderToString } from 'react-dom/server'
import {html as f_html} from './fallbacks/index.html.mjs'

function init_ssr_render_middleware(loader, renderer, options) {

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

  async function render_ssr_middleware(ctx) {
    /*
      
    */
    const ssr_data = await def_loader(ctx)

    const isAuthed = ctx?.session?.authenticated === true
    const user = ctx?.session?.user
    
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

      ssr_html= `
      <div>
        MIOLO: Missing SSR renderer: ${error.toString()}
      </div>      
      `
    }
    
    const parsed_html = html
      .replace('{context}', JSON.stringify(context, null, 2))  
      .replace('{children}', ssr_html)

    
    ctx.miolo.logger.debug(`render_middleware() rendered HTML (${Buffer.byteLength(ssr_html, 'utf8')} bytes of SSR content, ${Buffer.byteLength(parsed_html, 'utf8')} bytes total) `)

    ctx.body= parsed_html
  }

  return render_ssr_middleware
}

export {init_ssr_render_middleware}