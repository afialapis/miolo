import { performance } from 'perf_hooks'
import { cyan, green, yellow, red, magenta, cyan_light } from 'tinguir'
import { geoip_localize_ip } from '../../engines/geoip/index.mjs'

let REQUEST_COUNTER= {
  total: 0
}

/**
 * Middleware for feed and log the request
 */

function init_request_middleware(app, config) {
  const _def_on_begin = async (ctx, times) => { return {} }
  const _def_on_done  = async (ctx, begin_result, times) => { }

  let reqConfig = {
    lazy: config?.lazy || 1,
    slow: config?.slow || 2,
    onStart: config?.onStart || _def_on_begin,
    onDone: config?.onDone || _def_on_done,
    geoip: config?.geoip || {
      enabled: false
    }
  }

  
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

    // If wanted, geo localize ip
    const geo_enabled = reqConfig?.geoip?.enabled === true
    let geo_info = {}
    if (geo_enabled) {
      geo_info = geoip_localize_ip(ip, reqConfig.geoip, logger)
    }
    ctx.request.geoip = geo_info

    // Log something
    const clurl = ctx.request.url.indexOf('?')>=0
      ? ctx.request.url.substr(0, ctx.request.url.indexOf('?'))
      : ctx.request.url
    const geo_string = geo_enabled 
    ? geo_info?.local === true
      ? ''
      : geo_info?.country 
        ? geo_info?.city
          ? ` (${geo_info?.city}, ${geo_info.country})`
          : ` (${geo_info.country})`
        : ''
      : ''
    const sreq = `${magenta(ip)}${geo_string} ${cyan(ctx.request.method)} ${cyan(clurl)} [${cyan_light(REQUEST_COUNTER[ip])}/${cyan_light(ctx.requestId)}]`
    const sbody= ctx.request.body!=undefined ? JSON.stringify(ctx.request.body) : ''
    
    logger.info(`${sreq} - START`)
    logger.debug(`${sreq} - Body: ${sbody}`)

    const begin_result = await reqConfig.onStart(ctx, {started, description: 'pending'})

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
    const status = ctx.response.status
    let ststr= status
    let stcolor
    if (status==200) {
      stcolor= green
    } else if (status>200 && status<=299) {
      stcolor= yellow
      if (ctx.response.redirected && ctx.response.url) {
        ststr+= ` -> ${ctx.response.url}`

      }
    } else {
      stcolor= red
    }
    const stdesc = `[${stcolor(ststr)}]`

    const elapsed = parseFloat( (performance.now() - started) / 1000.0 ).toFixed(2)

    const tcolor= elapsed < reqConfig.lazy
                  ? green
                  : elapsed < reqConfig.slow
                    ? yellow
                    : red 

    const tname= elapsed < reqConfig.lazy
                  ? 'Ok'
                  : elapsed < reqConfig.slow
                    ? 'lazy'
                    : 'slow' 
    
    const ssession= ctx.session!=undefined ? JSON.stringify(ctx.session) : ''
    logger.debug(`${sreq} - Session: ${ssession}`)

    const rbody= ctx.body!=undefined ? JSON.stringify(ctx.body) : ''
    logger.debug(`${sreq} - Response: ${rbody}`)

    await reqConfig.onDone(ctx, begin_result, {started, elapsed, description: tname})
    
    logger.info(`${sreq} - DONE ${stdesc}${uid_desc} (${tcolor(tname)}: ${tcolor(elapsed)})`)
  }

  app.use(request_middleware)
}

export {init_request_middleware}
