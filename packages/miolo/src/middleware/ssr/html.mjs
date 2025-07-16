import { fallbackIndexHTML } from './fallbackIndex.mjs'



function _add_client_script_to_body(htmlString, client) {
  const linkTag =
    process.env.NODE_ENV === 'production'
      ? `  <script src="${client}" async></script>`
      : `  <script type="module" src="${client}"></script>`
  
  // Expresión regular para encontrar la etiqueta </body> de cierre.
  // Usamos un grupo de captura para mantener el contenido antes de </body>.
  const bodyCloseTagRegex = /(<\/body>)/i;

  // Busca la etiqueta </body> en el HTML.
  const match = htmlString.match(bodyCloseTagRegex);

  if (match) {
    // Si se encuentra </body>, inserta la etiqueta <link> justo antes de ella.
    return htmlString.replace(bodyCloseTagRegex, `${linkTag}\n$&`);
  } else {
    // Si no se encuentra </body>, devuelve el HTML original sin modificar.
    console.warn(`[miolo] No se encontró la etiqueta <body> en el HTML proporcionado.`);
    return htmlString;
  }
}


// HTML renderer
export const ssr_html_renderer_make = async (app, ssrConfig, client, devRender= undefined) => {
  const isProduction = process.env.NODE_ENV === 'production'

  // check HTML
  let tmplHtml = ssrConfig?.html || fallbackIndexHTML
  for (const vrb of ['{context}', '{children}']) {
    if (tmplHtml.indexOf(vrb) < 0) {
      app.context.miolo.logger.error(`[ssr] Provided HTML for rendering has no ${vrb} template variable`)
    }
  }

  const ssr_html_renderer = async (ctx, context) => {
    let base_html= tmplHtml
    
    // prepare render() function for server entry

    // fallback function
    let render = (ctx, context) => ''
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
        ctx.miolo.logger.error(`SSR Error:\n${error.toString()}\n${error.stack}`)
      }
    }

    // render the result
    let ssr_html= ''
    try {
      ssr_html = render(ctx, context)
    } catch(error) {
      ctx.miolo.logger.error(`SSR Error rendering server entry:\n${error.toString()}\n${error.stack}`)
    
      ssr_html= `
      <div>
        MIOLO: SSR Error: ${error.stack}
      </div>      
      `
    }
    
    let parsed_html = base_html
      .replace('{context}', JSON.stringify(context, null, 2))  
      .replace('{children}', ssr_html)
    
    parsed_html = _add_client_script_to_body(parsed_html, client)

    return parsed_html
  }
  
  return ssr_html_renderer
}