import {readFileSync} from 'fs'
import {dirname, resolve} from 'path'
import { fileURLToPath } from 'url'

import demo_server from '../../../../commons/server/server.mjs'
import { loader } from './ssr/loader.mjs'
import { renderer } from './ssr/renderer.mjs'

const __my_filename = fileURLToPath(import.meta.url)
const __my_dirname = dirname(__my_filename)

const BUILD_DIR = resolve(__my_dirname, '../../build')

// import { render_html } from './middleware/render_html.mjs'
// const html= render_html()
// const app = miolo(config, {html})

// import {render_middleware} from './middleware/render_middleware.mjs'
// const app= miolo(config, {middleware: render_middleware})

//import init_ssr_render_middleware from './middleware/init_ssr_render_middleware.mjs'



const indexHTMLPath=  resolve(__my_dirname, '../cli/index.html')
const indexHTML = readFileSync(indexHTMLPath, 'utf8')
const render= {
  html: indexHTML,
  ssr: {
    loader,
    renderer
  }
}

const app= demo_server(BUILD_DIR, 'guest', 'postgres',
  undefined,
  //{middleware: init_ssr_render_middleware()}, 
  render,
  async (app) => {
  }
)

export default app


