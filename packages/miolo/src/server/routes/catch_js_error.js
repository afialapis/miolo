import { blue, red } from 'farrapa-colors'
import Router    from '@koa/router'

function init_route_catch_js_error(app, route) {
  
  async function catch_js_error(ctx) {
    const { error, path, agent } = ctx.request.body
    const logger = ctx.miolo.logger

    const msg= 
      `${red('[JS Error]')} on ${blue(path)}: ${error.msg}` +
      `${red('[JS Error]')} File  => ${error.file}` +
      `${red('[JS Error]')} Line  => ${error.line}` + 
      `${red('[JS Error]')} Col   => ${error.col}` + 
      `${red('[JS Error]')} Error => ${JSON.stringify(error.error)}` + 
      `${red('[JS Error]')} Agent => ${agent}`

    logger.error(msg)

    ctx.body = {result: 1}
  }

  const catch_js_error_router = new Router()
  catch_js_error_router.post(route, catch_js_error)
  
  app.use(catch_js_error_router.routes())

}

export {init_route_catch_js_error}