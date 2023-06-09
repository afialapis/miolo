import fs from 'fs'
import { resolve } from 'path'
// import main from '../config/main'
import { init_ssr_render_middleware } from "../miolo-server.mjs"
import { loader } from '../ssr/loader.mjs'
import { renderer } from '../ssr/renderer.mjs'

const indexHTMLPath=  resolve(__dirname, '../../cli/index.html')

const indexHTML = fs.readFileSync(indexHTMLPath, 'utf8')

function init_it() {
  const options= {
    html: indexHTML
  }

  const mid= init_ssr_render_middleware(loader, renderer, options)

  return mid

}

export default init_it