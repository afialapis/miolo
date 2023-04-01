import {miolo} from '../../../dist/server/miolo.server.cjs'
import config from './config/server'

// import { render_html } from './middleware/render_html'
// const html= render_html()
// const app = miolo(config, {html})

// import {render_middleware} from './middleware/render_middleware'
// const app= miolo(config, {middleware: render_middleware})

import init_render_middleware from './middleware/init_render_middleware'
const app= miolo(config, {middleware: init_render_middleware()})


export default app


