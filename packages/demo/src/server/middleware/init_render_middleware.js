import fs from 'fs'
import { resolve } from 'path'
import main from '../../config/main'
import { init_render_middleware } from "miolo-cli-tools"
import { loader } from '../ssr/loader'
import { renderer } from '../ssr/renderer'

const indexHTMLPath=  process.env.NODE_ENV === 'production'
  ? resolve(__dirname, '../../../build/index.html')  // the one created by HtmlWebpackPlugin
  : resolve(__dirname, '../../cli/index.html')

const indexHTML = fs.readFileSync(indexHTMLPath, 'utf8')

function init_it() {
  const mid= init_render_middleware(indexHTML, main.dev_port, loader, renderer)
  return mid

}

export default init_it