
function _miolo_cacher_options_merge(def, opt, logger) {

  return {
    type: opt?.type || def?.type,
    redis: opt?.redis || def?.redis,
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


