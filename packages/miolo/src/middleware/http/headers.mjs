import koa_cors from '@koa/cors'
import koa_proxy from 'koa-proxies'

const _if_options = (http, field, callback) => {
  try {
    const val= http[field]
    if ((val!=undefined) && (val!=false)) {
      return callback(val)
    }
  } catch(_) {}
}

const _cors_options = (options) => {
  if (typeof options == 'object') {
    return options
  }
  return {}
}


const _proxy_options = (options) => {
  if (options==undefined) {
    options= {}
  }

  const tpath= options?.path || '/'

  const target = options?.target || "https://proxy.miolo.com"
  const changeOrigin = options?.changeOrigin!=undefined ? options.changeOrigin : true
  const logs = options?.logs!=undefined ? options.logs : true


  const toptions= {
    target, changeOrigin, logs
  }

  return [tpath, toptions]
}




const init_headers_middleware = ( app, http) => {
  const logger= app.context.miolo.logger
  
  _if_options(http, 'cors', (options) => {
    if (options=='simple') {
      logger.debug(`[http] Setting CORS the simple way`)
      app.use(async (ctx, next) => {
        ctx.set('Access-Control-Allow-Origin', '*')
        ctx.set('Access-Control-Expose-Headers', 'SourceMap,X-SourceMap')
        await next()
      })
    } else {
      const coptions= _cors_options(options)
      logger.debug(`[http] Setting CORS headers for ${JSON.stringify(coptions)}`)
      app.use(koa_cors(coptions))
    }


  })

  _if_options(http, 'proxy', (options) => {
    const [tpath, toptions]= _proxy_options(options)
    logger.debug(`[http] Setting Proxy for ${tpath} to ${toptions.target} `)

    app.use(
      koa_proxy(tpath, toptions)
    );
  })  
}

export { init_headers_middleware }
