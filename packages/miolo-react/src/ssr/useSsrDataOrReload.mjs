import { useCallback, useEffect, useState } from "react"
import getSsrDataFromContext from "./getSsrDataFromContext.mjs"

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

  const _parseData = useCallback(
    (value) => {
      let parsed = value
      if (modifier !== undefined) {
        parsed = modifier(parsed)
      }
      if (model !== undefined) {
        parsed = new model(parsed)
      }
      return parsed
    },
    [modifier, model]
  )

  const ssrDataFromContext = getSsrDataFromContext(context, name)
  const [ssrData, setSsrData] = useState(
    _parseData(ssrDataFromContext !== undefined ? ssrDataFromContext : defval)
  )

  const [needToRefresh, setNeedToRefresh] = useState(ssrDataFromContext === undefined)
  const [status, setStatus] = useState(needToRefresh ? "idle" : "loaded")
  const [error, setError] = useState(undefined)

  const refreshSsrData = useCallback(async () => {
    setStatus("loading")
    if (loader !== undefined) {
      const nSsrData = await loader(context, fetcher)
      setSsrData(_parseData(nSsrData))
      setStatus("loaded")
      setError(undefined)
    } else {
      if (!url) {
        setError(`No url provided for ${name}`)
      } else {
        const resp = await fetcher.get(url, params)
        if (resp.ok) {
          setSsrData(_parseData(resp?.data))
          setStatus("loaded")
          setError(undefined)
        } else {
          setError(resp?.error || "Unknonwn error")
          setStatus("loaded")
        }
      }
    }
  }, [context, fetcher, loader, url, params, _parseData, name])

  useEffect(() => {
    try {
      if (needToRefresh) {
        const changed = effect === undefined || effect.check()
        if (changed) {
          setNeedToRefresh(false)
          refreshSsrData()
        }
      }
    } catch (_) {}
  }, [needToRefresh, refreshSsrData, effect, ...(effect?.deps || [])])

  return {
    data: ssrData,
    setData: (data) => setSsrData(_parseData(data)),
    refresh: refreshSsrData,
    error,
    ok: error === undefined,
    ready: status === "loaded" || status === "error"
  }
}

export { useSsrDataOrReload }
