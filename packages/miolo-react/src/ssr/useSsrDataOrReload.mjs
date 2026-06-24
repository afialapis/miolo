import { useCallback, useEffect, useMemo, useState } from "react"
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

/*
QUE PASA CON LA DUPLICIDAD DE INVALIDACION
- el cliente hace un cambio
- setData() cambia estado y cache local
- la llamada en servidor provoca un ssr-refresh (necesario para otros clientes)
- pero se puede evitar el doble refresh en el que hace el cambio?
*/

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
  const [socketInited, setSocketInited] = useState(false)

  const updateSsrData = useCallback(
    (data) => {
      setStatus("loading")
      setSsrData(parseData(data))
      setStatus("loaded")
      setError(undefined)
      if (cache === true) {
        if (typeof window !== "undefined") {
          import("idb-keyval").then(({ set }) => {
            set(`ssr-cache-${name}`, { data: _makeSerializable(data), ts: Date.now() }).catch(
              () => {}
            )
          })
        }
      }
    },
    [parseData, name, cache]
  )

  const refreshSsrData = useCallback(async () => {
    if (status === "loading") {
      return
    }

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
      if (cache === true) {
        if (typeof window !== "undefined") {
          try {
            const { set } = await import("idb-keyval")
            await set(`ssr-cache-${name}`, { data: _makeSerializable(newData), ts: Date.now() })
          } catch (err) {
            console.error(err)
          }
        }
      }
      setSsrData(parseData(newData))
    }

    setStatus("loaded")
  }, [status, context, fetcher, loader, url, params, parseData, name, cache, logger])

  const invalidateCache = useCallback((tName, callback = undefined) => {
    if (typeof window !== "undefined") {
      import("idb-keyval").then(({ del }) => {
        del(`ssr-cache-${tName}`)
          .catch(() => {})
          .then(() => {
            if (callback) {
              callback()
            }
          })
      })
    }
  }, [])

  const checkCacheVersions = useCallback(
    (versions) => {
      logger.verbose(
        `[miolo-react][ssr][${name}] Backend versions received: ${JSON.stringify(versions)}`
      )

      const ssrVersions = versions || {}
      if (ssrVersions[name]) {
        const backendVersion = ssrVersions[name]
        logger.verbose(
          `[miolo-react][ssr][${name}] Backend version for ${name} is ${backendVersion}`
        )

        if (typeof window !== "undefined") {
          import("idb-keyval")
            .then(({ get }) => {
              get(`ssr-cache-${name}`)
                .then((cached) => {
                  if (cached && cached.ts < backendVersion) {
                    logger.info(
                      `[miolo-react][ssr][${name}] ssr-versions mismatch for ${name}, invalidating`
                    )
                    invalidateCache(name, () => {
                      if (autoRefresh === true) {
                        refreshSsrData()
                      }
                    })
                  } else {
                    logger.verbose(`[miolo-react][ssr][${name}] ssr-versions match for ${name}`)
                  }
                })
                .catch(() => {})
            })
            .catch(() => {})
        }
      }
    },
    [name, logger, invalidateCache, refreshSsrData, autoRefresh]
  )

  useEffect(() => {
    let mounted = true

    const loadData = async () => {
      if (!mounted) return

      try {
        if (status === "idle") {
          logger.verbose(`[miolo-react][ssr][${name}] loadData for ${name}...`)

          const changed =
            effect === undefined ||
            (typeof effect === "function" && effect() === true) ||
            effect === true

          if (changed === true) {
            let cached = null
            if (cache === true) {
              if (typeof window !== "undefined") {
                try {
                  const { get } = await import("idb-keyval")
                  cached = await get(`ssr-cache-${name}`)
                } catch (err) {
                  console.error(err)
                }
              }
            }

            if (cached && cached.data !== undefined) {
              setSsrData(parseData(cached.data))

              if (ttl !== undefined && Date.now() - cached.ts > ttl * 1000) {
                refreshSsrData()
              } else {
                setStatus("loaded")
              }
            } else {
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
  }, [status, refreshSsrData, effect, name, ttl, parseData, cache, logger])

  useEffect(() => {
    if (cache === true) {
      if (ssrDataFromContext !== undefined && typeof window !== "undefined") {
        import("idb-keyval").then(({ set }) => {
          set(`ssr-cache-${name}`, {
            data: _makeSerializable(ssrDataFromContext),
            ts: Date.now()
          }).catch(() => {})
        })
      }
    }
  }, [ssrDataFromContext, name, cache])

  useEffect(() => {
    if (socket === undefined) {
      return
    }

    if (socketInited) {
      return
    }
    setSocketInited(true)

    socket.on("connect", () => {
      logger.verbose(`[miolo-react][ssr][${name}] Socket connected`)
      if (cache === true) {
        logger.verbose(`[miolo-react][ssr][${name}] Asking for ssr-versions`)
        socket.emit("ssr-versions")

        logger.verbose(`[miolo-react][ssr][${name}] Attaching ssr/cache socket handlers`)

        socket.on("ssr-versions", checkCacheVersions)

        socket.on("ssr-invalidate", (data) => {
          logger.verbose(`[miolo-react][ssr][${name}] ssr-invalidate ${JSON.stringify(data)}`)
          if (data.exclude_socket_id && data.exclude_socket_id === socket.id) {
            logger.verbose(
              `[miolo-react][ssr][${name}] ssr-invalidate ${data.name} ignored for socketid ${socket.id}`
            )
            return
          }
          logger.info(`[miolo-react][ssr][${name}] ssr-invalidate ${data.name}`)
          invalidateCache(data.name)
        })

        socket.on("ssr-refresh", (data) => {
          logger.verbose(
            `[miolo-react][ssr][${name}] ssr-refresh ${JSON.stringify(data)} - my socket id: ${socket.id}`
          )
          if (data.exclude_socket_id && data.exclude_socket_id === socket.id) {
            logger.verbose(
              `[miolo-react][ssr][${name}] ssr-refresh ${data.name} ignored for socketid ${socket.id}`
            )
            return
          }
          logger.info(`[miolo-react][ssr][${name}] ssr-refresh ${data.name}`)
          invalidateCache(data.name, () => {
            refreshSsrData()
          })
        })
      }
    })
  }, [
    name,
    cache,
    socket,
    socketInited,
    checkCacheVersions,
    logger,
    invalidateCache,
    refreshSsrData
  ])

  useOnWindowFocus(() => {
    if (cache !== true) {
      return
    }
    if (socket === undefined) {
      return
    }
    logger.verbose(`[miolo-react][ssr][${name}] Window focused, checking versions`)
    socket.emit("ssr-versions")
  }, [name, cache, logger, socket])

  return {
    data: ssrData,
    setData: updateSsrData,
    refresh: refreshSsrData,
    invalidate: (callback) => invalidateCache(name, callback),
    error,
    ok: error === undefined,
    ready: status === "loaded"
  }
}

export { useSsrDataOrReload }
