import { cacheiro } from "cacheiro"
import { miolo_cacher_options_for_custom } from "./options.mjs"

let _glob_cache_stores = {}

export function init_context_cache(config, logger) {
  const custom_options = miolo_cacher_options_for_custom(config, logger)

  const _init_cache = async (name) => {
    const cache_store = await cacheiro(custom_options?.[name] || {})
    _glob_cache_stores[name] = cache_store
    return cache_store
  }

  const init = async () => {
    _glob_cache_stores = {}

    for (const name of Object.keys(custom_options)) {
      _glob_cache_stores[name] = await _init_cache(name)
    }
  }

  const get_cache = async (name) => {
    let cache_store = _glob_cache_stores?.[name]
    if (!cache_store) {
      cache_store = await _init_cache(name)
    }
    return cache_store
  }

  const get_cache_names = async () => {
    return Object.keys(_glob_cache_stores)
  }

  const drop_cache = async (name, clean = true) => {
    if (clean) {
      const cache = await get_cache(name)
      if (cache) {
        await cache.close()
      }
    }
    delete _glob_cache_stores[name]
  }

  const close = async (clean = true) => {
    if (clean) {
      for (const [_name, cache] of Object.entries(_glob_cache_stores)) {
        await cache.close()
      }
    }

    _glob_cache_stores = {}
  }

  const cache_ctx = {
    init,
    get_cache,
    get_cache_names,
    drop_cache,
    close
  }

  return cache_ctx
}
