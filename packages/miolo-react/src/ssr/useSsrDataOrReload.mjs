import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import getSsrDataFromContext from "./getSsrDataFromContext.mjs"
import useOnWindowFocus from "./useOnWindowFocus.mjs"
import usePropsCheck from "./usePropsCheck.mjs"

const _makeSerializable = (obj) => {
  try {
    return JSON.parse(JSON.stringify(obj))
  } catch (_) {
    return obj
  }
}

let _historyPatched = false
const patchHistory = () => {
  if (typeof window === "undefined" || _historyPatched) return

  const originalPushState = window.history.pushState
  window.history.pushState = function (...args) {
    const ret = originalPushState.apply(this, args)
    window.dispatchEvent(new Event("miolo-navigation"))
    return ret
  }

  const originalReplaceState = window.history.replaceState
  window.history.replaceState = function (...args) {
    const ret = originalReplaceState.apply(this, args)
    window.dispatchEvent(new Event("miolo-navigation"))
    return ret
  }

  window.addEventListener("popstate", () => {
    window.dispatchEvent(new Event("miolo-navigation"))
  })

  _historyPatched = true
}

const globalSocketState = {
  rooms: new Map(),
  unsubscribeTimers: new Map(),
  lastSubscribeEmitted: new Map(),
  versionsRequestedAt: 0
}

