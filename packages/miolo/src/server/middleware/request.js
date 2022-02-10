import { performance } from 'perf_hooks'
import { cyan, green, yellow, red } from 'farrapa-colors'

let REQUEST_COUNTER= 1

/**
 * Middleware for feed and log the request
 */

function init_request_middleware(app) {
  
  async function request_middleware(ctx, next) {

    const logger = ctx.miolo.logger

    REQUEST_COUNTER+= 1
    ctx.requestId= REQUEST_COUNTER    

    // Patch for koa-better-body
    ctx.request.body = {...ctx.request.fields, ...ctx.request.files}

    const started = performance.now()
    const ip = ctx.headers["x-real-ip"] || '127.0.0.1'

    ctx.request.ip = ip
    
    logger.info(`req begin ${ctx.requestId} - ip ${ip} - ${cyan(ctx.request.method)} ${cyan(ctx.request.url)} ${ctx.request.body!=undefined ? JSON.stringify(ctx.request.body) : ''}`)

    await next()
    
    
    const user = ctx?.state?.user || {}

    const elapsed = parseFloat( (performance.now() - started) / 1000.0 ).toFixed(2)

    const tcolor= elapsed < 1.0
                  ? green
                  : elapsed < 2.0
                    ? yellow
                    : red

    logger.info(`req end ${ctx.requestId} ${user ? ` - uid ${user.id}` : ''} => ${tcolor(`DONE in ${elapsed} seconds`)}`)
  }

  app.use(request_middleware)
}

export {init_request_middleware}
