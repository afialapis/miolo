import { BLUE, RED } from 'farrapa-colors'
import Router    from '@koa/router'

function init_route_catch_js_error(app, route, logger) {
  async function catch_js_error(ctx) {
    const { error, path, agent } = ctx.request.body

    const msg= 
      `${RED('[JS Error]')} on ${BLUE(path)}: ${error.msg}` +
      `${RED('[JS Error]')} File  => ${error.file}` +
      `${RED('[JS Error]')} Line  => ${error.line}` + 
      `${RED('[JS Error]')} Col   => ${error.col}` + 
      `${RED('[JS Error]')} Error => ${JSON.stringify(error.error)}` + 
      `${RED('[JS Error]')} Agent => ${agent}`

    logger.error(msg)

    ctx.body = {result: 1}
  }

  const catch_js_error_router = new Router()
  catch_js_error_router.post(route, catch_js_error)
  
  app.use(catch_js_error_router.routes())

}

export {init_route_catch_js_error}