import { cacheiro } from "cacheiro"
import { miolo_cacher_options_for_custom, miolo_cacher_options_for_fly } from "./options.mjs"

let _glob_cache_mother
const _local_cache_instances = new Map()

const _get_cache_mother = async (config, logger) => {
  if (_glob_cache_mother === undefined) {
    const default_options = miolo_cacher_options_for_fly(
      config,
      {
        type: process.env.MIOLO_CACHE_TYPE || "combined",
        namespace: "miolo-cache-mother"
      },
      logger
    )

    _glob_cache_mother = await cacheiro(default_options)
  }
  return _glob_cache_mother
}

export function init_context_cache(config, logger) {
  const custom_options = miolo_cacher_options_for_custom(config, logger)

  const _init_cache_instance = async (name) => {
    const cache_mother = await _get_cache_mother(config, logger)

    const cache_instance = await cacheiro(custom_options?.[name] || {})
    await cache_mother.setItem(name, "1")
    _local_cache_instances.set(name, cache_instance)
    return cache_instance
  }

  const init = async () => {
    await _get_cache_mother(config, logger)
  }

  const get_cache = async (name) => {
    if (_local_cache_instances.has(name)) {
      return _local_cache_instances.get(name)
    }

    const cache_mother = await _get_cache_mother(config, logger)

    const exists_in_mother = await cache_mother.getItem(name)
    if (exists_in_mother) {
      const cache_instance = await cacheiro(custom_options?.[name] || {})
      _local_cache_instances.set(name, cache_instance)
      return cache_instance
    }

    return await _init_cache_instance(name)
  }

  const get_cache_names = async (pattern = "*") => {
    const cache_mother = await _get_cache_mother(config, logger)

    return await cache_mother.getKeys(pattern)
  }

  const drop_cache = async (name, clean = true) => {
    if (clean) {
      const cache = await get_cache(name)
      if (cache) {
        try {
          await cache.close()
        } catch (error) {
          logger.warn(error)
        }
      }
    }
    _local_cache_instances.delete(name)

    const cache_mother = await _get_cache_mother(config, logger)
    await cache_mother.unsetItem(name)
  }

  const close = async (clean = true) => {
    const cache_mother = await _get_cache_mother(config, logger)

    if (clean) {
      for (const cache of _local_cache_instances.values()) {
        try {
          await cache.close()
        } catch (error) {
          logger.warn(error)
        }
      }
    }
    _local_cache_instances.clear()

    await cache_mother.close()
    _glob_cache_mother = undefined
  }

  const set_cache_version = async (name, key, version = Date.now()) => {
    const cache_mother = await _get_cache_mother(config, logger)
    await cache_mother.setItem(`versions:${name}:${key}`, version)
  }

  const get_cache_versions = async () => {
    const cache_mother = await _get_cache_mother(config, logger)
    const keys = await cache_mother.getKeys("versions:*")
    const versions = {}
    for (const key of keys) {
      const parts = key.split(":")
      if (parts.length >= 3) {
        const name = parts.slice(1, -1).join(":")
        const item = parts[parts.length - 1]
        const version = await cache_mother.getItem(key)
        if (!versions[name]) {
          versions[name] = {}
        }
        versions[name][item] = version
      }
    }
    return versions
  }

  const _item_get_or_set = async (name, key, callback, parse_read, parse_write) => {
    const cache = await get_cache(name)

    if (!cache) {
      logger.warn(`[cache] Cache ${name} is not ready!`)
    }

    if (cache) {
      if (await cache.hasItem(key)) {
        return parse_read(await cache.getItem(key))
      }
    }

    const data = await callback()

    if (cache) {
      await cache.setItem(key, parse_write(data))

      await set_cache_version(name, key)
    }

    return data
  }

  const item_get_or_set = async (name, key, callback) => {
    return await _item_get_or_set(
      name,
      key,
      callback,
      (data) => data,
      (data) => data
    )
  }

  const item_get_or_set_json = async (name, key, callback) => {
    return await _item_get_or_set(name, key, callback, JSON.parse, JSON.stringify)
  }

  const item_unset = async (name, key) => {
    const cache = await get_cache(name)

    if (!cache) {
      logger.warn(`[cache] Cache ${name} is not ready!`)
    }

    await cache.unsetItem(key)
    await set_cache_version(name, key)
  }

  const cache_ctx = {
    init,
    get_cache,
    get_cache_names,
    set_cache_version,
    get_cache_versions,
    drop_cache,
    close,
    item_get_or_set,
    item_get_or_set_json,
    item_unset
  }

  return cache_ctx
}
