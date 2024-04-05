import Koa                                from 'koa'
import { init_config }                    from './config/index.mjs'

import { init_context_middleware }        from './middleware/context/index.mjs'
import { init_body_middleware }           from './middleware/http/body.mjs'
import { init_catcher_middleware }        from './middleware/http/catcher.mjs'
import { init_rate_limit_middleware }     from './middleware/http/ratelimit.mjs'
import { init_static_middleware }         from './middleware/static/index.mjs'
import { init_request_middleware }        from './middleware/http/request.mjs'
import { init_route_robots }              from './middleware/routes/robots/index.mjs'
import { init_route_catch_js_error}       from './middleware/routes/catch_js_error.mjs'

import {init_guest_auth_middleware}       from'./middleware/auth/guest.mjs'
import {init_basic_auth_middleware}       from'./middleware/auth/basic.mjs'
import {init_credentials_auth_middleware} from'./middleware/auth/credentials/index.mjs'
import {init_custom_auth_middleware}      from'./middleware/auth/custom.mjs'

import { init_extra_middlewares }         from './middleware/extra.mjs'
import { init_headers_middleware }        from './middleware/http/headers.mjs'
import { init_router }                    from './middleware/routes/router/index.mjs'

import { init_ssr_render_middleware}      from './middleware/render/ssr/render.mjs'
//import { init_404_render_middleware}    from './middleware/render/404/render.mjs'
//import { init_json_render_middleware}   from './middleware/render/json/render.mjs'

// import {init_socket}                   from './engines/socket/index.mjs'
import { init_cron }                      from './engines/cron/index.mjs'
import { init_http_server }               from './engines/http/index.mjs'

function miolo(sconfig, render) {

  const app = new Koa()

  // Init some pieces
  const config = init_config(sconfig)
  
  // attach to app some custom miolo methods
  init_context_middleware(app, config)

  // CORS and other headers
  init_headers_middleware(app, config.http)    

  // Compress and body parser
  init_body_middleware(app)

  // override koa's undocumented error handler
  init_catcher_middleware(app)

  // Rate Limits
  init_rate_limit_middleware(app, config.http?.ratelimit)

  // Serve static files
  init_static_middleware(app, config.http?.static)

  // Feed and log request
  init_request_middleware(app, config?.http?.request)

  // attach the default robots.txt
  init_route_robots(app)

  // Middleware for catching and logging JS errors
  if (config.use_catcher) {
    init_route_catch_js_error(app, config.http.catcher_url)
  }

  // auth middleware
  if (config.auth_type == 'guest') {
    init_guest_auth_middleware(app, config.auth.guest, config?.session)
  }  

  if (config.auth_type == 'basic') {
    init_basic_auth_middleware(app, config.auth.basic)
  }

  if (config.auth_type == 'credentials') {
    init_credentials_auth_middleware(app, config.auth.credentials, config?.session)
  }

  if (config.auth_type == 'custom') {
    init_custom_auth_middleware(app, config.auth.custom)
  }

  // Socket.io
  // const io= init_socket(logger)
  // io.attach(app)

  // extra middlewares
  const extra_middlewares= config?.middlewares
  if (extra_middlewares) {
    init_extra_middlewares(app, extra_middlewares)
  }

  // Routes to /crud
  if (config?.routes) {
    init_router(app, config.routes)
  }

  // Middleware for final render
  if (render?.middleware != undefined) {
    app.use(render.middleware)
  } else {
    init_ssr_render_middleware(app, render, config.http, config?.auth)
  }/* else {
    init_404_render_middleware(app, render)
    // init_json_render_middleware(app, render)  
  }*/

  // Init cron (will not start jobs yet)
  init_cron(app, config?.cron)
    
  // Init http server
  init_http_server(app, config?.http) 

  // Util callbacks
  app.start = async () => {
    // Init and reset db connection
    await app.context.miolo.db.init_connection()
    
    await app.http.start()
    app.cron.start()
  }
  
  app.stop = async () => {
    app.context.miolo.db.drop_connections()
    await app.http.stop()
    app.cron.stop()
  }

  app.restart = async () => {
    await app.stop()
    await app.start()
  }  

  return app
}

export {miolo}