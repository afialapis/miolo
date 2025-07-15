import koa_mount from 'koa-mount'
import koa_serve from 'koa-static'
import koa_favicon from 'koa-favicon'
import {existsSync} from 'fs'

const init_static_middleware = ( app, config ) => {
  const {favicon, folders} = config

  if (favicon && existsSync(favicon)) {
    app.context.miolo.logger.debug(`[static] Serving favicon from -${favicon}-`)
    app.use(koa_favicon(favicon))
  } else {
    app.context.miolo.logger.warn(`[static] Cannot serve favicon from -${favicon}- (does not exist)`)
  }
  
  for(const [froute, fpath] of Object.entries(folders)) {
    if (fpath && existsSync(fpath)) {
      app.context.miolo.logger.debug(`[static] Mounting static folder ${froute} => -${fpath}-`)
      app.use(koa_mount(froute, koa_serve(fpath, {index: false})))
    } else {
      app.context.miolo.logger.warn(`[static] Cannot mount static folder ${froute} => -${fpath}- (does not exist)`)

    }
  }
}

export {init_static_middleware}
