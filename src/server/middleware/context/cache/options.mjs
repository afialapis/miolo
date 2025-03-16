
function _miolo_cacher_options_merge(def, opt, logger) {

  const redis_host = opt?.redis?.host || def?.redis?.host || process.env?.REDIS_HOST || '127.0.0.1'
  const redis_port = opt?.redis?.port || def?.redis?.port || process.env?.REDIS_PORT || 6379

  const redis_username = opt?.redis?.username || def?.redis?.username || process.env?.REDIS_USERNAME || ''
  const redis_password = opt?.redis?.password || def?.redis?.password || process.env?.REDIS_PASSWORD || ''
  let redis_credentials = ''
  if (redis_username) {
    redis_credentials= `${redis_username}${redis_password ? `:${redis_password}`: ''}@`
  }

  const redis_url = opt?.redis?.url || def?.redis?.url || `redis://${redis_credentials}${redis_host}:${redis_port}'`

  return {
    type: opt?.type || def?.type,
    redis: {
      url: redis_url
    },
    namespace: opt?.namespace || def?.namespace,
    version: opt?.version || def?.version,
    clean: opt?.clean===true || def?.clean===true,
    ttl: opt?.ttl || def?.ttl,
    log: logger
  }
}


export function miolo_cacher_options_for_calustra(config, logger) {

  const d = config.cache.default
  const c = config.cache.calustra

  return _miolo_cacher_options_merge(d, c, logger)
}


export function miolo_cacher_options_for_session(config, logger) {

  const d = config.cache.default
  const s = config.cache.session

  return _miolo_cacher_options_merge(d, s, logger)
}


export function miolo_cacher_options_for_custom(config, logger) {

  const d = config.cache.default
  const cs = config.cache.custom || {}

  let custom = {}

  for(const [name, c] of Object.entries(cs)) {
  
    let opt = _miolo_cacher_options_merge(d, c, logger)
    opt.namespace = opt.namespace || `miolo-${name}`

   custom[name] = opt
  }

  return custom
}


