import {useState, useCallback, useEffect} from 'react'
import getSsrDataFromContext from './getSsrDataFromContext.mjs'

const useSsrDataOrReload = (context, miolo, name, defval, loader) => {
  const ssrDataFromContext = getSsrDataFromContext(context, name)
  const [ssrData, setSsrData] = useState(ssrDataFromContext != undefined ? ssrDataFromContext : defval)
  const [needToRefresh, setNeedToRefresh] = useState(ssrDataFromContext == undefined)

  const refreshSsrData = useCallback(() => {
    if (loader == undefined) {
      return
    }

    async function fetchData() {
      let nSsrData = await loader(context, miolo)
      setSsrData(nSsrData)
    }

    fetchData()
  }, [context, miolo, loader]) 
  
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