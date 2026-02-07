

export async function cache_get_or_set_json(ctx, name, key, callback) {
  const cache = await ctx.miolo.cache.get_cache(name)

  if (! cache) {
    ctx.miolo.logger.warn(`[cache] Cache ${name} is not ready!`)
  }
  
  if (cache) {
    if (await cache.hasItem(key)) {
      return JSON.parse(await cache.getItem(key))
    }
  }

  const data = await callback()

  if (cache) {
    await cache.setItem(key, JSON.stringify(data))
  }

  return data
}

