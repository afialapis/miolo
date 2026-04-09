import { useCallback, useEffect, useMemo, useState } from "react"
import getSsrDataFromContext from "./getSsrDataFromContext.mjs"
import usePropsCheck from "./usePropsCheck.mjs"

const useSsrDataOrReload = (context, miolo, name, options) => {
  const { fetcher } = miolo
  const {
    defval = [],
    loader = undefined,
    url = undefined,
    params = undefined,
    modifier = undefined,
    effect = undefined,
    model = undefined
  } = options

  usePropsCheck(loader, effect, modifier)

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

  const updateSsrData = useCallback(
    (data) => {
      setStatus("loading")
      setSsrData(parseData(data))
      setStatus("loaded")
      setError(undefined)
    },
    [parseData]
  )

  const refreshSsrData = useCallback(async () => {
    if (status === "loading") {
      return
    }

    setStatus("loading")
    setError(undefined)

    if (loader !== undefined) {
      const nSsrData = await loader(context, fetcher)
      setSsrData(parseData(nSsrData))
    } else {
      if (!url) {
        setError(`No url provided for ${name}`)
      } else {
        const resp = await fetcher.get(url, params)
        if (resp.ok) {
          setSsrData(parseData(resp?.data))
        } else {
          setError(resp?.error || "Unknonwn error")
        }
      }
    }
    setStatus("loaded")
  }, [status, context, fetcher, loader, url, params, parseData, name])

  useEffect(() => {
    try {
      if (status === "idle") {
        const changed =
          effect === undefined ||
          (typeof effect === "function" && effect() === true) ||
          effect === true
        if (changed === true) {
          refreshSsrData()
        }
      }
    } catch (_) {}
  }, [status, refreshSsrData, effect])

  return {
    data: ssrData,
    setData: updateSsrData,
    refresh: refreshSsrData,
    error,
    ok: error === undefined,
    ready: status === "loaded"
  }
}

export { useSsrDataOrReload }
