import http                         from 'http'
//import util                       from 'util'
import Koa                          from 'koa'
import { createHttpTerminator }     from 'http-terminator'
import { init_config }              from './config/index.mjs'

import { init_context_middleware }  from './middleware/context/context.mjs'
import { init_body_middleware }     from './middleware/context/body.mjs'
import { init_catcher_middleware }  from './middleware/context/catcher.mjs'
import { init_static_middleware }   from './middleware/static/index.mjs'
import { init_request_middleware }  from './middleware/context/request.mjs'
import { init_route_robots }        from './middleware/routes/robots/index.mjs'
import { init_route_catch_js_error} from './middleware/routes/catch_js_error.mjs'

import {init_guest_auth_middleware} from'./middleware/auth/guest.mjs'
import {init_basic_auth_middleware} from'./middleware/auth/basic.mjs'
import {init_credentials_auth_middleware} from'./middleware/auth/credentials/index.mjs'
import {init_custom_auth_middleware} from'./middleware/auth/custom.mjs'

import { init_extra_middlewares }   from './middleware/extra.mjs'
import { init_headers_middleware }  from './middleware/context/headers.mjs'
import { init_router }              from './middleware/routes/router/index.mjs'

import { init_ssr_render_middleware}  from './middleware/render/ssr/render.mjs'
//import { init_404_render_middleware}  from './middleware/render/404/render.mjs'
//import { init_json_render_middleware} from './middleware/render/json/render.mjs'

// import {init_socket}             from './engines/socket/index.mjs'
import { init_cron }                from './engines/cron/index.mjs'


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

  // Serve static files
  init_static_middleware(app, config.http?.static)

  // Feed and log request
  init_request_middleware(app, config?.log?.request)

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
    const conn= app.context.miolo.db.getConnection()
    init_router(app, conn, config.routes)
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

  const _run = async () => {


    // promisify the server.listen()

    // opt1
    // let server = http.createServer(app.callback())
    // const promise = util.promisify( server.listen.bind( server ) )
    // await promise( config.http.port, config.http.hostname)
    
    // opt2
    const listenAsync = (server, port, hostname) => {
      return new Promise((resolve, reject) => {
        server.listen(port, hostname, (error) => {
          if (error) {
            reject(error);
          } else {
            resolve();
          }
        });
      });
    };
    const server = http.createServer(app.callback());
    await listenAsync(server, config.http.port, config.http.hostname);

    app.context.miolo.logger.info(`miolo is listening on ${config.http.hostname}:${config.http.port}`)

    // Make server accessible from app object
    app.server = server
    
    const httpTerminator = createHttpTerminator({
      server,
    })

    app.stop_server = async () => {
      await httpTerminator.terminate()
      app.context.miolo.logger.info(`miolo has been shutdowned from ${config.http.hostname}:${config.http.port}`)
    }

    // // Although async, lets support callbacks too
    // if (callback!=undefined) {
    //   callback(app)
    // }
    
    //  const server= app.listen(config.http.port, config.http.hostname, function () {
    //    app.context.miolo.logger.info(`miolo is listening on ${config.http.hostname}:${config.http.port}`)
    //    init_cron(app.context.miolo.logger)
    //
    //    if (callback!=undefined) {
    //      callback(app)
    //    }
    //  })
    
    // Init cron when everything is set up
    init_cron(app, config?.cron)

    return app
  }

  app.run= _run

  return app
}

export {miolo}