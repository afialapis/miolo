import { cacheiro } from 'cacheiro'
import { miolo_cacher_options_for_custom } from './options.mjs'

let _glob_cache_stores = undefined

export function init_context_cache(config, logger) {
  
  const _init_cache_stores = async () => {
    if (_glob_cache_stores==undefined) {
      _glob_cache_stores = {}
      const custom_options = miolo_cacher_options_for_custom(config, logger)
      
      for(const [name, options] of Object.entries(custom_options)) {
        const cache_store = await cacheiro(options)
        _glob_cache_stores[name] = cache_store
      }
          
    }
    return _glob_cache_stores
  }


  const get_cache = async (name) => {
    const cache_stores = await _init_cache_stores()
    return cache_stores[name]
  }
  const get_cache_names = async () => {
    const cache_stores = await _init_cache_stores()
    return Object.keys(cache_stores)
  }

  const drop_cache = async (name, clean) => {
    const cache_stores = await _init_cache_stores()
    if (clean) {
      const cache = await get_cache(name)
      cache.unsetAll()
    }
    delete cache_stores[name]
  }

  const drop_caches = async (clean) => {
    if (clean) {
      const cache_stores = await _init_cache_stores()
      for(const [_name, cache] of Object.entries(cache_stores)) {
        await cache.unsetAll()
      }
    }
    
    _glob_cache_stores = {}
  }

  const cache_ctx = {
    get_cache,
    get_cache_names,
    drop_cache,
    drop_caches
  }

  return cache_ctx

}
