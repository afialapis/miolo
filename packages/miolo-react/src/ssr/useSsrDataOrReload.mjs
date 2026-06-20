import { useCallback, useEffect, useMemo, useState } from "react"
import getSsrDataFromContext from "./getSsrDataFromContext.mjs"
import usePropsCheck from "./usePropsCheck.mjs"

const makeSerializable = (obj) => {
  try {
    return JSON.parse(JSON.stringify(obj))
  } catch (_) {
    return obj
  }
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
            set(`ssr-cache-${name}`, { data: makeSerializable(data), ts: Date.now() }).catch(
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
            await set(`ssr-cache-${name}`, { data: makeSerializable(newData), ts: Date.now() })
          } catch (err) {
            console.error(err)
          }
        }
      }
      setSsrData(parseData(newData))
    }

    setStatus("loaded")
  }, [status, context, fetcher, loader, url, params, parseData, name, cache])

  const invalidate = useCallback(() => {
    if (typeof window !== "undefined") {
      import("idb-keyval").then(({ del }) => {
        del(`ssr-cache-${name}`).catch(() => {})
      })
    }
  }, [name])

  useEffect(() => {
    let mounted = true

    const loadData = async () => {
      if (!mounted) return

      try {
        if (status === "idle") {
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
  }, [status, refreshSsrData, effect, name, ttl, parseData, cache])

  useEffect(() => {
    if (cache === true) {
      if (ssrDataFromContext !== undefined && typeof window !== "undefined") {
        import("idb-keyval").then(({ set }) => {
          set(`ssr-cache-${name}`, {
            data: makeSerializable(ssrDataFromContext),
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
      logger.verbose("[ssr] Socket connected")
    })

    socket.on("ssr-invalidate", (data) => {
      logger.info(`[ssr] ssr-invalidate ${data.name}`)

      if (typeof window !== "undefined") {
        import("idb-keyval").then(({ del }) => {
          del(`ssr-cache-${data.name}`).catch(() => {})
        })
      }
    })
  }, [socket, socketInited, logger])

  return {
    data: ssrData,
    setData: updateSsrData,
    refresh: refreshSsrData,
    invalidate,
    error,
    ok: error === undefined,
    ready: status === "loaded"
  }
}

export { useSsrDataOrReload }
