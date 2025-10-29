import { blue, red, yellow } from 'tinguir'
import Router    from '@koa/router'

const ERRORS_AS_WARNINGS = [
  'Minified React error'
]

function init_route_catch_js_error(app, route) {
  
  async function catch_js_error(ctx) {
    let { error, warning, path, agent } = ctx.request.body
    const logger = ctx.miolo.logger

    if (error) {
      ERRORS_AS_WARNINGS.map(e => {
        if (error.msg.indexOf(e) >= 0) {
         warning = error 
        }
      })
    }

    if (warning) {
      const msg= 
      `${yellow('[JS Warning]')} on ${blue(path)}: ${JSON.stringify(warning.msg)}\n` +
      `${yellow('[JS Warning]')} File  => ${warning.file}\n` +
      `${yellow('[JS Warning]')} Line  => ${warning.line}\n` + 
      `${yellow('[JS Warning]')} Col   => ${warning.col}\n` + 
      `${yellow('[JS Warning]')} Error => ${JSON.stringify(warning.error)}\n` + 
      `${yellow('[JS Warning]')} Agent => ${agent}`
      logger.warn(msg)

    } else {
      const msg= 
      `${red('[JS Error]')} on ${blue(path)}: ${JSON.stringify(error.msg)}\n` +
      `${red('[JS Error]')} File  => ${error.file}\n` +
      `${red('[JS Error]')} Line  => ${error.line}\n` + 
      `${red('[JS Error]')} Col   => ${error.col}\n` + 
      `${red('[JS Error]')} Error => ${JSON.stringify(error.error)}\n` + 
      `${red('[JS Error]')} Agent => ${agent}`
      logger.error(msg)
    }

    ctx.body = {ok: true, data: 1}
  }

  const catch_js_error_router = new Router()
  catch_js_error_router.post(route, catch_js_error)
  
  app.use(catch_js_error_router.routes())

}

export {init_route_catch_js_error}