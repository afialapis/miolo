import Koa from 'koa'
import { init_config } from '../config'
import { init_emailer } from '../emailer/index.mjs'
import { init_logger } from '../logger/index.mjs'
import { init_cron } from './engines/cron'
// import {init_socket} from './engines/socket'

import { useCalustraDbContext, useCalustraRouter } from 'calustra-router'

import { init_body_middleware } from './middleware/body'
import { init_catcher_middleware } from './middleware/catcher'
import { init_static_middleware } from './middleware/static'
import { init_extra_middlewares } from './middleware/extra'

import { init_request_middleware } from './middleware/request'
import { init_session_middleware } from './middleware/session'
import { init_route_robots } from './routes/robots'
import { init_route_catch_js_error} from './routes/catch_js_error'

import { init_route_html_render} from './routes/html_render'

async function miolo(sconfig, render, callback) {

  
  // Init some pieces
  const config = init_config(sconfig)
  const emailer = init_emailer(config.mail.options, config.mail.defaults)
  const logger = init_logger(config.log, emailer)

  config.db.connection.options.log= logger
  
  const app = new Koa()


  // attach to app calustra's db methods
  useCalustraDbContext(app, config.db)

  // attach to app some custom miolo methods
  app.context.miolo = {
    config: {...config},
    emailer,
    logger,
    db: app.context.db
  } 

  // Compress and body parser
  init_body_middleware(app)

  // override koa's undocumented error handler
  init_catcher_middleware(app, logger)

  // Serve static files
  init_static_middleware(app, config.http?.static)

  // Feed and log request
  init_request_middleware(app)

  // Create context/session
  init_session_middleware(app, config?.session)

  // attach the default robots.txt
  init_route_robots(app)

  // Middleware for catching and logging JS errors
  const catcher_url= config?.catcher
  if (catcher_url) {
    init_route_catch_js_error(app, catcher_url)
  }

  // auth middleware
  if (config?.auth?.guest) {
    const {init_guest_auth_middleware} = await import('./middleware/auth/guest.mjs')
    init_guest_auth_middleware(app, config.auth.guest, config?.session, logger)
  }  

  if (config?.auth?.basic) {
    const {init_basic_auth_middleware} = await import('./middleware/auth/basic.mjs')
    init_basic_auth_middleware(app, config.auth.basic)
  }

  if (config?.auth?.passport) {
    const {init_passport_auth_middleware} = await import('./middleware/auth/passport.mjs')
    init_passport_auth_middleware(app, config.auth.passport)
  }

  // Routes to /crud
  if (config?.routes) {
    useCalustraRouter(app, config.db, config.routes)

  }
  // Socket.io
  // const io= init_socket(logger)
  // io.attach(app)

  // extra middlewares
  const extra_middlewares= config?.middlewares
  if (extra_middlewares) {
    init_extra_middlewares(app, extra_middlewares)
  }

  // Middleware for html render
  if (render==undefined || render.html!=undefined) {
    init_route_html_render(app, render?.html)
  } else if (render.middleware != undefined) {
    app.use(render.middleware)
  }

  app.listen(config.http.port, config.http.hostname, function () {
    logger.info(`miolo is listening on ${config.http.hostname}:${config.http.port}`)
    init_cron(logger)

    if (callback!=undefined) {
      callback()
    }
  })


  return app
    
}

export {miolo}