import path from 'path'
import { fileURLToPath } from 'url'
import demo_server from '../../../commons/server/server.mjs'

const __my_filename = fileURLToPath(import.meta.url)
const __my_dirname = path.dirname(__my_filename)

const BUILD_DIR = path.resolve(__my_dirname, '../../build')

// import { render_html } from './middleware/render_html.mjs'
// const html= render_html()
// const app = miolo(config, {html})

// import {render_middleware} from './middleware/render_middleware.mjs'
// const app= miolo(config, {middleware: render_middleware})

import init_ssr_render_middleware from './middleware/init_ssr_render_middleware.mjs'

const app= demo_server(BUILD_DIR, 'passport', 'postgres',
  undefined,
  {middleware: init_ssr_render_middleware()}, 

  async (app) => {
  }
)

export default app


