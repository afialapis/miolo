import {useState, useCallback, useEffect} from 'react'
import getSsrDataFromContext from './getSsrDataFromContext.mjs'

const useSsrDataOrReload = (context, miolo, name, defval, loader, modifier) => {
  
  const _maybeModify = useCallback((value) => {
    return modifier==undefined ? value : modifier(value)
  }, [modifier])

  const ssrDataFromContext = getSsrDataFromContext(context, name)
  const [ssrData, setSsrData] = useState(_maybeModify(
    ssrDataFromContext != undefined 
    ? ssrDataFromContext : defval))
  const [needToRefresh, setNeedToRefresh] = useState(ssrDataFromContext == undefined)

  const refreshSsrData = useCallback(() => {
    if (loader == undefined) {
      return
    }

    const {fetcher} = miolo

    async function fetchData() {
      let nSsrData = await loader(context, fetcher)
      setSsrData(_maybeModify(nSsrData))
    }

    fetchData()
  }, [context, miolo, loader, _maybeModify]) 
  
  useEffect(() => {
    try {
      if (needToRefresh) {
        setNeedToRefresh(false)
        refreshSsrData()
      }
    } catch(e) {}
  }, [needToRefresh, refreshSsrData]) 

  return [ssrData, setSsrData, refreshSsrData]
}

export {useSsrDataOrReload}