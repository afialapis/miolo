
import Router from '@koa/router'

function init_json_render_middleware(app, options) {

  async function render_json_middleware(ctx) {
    ctx.miolo.logger.debug(`render_json_middleware() Failback for ${ctx.url} `)
    
    ctx.body= {}
  }

  const json_render_router = new Router()
  json_render_router.get('/', render_json_middleware)
  
  app.use(json_render_router.routes())
}

export {init_json_render_middleware}