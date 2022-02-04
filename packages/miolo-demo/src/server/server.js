import {miolo} from 'miolo'
import config from './config/server'
// import { render_html } from './middleware/render_html'
// const html= render_html()
// miolo(config, {html})

import {render_middleware} from './middleware/render_middleware'
miolo(config, {middleware: render_middleware})
