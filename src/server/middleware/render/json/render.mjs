
function init_json_render_middleware(app, render) {

  async function render_json_middleware(ctx) {
    ctx.miolo.logger.debug(`render_json_middleware() Failback for ${ctx.url} `)
    
    ctx.body= render?.json || {}

    ctx.miolo.logger.debug(`[render-html] Returned body is ${Buffer.byteLength(JSON.stringify(ctx.body), 'utf8')} bytes`)
  }
  
  app.use(render_json_middleware)
}

export {init_json_render_middleware}