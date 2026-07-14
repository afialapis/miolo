import { useCallback } from "react"


const _makeSerializable = (obj) => {
  try {
    return JSON.parse(JSON.stringify(obj))
  } catch (_) {
    return obj
  }
}

export default function useIndexedDb(name, logger, cache, ttl) {

  const cacheInvalidate = useCallback(async () => {
    if (typeof window !== "undefined") {
      const { del } = await import("idb-keyval")
      await del(`ssr-cache-${name}`)
    }
  }, [name])

  const cacheSet = useCallback(
    async (data) => {
      if (cache === true) {
        if (typeof window !== "undefined") {
          try {
            const { set } = await import("idb-keyval")
            await set(`ssr-cache-${name}`, { data: _makeSerializable(data), ts: Date.now() })
          } catch (err) {
            logger.error(`[miolo-react][ssr][${name}] error setting cache for ${name}: ${err}`)
          }
        }
      }
    },
    [logger, cache, name]
  )

  const cacheGet = useCallback(async () => {
    if (cache === true) {
      if (typeof window !== "undefined") {
        try {
          const { get } = await import("idb-keyval")
          const cached = await get(`ssr-cache-${name}`)
          if (cached && cached.data !== undefined) {
            const expired = ttl !== undefined && Date.now() - cached.ts > ttl * 1000
            return [cached.data, expired, cached.ts]
          }
        } catch (err) {
          logger.error(`[miolo-react][ssr][${name}] error getting cache for ${name}: ${err}`)
        }
      }
    }
    return [null, false]
  }, [logger, cache, name, ttl])

  return {
    cacheInvalidate,
    cacheSet,
    cacheGet,
  }
}