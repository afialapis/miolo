
import Router from '@koa/router'

function init_404_render_middleware(app, options) {

  async function render_404_middleware(ctx) {
    ctx.miolo.logger.debug(`render_404_middleware() Not FOUND ${ctx.url} `)
    
    ctx.body= {}
    
    // This will show error logs on the catcher middleware
    //return ctx.throw(
    //  404,
    //  'Resource Not Found',
    //)

    ctx.response.status= 404
    ctx.response.body = 'Resource Not Found'
  }

  const json_render_router = new Router()
  json_render_router.get('/', render_404_middleware)
  
  app.use(json_render_router.routes())
}

export {init_404_render_middleware}