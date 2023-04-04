import koa_mount from 'koa-mount'
import koa_serve from 'koa-static'
import koa_favicon from 'koa-favicon'
import path from 'path'
import { fileURLToPath } from 'url'
const __my_filename = fileURLToPath(import.meta.url)
const __my_dirname = path.dirname(__my_filename)

const fallback_favicon_path = path.resolve(__my_dirname, './miolo.ico')

const init_static_middleware = ( app, config ) => {

  const {favicon, folders} = config
 
  app.use(koa_favicon(favicon || fallback_favicon_path))
  
  for(const [k, v] of Object.entries(folders)) {
    app.use(koa_mount(k, koa_serve(v, {index: false})))
  }
}

export {init_static_middleware}