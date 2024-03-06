import http                         from 'http'
//import util                       from 'util'
import { createHttpTerminator }     from 'http-terminator'


// promisify the server.listen()

// opt1
// let server = http.createServer(app.callback())
// const promise = util.promisify( server.listen.bind( server ) )
// await promise( config.port, config.hostname)

// opt2
const _listenAsync = (server, port, hostname) => {
  return new Promise((resolve, reject) => {
    server.listen(port, hostname, (error) => {
      if (error) {
        reject(error)
      } else {
        resolve()
      }
    })
  })
}



export function init_http_server(app, config) {
  const miolo = app.context.miolo
  const logger= miolo.logger

  const _http_start = async () => {
    try {
      // If previous server already created, lets avoid
      if (app.http?.server != undefined) {
        logger.warn(`[http] Server already running on ${app?.http?.hostname}:${app?.http?.port}`)
        return
      }

      // Init server
      const server = http.createServer(app.callback())

      // Init terminator
      const httpTerminator = createHttpTerminator({
        server,
      })

      const http_stop = async () => {
        try {
          await httpTerminator.terminate()
          logger.info(`[http] miolo has been shutdowned from ${config.hostname}:${config.port}`)
        } catch(error) {
          logger.error(`[http] stop() error: ${error}`)
        }
      }

      app.http.server = server
      app.http.stop = http_stop

      // Finally start the server
      await _listenAsync(server, config.port, config.hostname)
      logger.info(`[http] miolo is listening on ${config.hostname}:${config.port}`)
    } catch(error) {
      logger.error(`[http] start() error: ${error}`)
    }
  }  

  // Attach objects to app
  app.http = {
    server: undefined,
    start: _http_start,
    stop: async () => {
      logger.warn(`[http] stop() stop() function still not attached. Is server running?`)
    },
    hostname: config.hostname,
    port: config.port
  }  

  return app
}