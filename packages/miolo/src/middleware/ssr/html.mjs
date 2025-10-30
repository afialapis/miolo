import path from 'path'
import { readFileSync } from 'fs'
import { fallbackIndexHTML } from './fallbackIndex.mjs'
import { nanoid } from 'nanoid'

let _script_version = undefined
const get_script_version = () => {
  if (!_script_version) {
    _script_version = nanoid()
  }
  return _script_version
}

function _html_read(htmlFile) {
  
  if (!htmlFile) {
    return fallbackIndexHTML
  }
  try {
    const isProduction = process.env.NODE_ENV === 'production'
    const proot = (p) => path.join(process.cwd(), p)
    const indexHTMLPath=  proot(isProduction 
        ? `${process.env.MIOLO_BUILD_CLIENT_DEST}/index.html`
        : htmlFile) 

    const indexHTML = readFileSync(indexHTMLPath, 'utf8')
    return indexHTML
  } catch(error) {
    console.error(`[miolo] Error reading HTML file ${htmlFile}: ${error}`)
    return fallbackIndexHTML
  }
}

function _feed_html(htmlString, client, context, ssr_html) {
  const contextScript = `<script> window.__CONTEXT = ${JSON.stringify(context, null, 2)}</script>`
  const rootDiv = `<div id="root">${ssr_html}</div>`
  
  const webClient = client.startsWith('./') 
    ? client.replace('./', '/')
    : client.startsWith('/') 
    ? client
    : `/${client}`

  const linkTag =
    process.env.NODE_ENV === 'production'
      ? `  <script src="${webClient}?v=${get_script_version()}" async></script>`
      : `  <script type="module" src="${webClient}"></script>`
  
  // head
  const headCloseTagRegex = /(<\/head>)/i
  htmlString= htmlString.replace(headCloseTagRegex, `${contextScript}\n$&`)
  
  // body
  const bodyCloseTagRegex = /(<\/body>)/i
  htmlString= htmlString.replace(bodyCloseTagRegex, `${rootDiv}\n${linkTag}\n$&`)
  
  return htmlString
}


// HTML renderer
export const ssr_html_renderer_make = async (app, ssrConfig, htmlFile, client, devRender= undefined) => {
  const isProduction = process.env.NODE_ENV === 'production'

  // check HTML
  const tmplHtml = _html_read(htmlFile)

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
        if (ssrConfig?.server !== 'false') {
          render = (await import(ssrConfig.server)).render
        }
      } catch(error) {
        ctx.miolo.logger.error(`SSR Error for ${ssrConfig.server}:\n${error.toString()}\n${error.stack}`)
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
    
    const parsed_html = _feed_html(base_html, client, context, ssr_html)

    return parsed_html
  }
  
  return ssr_html_renderer
}