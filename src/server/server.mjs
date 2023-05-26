import Koa from 'koa'
import gracefulShutdown             from 'http-graceful-shutdown'
import { init_config }              from './config/index.mjs'

import { init_context_middleware }  from './middleware/context/context.mjs'
import { init_body_middleware }     from './middleware/context/body.mjs'
import { init_catcher_middleware }  from './middleware/context/catcher.mjs'
import { init_static_middleware }   from './middleware/static/index.mjs'
import { init_request_middleware }  from './middleware/context/request.mjs'
import { init_session_middleware }  from './middleware/session/index.mjs'
import { init_route_robots }        from './middleware/routes/robots/index.mjs'
import { init_route_catch_js_error} from './middleware/routes/catch_js_error.mjs'
import { init_router }              from './middleware/routes/router/index.mjs'
import { init_extra_middlewares }   from './middleware/extra.mjs'
import { init_headers_middleware }  from './middleware/context/headers.mjs'

// import {init_socket}             from './engines/socket/index.mjs'
import { init_cron }                from './engines/cron/index.mjs'


async function miolo(sconfig, render, callback) {

  const app = new Koa()

  // Init some pieces
  const config = init_config(sconfig)
  
  // attach to app some custom miolo methods
  init_context_middleware(app, config)

  // Compress and body parser
  init_body_middleware(app)

  // override koa's undocumented error handler
  init_catcher_middleware(app)

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
    init_guest_auth_middleware(app, config.auth.guest, config?.session)
  }  

  if (config?.auth?.basic) {
    const {init_basic_auth_middleware} = await import('./middleware/auth/basic.mjs')
    init_basic_auth_middleware(app, config.auth.basic)
  }

  if (config?.auth?.passport) {
    const {init_passport_auth_middleware} = await import('./middleware/auth/passport.mjs')
    init_passport_auth_middleware(app, config.auth.passport)
  }

  // Socket.io
  // const io= init_socket(logger)
  // io.attach(app)

  // extra middlewares
  const extra_middlewares= config?.middlewares
  if (extra_middlewares) {
    init_extra_middlewares(app, extra_middlewares)
  }

  // CORS and other headers
  init_headers_middleware(app, config.http)    

  // Routes to /crud
  if (config?.routes) {
    const conn= app.context.miolo.db.getConnection()
    init_router(app, conn, config.routes)
  }

  // Middleware for final render
  if (render?.html!=undefined) {
    const { init_route_html_render} = await import('./middleware/render/html/render.mjs')
    init_route_html_render(app, render.html)
  } else if (render?.middleware != undefined) {
    app.use(render.middleware)
  } else {
    // const { init_404_render_middleware} = await import('./middleware/render/404/render.mjs')
    // init_404_render_middleware(app, render)

    const { init_json_render_middleware} = await import('./middleware/render/json/render.mjs')
    init_json_render_middleware(app, render)    
  }


  const server= app.listen(config.http.port, config.http.hostname, function () {
    app.context.miolo.logger.info(`miolo is listening on ${config.http.hostname}:${config.http.port}`)
    init_cron(app.context.miolo.logger)

    if (callback!=undefined) {
      callback(app)
    }
  })
  
  app.server = server
  
  app.stop_server = () => {
    gracefulShutdown(server)
    delete app.server
  }


  return app
    
}

export {miolo}