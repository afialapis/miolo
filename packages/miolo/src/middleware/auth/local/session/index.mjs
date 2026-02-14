import { createSession } from 'koa-session'
// import store_koa_redis from './store_koa_redis.mjs'
import {init_session_cache_store} from './store.mjs'

/**
 * Middleware for session
 * @param ctx
 * @param next
 */
function init_session_middleware(app, sessionConfig, cacheConfig) {
  const store = init_session_cache_store(cacheConfig, app.context.miolo.logger)

  app.keys = [sessionConfig.secret || '*secret*']

  const options= {
    // store: store_koa_redis,
    store,
    ...sessionConfig.options || {}
  }
  
  app.use(createSession(options, app))
  
  app.use (async (ctx, next) => {
    ctx.getSessionStoreKey = (externalKey) => {
      return store.getInnerKey(externalKey)
    }
    await next()
  })
}

export {init_session_middleware}