const useSsrDataOrReload = (context, miolo, name, options) => {
  const { fetcher, socket, logger } = miolo
  const {
    defval = [],
    loader = undefined,
    url = undefined,
    params = undefined,
    modifier = undefined,
    effect = undefined,
    model = undefined,
    cache = false,
    autoRefresh = true,
    ttl = undefined
  } = options

  usePropsCheck(loader, effect, modifier, name)

  const parseData = useCallback(
    (value) => {
      let parsed = value
      if (model !== undefined) {
        parsed = new model(parsed)
      }
      if (modifier !== undefined) {
        parsed = modifier(parsed)
      }
      return parsed
    },
    [modifier, model]
  )

  const ssrDataFromContext = useMemo(() => {
    return getSsrDataFromContext(context, name)
  }, [context, name])

  const [ssrData, setSsrData] = useState(
    parseData(ssrDataFromContext !== undefined ? ssrDataFromContext : defval)
  )
  const [status, setStatus] = useState(ssrDataFromContext !== undefined ? "loaded" : "idle")
  const [error, setError] = useState(undefined)
  const pendingLazyRefreshRef = useRef(false)

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

  const updateSsrData = useCallback(
    (data) => {
      pendingLazyRefreshRef.current = false
      setStatus("loading")
      setSsrData(parseData(data))
      setError(undefined)
      setStatus("loaded")
      /*await*/ cacheSet(data)
    },
    [parseData, cacheSet]
  )

  const refreshSsrData = useCallback(async () => {
    if (status === "loading") {
      return
    }

    pendingLazyRefreshRef.current = false
    setStatus("loading")
    setError(undefined)

    logger.verbose(`[miolo-react][ssr][${name}] refreshing ssr data`)

    let newData

    if (loader !== undefined) {
      newData = await loader(context, fetcher)
    } else {
      if (!url) {
        setError(`No url provided for ${name}`)
      } else {
        const resp = await fetcher.get(url, params)
        if (resp.ok) {
          newData = resp?.data
        } else {
          setError(resp?.error || "Unknown error")
        }
      }
    }

    if (newData !== undefined) {
      setSsrData(parseData(newData))
      /*await*/ cacheSet(newData)
    }

    setStatus("loaded")
  }, [status, context, fetcher, loader, url, params, parseData, name, cacheSet, logger])

  const cacheVersionsCheck = useCallback(
    async (versions) => {
      logger.verbose(
        `[miolo-react][ssr][${name}] Backend versions received: ${JSON.stringify(versions)}`
      )

      const ssrVersions = versions || {}
      if (ssrVersions[name]) {
        const backendVersion = ssrVersions[name]
        logger.verbose(
          `[miolo-react][ssr][${name}] Backend version for ${name} is ${backendVersion}`
        )

        const [cached, expired, ts] = await cacheGet()
        if (cached) {
          if (expired || ts < backendVersion) {
            logger.info(
              `[miolo-react][ssr][${name}] ssr-versions mismatch for ${name}, invalidating`
            )
            await cacheInvalidate()
            if (autoRefresh === true) {
              refreshSsrData()
            }
          } else {
            logger.verbose(`[miolo-react][ssr][${name}] ssr-versions match for ${name}`)
          }
        } else {
          logger.warn(`[miolo-react][ssr][${name}] No cached data found for ${name}`)
        }
      }
    },
    [name, logger, cacheGet, cacheInvalidate, refreshSsrData, autoRefresh]
  )

  useEffect(() => {
    let mounted = true

    const loadData = async () => {
      if (!mounted) return

      try {
        if (status === "idle") {
          logger.verbose(`[miolo-react][ssr][${name}] getting data for ${name}...`)

          const changed =
            effect === undefined ||
            (typeof effect === "function" && effect() === true) ||
            effect === true

          if (changed === true) {
            const [cached, expired, _ts] = await cacheGet()

            if (cached) {
              logger.verbose(`[miolo-react][ssr][${name}] read data for ${name} from cache`)
              setSsrData(parseData(cached))

              if (expired) {
                logger.verbose(`[miolo-react][ssr][${name}] expired cache for ${name}, refreshing`)
                refreshSsrData()
              } else {
                setStatus("loaded")
              }
            } else {
              logger.verbose(`[miolo-react][ssr][${name}] no cached data for ${name}, refreshing`)
              refreshSsrData()
            }
          }
        }
      } catch (_) {}
    }

    loadData()

    return () => {
      mounted = false
    }
  }, [status, refreshSsrData, effect, name, parseData, cacheGet, logger])

  useEffect(() => {
    if (ssrDataFromContext !== undefined) {
      /*await*/ cacheSet(ssrDataFromContext)
    }
  }, [ssrDataFromContext, cacheSet])

  const handlersRef = useRef({})

  useEffect(() => {
    handlersRef.current = {
      cacheVersionsCheck,
      cacheInvalidate,
      refreshSsrData,
      refreshSsrDataLazy: () => {
        pendingLazyRefreshRef.current = true
      }
    }
  })

  useEffect(() => {
    if (cache === true) {
      patchHistory()
    }

    const onNav = () => {
      if (pendingLazyRefreshRef.current) {
        logger.verbose(
          `[miolo-react][ssr][${name}] navigation detected, doing pending lazy refresh`
        )
        pendingLazyRefreshRef.current = false
        refreshSsrData()
      }
    }
    window.addEventListener("miolo-navigation", onNav)
    return () => {
      window.removeEventListener("miolo-navigation", onNav)
    }
  }, [cache, name, logger, refreshSsrData])

  useEffect(() => {
    if (!socket || cache !== true) {
      return
    }

    const currentCount = globalSocketState.rooms.get(name) || 0
    globalSocketState.rooms.set(name, currentCount + 1)

    const pendingTimer = globalSocketState.unsubscribeTimers.get(name)
    if (pendingTimer) {
      clearTimeout(pendingTimer)
      globalSocketState.unsubscribeTimers.delete(name)
    }

    const requestSubscribeAndVersions = () => {
      const now = Date.now()
      const lastSub = globalSocketState.lastSubscribeEmitted.get(name) || 0

      if (now - lastSub > 100) {
        globalSocketState.lastSubscribeEmitted.set(name, now)
        logger.verbose(`[miolo-react][ssr][${name}] Socket connected, subscribing`)
        socket.emit("ssr-subscribe", name)
      }

      if (now - globalSocketState.versionsRequestedAt > 500) {
        globalSocketState.versionsRequestedAt = now
        logger.verbose(`[miolo-react][ssr][${name}] Asking for ssr-versions`)
        socket.emit("ssr-versions")
      }
    }

    const onRefresh = async (data) => {
      if (data.name !== name) return

      logger.verbose(
        `[miolo-react][ssr][${name}] ssr-refresh ${JSON.stringify(data)} - my socket id: ${socket.id}`
      )
      if (data.exclude_socket_id && data.exclude_socket_id === socket.id) {
        logger.verbose(
          `[miolo-react][ssr][${name}] ssr-refresh ${data.name} ignored for socketid ${socket.id}`
        )
        return
      }
      if (data.only_socket_id && data.only_socket_id !== socket.id) {
        logger.verbose(
          `[miolo-react][ssr][${name}] ssr-refresh ${data.name} ignored for socketid ${socket.id} (only_socket_id mismatch)`
        )
        return
      }

      logger.info(
        `[miolo-react][ssr][${name}] ssr-refresh ${data.name}${data.lazy ? " (lazy)" : ""}`
      )
      await handlersRef.current.cacheInvalidate()

      if (!data.lazy) {
        handlersRef.current.refreshSsrData()
      } else {
        if (handlersRef.current.refreshSsrDataLazy) {
          handlersRef.current.refreshSsrDataLazy()
        }
      }
    }

    const onVersions = (versions) => {
      if (handlersRef.current.cacheVersionsCheck) {
        handlersRef.current.cacheVersionsCheck(versions)
      }
    }

    logger.verbose(`[miolo-react][ssr][${name}] Attaching ssr/cache socket handlers`)

    if (socket.connected) {
      requestSubscribeAndVersions()
    }

    socket.on("connect", requestSubscribeAndVersions)
    socket.on("ssr-versions", onVersions)
    socket.on("ssr-refresh", onRefresh)

    return () => {
      logger.verbose(`[miolo-react][ssr][${name}] Detaching ssr/cache socket handlers`)

      const count = globalSocketState.rooms.get(name) || 0
      if (count > 0) {
        globalSocketState.rooms.set(name, count - 1)
        if (count - 1 === 0) {
          const timer = setTimeout(() => {
            if ((globalSocketState.rooms.get(name) || 0) === 0) {
              socket.emit("ssr-unsubscribe", name)
              globalSocketState.lastSubscribeEmitted.set(name, 0)
            }
            globalSocketState.unsubscribeTimers.delete(name)
          }, 100)
          globalSocketState.unsubscribeTimers.set(name, timer)
        }
      }

      socket.off("connect", requestSubscribeAndVersions)
      socket.off("ssr-versions", onVersions)
      socket.off("ssr-refresh", onRefresh)
    }
  }, [name, cache, socket, logger])

  useOnWindowFocus(() => {
    if (cache !== true) {
      return
    }
    if (socket === undefined) {
      return
    }
    logger.verbose(
      `[miolo-react][ssr][${name}] Window focused, checking versions (socket id is ${socket.id})`
    )
    const now = Date.now()
    if (now - globalSocketState.versionsRequestedAt > 500) {
      globalSocketState.versionsRequestedAt = now
      socket.emit("ssr-versions")
    }
  }, [name, cache, logger, socket])

  return {
    data: ssrData,
    setData: updateSsrData,
    refresh: refreshSsrData,
    invalidate: cacheInvalidate,
    error,
    ok: error === undefined,
    ready: status === "loaded"
  }
}

export { useSsrDataOrReload }
