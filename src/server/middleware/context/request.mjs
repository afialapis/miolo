import { performance } from 'perf_hooks'
import { cyan, green, yellow, red, magenta, cyan_light } from 'tinguir'

let REQUEST_COUNTER= {
  total: 0
}

/**
 * Middleware for feed and log the request
 */

function init_request_middleware(app) {
  
  async function request_middleware(ctx, next) {
    const logger = ctx.miolo.logger
    const ip = ctx.headers["x-real-ip"] || '127.0.0.1'
    const started = performance.now()

    // Patch for koa-better-body
    ctx.request.body = {...ctx.request.fields, ...ctx.request.files}

    // Keep request counters
    REQUEST_COUNTER.total+= 1
    REQUEST_COUNTER[ip] = (REQUEST_COUNTER[ip] || 0) + 1
    
    // Attach some info to request
    ctx.requestId= REQUEST_COUNTER.total
    ctx.request.ip = ip

    // Log something
    const sreq = `${magenta(ip)} ${cyan(ctx.request.method)} ${cyan(ctx.request.url)} [${cyan_light(REQUEST_COUNTER[ip])}/${cyan_light(ctx.requestId)}]`
    const sbody= ctx.request.body!=undefined ? JSON.stringify(ctx.request.body) : ''
    
    logger.info(`${sreq} - START`)
    logger.debug(`${sreq} - Body: ${sbody}`)

    await next()
    

    const user = ctx?.session?.user
    let uid_desc= ''
    if (user != undefined) {
      if (user?.id) {
        uid_desc= ` - uid ${user?.id}`
      } else if (user?.token) {
        uid_desc= ` - token ${user?.token}`
      }
    }

    const elapsed = parseFloat( (performance.now() - started) / 1000.0 ).toFixed(2)

    const tcolor= elapsed < 1.0
                  ? green
                  : elapsed < 2.0
                    ? yellow
                    : red 
    
    const ssession= ctx.session!=undefined ? JSON.stringify(ctx.session) : ''
    logger.debug(`${sreq} - Session: ${ssession}`)

    logger.info(`${sreq}${uid_desc} => ${tcolor(`DONE in ${elapsed} seconds`)}`)
  }

  app.use(request_middleware)
}

export {init_request_middleware}
