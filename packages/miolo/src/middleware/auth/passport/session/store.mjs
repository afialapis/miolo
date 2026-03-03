import { cacheiro } from "cacheiro"
import { miolo_cacher_options_for_session } from "../../../context/cache/options.mjs"

class SessionStore {
  constructor(options, logger) {
    this.options = options
    this.logger = logger
    this._cache = undefined
  }

  async initCache() {
    if (this._cache === undefined) {
      this.logger.silly(`[session-store] Initing store`)
      this._cache = await cacheiro(this.options)
    }
    return this._cache
  }

  async closeCache() {
    if (this._cache !== undefined) {
      this.logger.silly(`[session-store] Closing store`)
      await this._cache.close()
    }
  }

  async get(key, maxAge, { rolling, ctx }) {
    const cache = await this.initCache()
    const jvalue = await cache.getItem(key)
    try {
      const value = JSON.parse(jvalue)
      this.logger.silly(`[session-store] Get session for ${key}: ${JSON.stringify(value)}`)
      //console.log(`[session-store] Get session for ${key}: ${JSON.stringify(value)}`)
      return value
    } catch (_) {
      this.logger.silly(`[session-store] No session for ${key}`)
      //console.log(`[session-store] No session for ${key}`)
      return undefined
    }
  }

  async set(key, sess, maxAge, { rolling, changed, ctx }) {
    this.logger.silly(`[session-store] Set session for ${key}`)
    const cache = await this.initCache()
    let svalue
    try {
      svalue = JSON.stringify(sess)
    } catch (_) {}

    // Rely on miolo settings for ttl / maxAge
    await cache.setItem(key, svalue /*, maxAge*/)
  }

  async destroy(key, { ctx }) {
    this.logger.silly(`[session-store] Destroy session for ${key}`)
    const cache = await this.initCache()
    await cache.unsetItem(key)
  }

  getInnerKey(key) {
    if (this._cache === undefined) {
      this.logger.error("[session-store] Calling getInnerKey() before cache is inited")
      return key
    }
    return this._cache.getInnerKey(key)
  }
}

export function init_session_cache_store(cacheConfig, logger) {
  const options = miolo_cacher_options_for_session({ cache: cacheConfig }, logger)
  const store = new SessionStore(options, logger)
  //store.initCache()
  return store
}
