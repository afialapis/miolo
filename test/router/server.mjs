import Koa from 'koa'
import {initCalustraRouter} from '../../src/router/index.mjs'
import {server as config} from '../common/config/index.mjs'

const serve = (connection, routesConfig) => {

  const app = new Koa()

  app.context.connection= connection

  initCalustraRouter(app, connection, routesConfig)

  const server= app.listen(config.port, function () {
    //console.info('Listening on port ' + server_options.port)
    
  })
  return server
}



export {serve}