import { useCallback, useEffect, useMemo, useRef, useState } from "react"
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

  const prevLoader = useRef(loader)
  const prevEffect = useRef(effect)
  const loaderChangeCount = useRef(0)
  const effectChangeCount = useRef(0)
  const loaderChangeTime = useRef(0)
  const effectChangeTime = useRef(0)

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
    if (prevLoader.current !== undefined && prevLoader.current !== loader) {
      const now = Date.now()
      // Si el cambio ocurrió rápido (<100ms desde el último cambio), sumamos al contador continuo
      if (now - loaderChangeTime.current < 100) {
        loaderChangeCount.current += 1
        if (loaderChangeCount.current >= 4) {
          console.warn(
            "🚨 [miolo][useSsrDataOrReload]: 'options.loader' varies too frequently. Wrap it in a useCallback!"
          )
        }
      } else {
        // Ha pasado suficiente tiempo como para ser un cambio humano/aislado
        loaderChangeCount.current = 1
      }
      loaderChangeTime.current = now
    }
    prevLoader.current = loader
  }) // Evalúa en cada render

  useEffect(() => {
    if (prevEffect.current !== undefined && prevEffect.current !== effect) {
      const now = Date.now()
      if (now - effectChangeTime.current < 100) {
        effectChangeCount.current += 1
        if (effectChangeCount.current >= 4) {
          console.warn(
            "🚨 [miolo][useSsrDataOrReload]: 'options.effect' varies too frequently. Wrap it in a useMemo or useCallback!"
          )
        }
      } else {
        effectChangeCount.current = 1
      }
      effectChangeTime.current = now
    }
    prevEffect.current = effect
  }) // Evalúa en cada render

  useEffect(() => {
    try {
      if (status === "idle") {
        const changed = effect?.() === true
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
