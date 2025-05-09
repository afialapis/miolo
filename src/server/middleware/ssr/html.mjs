import { fallbackIndexHTML } from './fallbackIndex.mjs'

// HTML renderer
export const ssr_html_renderer_make = async (app, ssrConfig, devRender= undefined) => {
  const isProduction = process.env.NODE_ENV === 'production'

  // check HTML
  let tmplHtml = ssrConfig?.html || fallbackIndexHTML
  for (const vrb of ['{context}', '{children}', '{client}']) {
    if (tmplHtml.indexOf(vrb) < 0) {
      app.context.miolo.logger.error(`[ssr] Provided HTML for rendering has no ${vrb} template variable`)
    }
  }

  const ssr_html_renderer = async (ctx, context) => {
    let base_html= tmplHtml
    
    // prepare render() function for server entry

    // fallback function
    let render = async(ctx, context) => base_html
    // if vite and DEV
    if ((!isProduction) && (app?.vite)) {
      if (devRender) {
        const [dev_html, dev_render] = await devRender(app, ctx, base_html, ssrConfig)
        if (dev_render) {
          base_html= dev_html
          render= dev_render
        }
      }
    // if non-vite or prod
    } else {
      try {
        render = (await import(ssrConfig.server)).render
      } catch(error) {
        ctx.miolo.logger.error(`SSR Error:\n${error.toString()}`)
        ctx.miolo.logger.error(error.stack)
      }
    }

    // render the result
    let ssr_html= ''
    try {
      ssr_html = render(ctx, context)
    } catch(error) {
      ctx.miolo.logger.error(`SSR Error rendering server entry:\n${error.toString()}`)
    
      ssr_html= `
      <div>
        MIOLO: SSR Error: ${error.toString()}
      </div>      
      `
    }
    
    const parsed_html = base_html
      .replace('{context}', JSON.stringify(context, null, 2))  
      .replace('{children}', ssr_html)
      .replace('{client}', ssrConfig?.client || './src/cli/index.mjs')

    return parsed_html
  }
  
  return ssr_html_renderer
}